'use server'

import { auth, EnrichedSession, signOut } from "@/auth"
import { createGoogleFormResponse, Form, FormGeneratorResponse } from "@/lib/types"
import { users, forms, FormsInsert } from "@/lib/schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import { FormGenerationError } from "@/lib/error";

export const generateFormFromAI = async (userPrompt: string): Promise<FormGeneratorResponse> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userPrompt }),
    })




    if (!response.ok) {
      console.log(await response?.text())
      throw new FormGenerationError(
        'AI_GENERATION_FAILED',
        'Failed to generate form content',
        `Status: ${response.status}`
        
      );
    }

    const data = await response.json()
    return data
  } catch (error) {
    if (error instanceof FormGenerationError) {
      throw error;
    }
    throw new FormGenerationError(
      'AI_GENERATION_ERROR',
      'An error occurred while generating the form',
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
}

export const createGoogleForm = async (formData: FormGeneratorResponse): Promise<createGoogleFormResponse> => {
  const session = (await auth()) as EnrichedSession

  if (!session?.user?.email || session?.accessTokenExpiresAt < Date.now() / 1000) {
    throw new FormGenerationError(
      'AUTH_ERROR',
      'You must be logged in to create forms',
    );
  }




  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, session.user?.email as string));


  if (!user) {
    signOut();
    throw new FormGenerationError(
      'USER_NOT_FOUND',
      'User not found in database'
    );
  }

  if (user.email !== session.user?.email) {
    signOut();
    throw new FormGenerationError(
      'USER_MISMATCH',
      'User authentication mismatch'
    );
   
    
  }



  const oauth2Client = new OAuth2Client({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  })

  try {
    oauth2Client.setCredentials({
      access_token: session.accessToken,
      refresh_token: session.refreshToken,
    })

    const googleForms = google.forms({version: "v1", auth: oauth2Client})
    
    const form = await googleForms.forms.create({
      auth: oauth2Client,
      requestBody: {
        info:{
          title: formData.initialForm.info.title,
        }
      }
    })

    if(!form.data || !form.data.formId) {
      throw new FormGenerationError(
        'GOOGLE_FORM_CREATE_FAILED',
        'Failed to create Google Form'
      );
    }



    return {
      Form: form.data as Form,
      message: "Google Form created successfully",
    }
  } catch (error) {
    if (error instanceof FormGenerationError) {
      throw error;
    }
    throw new FormGenerationError(
      'GOOGLE_API_ERROR',
      'Error creating Google Form',
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
}

export const sendBatchUpdateToGoogleForm = async (formData: FormGeneratorResponse, formId: string, createdForm: createGoogleFormResponse): Promise<any> => {
  const session = (await auth()) as EnrichedSession


  if (!session?.dbUserId) {
    throw new FormGenerationError(
      'AUTH_ERROR',
      'You must be logged in to update forms'
    );
  }

  try {
    const oauth2Client = new OAuth2Client({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })

    oauth2Client.setCredentials({
      access_token: session?.accessToken,
      refresh_token: session?.refreshToken,
    })

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.dbUserId, session.dbUserId as string));

    if (!user) {
      throw new FormGenerationError(
        'USER_NOT_FOUND',
        'User not found in database'
      );
    }

    if (user.dbUserId !== session.dbUserId) {
      throw new FormGenerationError(
        'USER_MISMATCH',
        'User authentication mismatch'
      );
    }

    

    const googleForms = google.forms({version: "v1", auth: oauth2Client})
    const response = await googleForms.forms.batchUpdate({
      formId: formId,
      auth: oauth2Client,
      requestBody: {
        requests: formData?.batchUpdate?.requests as any[],
        includeFormInResponse: true
      }
    })

    if(!response.data) {
      throw new FormGenerationError(
        'BATCH_UPDATE_FAILED',
        'Failed to update form with questions'
      );
    }

    const formEditLink = `https://docs.google.com/forms/d/${createdForm?.Form?.formId}/edit`



    const newForm = await db.transaction(async (tx) => {
      const [insertedForm] = await tx.insert(forms).values({
        title: formData.initialForm.info.title as string,
        formId: formId,
        description: formData.initialForm.info.description || '',
        formLink: createdForm?.Form?.responderUri,
        editFormLink: formEditLink,
        userId: user.id
      } as FormsInsert).returning();

      return insertedForm;
    });

    if(!newForm) {
      throw new FormGenerationError(
        'DB_ERROR',
        'Failed to save form to database'
      );
    }



    return response.data;
  } catch (error) {
    if (error instanceof FormGenerationError) {
      throw error;
    }
    throw new FormGenerationError(
      'BATCH_UPDATE_ERROR',
      'Error updating form',
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
}
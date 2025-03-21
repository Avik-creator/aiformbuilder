'use server'

import { auth, signOut } from "@/auth"
import { createGoogleFormResponse, Form, FormGeneratorResponse } from "@/lib/types"
import { users, forms, FormsInsert, accounts } from "@/lib/schema";
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
  const session = await auth()

  


  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, session?.user?.email as string));


  if (!user) {
    signOut();
    throw new FormGenerationError(
      'USER_NOT_FOUND',
      'User not found in database'
    );
  }

  if (user.email !== session?.user?.email) {
    signOut();
    throw new FormGenerationError(
      'USER_MISMATCH',
      'User authentication mismatch'
    );
   
    
  }

  const [accountInfo] = await db.select({
    accessToken: accounts.access_token,
    refreshToken: accounts.refresh_token
  }).from(accounts).where(eq(accounts.userId, user.id))





  const oauth2Client = new OAuth2Client({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  })

  try {
    oauth2Client.setCredentials({
      access_token: accountInfo?.accessToken,
      refresh_token: accountInfo?.refreshToken,
    })

    const googleForms = google.forms({version: "v1", auth: oauth2Client})
    
    const form = await googleForms.forms.create({
      auth: oauth2Client,
      requestBody: {
        info:{
          title: formData.initialForm.info.title,
          documentTitle: formData.initialForm.info.title,
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
  const session = await auth()


  if (!session?.user?.email) {
    throw new FormGenerationError(
      'AUTH_ERROR',
      'You must be logged in to update forms'
    );
  }

  const [user] = await db
  .select()
  .from(users)
  .where(eq(users.email, session?.user?.email as string));

  const [accountInfo] = await db.select({
    accessToken: accounts.access_token,
    refreshToken: accounts.refresh_token
  }).from(accounts).where(eq(accounts.userId, user.id))


  try {
    const oauth2Client = new OAuth2Client({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })

    oauth2Client.setCredentials({
      access_token: accountInfo?.accessToken,
      refresh_token: accountInfo?.refreshToken
    })

  

    if (!user) {
      throw new FormGenerationError(
        'USER_NOT_FOUND',
        'User not found in database'
      );
    }

    if (user.email !== session?.user?.email) {
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
        id: formId,
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

export const deleteForm = async (formId: string) => {
  const session = await auth();
  
  if (!session?.user?.email) {
    throw new FormGenerationError(
      'AUTH_ERROR',
      'You must be logged in to delete forms'
    );
  }
  
  // Get user and authentication info
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, session?.user?.email as string));
    
  const [accountInfo] = await db.select({
    accessToken: accounts.access_token,
    refreshToken: accounts.refresh_token
  }).from(accounts).where(eq(accounts.userId, user.id));
  
  // Verify form ownership
  const [formToDelete] = await db
    .select()
    .from(forms)
    .where(eq(forms.id, formId));
    
  if (!formToDelete) {
    throw new FormGenerationError(
      'FORM_NOT_FOUND',
      'Form not found in database'
    );
  }
  
  if (formToDelete.userId !== user.id) {
    throw new FormGenerationError(
      'PERMISSION_DENIED',
      'You do not have permission to delete this form'
    );
  }
  
  try {
    // Set up OAuth client
    const oauth2Client = new OAuth2Client({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    });
    
    oauth2Client.setCredentials({
      access_token: accountInfo?.accessToken,
      refresh_token: accountInfo?.refreshToken
    });
    
    // Delete from Google Drive
    const drive = google.drive({version: 'v2', auth: oauth2Client});
    await drive.files.delete({
      fileId: formId
    });
    
    // Delete from your database
    await db.delete(forms).where(eq(forms.id, formId));
    
    return {
      success: true,
      message: "Form successfully deleted"
    };
  } catch (error) {
    if (error instanceof FormGenerationError) {
      throw error;
    }
    throw new FormGenerationError(
      'DELETE_ERROR',
      'Error deleting form',
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
}

export const getFormResponses = async (formId: string) => {
  const session = await auth();
  if (!session?.user?.email) {
    throw new FormGenerationError(
      'AUTH_ERROR',
      'You must be logged in to view responses'
    );
  }
  
  // Get user and authentication info
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, session?.user?.email as string));
  const [accountInfo] = await db.select({
    accessToken: accounts.access_token,
    refreshToken: accounts.refresh_token
  }).from(accounts).where(eq(accounts.userId, user.id));
  
  // Verify form ownership
  const [formToAccess] = await db
    .select()
    .from(forms)
    .where(eq(forms.id, formId));
  if (!formToAccess) {
    throw new FormGenerationError(
      'FORM_NOT_FOUND',
      'Form not found in database'
    );
  }
  if (formToAccess.userId !== user.id) {
    throw new FormGenerationError(
      'PERMISSION_DENIED',
      'You do not have permission to view responses for this form'
    );
  }
  
  try {
    // Set up OAuth client
    const oauth2Client = new OAuth2Client({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    });
    oauth2Client.setCredentials({
      access_token: accountInfo?.accessToken,
      refresh_token: accountInfo?.refreshToken
    });
    
    // Get the form structure first
    const googleForms = google.forms({version: "v1", auth: oauth2Client});
    const formStructure = await googleForms.forms.get({
      formId: formId
    });
    
    // Create a map of question IDs to question texts
    const questionMap: Record<string, { title: string }> = {};
    formStructure.data.items?.forEach(item => {
      if (item.questionItem?.question?.questionId) {
        questionMap[item.questionItem.question.questionId] = {
          title: item.title || '',
        };
      }
    });
    
    // Get form responses
    const response = await googleForms.forms.responses.list({
      formId: formId
    });
    
    const responses = response.data.responses;
    
    // Enhance responses with question text
    const enhancedResponses = responses?.map(resp => {
      const enhancedAnswers: { [key: string]: any } = {};
      
      for (const [questionId, answer] of Object.entries(resp.answers || {})) {
        enhancedAnswers[questionId] = {
          ...answer,
          questionText: questionMap[questionId]?.title || 'Unknown Question',
        };
      }
      
      return {
        ...resp,
        enhancedAnswers
      };
    });
    
    
    return {
      responseCount: responses?.length || 0,
      responses: enhancedResponses || []
    };
  } catch (error) {
    console.log(error);
    if (error instanceof FormGenerationError) {
      throw error;
    }
    throw new FormGenerationError(
      'RESPONSE_FETCH_ERROR',
      'Error fetching form responses',
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
}
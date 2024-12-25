'use server'

import { auth, EnrichedSession } from "@/auth"
import { Form, FormGeneratorResponse } from "@/lib/types"
import { users,forms, FormsInsert } from "@/lib/schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';


export const generateFormFromAI = async (userPrompt: string): Promise<FormGeneratorResponse> => {
  const response = await fetch('http://localhost:3000/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userPrompt }),
  })

  const data = await response.json()
  return data
}

export const createGoogleForm = async (formData: FormGeneratorResponse): Promise<Form | null> => {
  const session = (await auth()) as EnrichedSession

  console.log('session', session?.dbUserId)
  console.log('session', users?.dbUserId)
  
  const userId = await db.query.users.findFirst({
    where: eq(users.dbUserId, session.dbUserId as string)
  })





  const oauth2Client = new OAuth2Client({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  })

  oauth2Client.setCredentials({
    access_token: session?.accessToken,
    refresh_token: session?.refreshToken,
  })

  console.log("Session DBUserId", session?.dbUserId)

  if (!session?.dbUserId) return null;
  

  const googleForms = google.forms({version: "v1", auth: oauth2Client})
  const form = await googleForms.forms.create({
    auth: oauth2Client,
    requestBody: {
      info: {
        title: formData?.initialForm?.info?.title,
        description: formData?.initialForm?.info?.description,
      }
    }
  })

  await db.insert(forms).values({
    title: formData?.initialForm?.info.title as string,
    formId: form.data?.formId || '',
    description: formData?.initialForm?.info.description,
    formLink: form.data?.responderUri || '',
    userId: Number(session.dbUserId)
  } as FormsInsert)


  

  if(!form.data) {
    return null
  }


  return form.data as Form

}

export const sendBatchUpdateToGoogleForm = async (formData: FormGeneratorResponse, formId: string): Promise<any> => {
  const session = (await auth()) as EnrichedSession

  

  const oauth2Client = new OAuth2Client({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  })

  oauth2Client.setCredentials({
    access_token: session?.accessToken,
    refresh_token: session?.refreshToken,
  })


  
  const googleForms = google.forms({version: "v1", auth: oauth2Client})
  const response = await googleForms.forms.batchUpdate({
    auth: oauth2Client,
    formId: formId,
    requestBody: {
      includeFormInResponse: true,
      requests: formData.batchUpdate.requests,
    }
  })

  if(!response.data) {
    return null
  }

  

  const editLink = `https://docs.google.com/forms/d/${formId}/edit`

  await db.update(forms).set({
    editFormLink: editLink || '',
  }).where(eq(users?.id, Number(session.dbUserId)))


  return response.data
}
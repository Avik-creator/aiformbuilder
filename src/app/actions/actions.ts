'use server'

import { auth, EnrichedSession } from "@/auth"
import { Form, FormGeneratorResponse } from "@/lib/types"
import { accounts } from "@/lib/schema"
import { eq } from 'drizzle-orm'
import { db } from "@/lib/db"
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
  





  const oauth2Client = new OAuth2Client({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  })

  oauth2Client.setCredentials({
    access_token: session?.accessToken,
    refresh_token: session?.refreshToken,
  })


  

  const forms = google.forms({version: "v1", auth: oauth2Client})
  const form = await forms.forms.create({
    auth: oauth2Client,
    requestBody: {
      
      info: {
        title: formData?.initialForm?.info.title,
      }
    }
  })



  return form.data as Form

}

export const sendBatchUpdateToGoogleForm = async (formData: FormGeneratorResponse, formId: string): Promise<any> => {
  const session = (await auth()) as EnrichedSession
  

  
  

  const response = await fetch(`https://forms.googleapis.com/v1/forms/${formId}:batchUpdate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify({
      includeFormInResponse: true,
      requests: formData.batchUpdate.requests,
    }),
  })
  if (!response.ok) {
    throw new Error('Failed to batch update Google Form')
  }
  return response.json()
}
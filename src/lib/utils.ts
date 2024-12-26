import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { FormGenerationError } from "./error";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getErrorMessage = (error: FormGenerationError) => {
  const errorMessages: Record<string, string> = {
    'AUTH_ERROR': 'Please log in to create forms',
    'USER_NOT_FOUND': 'Unable to verify user account',
    'USER_MISMATCH': 'Authentication error occurred',
    'AI_GENERATION_FAILED': 'Failed to generate form content',
    'GOOGLE_FORM_CREATE_FAILED': 'Unable to create Google Form',
    'GOOGLE_API_ERROR': 'Error connecting to Google Forms',
    'BATCH_UPDATE_FAILED': 'Failed to add questions to form',
    'DB_ERROR': 'Error saving form details',
    'BATCH_UPDATE_ERROR': 'Error updating form',
    'INVALID_RESPONSE': 'Invalid response received from AI',
  };

  return errorMessages[error.code] || 'An unexpected error occurred';
};

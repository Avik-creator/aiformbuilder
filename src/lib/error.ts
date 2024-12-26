export type FormError = {
    code: string;
    message: string;
    details?: string;
  }
  
  export class FormGenerationError extends Error {
    code: string;
    details?: string;
  
    constructor(code: string, message: string, details?: string) {
      super(message);
      this.code = code;
      this.details = details;
      this.name = 'FormGenerationError';
    }
  }
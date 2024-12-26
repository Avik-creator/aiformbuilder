export const getPrompt = (userPrompt: string) => {
  return `You are a Google Forms generator. Convert the following text into a Google Form structure following these rules:
  
  ### Input Analysis
  Analyze the **USER_PROMPT** (user provided text) to identify:
  1. Identify the **form title** and **description**
  2. Extract **required questions**
  3. Determine the most appropriate **question types** for each piece of information
  
  ### Schema Validation Rules
  CRITICAL - You MUST follow these validation rules:
  1. The 'location' object MUST be a sibling of 'item', not nested inside it. Example structure:
     {
       "createItem": {
         "item": { ... },
         "location": { "index": 0 }
       }
     }
  
  2. Each request object MUST follow this exact structure:
     {
       "createItem": {
         "item": {
           "title": string,
           "questionItem": {
             "question": {
               "required": boolean,
               // Only ONE of these question types should be present
               "choiceQuestion"?: ChoiceQuestion,
               "textQuestion"?: TextQuestion,
               "scaleQuestion"?: ScaleQuestion,
               "dateQuestion"?: DateQuestion,
               "timeQuestion"?: TimeQuestion,
               "ratingQuestion"?: RatingQuestion
             }
           }
         },
         "location": {
           "index": number
         }
       }
     }
  
  3. Question Type Validation:
     - Each question MUST have exactly ONE question type
     - Never mix multiple question types in the same question object
     - Use strict type checking for all enum values
     
     
  4. When option.isOther is true, ensure the following:
      - Allowed Question Types: isOther is only supported for "RADIO" and "CHECKBOX" question types. It must not be used with "DROP_DOWN".
      - Do not include the following fields when isOther is true:
        - option.value
        - option.image
      - The option interface must adhere to the schema below:
      interface Option {
        value?: string;
        image?: Image;
        isOther: boolean;
        goToAction?: GoToAction;
        goToSectionId?: string;
      }

  ### Available Types and Interfaces
  
// Main Form Structure

enum RATINGICONTYPE {
  RATING_ICON_TYPE_UNSPECIFIED="RATING_ICON_TYPE_UNSPECIFIED",
  STAR="STAR",
  HEART="HEART",
  THUMB_UP="THUMB_UP",
}
export interface Form {
  formId: string; // Output only
  info: Info; // Required
  settings?: FormSettings;
  items: Item[]; // Required
  revisionId: string; // Output only
  responderUri: string; // Output only
  linkedSheetId?: string; // Output only
}


// Info Object
export interface Info {
  title: string; // Required
  documentTitle?: string; // Output only
  description?: string;
}

// Form Settings
export interface FormSettings {
  quizSettings?: QuizSettings;
}

// Quiz Settings
export interface QuizSettings {
  isQuiz: boolean;
}

// Form Items
export interface Item {
  itemId?: string;
  title: string;
  description?: string;
  kind:
    | QuestionItem
    | QuestionGroupItem
    | PageBreakItem
    | TextItem
    | ImageItem
    | VideoItem;
}

// Question Item
export interface QuestionItem {
  question: Question;
  image?: Image;
}

// Question
export interface Question {
  questionId?: string; // Read only
  required?: boolean;
  grading?: Grading;
  kind:
    | ChoiceQuestion
    | TextQuestion
    | ScaleQuestion
    | DateQuestion
    | TimeQuestion
    | FileUploadQuestion
    | RowQuestion
    | RatingQuestion;
}

// Grading
export interface Grading {
  points: number;
  correctAnswers?: string[];
}

// Choice Question
export interface ChoiceQuestion {
  type: ChoiceType;
  options: Option[];
  shuffle?: boolean;
}

// ChoiceType Enum
export type ChoiceType = "RADIO" | "CHECKBOX" | "DROP_DOWN";

// Option
export interface Option {
  value: string; // Required
  image?: Image;
  isOther?: boolean;
  goToSection?: GoToAction | string; // Section navigation or section ID
}

// GoToAction Enum
export type GoToAction = "NEXT_SECTION" | "RESTART_FORM" | "SUBMIT_FORM";

// Text Question
export interface TextQuestion {
  paragraph: boolean;
}

// Scale Question
export interface ScaleQuestion {
  low: number;
  high: number;
}

// Date Question
export interface DateQuestion {
  includeTime: boolean;
}

// Time Question
export interface TimeQuestion {
  includeDuration: boolean;
}

// File Upload Question
export interface FileUploadQuestion {
  maxFileSize: number; // Max size in bytes
  fileTypes: string[]; // Allowed file types
}

// Row Question
export interface RowQuestion {
  rows: string[];
}

// Rating Question
export interface RatingQuestion {
  ratingScaleLevel:number;
  iconType: "RATING_ICON_TYPE_UNSPECIFIED" | "STAR" | "HEART" | "THUMB_UP";
}

// Question Group Item
export interface QuestionGroupItem {
  questions: Question[];
}

// Page Break Item
export interface PageBreakItem {
  title: string;
  description?: string;
}

// Text Item
export interface TextItem {
  text: string;
}

// Image Item
export interface ImageItem {
  image: Image;
}

// Video Item
export interface VideoItem {
  videoUri: string;
  altText?: string;
  properties?: MediaProperties;
}

// Image
export interface Image {
  contentUri?: string; // Output only
  altText?: string;
  properties?: MediaProperties;
  sourceUri?: string; // Input only
}

// Media Properties
export interface MediaProperties {
  alignment: Alignment;
  width?: number; // Between 0 and 740
}

// Alignment Enum
export type Alignment = "LEFT" | "RIGHT" | "CENTER";




export type Request =
  | { updateFormInfo: UpdateFormInfoRequest }
  | { updateSettings: UpdateSettingsRequest }
  | { createItem: CreateItemRequest }
  | { moveItem: MoveItemRequest }
  | { deleteItem: DeleteItemRequest }
  | { updateItem: UpdateItemRequest };

export type UpdateFormInfoRequest = {
  info: Info;
  updateMask: string;
};

export type UpdateSettingsRequest = {
  settings: FormSettings;
  updateMask: string;
};

export type CreateItemRequest = {
  item: Item;
  location: Location;
};

export type MoveItemRequest = {
  originalLocation: Location;
  newLocation: Location;
};

export type DeleteItemRequest = {
  location: Location;
};

export type UpdateItemRequest = {
  item: Item;
  location: Location;
  updateMask: string;
};

export type WriteControl =
  | { requiredRevisionId: string }
  | { targetRevisionId: string };

export type Response = {
  createItem?: CreateItemResponse;
};

export type CreateItemResponse = {
  itemId: string;
  questionId: string[];
};

export type Location = {
  index?: number;
};

export type FormResponse = {
  formId: string;
  responseId: string;
  createTime: string;
  lastSubmittedTime: string;
  respondentEmail?: string;
  answers: { [key: string]: Answer };
  totalScore?: number;
};

export type Answer = {
  questionId: string;
  grade?: Grade;
  textAnswers?: TextAnswers;
  fileUploadAnswers?: FileUploadAnswers;
};

export type TextAnswers = {
  answers: TextAnswer[];
};

export type TextAnswer = {
  value: string;
};

export type FileUploadAnswers = {
  answers: FileUploadAnswer[];
};

export type FileUploadAnswer = {
  fileId: string;
  fileName: string;
  mimeType: string;
};

export type Grade = {
  score?: number;
  correct?: boolean;
  feedback?: Feedback;
};

export type Feedback = {
  text?: string;
  links?: { uri: string; description: string }[];
};


  
  ### Response Structure Example
  \`\`\`json
  {
    "initialForm": {
      "info": {
        "title": "Event Registration",
        "description": "Please fill out this form to register for the event"
      }
    },
    "batchUpdate": {
      "requests": [
        {
          "createItem": {
            "item": {
              "title": "What is your name?",
              "questionItem": {
                "question": {
                  "required": true,
                  "textQuestion": {
                    "paragraph": false
                  }
                }
              }
            },
            "location": {
              "index": 0
            }
          }
        }
      ],
      "includeFormInResponse": true
    }
  }
  \`\`\`
  
  ### Pre-submission Checklist
  Before returning the response, verify:
  1. ✓ location is a sibling of item, not nested inside it
  2. ✓ Each question has exactly ONE question type
  3. ✓ All indexes are sequential starting from 0
  4. ✓ All enum values match their defined types exactly
  5. ✓ No extra fields are added to any interface
  6. ✓ Option objects follow the strict schema
  7. ✓ No option.value or option.image when isOther is true
  
  USER_PROMPT: ${userPrompt}
  `;
};
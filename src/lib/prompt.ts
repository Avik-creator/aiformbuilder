export const getPrompt = (userPrompt: string) => {
  return `You are a Google Forms generator. Check everything before returning the response. Convert the following text into a Google Form structure following these rules:
  
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

// Enum for Image Alignment
export enum Alignment {
  ALIGNMENT_UNSPECIFIED = "ALIGNMENT_UNSPECIFIED", // Default value, not used
  LEFT = "LEFT", // Left-aligned image
  RIGHT = "RIGHT", // Right-aligned image
  CENTER = "CENTER", // Center-aligned image
}

// Interface for Media Properties of the image
export interface MediaProperties {
  alignment: Alignment; // Alignment of the image
  width: number; // Width of the image (in pixels or percentage depending on context)
}



// Interface for the Image object
export interface Image {
  contentUri: string; // URI to the image content
  altText: string; // Alternative text for the image
  properties: MediaProperties; // Media properties (alignment, width, etc.)
  sourceUri?: string; // Optional field for image source URI (alternative source)
}

export interface Grid {
  columns: ChoiceQuestion[];
  shuffleQuestions?: boolean;
}

export interface QuestionGroupItem {
  questions: Question[];
  image: Image;
  grid: Grid;
}

export enum ChoiceType {
  CHOICE_TYPE_UNSPECIFIED = "CHOICE_TYPE_UNSPECIFIED", // Default value, not used
  RADIO = "RADIO", // Radio buttons: User can only pick one option
  CHECKBOX = "CHECKBOX", // Checkboxes: User can pick any number of options
  DROP_DOWN = "DROP_DOWN", // Drop-down menu: User can select one option from a dropdown
}

export enum GoToAction {
  GO_TO_ACTION_UNSPECIFIED = "GO_TO_ACTION_UNSPECIFIED", // Default value, not used
  NEXT_SECTION = "NEXT_SECTION",
  RESTART_FORM = "RESTART_FORM",
  SUBMIT_FORM = "SUBMIT_FORM",
}

// Option interface for the choices in a question
export interface Option {
  value: string; // The text or value of the option
  image?: Image; // Optional image associated with the option
  isOther: boolean; // Whether this option is an "Other" option
  goToAction?: GoToAction; // Action to go to a specific section (optional)
  goToSectionId?: string; // Section ID to go to (optional)
}

export interface ChoiceQuestion {
  type: ChoiceType; // Type of the choice question (RADIO, CHECKBOX, or DROP_DOWN)
  options: Option[]; // List of options available for the question
  shuffle: boolean; // Whether the options should be shuffled
}

export interface DateQuestion {
  includeTime: boolean;
  includeYear: boolean;
}


// Enum for File Types
export enum FileType {
  FILE_TYPE_UNSPECIFIED = "FILE_TYPE_UNSPECIFIED", // Default value, unused
  ANY = "ANY", // No restrictions on file type
  PRESENTATION = "PRESENTATION", // Google Slides presentation
  SPREADSHEET = "SPREADSHEET", // Google Sheets spreadsheet
  DRAWING = "DRAWING", // Google drawing
  PDF = "PDF", // PDF file
  IMAGE = "IMAGE", // Image file
  VIDEO = "VIDEO", // Video file
  AUDIO = "AUDIO", // Audio file
}

export interface Feedback {
  text: string; // Feedback text
  material?: ExtraMaterial[]; // Additional material for the feedback
}

export interface ExtraMaterial {
  link?: TextLink;
  video?: VideoLink;
}

export interface TextLink {
  uri: string;
  dispalyText: string;
}

export interface VideoLink {
  youtubeUri: string;
  dispalyText: string;
}

export interface CorrectAnswers {
  answers: CorrectAnswer[]; // Array of correct answers
}

// CorrectAnswer interface
export interface CorrectAnswer {
  value: string; // Correct answer
}

export interface Grading {
  pointValue: number; // Points assigned to the question
  correctAnswers: CorrectAnswers; // Correct answers for the question
  whenRight?: Feedback; // Feedback when the answer is correct
  whenWrong?: Feedback; // Feedback when the answer is incorrect
  generalFeedback?: Feedback; // General feedback, regardless of the correctness
}

export interface QuestionItem {
  question: Question;
  image?: Image;
}

export interface Question {
  questionId: string;
  required: boolean;
  grading?: Grading;

  // Union field kind: One of the following question types
  kind: ChoiceQuestion | TextQuestion | ScaleQuestion | DateQuestion | TimeQuestion | RowQuestion | RatingQuestion;
}

export interface RatingQuestion {
  ratingScaleLevel: number;
  iconType: RatingIconType;
}

export enum RatingIconType {
  STAR = "STAR",
  HEART = "HEART",
  THUMB_UP = "THUMB_UP",
  RATING_ICON_TYPE_UNSPECIFIED = "RATING_ICON_TYPE_UNSPECIFIED",
}

export interface RowQuestion {
  title: string;
}

export interface ScaleQuestion {
  low: number; minimum: 2
  high: number maximum: 10;
  lowLabel?: string;
  highLabel?: string;
}

export interface TextQuestion {
  paragraph: boolean;
}

export interface TimeQuestion {
  duration: boolean;
}

export interface Form {
  formId: string;
  info: FormInfo;
  settings: FormSettings;
  items: FormItem[];
  revisionId: string;
  responderUri: string;
  linkedSheetId?: string; // Optional as not all forms will have linked sheets
}

interface FormInfo {
  title: string;
  documentTitle: string;
  description?: string;
}

interface QuizSettings {
  isQuiz: boolean;
}
interface FormSettings {
  quizSettings?: QuizSettings;
}

interface FormItem {
  itemId: string;
  title: string;
  description?: string;

  kind: FormItemKind;
}

// Enum for the different types of form items
export type FormItemKind = { questionItem: QuestionItem } | { questionGroupItem: QuestionGroupItem } | { pageBreakItem: {} } | { textItem: {} } | { imageItem: ImageItem } | { videoItem: VideoItem };

interface ImageItem {
  image: Image;
}

export interface Video {
  youtubeUri: string;
  properties: MediaProperties;
}

interface VideoItem {
  video: Video;
  caption: string;
}



export type WriteControl =
  | { requiredRevisionId: string }
  | { targetRevisionId: string };
  
  ### Response Structure Example
  \`\`\`json
  {
    "initialForm": {
      "info": {
        "title": "Event Registration",
        "description": "Please fill out this form to register for the event",
        "documentTitle": "Event Registration Form",
      }
    },
    "batchUpdate": {
      "requests": [
        {
        "updateFormInfo: {
          "info":{
            "description": "Please fill out this form to register for the event",
            "documentTitle": "Event Registration Form",
          },
          "updateMask": "description,documentTitle"
        },
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
  8. ✓ Don't include file Upload Type Questions in the form
  9. ✓ Check for any missing or incorrect fields
  10. ✓ Ensure that all the required fields are there.
  
  USER_PROMPT: ${userPrompt}
  `;
};
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

export interface createGoogleFormResponse{
  Form: Form | null;
  message?: string;
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


export type BatchUpdateFormRequest = {
  includeFormInResponse?: boolean;
  requests: Request[];
  writeControl?: WriteControl;
};

export type BatchUpdateFormResponse = {
  form?: Form;
  replies: Response[];
  writeControl?: WriteControl;
};

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

export interface FormGeneratorResponse {
  initialForm: Form;
  batchUpdate: BatchUpdateFormRequest;
}
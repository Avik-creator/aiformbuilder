// Enums
export enum ChoiceType {
    CHOICE_TYPE_UNSPECIFIED = 0,
    RADIO = 1,
    CHECKBOX = 2,
    DROP_DOWN = 3,
  }
  
  export enum GoToAction {
    GO_TO_ACTION_UNSPECIFIED = 0,
    NEXT_SECTION = 1,
    RESTART_FORM = 2,
    SUBMIT_FORM = 3,
  }
  
  // Simple Interfaces
  export interface Info {
    title: string;
    documentTitle?: string;
    description?: string;
  }
  
  export interface FormSettings {
    quizSettings?: QuizSettings;
  }
  
  export interface QuizSettings {
    isQuiz?: boolean;
  }
  
  // Discriminated Union for Item
  export type Item = "QuestionItem" | "PageBreakItem" | "TextItem" | "ImageItem" | "VideoItem" | "QuestionGroupItem";
  
  // Example of a specific Item type
  export interface QuestionItem {
    itemId?: string;
    title?: string;
    description?: string;
    questionItem: QuestionItemContent;
  }
  
  export interface QuestionItemContent {
    question: Question;
    image?: Image;
  }
  
  // Example of a Question type
  export type Question = "ChoiceQuestion" | "TextQuestion" | "ScaleQuestion" | "DateQuestion" | "TimeQuestion" | "FileUploadQuestion" | "RowQuestion" | "RatingQuestion";
  
  // Example of ChoiceQuestion
  export interface ChoiceQuestion {
    type: ChoiceType;
    options: Option[];
    shuffle?: boolean;
  }
  
  // Option interface
  export interface Option {
    value: string;
    image?: Image;
    isOther?: boolean;
    go_to_section?: GoToAction | string; // Union of GoToAction or string
  }
  
  // Media Properties
  export interface MediaProperties {
    alignment?: Alignment;
    width?: number;
  }
  
  // Enums for Alignment
  export enum Alignment {
    ALIGNMENT_UNSPECIFIED = 0,
    LEFT = 1,
    RIGHT = 2,
    CENTER = 3,
  }
  
  // Image interface
  export interface Image {
    contentUri?: string;
    altText?: string;
    properties?: MediaProperties;
    sourceUri?: string;
  }
  
  // Form interface
  export interface Form {
    formId?: string;
    info?: Info;
    settings?: FormSettings;
    items?: Item[];
    revisionId?: string;
    responderUri?: string;
    linkedSheetId?: string;
  }
  
  // Request and Response Types
  // Example of a Request
  export type Request = "UpdateFormInfoRequest" | "UpdateSettingsRequest" | "CreateItemRequest" | "MoveItemRequest" | "DeleteItemRequest" | "UpdateItemRequest";
  
  // CreateItemRequest
  export interface CreateItemRequest {
    item: Item;
    location: Location;
  }
  
  // Location interface
  export interface Location {
    index?: number;
  }
  
  // WriteControl interface
  export interface WriteControl {
    requiredRevisionId?: string;
    targetRevisionId?: string;
  }
  
  // BatchUpdateFormRequest
  export interface BatchUpdateFormRequest {
    includeFormInResponse?: boolean;
    requests: Request[];
    writeControl?: WriteControl;
  }
  
  // BatchUpdateFormResponse
  export interface BatchUpdateFormResponse {
    form?: Form;
    replies?: Response[];
    writeControl?: WriteControl;
  }
  
  // Response type
  export type Response = CreateItemResponse;
  
  // CreateItemResponse
  export interface CreateItemResponse {
    itemId: string;
    questionId?: string[];
  }
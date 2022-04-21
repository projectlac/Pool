export type SurveyStatus = '0' | '1' | '2';
export interface QuestionResponse {
  id: string;
  surveyId: string;
  questionType: string;
  typeOfQuetions: string;
  imageUploadUrl: string;
  questionCaption: string;
  numberOfAnswer: string;
  answers: Answer[];
}

export interface Answer {
  id?: string;
  answerStr: string;
}
export interface Survey {
  id: string;
  name: string;
  description: string;
  duration: string;
  startSurveyDate: string;
  endSurveyDate: string;
  numberOfQuestion: string;
  questionResponse: QuestionResponse[];
  headerWelcome: string;
  bodyWelcome: string;
  headerThankyou: string;
  bodyThankyou: string;
  headerExpired: string;
  bodyExpired: string;
  surveyStatus: SurveyStatus;
  createdDate: string;
  updatedDate: string;
}

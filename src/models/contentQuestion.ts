export interface ContentQuestion {
  questionType: string;
  typeOfQuestion: string;
  imageUploadUrl?: string;
  questionCaption: string;
  numberOfAnswer: string;
  answers?: Answer[];
  lstAnswers?: string[];
  id?: string;
  surveyId?: string;
  file?: File | undefined;
}

export interface Answer {
  answerStr: string;
  id?: string;
}

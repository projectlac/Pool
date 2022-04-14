export type SurveyStatus = 'publish' | 'draft';

export interface Survey {
  id: string;
  status: SurveyStatus;
  surveyName: string;
  lastUpdate: number;
  duration : string;
}

import { PromiseApi } from 'src/models';
import axiosFormDataClient from './axiosFormDataClient';

import axiosJsonClient from './axiosJsonClient';
const surveyApi = {
  add(params: FormData): Promise<PromiseApi> {
    return axiosFormDataClient.post('Surveys/create-survey', params);
  },

  getList(): Promise<PromiseApi> {
    return axiosJsonClient.get('Surveys/list-survey');
  }
};
export default surveyApi;

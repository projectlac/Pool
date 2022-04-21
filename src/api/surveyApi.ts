import { PromiseApi } from 'src/models';
import axiosFormDataClient from './axiosFormDataClient';

import axiosJsonClient from './axiosJsonClient';
const surveyApi = {
  add(params: FormData): Promise<PromiseApi> {
    return axiosFormDataClient.post('Surveys/create-survey', params);
  },
  getData(page: number, index: number): Promise<PromiseApi> {
    return axiosJsonClient.get(
      `Surveys/list-survey?pageSize=${page}&pageIndex=${index}`
    );
  },
  getDataById(param: string): Promise<PromiseApi> {
    return axiosJsonClient.get(`Surveys/get-survey-by-id?surveyId=${param}`);
  },
  update(params: FormData): Promise<PromiseApi> {
    return axiosFormDataClient.put('Surveys/update-survey', params);
  },
  delete(param: string): Promise<PromiseApi> {
    return axiosFormDataClient.delete(
      `Surveys/delete-survey?surveyId=${param}`
    );
  }
};
export default surveyApi;

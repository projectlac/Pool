import { PromiseApi } from 'src/models';

import axiosJsonClient from './axiosJsonClient';
const surveyApi = {
 
  getList(): Promise<PromiseApi> {
    return axiosJsonClient.get('Surveys/list-survey');
  },
  
};
export default surveyApi;

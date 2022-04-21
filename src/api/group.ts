import { PromiseApi } from 'src/models';
import axiosFormDataClient from './axiosFormDataClient';

import axiosJsonClient from './axiosJsonClient';
const groupApi = {
  add(params: FormData): Promise<PromiseApi> {
    return axiosFormDataClient.post('Groups/create-Group', params);
  },
  getData(page: number, index: number): Promise<PromiseApi> {
    return axiosJsonClient.get(
      `Groups/list-Group?pageSize=${page}&pageIndex=${index}`
    );
  },
  getDataById(param: string): Promise<PromiseApi> {
    return axiosJsonClient.get(`Groups/get-Group-by-id?GroupId=${param}`);
  },
  update(params: FormData): Promise<PromiseApi> {
    return axiosFormDataClient.put('Groups/update-Group', params);
  },
  delete(param: string): Promise<PromiseApi> {
    return axiosFormDataClient.delete(`Groups/delete-Group?GroupId=${param}`);
  }
};
export default groupApi;

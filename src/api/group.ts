import { PromiseApi } from 'src/models';
import axiosFormDataClient from './axiosFormDataClient';

import axiosJsonClient from './axiosJsonClient';
const groupApi = {
  add(params: FormData): Promise<PromiseApi> {
    return axiosFormDataClient.post('Group/create-Group', params);
  },
  getData(page: number, index: number): Promise<PromiseApi> {
    return axiosJsonClient.get(
      `Group/list-Group?pageSize=${page}&pageIndex=${index}`
    );
  },
  getDataById(param: string): Promise<PromiseApi> {
    return axiosJsonClient.get(`Group/get-Group-by-id?GroupId=${param}`);
  },
  update(params: FormData): Promise<PromiseApi> {
    return axiosFormDataClient.put('Group/update-Group', params);
  },
  delete(param: string): Promise<PromiseApi> {
    return axiosFormDataClient.delete(`Group/delete-Group?GroupId=${param}`);
  }
};
export default groupApi;

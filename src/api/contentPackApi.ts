import { Update } from '@mui/icons-material';
import { ContentPackParams, PromiseApi } from 'src/models';

import axiosFormDataClient from './axiosFormDataClient';
import axiosJsonClient from './axiosJsonClient';
const contentPackApi = {
  add(params: FormData): Promise<PromiseApi> {
    return axiosFormDataClient.post('ContentPacks/create-content-pack', params);
  },
  getData(page: number, index: number): Promise<PromiseApi> {
    return axiosJsonClient.get(
      `ContentPacks/list-content-pack?pageSize=${page}&pageIndex=${index}`
    );
  },
  getDataById(param: string): Promise<PromiseApi> {
    return axiosJsonClient.get(
      `ContentPacks/get-content-pack-by-id?contentPackId=${param}`
    );
  },
  update(params: FormData): Promise<PromiseApi> {
    return axiosFormDataClient.put('ContentPacks/update-content-pack', params);
  },
  delete(param: string): Promise<PromiseApi> {
    return axiosFormDataClient.delete(
      `ContentPacks/delete-content-pack?contentPackId=${param}`
    );
  }
};
export default contentPackApi;

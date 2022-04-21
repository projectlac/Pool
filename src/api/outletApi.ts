import { PromiseApi } from 'src/models';
import axiosFormDataClient from './axiosFormDataClient';

import axiosJsonClient from './axiosJsonClient';
const outletApi = {
  add(params: FormData): Promise<PromiseApi> {
    return axiosFormDataClient.post('Outlets/create-outlet', params);
  },
  getData(page: number, index: number): Promise<PromiseApi> {
    return axiosJsonClient.get(
      `Outlets/list-Outlet?pageSize=${page}&pageIndex=${index}`
    );
  },
  getDataById(param: string): Promise<PromiseApi> {
    return axiosJsonClient.get(`Outlets/get-Outlet-by-id?OutletId=${param}`);
  },
  update(params: FormData): Promise<PromiseApi> {
    return axiosFormDataClient.put('Outlets/update-Outlet', params);
  },
  delete(param: string): Promise<PromiseApi> {
    return axiosFormDataClient.delete(
      `Outlets/delete-Outlet?OutletId=${param}`
    );
  }
};
export default outletApi;

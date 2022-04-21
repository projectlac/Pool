import { PromiseApi } from 'src/models';
import axiosFormDataClient from './axiosFormDataClient';

import axiosJsonClient from './axiosJsonClient';
const outletApi = {
  add(params: FormData): Promise<PromiseApi> {
    return axiosFormDataClient.post('Outlet/create-outlet', params);
  },
  getData(page: number, index: number): Promise<PromiseApi> {
    return axiosJsonClient.get(
      `Outlet/list-Outlet?pageSize=${page}&pageIndex=${index}`
    );
  },
  getDataById(param: string): Promise<PromiseApi> {
    return axiosJsonClient.get(`Outlet/get-Outlet-by-id?OutletId=${param}`);
  },
  update(params: FormData): Promise<PromiseApi> {
    return axiosFormDataClient.put('Outlet/update-Outlet', params);
  },
  delete(param: string): Promise<PromiseApi> {
    return axiosFormDataClient.delete(`Outlet/delete-Outlet?OutletId=${param}`);
  }
};
export default outletApi;

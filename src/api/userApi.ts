import { PromiseApi } from 'src/models';
import { UserParams } from 'src/models/user';
import axiosJsonClient from './axiosJsonClient';
const userApi = {
  getList(page: number, index: number): Promise<PromiseApi> {
    return axiosJsonClient.get(
      `Users/list-user?pageSize=${page}&pageIndex=${index}`
    );
  },
  getUserById(id: string): Promise<PromiseApi> {
    return axiosJsonClient.get(`Users/get-user-by-id?userId=${id}`);
  },
  addUser(param: UserParams): Promise<PromiseApi> {
    return axiosJsonClient.post(`Users/register`, param);
  },
  editUser(param: any): Promise<PromiseApi> {
    return axiosJsonClient.put('Users/update-user', param);
  },
  deleteUser(params: string[]): Promise<PromiseApi> {
    return axiosJsonClient.delete(`Users/delete-user`, { params: params });
  },
  logOut(): Promise<PromiseApi> {
    return axiosJsonClient.post('Users/logout');
  },
  getAudit(param: number): Promise<PromiseApi> {
    return axiosJsonClient.get(`Users/audit-trail?numberDays=${param}`);
  }
};
export default userApi;

import axiosJsonClient from './axiosJsonClient';
const userApi = {
  getList(): Promise<any> {
    return axiosJsonClient.get('Users/list-user');
  },
  getUserById(id: string): Promise<any> {
    return axiosJsonClient.get(`Users/get-user-by-id?userId=${id}`);
  },
  addUser(param: any): Promise<any> {
    return axiosJsonClient.post(`Users/register`, param);
  },
  editUser(param: any): Promise<any> {
    return axiosJsonClient.put('Users/update-user', param);
  },
  deleteUser(id: string): Promise<any> {
    return axiosJsonClient.delete(`Users/delete-user?userId=${id}`);
  },
  logOut(): Promise<any> {
    return axiosJsonClient.post('Users/logout');
  }
};
export default userApi;

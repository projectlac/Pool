import { LoginForm } from '../models/';
import axiosClient from './axiosClient';
import axiosUserClient from './axiosUserClient';

const loginApi = {
  login(params: LoginForm): Promise<any> {
    const url = '/Users/login';
    return axiosClient.post(url, params);
  },
  addFacadeA(body: any): Promise<any> {
    const url = '/ScreenSavers/create-screen-saver-facade-a';
    return axiosUserClient.post(url, body);
  },
  getFacadeA(id: string): Promise<any> {
    return axiosUserClient.get(
      `/ScreenSavers/get-screen-saver?stationId=${id}`
    );
  },
  getFacadeAById(stationId: string, id: string): Promise<any> {
    return axiosUserClient.get(
      `/ScreenSavers/get-screen-saver-by-id?stationId=${stationId}&id=${id}`
    );
  },

  editFacadeAById(body: any): Promise<any> {
    const url = '/ScreenSavers/update-screen-saver-facade-a';
    return axiosUserClient.put(url, body);
  },
  getAudit(): Promise<any> {
    return axiosUserClient.get('Users/audit-trial');
  }
};
export default loginApi;

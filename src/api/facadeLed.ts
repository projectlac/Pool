import { LoginForm } from '../models';
import axiosClient from './axiosClient';
import axiosUserClient from './axiosUserClient';

const facadeLed = {
  getLed(id: string): Promise<any> {
    return axiosUserClient.get(
      `/ScreenSavers/get-led-screen-saver?stationId=${id}`
    );
  },
  getLedById(stationId: string, id: string): Promise<any> {
    return axiosUserClient.get(
      `/ScreenSavers/get-led-screen-saver-by-id?stationId=${stationId}&id=${id}`
    );
  },

  editLedById(body: any): Promise<any> {
    const url = '/ScreenSavers/update-led-screen-saver';
    return axiosUserClient.put(url, body);
  }
};
export default facadeLed;

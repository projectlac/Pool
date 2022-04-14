import axiosUserClient from './axiosUserClient';
const corridorBApi = {
  addCorridorB(body: any): Promise<any> {
    const url = '/ScreenSavers/create-screen-saver-corridor-b';
    return axiosUserClient.post(url, body);
  },
  editCorridorB(body: any): Promise<any> {
    const url = '/ScreenSavers/update-screen-saver-corridor-b';
    return axiosUserClient.put(url, body);
  },
  getCorridorBById(stationId:string, id: number): Promise<any> {
    const url = `/ScreenSavers/get-screen-saver-by-id?stationId=${stationId}&id=${id}`;
    return axiosUserClient.get(url);
  },
  getCorridorB(id: string): Promise<any> {
    return axiosUserClient.get(
      `/ScreenSavers/get-screen-saver?stationId=${id}`
    );
  },
};
export default corridorBApi;
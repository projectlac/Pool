import axiosUserClient from './axiosUserClient';
const hostpot = {
  getHotspot(): Promise<any> {
    const url = '/Admins/get-station-host-pot';
    return axiosUserClient.get(url);
  },

  getHotspotById(id: number): Promise<any> {
    const url = `/Admins/get-station-hostpot-by-id?id=${id}`;
    return axiosUserClient.get(url);
  },
  editHotspot(body: any): Promise<any> {
    return axiosUserClient.put(
      '/Admins/update-station-hostpot', body
    );
  }
};
export default hostpot;

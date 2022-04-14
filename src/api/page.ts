import axiosUserClient from './axiosUserClient';
const page = {
  getPage(): Promise<any> {
    const url = '/Admins/get-station-page';
    return axiosUserClient.get(url);
  },

  getPageById(id: number): Promise<any> {
    const url = `/Admins/get-station-page-by-id?id=${id}`;
    return axiosUserClient.get(url);
  },
  editPage(body: any): Promise<any> {
    return axiosUserClient.put(
      '/Admins/update-station-page', body
    );
  }
};
export default page;

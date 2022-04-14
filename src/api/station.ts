
import axiosUserClient from './axiosUserClient';
const station = {
  
  getSation(): Promise<any> {
    return axiosUserClient.get('Players/get-station-1');
  },
  getSation2(): Promise<any> {
    return axiosUserClient.get('Players/get-station-2');
  }
};
export default station;

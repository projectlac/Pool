import { LoginForm } from '../models/';
import axiosClient from './axiosClient';

const loginApi = {
  login(params: LoginForm): Promise<any> {
    const url = '/Users/login';
    return axiosClient.post(url, params);
  }
 
};
export default loginApi;

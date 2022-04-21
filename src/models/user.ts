export interface User {
  id: string;
  status: string;
  email: string;
  role: string;
  createdDate: string;
  updatedDate: string;
}

export interface UserParams {
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

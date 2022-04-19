export interface User {
  id: string;
  userName: string;
  email:string;
  role: string;
  createdDate: string;
  updatedDate: string;
}

export interface UserParams{
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

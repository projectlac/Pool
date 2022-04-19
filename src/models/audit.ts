export interface Audit {
  id: string;
  userId: string;
  fullName: string;
  action: string;
  detail: string;
  createdDate: string;
  updatedDate: string;
  user: string | null;
}

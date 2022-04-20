export interface PromiseApi {
  success: boolean;
  data: any;
  message?: string;
}
export interface ContentPackParams {
  name: string;
  description: string;
  numberOfContent: number;
  contentPackStatus: number;
  contentUpload: contentUpload[];
}

export interface contentUpload {
  fileUpload: File;
  duration: number;
  seq: number;
}

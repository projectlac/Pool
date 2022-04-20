export type CryptoOrderStatus = 'Ongoing' | 'Draft';

export interface CryptoOrder {
  id: string;
  name: string;
  contentPackStatus: CryptoOrderStatus;
  description?: string;
  numberOfContent: number;
  contentUploads: number;
  createdDate: string;
  updatedDate: string;
}

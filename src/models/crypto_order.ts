export type CryptoOrderStatus = 'publish' | 'draft';

export interface CryptoOrder {
  id: string;
  status: CryptoOrderStatus;
  contentPackName: string;
  lastUpdate: number;

  numberOfContent: number;
}

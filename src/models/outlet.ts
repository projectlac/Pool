export interface Outlet {
  id: string;
  outletName: string;
  contentPackNameAssigned: string;
  surveyNameAssigned: string;
  groupAssigned: string;
  lastUpdated: string;
}
export interface OutletElement {
  OutletName: string;
  id: string;
}
export interface DataColumns {
  [key: string]: ItemOutlet;
}
export interface ItemOutlet {
  title: string;
  items: OutletElement[];
}
export interface Room {
  id: number;
  name: string;
  price: {
    value: number;
    currencyCode: string;
  };
  availabilityStatus?: string;
  checkedPrice?: {
    value: number;
    currencyCode: string;
  };
}

export type SearchParams = {
  sorting?: string;
  sortorder?: string;
  page?: string;
};

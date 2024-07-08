export interface SubItem {
  id: number;
  name: string;
}

export interface DataItem {
  id: number;
  category: string;
  name: string;
  items: SubItem[];
}

export interface Country {
  name: string;
  region: string;
  area: number;
}

export interface Column {
  id: 'name' | 'region' | 'area';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}
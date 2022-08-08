import { Column } from '../types/country';

export const columns: readonly Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'region', label: 'Region', minWidth: 100 },
  {
    id: 'area',
    label: 'Area',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
];

export const fields: readonly String[] = [ 'name','region','area' ];

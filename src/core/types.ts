export interface TableColumn {
  key: string;
  label: string;
  type?: 'string' | 'number' | 'boolean' | 'date' | 'select' | 'actions' | string;
  options?: (string | { label: string; value: string | number })[];
  editable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (row: DataRow) => any;
  editRender?: (row: DataRow, onChange: (val: any) => void) => any;
}

export interface TableConfig {
  pagination?: boolean;
  pageSize?: number;
  selection?: boolean;
  density?: 'Compact' | 'Normal' | 'Spacious';
  expandable?: boolean;
}

export interface DataRow {
  id: number | string;
  [key: string]: any;
}

export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  key: string;
  direction: SortDirection;
}

export interface TableStyles {
  background?: string;
  color?: string;
  borderColor?: string;
  borderRadius?: string;
  headerBackground?: string;
  rowHoverBackground?: string;
  primaryColor?: string;
  textColorSecondary?: string;
}

export type CellType = 'string' | 'number' | 'boolean' | 'date' | 'select' | 'actions' | 'custom';

export interface BaseColumn<T = any> {
  key: keyof T | 'actions';
  label: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  editable?: boolean;
  sortable?: boolean;
  render?: (row: T) => any;
  editRender?: (row: T, onChange: (val: any) => void) => any;
}

export interface StringColumn<T = any> extends BaseColumn<T> {
  type?: 'string';
}

export interface NumberColumn<T = any> extends BaseColumn<T> {
  type: 'number';
  min?: number;
  max?: number;
  step?: number;
}

export interface BooleanColumn<T = any> extends BaseColumn<T> {
  type: 'boolean';
}

export interface DateColumn<T = any> extends BaseColumn<T> {
  type: 'date';
}

export interface SelectColumn<T = any> extends BaseColumn<T> {
  type: 'select';
  options: (string | { label: string; value: string | number })[];
}

export interface ActionColumn<T = any> extends BaseColumn<T> {
  type: 'actions';
}

export interface CustomColumn<T = any> extends BaseColumn<T> {
  type: 'custom';
}

export interface StatusColumn<T = any> extends BaseColumn<T> {
  type: 'status';
}

export interface ProgressColumn<T = any> extends BaseColumn<T> {
  type: 'progress';
}

export interface AvatarColumn<T = any> extends BaseColumn<T> {
  type: 'avatar';
}

export interface CurrencyColumn<T = any> extends BaseColumn<T> {
  type: 'currency';
}

export interface BadgeColumn<T = any> extends BaseColumn<T> {
  type: 'badge';
}

export type TableColumn<T = any> = 
  | StringColumn<T> 
  | NumberColumn<T> 
  | BooleanColumn<T> 
  | DateColumn<T> 
  | SelectColumn<T> 
  | ActionColumn<T>
  | CustomColumn<T>
  | StatusColumn<T>
  | ProgressColumn<T>
  | AvatarColumn<T>
  | CurrencyColumn<T>
  | BadgeColumn<T>;

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

// Utility type helper for defining columns with autocomplete
export function defineColumns<T>(columns: TableColumn<T>[]): TableColumn<T>[] {
    return columns;
}


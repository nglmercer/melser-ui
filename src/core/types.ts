export type CellType = 'string' | 'number' | 'boolean' | 'date' | 'select' | 'actions' | 'custom';

export interface BaseColumn<T = unknown> {
  key: keyof T | 'actions';
  label: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  editable?: boolean;
  sortable?: boolean;
  render?: (row: T) => unknown;
  editRender?: (row: T, onChange: (val: unknown) => void) => unknown;
}

export interface StringColumn<T = unknown> extends BaseColumn<T> {
  type?: 'string';
}

export interface NumberColumn<T = unknown> extends BaseColumn<T> {
  type: 'number';
  min?: number;
  max?: number;
  step?: number;
}

export interface BooleanColumn<T = unknown> extends BaseColumn<T> {
  type: 'boolean';
}

export interface DateColumn<T = unknown> extends BaseColumn<T> {
  type: 'date';
}

export interface SelectColumn<T = unknown> extends BaseColumn<T> {
  type: 'select';
  options: (string | { label: string; value: string | number })[];
}

export interface ActionColumn<T = unknown> extends BaseColumn<T> {
  type: 'actions';
  component?: string;
}


export interface CustomColumn<T = unknown> extends BaseColumn<T> {
  type: 'custom';
}

export interface StatusColumn<T = unknown> extends BaseColumn<T> {
  type: 'status';
}

export interface ProgressColumn<T = unknown> extends BaseColumn<T> {
  type: 'progress';
}

export interface AvatarColumn<T = unknown> extends BaseColumn<T> {
  type: 'avatar';
}

export interface CurrencyColumn<T = unknown> extends BaseColumn<T> {
  type: 'currency';
}

export interface BadgeColumn<T = unknown> extends BaseColumn<T> {
  type: 'badge';
}

export type TableColumn<T = unknown> = 
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
  [key: string]: unknown;
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

export interface PaginationState {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext?: boolean;
    hasPrev?: boolean;
}


// Utility type helper for defining columns with autocomplete
export function defineColumns<T>(columns: TableColumn<T>[]): TableColumn<T>[] {
    return columns;
}

// Event Detail Types
export interface RowSaveDetail {
    id: string | number;
    data: DataRow;
}

export interface SelectionDetail {
    selectedIds: (string | number)[];
}

export interface RowActionDetail {
    action: 'view' | 'delete' | 'edit' | 'save' | 'cancel' | string;
    id?: string | number;
    row?: DataRow;
}

export interface RowSelectDetail {
    id: string | number;
    selected: boolean;
}

export interface RowExpandDetail {
    id: string | number;
}

export interface CellChangeDetail {
    key?: string;
    value: unknown;
}


import type { RowSaveDetail, RowActionDetail, RowSelectDetail, RowExpandDetail, CellChangeDetail, SelectionDetail } from '../core/types';

/**
 * Constantes con todos los nombres de eventos CustomEvent utilizados en los componentes Melser UI
 */
export const M_EVENTS = {
  // Eventos de tabla
  ROW_SAVE: 'row-save',
  ROW_ACTION: 'row-action',
  ROW_EXPAND: 'row-expand',
  ROW_SELECT: 'row-select',
  SELECTION_CHANGE: 'selection-change',
  CELL_CHANGE: 'cell-change',
  CELL_EDIT_COMPLETE: 'cell-edit-complete',
  TABLE_ACTION: 'table-action',
  PAGE_CHANGE: 'page-change',
  
  // Eventos de formulario
  SUBMIT: 'submit',
  PLAYGROUND_SUBMIT: 'playground:submit',
  
  // Eventos de entrada base
  UI_CHANGE: 'ui:change',
  CHANGE: 'change'
} as const;

/**
 * Tipo que representa todos los nombres de eventos posibles
 */
export type MelserEventName = keyof typeof M_EVENTS;

// Tipos de eventos específicos para autocompletado y type safety
export interface RowSaveEvent extends CustomEvent<RowSaveDetail> {}
export interface RowActionEvent extends CustomEvent<RowActionDetail> {}
export interface RowSelectEvent extends CustomEvent<RowSelectDetail> {}
export interface RowExpandEvent extends CustomEvent<RowExpandDetail> {}
export interface SelectionChangeEvent extends CustomEvent<SelectionDetail> {}
export interface CellChangeEvent extends CustomEvent<CellChangeDetail> {}
export interface CellEditCompleteEvent extends CustomEvent<{ value: unknown }> {}
export interface TableActionEvent extends CustomEvent<RowActionDetail> {}
export interface SubmitEvent extends CustomEvent<{ data: any }> {}
export interface PlaygroundSubmitEvent extends CustomEvent<{ data: any; isValid: boolean }> {}
export interface UiChangeEvent extends CustomEvent<any> {}
export interface ChangeEvent extends CustomEvent<any> {}
export interface PageChangeEvent extends CustomEvent<{ page: number; pageSize: number }> {}

// Mapeo de eventos para type guards y autocompletado
export interface MelserEventMap {
  [M_EVENTS.ROW_SAVE]: RowSaveEvent;
  [M_EVENTS.ROW_ACTION]: RowActionEvent;
  [M_EVENTS.ROW_EXPAND]: RowExpandEvent;
  [M_EVENTS.ROW_SELECT]: RowSelectEvent;
  [M_EVENTS.SELECTION_CHANGE]: SelectionChangeEvent;
  [M_EVENTS.CELL_CHANGE]: CellChangeEvent;
  [M_EVENTS.CELL_EDIT_COMPLETE]: CellEditCompleteEvent;
  [M_EVENTS.TABLE_ACTION]: TableActionEvent;
  [M_EVENTS.SUBMIT]: SubmitEvent;
  [M_EVENTS.PLAYGROUND_SUBMIT]: PlaygroundSubmitEvent;
  [M_EVENTS.UI_CHANGE]: UiChangeEvent;
  [M_EVENTS.CHANGE]: ChangeEvent;
  [M_EVENTS.PAGE_CHANGE]: PageChangeEvent;
}

// Helper type para obtener el tipo correcto del evento
export type MelserEventType<T extends MelserEventName> = MelserEventMap[typeof M_EVENTS[T]];

// Type guard functions
export function isRowSaveEvent(event: Event): event is RowSaveEvent {
  return event.type === M_EVENTS.ROW_SAVE;
}

export function isRowActionEvent(event: Event): event is RowActionEvent {
  return event.type === M_EVENTS.ROW_ACTION;
}

export function isSelectionChangeEvent(event: Event): event is SelectionChangeEvent {
  return event.type === M_EVENTS.SELECTION_CHANGE;
}

export function isCellChangeEvent(event: Event): event is CellChangeEvent {
  return event.type === M_EVENTS.CELL_CHANGE;
}
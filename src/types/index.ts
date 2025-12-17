export type MelserDataType = 'string' | 'number' | 'boolean' | 'array' | 'date' | 'object';

export interface InputData<T = unknown> {
    name: string;
    value: T;
    isValid: boolean;
    componentType: string;
    dataType: MelserDataType;
}

export interface SelectOption {
    label: string;
    value: string;
    group?: string;
    disabled?: boolean;
    [key: string]: unknown;
}

// Re-exportar constantes y tipos de eventos
export * from './events';

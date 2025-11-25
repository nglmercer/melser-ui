export type MelserDataType = 'string' | 'number' | 'boolean' | 'array' | 'date' | 'object';

export interface InputData<T = any> {
    name: string;
    value: T;
    isValid: boolean;
    componentType: string;
    dataType: MelserDataType;
}

export interface SelectOption {
    label: string;
    value: string;
}

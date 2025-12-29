import type { TableColumn, DataRow, ActionColumn } from "@/core/types";

// --- Interfaces de Configuración ---

export interface ColumnDetector {
    /** Función para determinar si esta configuración aplica a una columna (por llave o valor) */
    match: (key: string, value: any) => boolean;
    /** Configuración a aplicar si hay match */
    config: Partial<TableColumn<any>>;
}

export interface MapOptions<T> {
    /**
     * Si true, agrega una columna de acciones al final.
     * @default true
     */
    includeActions?: boolean;
    
    /**
     * Configuración base para la columna de acciones si includeActions es true.
     */
    actionsConfig?: Partial<ActionColumn<T>>;

    /**
     * Configuración específica por columna (clave).
     * Tiene la mayor precedencia.
     */
    overrides?: Partial<Record<keyof T | 'actions', Partial<TableColumn<T>>>>;
    
    /**
     * Si true, intenta deducir tipos basados en el valor (Date, boolean, number, etc).
     * @default true
     */
    autoDiscover?: boolean;
    
    /**
     * Lista de llaves a excluir.
     * @default []
     */
    excludeKeys?: string[];
    
    /**
     * Valores por defecto para asegurar que ciertas columnas existan aunque el dato venga vacío.
     */
    defaults?: Partial<Record<keyof T, any>>;

    /**
     * Detectores personalizados para aplicar configuraciones según patrones de nombre o valor.
     * Se evalúan en orden.
     */
    detectors?: ColumnDetector[];
}

/**
 * Mapea los datos y columnas de una tabla.
 * @param data Datos a procesar
 * @param options Opciones de configuración
 * @returns Objeto con columnas y datos procesados
 */
export function map<T extends DataRow>(
    data: T | T[],
    options: MapOptions<T> = {}
): { columns: TableColumn<T>[], data: T[] } {
    const dataArray = Array.isArray(data) ? data : (data ? [data] : []);
    const columns = getColumns(dataArray, options);
    
    const defaults = options.defaults || {};
    
    // Procesar datos para aplicar defaults
    const processedData = dataArray.map(row => {
        const newRow = { ...row };
        // Aplicar defaults si faltan valores
        if (options.defaults) {
            Object.keys(defaults).forEach(key => {
                // Solo si es undefined o null en el original
                if (newRow[key] === undefined || newRow[key] === null) {
                    (newRow as any)[key] = (defaults as any)[key];
                }
            });
        }
        return newRow;
    });

    return { columns, data: processedData };
}

export function getColumns<T extends DataRow>(
    data: T | T[],
    options: MapOptions<T> = {}
): TableColumn<T>[] {
    const {
        includeActions = true,
        actionsConfig = {},
        overrides = {} as Record<string, any>,
        autoDiscover = true,
        excludeKeys = [],
        detectors = []
    } = options;

    const dataArray = Array.isArray(data) ? data : (data ? [data] : []);
    
    // 1. Obtener todas las llaves únicas (de datos + defaults)
    const keysFromData = dataArray.flatMap(row => Object.keys(row));
    const keysFromDefaults = options.defaults ? Object.keys(options.defaults) : [];
    const allKeys = Array.from(new Set([...keysFromData, ...keysFromDefaults]));
    
    const firstValidRow = dataArray[0];
    const defaults = options.defaults || {};

    // Helper para buscar valor usable para inferencia
    const findValueForKey = (key: string): any => {
        // 1. Primer row
        if (firstValidRow && firstValidRow[key] !== undefined && firstValidRow[key] !== null) {
            return firstValidRow[key];
        }
        // 2. iterate rows
        for (const row of dataArray) {
            if (row[key] !== undefined && row[key] !== null) {
                return row[key];
            }
        }
        // 3. Defaults
        if ((defaults as any)[key] !== undefined) {
             return (defaults as any)[key];
        }
        return undefined;
    };

    const finalColumns: TableColumn<T>[] = [];

    allKeys.forEach((key) => {
        if (excludeKeys.includes(key)) return;
        if (key === 'actions') return; // Se maneja aparte

        const value = findValueForKey(key);
        const override = (overrides as Record<string, any>)[key];
        
        // Evitar duplicados si por alguna razón key se repite en el set (raro)
        if (finalColumns.some(c => c.key === key)) return;

        // --- Detección de configuración ---
        let detectedConfig: Partial<TableColumn<T>> = {};

        // 1. Detectores personalizados (User Defined logic)
        const matchedDetector = detectors.find(d => d.match(key, value));
        if (matchedDetector) {
            Object.assign(detectedConfig, matchedDetector.config);
        }

        // 2. Auto-Discovery básico por tipo de valor (fallback)
        if (!matchedDetector && autoDiscover && value !== null && value !== undefined) {
            if (value instanceof Date) {
               detectedConfig.type = 'date';
               detectedConfig.sortable = true;
            } else if (typeof value === 'boolean') {
                detectedConfig.type = 'boolean';
                detectedConfig.align = 'center';
            } else if (typeof value === 'number') {
                // Opcional: ¿number por defecto? El original lo trataba como string por defecto "Normal"
                // Pero si el usuario pide autodiscover, number tiene sentido.
                // Sin embargo, para mantener compatibilidad mínima o "valores fijos" mínimos,
                // dejaremos que el default final sea string si no se especifica.
            }
        }

        // 3. Construir Columna
        // Solo creamos columna si hay override, detector match, autoDiscover (siempre true por default) o existe en datos.
        // Dado que iteramos sobre `allKeys`, implícitamente existe.
        
        const column: any = {
            key,
            label: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            sortable: true,
            type: 'string', // Default global
        };

        // Merge: Base -> Detected -> Override
        Object.assign(column, detectedConfig, override);

        // Asignar defaultValue si existe en options
        if ((defaults as any)[key] !== undefined) {
            column.defaultValue = (defaults as any)[key];
        }

        finalColumns.push(column as TableColumn<T>);
    });

    // Agregar columna Actions si corresponde
    if (includeActions) {
        // Verificar si ya existe (por si venía en data y no la filtramos, aunque arriba pusimos return)
        // El bloque allKeys.forEach salta 'actions', así que safe insertarlo aquí.
        const actionsOverride = (overrides as Record<string, any>)['actions'] || {};
        
        finalColumns.push({
            key: 'actions',
            type: 'actions',
            label: 'Acciones',
            align: 'center',
            width: '120px',
            ...actionsConfig,
            ...actionsOverride
        } as ActionColumn<T>);
    }

    return finalColumns;
}

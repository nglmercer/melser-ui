//@ts-ignore
import { expect, test, describe } from "bun:test";
import { getColumns, map, type ColumnDetector } from "./maptable";

import type { TableColumn, ActionColumn } from "../core/types";

// --- Utilidades de Formateo (User Implementation Example) ---
const dateFormatter = new Intl.DateTimeFormat('es-ES', {
    year: 'numeric', month: 'short', day: 'numeric'
});

const transformDate = (val: unknown): string => {
    if (!val) return '';
    const d = new Date(val as string);
    return isNaN(d.getTime()) ? '' : dateFormatter.format(d);
};

const reverseTransformDate = (val: unknown): string | null => {
    if (!val) return null;
    const d = new Date(val as string);
    return isNaN(d.getTime()) ? null : d.toISOString();
};

// --- Configuraciones de Ejemplo ---
const COLUMN_GROUPS: ColumnDetector[] = [
    {
        // Detecta: created_at, updated_at, fecha_nacimiento, login_date
        match: (key: string) => /(_at|_date|fecha|timestamp)$|^(at|date)$/.test(key.toLowerCase()),
        config: {
            type: 'date',
            sortable: true,
            transform: transformDate,
            reverseTransform: reverseTransformDate,
        }
    },
    {
        // Detecta: is_active, enabled, has_stock
        match: (key: string) => /^(is_|has_)|(active|enabled)$/.test(key.toLowerCase()),
        config: { type: 'boolean', align: 'center' }
    }
];

const COLUMN_PRESETS: Record<string, Partial<TableColumn<any>>> = {
    actions: {
        type: 'actions',
        label: 'Acciones',
        align: 'center',
        width: '120px',
    } as ActionColumn<any>
};

// Default options reusing the definitions above
const standardOptions = {
    detectors: COLUMN_GROUPS,
    actionsConfig: COLUMN_PRESETS.actions as Partial<ActionColumn<any>>
};




describe("getColumns Basic Functionality", () => {
    test("Detect date columns with custom detector", () => {
        const data = [{ id: 1, name: "Test", created_at: "2024-01-01T00:00:00Z" }];
        const cols = getColumns(data, standardOptions);
        const dateCol = cols.find(c => c.key === "created_at");
        expect(dateCol?.type).toBe("date");
        // Verify transform is present
        expect(typeof dateCol?.transform).toBe('function');
    });

    test("Detect boolean columns with custom detector", () => {
        const data = [{ id: 1, name: "Test", is_active: true }];
        const cols = getColumns(data, standardOptions);
        const boolCol = cols.find(c => c.key === "is_active");
        expect(boolCol?.type).toBe("boolean");
    });

    test("Default to string type for generic columns", () => {
        const data = [{ id: 1, name: "Test", description: "A description" }];
        const cols = getColumns(data); // No detectors
        const textCol = cols.find(c => c.key === "description");
        expect(textCol?.type).toBe("string");
    });

    test("Include actions column by default", () => {
        const data = [{ id: 1, name: "Test" }];
        const cols = getColumns(data);
        expect(cols.some(c => c.key === "actions")).toBe(true);
    });

    test("Do NOT exclude keys by default (now clean state)", () => {
        const data = [{ id: 1, name: "Test", password: "123" }];
        const cols = getColumns(data);
        const keys = cols.map(c => c.key);
        expect(keys).toContain("id"); // Should be present now unless excluded explicitly
        expect(keys).toContain("password");
        expect(keys).toContain("name");
    });
    
    test("Exclude keys when provided", () => {
        const data = [{ id: 1, name: "Test", password: "123" }];
        const cols = getColumns(data, { excludeKeys: ['id', 'password'] });
        const keys = cols.map(c => c.key);
        expect(keys).not.toContain("id");
        expect(keys).not.toContain("password");
        expect(keys).toContain("name");
    });
});

describe("map Functionality with Defaults", () => {
    test("map function applies defaults to data", () => {
        interface TestRow { id: number; existing?: string; missing?: string; [key: string]: any; }
        const data: TestRow[] = [{ id: 1, existing: "yes" }];
        const result = map(data, {
            defaults: { missing: "filled", existing: "overridden?" }
        });
        
        const row = result.data[0];
        expect(row.missing).toBe("filled");
        expect(row.existing).toBe("yes"); 

        const col = result.columns.find((c: any) => c.key === "missing");
        // @ts-ignore
        expect(col?.defaultValue).toBe("filled");
    });

    test("Defaults for keys", () => {
         interface TestRow { id: number; count?: number; [key: string]: any; }
         const data: TestRow[] = [{ id: 1 }];
         const result = map(data, {
             defaults: { count: 10 }
         });
         const col = result.columns.find((c: any) => c.key === "count");
         expect(col?.type).toBe("string"); 
         // @ts-ignore
         expect(col?.defaultValue).toBe(10);
    });
});

describe("getColumns Edge Cases", () => {
    test("Mixed data structure", () => {
        const data = [
            { id: 1, name: "A" },
            { id: 2, email: "B@test.com" }
        ];
        const cols = getColumns(data);
        const keys = cols.map(c => c.key);
        expect(keys).toContain("name");
        expect(keys).toContain("email");
    });

    test("Overrides work correctly", () => {
        const data = [{ id: 1, name: "Test" }];
        const cols = getColumns(data, {
             overrides: { name: { label: "Full Name" } }
        });
        expect(cols.find(c => c.key === "name")?.label).toBe("Full Name");
    });
    
    test("Date object auto-discovery (primitive check)", () => {
        const data = [{ id: 1, current: new Date() }];
        const cols = getColumns(data); // AutoDiscover is true by default
        expect(cols.find(c => c.key === "current")?.type).toBe("date");
    });
});

import type { TemplateResult } from 'lit';
import type { DataRow, TableColumn } from './types';

export type RendererMatcher = string | ((val: unknown, row: DataRow, col: TableColumn) => boolean);
export type RendererFunction = (val: unknown, row: DataRow, col: TableColumn, isEditing?: boolean) => TemplateResult | unknown;


interface RegistryEntry {
    matcher: RendererMatcher;
    renderer: RendererFunction;
    priority: number;
}

export class CellRendererRegistry {
    private static instance: CellRendererRegistry;
    private renderers: RegistryEntry[] = [];

    private constructor() {}

    static getInstance(): CellRendererRegistry {
        if (!this.instance) {
            this.instance = new CellRendererRegistry();
        }
        return this.instance;
    }

    register(matcher: RendererMatcher, renderer: RendererFunction, priority: number = 0) {
        this.renderers.push({ matcher, renderer, priority });
        this.renderers.sort((a, b) => b.priority - a.priority); // Higher priority first
    }

    getRenderer(val: unknown, row: DataRow, col: TableColumn): RendererFunction | undefined {
        for (const entry of this.renderers) {
            if (typeof entry.matcher === 'string') {
                if (col.type === entry.matcher) {
                    return entry.renderer;
                }
            } else if (typeof entry.matcher === 'function') {
                if (entry.matcher(val, row, col)) {
                    return entry.renderer;
                }
            }
        }
        return undefined;
    }

    // Helper to register simple type-based renderers
    registerType(type: string, renderer: RendererFunction) {
        this.register(type, renderer);
    }
}

export const cellRenderers = CellRendererRegistry.getInstance();

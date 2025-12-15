import type { SortConfig } from './types';

export class TableLogic {
    /**
     * Performs a global search across all object values.
     */
    static search<T>(data: T[], query: string): T[] {
        if (!query || !query.trim()) return data;
        const lowerQ = query.toLowerCase();
        return data.filter(row => 
            Object.values(row as any).some(val => 
                val && String(val).toLowerCase().includes(lowerQ)
            )
        );
    }

    /**
     * Sorts the data based on a key and direction.
     */
    static sort<T>(data: T[], config: SortConfig | null): T[] {
        if (!config) return data;
        
        return [...data].sort((a: any, b: any) => {
            const valA = a[config.key];
            const valB = b[config.key];
            
            if (valA < valB) return config.direction === 'asc' ? -1 : 1;
            if (valA > valB) return config.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }

    /**
     * Filters data based on a predicate function.
     */
    static filter<T>(data: T[], predicate: (item: T) => boolean): T[] {
        return data.filter(predicate);
    }

    /**
     * Paginates the data.
     */
    static paginate<T>(data: T[], page: number, pageSize: number): T[] {
        const start = (page - 1) * pageSize;
        return data.slice(start, start + pageSize);
    }

    /**
     * Calculates pagination metadata.
     */
    static getPaginationMeta(totalItems: number, page: number, pageSize: number) {
        return {
            totalPages: Math.ceil(totalItems / pageSize),
            startRecord: Math.min((page - 1) * pageSize + 1, totalItems),
            endRecord: Math.min(page * pageSize, totalItems),
            totalItems
        };
    }
}

import type { SortConfig } from './types';

export class TableLogic {
    /**
     * Performs a global search across all object values.
     * @param data - The array of objects to search.
     * @param query - The search query string.
     * @returns Filtered array matching the query.
     */
    static search<T extends object>(data: T[], query: string): T[] {
        if (!query || !query.trim()) return data;
        const lowerQ = query.toLowerCase();
        
        return data.filter(row => 
            Object.values(row).some(val => 
                val !== null && 
                val !== undefined && 
                String(val).toLowerCase().includes(lowerQ)
            )
        );
    }

    /**
     * Sorts the data based on a key and direction.
     * @param data - The data to sort.
     * @param config - The sorting configuration.
     * @returns Sorted array.
     */
    static sort<T extends object>(data: T[], config: SortConfig | null): T[] {
        if (!config || !config.key) return data;
        
        return [...data].sort((a, b) => {
            const key = config.key as keyof T;
            const valA = a[key];
            const valB = b[key];
            
            // Handle equality
            if (valA === valB) return 0;
            
            // Handle null/undefined values (always push to bottom)
            if (valA === null || valA === undefined) return 1;
            if (valB === null || valB === undefined) return -1;

            // String specific sorting (case-insensitive via localeCompare)
            if (typeof valA === 'string' && typeof valB === 'string') {
                const comparison = valA.localeCompare(valB);
                return config.direction === 'asc' ? comparison : -comparison;
            }

            // Default comparison
            if (valA < valB) return config.direction === 'asc' ? -1 : 1;
            if (valA > valB) return config.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }

    /**
     * Filters data based on a predicate function.
     * @param data - The data array.
     * @param predicate - The filter condition.
     */
    static filter<T>(data: T[], predicate: (item: T) => boolean): T[] {
        return data.filter(predicate);
    }

    /**
     * Paginates the data with bounds checking.
     * @param data - The data to paginate.
     * @param page - Current page number (1-based).
     * @param pageSize - Items per page.
     */
    static paginate<T>(data: T[], page: number, pageSize: number): T[] {
        const safePage = Math.max(1, page);
        const safePageSize = Math.max(1, pageSize);
        
        const start = (safePage - 1) * safePageSize;
        
        // Return empty if start index is out of bounds
        if (start >= data.length) return [];
        
        return data.slice(start, start + safePageSize);
    }

    /**
     * Calculates pagination metadata with validation.
     */
    static getPaginationMeta(totalItems: number, page: number, pageSize: number) {
        const safePage = Math.max(1, page);
        const safePageSize = Math.max(1, pageSize);
        
        return {
            totalPages: Math.ceil(totalItems / safePageSize),
            startRecord: Math.min((safePage - 1) * safePageSize + 1, totalItems),
            endRecord: Math.min(safePage * safePageSize, totalItems),
            totalItems
        };
    }
}

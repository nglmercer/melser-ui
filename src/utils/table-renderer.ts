import type { DataRow, TableColumn, TableConfig, TableStyles } from '../core/types';
import type { DataTableLit } from '../components/table';

/**
 * Utility class for dynamically rendering table elements with props
 */
export class TableRenderer {
    /**
     * Creates a table element with dynamic props
     */
    static createTableElement(props: {
        data?: DataRow[];
        columns?: TableColumn[];
        config?: Partial<TableConfig>;
        searchQuery?: string;
        customStyles?: TableStyles;
        id?: string;
    } = {}): DataTableLit {
        const table = document.createElement('data-table-lit') as DataTableLit;
        
        if (props.id) {
            table.id = props.id;
        }
        
        if (props.data) {
            table.data = props.data;
        }
        
        if (props.columns) {
            table.columns = props.columns;
        }
        
        if (props.config) {
            table.config = { ...table.config, ...props.config };
        }
        
        if (props.searchQuery !== undefined) {
            table.searchQuery = props.searchQuery;
        }
        
        if (props.customStyles) {
            table.customStyles = props.customStyles;
        }
        
        return table;
    }
    
    /**
     * Updates table properties dynamically
     */
    static updateTableProps(
        table: DataTableLit,
        updates: {
            data?: DataRow[];
            columns?: TableColumn[];
            config?: Partial<TableConfig>;
            searchQuery?: string;
            customStyles?: TableStyles;
        }
    ): void {
        if (updates.data) {
            table.data = updates.data;
        }
        
        if (updates.columns) {
            table.columns = updates.columns;
        }
        
        if (updates.config) {
            table.config = { ...table.config, ...updates.config };
        }
        
        if (updates.searchQuery !== undefined) {
            table.searchQuery = updates.searchQuery;
        }
        
        if (updates.customStyles) {
            table.customStyles = updates.customStyles;
        }
    }
    
    /**
     * Creates a complete table configuration with sample data
     */
    static createSampleConfig(type: 'users' | 'products' | 'minimal' = 'users'): {
        data: DataRow[];
        columns: TableColumn[];
        config: TableConfig;
    } {
        const configs = {
            users: {
                data: [
                    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', department: 'Engineering' },
                    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'inactive', department: 'Marketing' },
                    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager', status: 'active', department: 'Sales' },
                    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Developer', status: 'active', department: 'Engineering' }
                ],
                columns: [
                    { key: 'id', label: 'ID', type: 'number' },
                    { key: 'name', label: 'Name', type: 'string', editable: true },
                    { key: 'email', label: 'Email', type: 'string', editable: true },
                    { key: 'role', label: 'Role', type: 'string', editable: true },
                    { key: 'status', label: 'Status', type: 'string', editable: true },
                    { key: 'department', label: 'Department', type: 'string', editable: true },
                    { key: 'actions', label: 'Actions', type: 'actions' }
                ],
                config: {
                    pagination: true,
                    pageSize: 5,
                    selection: true,
                    density: 'Normal',
                    expandable: false
                }
            },
            products: {
                data: [
                    { id: 1, name: 'Laptop Pro', category: 'Electronics', price: 1299.99, stock: 15, status: 'available' },
                    { id: 2, name: 'Wireless Mouse', category: 'Accessories', price: 29.99, stock: 50, status: 'available' },
                    { id: 3, name: 'USB-C Hub', category: 'Accessories', price: 49.99, stock: 0, status: 'out-of-stock' },
                    { id: 4, name: 'Mechanical Keyboard', category: 'Peripherals', price: 89.99, stock: 25, status: 'available' }
                ],
                columns: [
                    { key: 'id', label: 'ID', type: 'number' },
                    { key: 'name', label: 'Product', type: 'string', editable: true },
                    { key: 'category', label: 'Category', type: 'string', editable: true },
                    { key: 'price', label: 'Price', type: 'number', editable: true },
                    { key: 'stock', label: 'Stock', type: 'number', editable: true },
                    { key: 'status', label: 'Status', type: 'string', editable: true },
                    { key: 'actions', label: 'Actions', type: 'actions' }
                ],
                config: {
                    pagination: true,
                    pageSize: 5,
                    selection: false,
                    density: 'Normal',
                    expandable: false
                }
            },
            minimal: {
                data: [
                    { id: 1, name: 'Item 1', value: 100 },
                    { id: 2, name: 'Item 2', value: 200 },
                    { id: 3, name: 'Item 3', value: 300 }
                ],
                columns: [
                    { key: 'id', label: 'ID', type: 'number' },
                    { key: 'name', label: 'Name', type: 'string' },
                    { key: 'value', label: 'Value', type: 'number' }
                ],
                config: {
                    pagination: false,
                    pageSize: 10,
                    selection: false,
                    density: 'Normal',
                    expandable: false
                }
            }
        };
        
        return configs[type] as { data: DataRow[]; columns: TableColumn[]; config: TableConfig };
    }
    
    /**
     * Creates a playground-ready table with interactive controls
     */
    static createPlaygroundTable(
        containerId: string,
        options: {
            initialData?: 'users' | 'products' | 'minimal';
            showControls?: boolean;
            showEventLog?: boolean;
            theme?: 'light' | 'dark';
        } = {}
    ): { table: DataTableLit; container: HTMLElement } {
        const container = document.getElementById(containerId);
        if (!container) {
            throw new Error(`Container with id "${containerId}" not found`);
        }
        
        const config = this.createSampleConfig(options.initialData || 'users');
        const table = this.createTableElement({
            data: config.data,
            columns: config.columns,
            config: config.config
        });
        
        container.innerHTML = '';
        container.appendChild(table);
        
        // Apply theme if specified
        if (options.theme) {
            import('../theme/tokens').then(({ setTheme }) => {
                setTheme(options.theme === 'dark' ? 'dark' : 'light');
            });
        }
        
        // Add event logging if requested
        if (options.showEventLog) {
            const eventLog = document.createElement('div');
            eventLog.className = 'table-event-log';
            eventLog.style.cssText = `
                margin-top: 1rem;
                padding: 1rem;
                background: #f8fafc;
                border: 1px solid #e2e8f0;
                border-radius: 6px;
                font-family: monospace;
                font-size: 0.875rem;
                max-height: 200px;
                overflow-y: auto;
            `;
            eventLog.innerHTML = '<strong>Event Log:</strong><div id="event-log-content"></div>';
            container.appendChild(eventLog);
            
            const logContent = eventLog.querySelector('#event-log-content');
            
            // Listen to table events
            const events = ['selection-change', 'row-action', 'row-save', 'row-expand', 'page-change'];
            events.forEach(eventType => {
                table.addEventListener(eventType, (e: Event) => {
                    const customEvent = e as CustomEvent;
                    const timestamp = new Date().toLocaleTimeString();
                    const entry = document.createElement('div');
                    entry.style.cssText = 'margin: 0.5rem 0; padding: 0.5rem; background: white; border-radius: 4px; border-left: 3px solid #3b82f6;';
                    entry.innerHTML = `
                        <strong>${timestamp} - ${eventType}:</strong><br>
                        <pre style="margin: 0; font-size: 0.75rem;">${JSON.stringify(customEvent.detail, null, 2)}</pre>
                    `;
                    logContent?.appendChild(entry);
                    logContent!.scrollTop = logContent!.scrollHeight;
                });
            });
        }
        
        return { table, container };
    }
    
    /**
     * Utility to create dynamic props for table rendering
     */
    static createDynamicProps(
        baseProps: {
            data?: DataRow[];
            columns?: TableColumn[];
            config?: Partial<TableConfig>;
        },
        overrides: {
            data?: DataRow[];
            columns?: TableColumn[];
            config?: Partial<TableConfig>;
            searchQuery?: string;
            customStyles?: TableStyles;
        } = {}
    ): {
        data: DataRow[];
        columns: TableColumn[];
        config: TableConfig;
        searchQuery: string;
        customStyles: TableStyles;
    } {
        return {
            data: overrides.data || baseProps.data || [],
            columns: overrides.columns || baseProps.columns || [],
            config: { ...baseProps.config, ...overrides.config } as TableConfig,
            searchQuery: overrides.searchQuery || '',
            customStyles: overrides.customStyles || {}
        };
    }
}

// Export for use in other modules
export default TableRenderer;

// Make available globally for browser use
if (typeof window !== 'undefined') {
    (window as any).TableRenderer = TableRenderer;
}
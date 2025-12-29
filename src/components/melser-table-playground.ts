import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { setTheme } from '../theme/tokens';
import type { TableConfig } from '../core/types';
import { Var } from '../theme/tokens';

interface PlaygroundColumn {
    key: string;
    label: string;
    type: string;
    editable?: boolean;
    options?: string[];
}

interface PlaygroundData {
    id: number;
    [key: string]: any;
}

/**
 * A simple playground component for demonstrating the DataTableLit component.
 * Shows sample data with minimal controls for quick demos.
 */
@customElement('me-table-playground')
export class MelserTablePlayground extends LitElement {
    @property({ type: Array }) data: PlaygroundData[] = [];
    @property({ type: Array }) columns: PlaygroundColumn[] = [];
    @property({ type: Object }) config: TableConfig = {
        pagination: true,
        pageSize: 5,
        selection: true,
        density: 'Normal',
        expandable: false
    };
    
    private _theme: 'light' | 'dark' = 'light';

    private sampleData = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', age: 30, department: 'Engineering' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'inactive', age: 25, department: 'Marketing' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager', status: 'active', age: 35, department: 'Sales' },
        { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Developer', status: 'active', age: 28, department: 'Engineering' },
        { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Designer', status: 'inactive', age: 32, department: 'Design' },
        { id: 6, name: 'Diana Davis', email: 'diana@example.com', role: 'Analyst', status: 'active', age: 29, department: 'Analytics' },
        { id: 7, name: 'Edward Miller', email: 'edward@example.com', role: 'User', status: 'active', age: 27, department: 'Support' },
        { id: 8, name: 'Fiona Garcia', email: 'fiona@example.com', role: 'Admin', status: 'inactive', age: 31, department: 'HR' }
    ];

    private sampleColumns: PlaygroundColumn[] = [
        { key: 'id', label: 'ID', type: 'number' },
        { key: 'name', label: 'Name', type: 'string', editable: true },
        { key: 'email', label: 'Email', type: 'string', editable: true },
        { key: 'role', label: 'Role', type: 'select', options: ['Admin', 'User', 'Manager', 'Developer', 'Designer', 'Analyst'], editable: true },
        { key: 'status', label: 'Status', type: 'string', editable: true },
        { key: 'age', label: 'Age', type: 'number', editable: true },
        { key: 'department', label: 'Department', type: 'string', editable: true },
        { key: 'actions', label: 'Actions', type: 'actions' }
    ];

    connectedCallback() {
        super.connectedCallback();
        this.data = [...this.sampleData];
        this.columns = [...this.sampleColumns];
        
        this.addEventListener('row-action', this.handleRowAction as EventListener);
        this.addEventListener('row-save', this.handleRowSave as EventListener);
    }

    private toggleTheme() {
        this._theme = this._theme === 'light' ? 'dark' : 'light';
        setTheme(this._theme);
    }

    private handleRowAction = (e: CustomEvent) => {
        if (e.detail.action === 'delete') {
            if (confirm(`Delete row with ID ${e.detail.id}?`)) {
                this.data = this.data.filter(row => row.id !== e.detail.id);
            }
        }
    };

    private handleRowSave = (e: CustomEvent) => {
        const { id, data } = e.detail;
        const rowIndex = this.data.findIndex(row => row.id === id);
        
        if (rowIndex !== -1) {
            const newData = [...this.data];
            newData[rowIndex] = { ...newData[rowIndex], ...data };
            this.data = newData;
        }
    };

    render() {
        return html`
            <div class="playground-container">
                <div class="header">
                    <h2>Data Table Demo</h2>
                    <button @click=${this.toggleTheme} class="theme-toggle" title="Toggle theme">
                        ${this._theme === 'light' ? '🌙' : '☀️'}
                    </button>
                </div>

                <div class="table-wrapper">
                    <data-table-lit
                        .data=${this.data}
                        .columns=${this.columns}
                        .config=${this.config}
                    ></data-table-lit>
                </div>
            </div>
        `;
    }

    static styles = css`
        :host {
            display: block;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .playground-container {
            background: ${Var.color.bg.default};
            border-radius: ${Var.radius.default};
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem;
            background: ${Var.color.surface.variant};
            border-bottom: 1px solid ${Var.color.border.default};
        }

        .header h2 {
            margin: 0;
            font-size: 1.25rem;
            font-weight: 600;
            color: ${Var.color.text.primary};
        }

        .theme-toggle {
            background: transparent;
            border: 1px solid ${Var.color.border.default};
            border-radius: 6px;
            padding: 0.5rem 0.75rem;
            cursor: pointer;
            font-size: 1.25rem;
            transition: all 0.2s;
            line-height: 1;
        }

        .theme-toggle:hover {
            background: ${Var.color.bg.hover};
        }

        .table-wrapper {
            padding: 0;
        }

        data-table-lit {
            width: 100%;
        }
    `;
}

import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { TableLogic } from '../core/TableLogic';
import type { TableConfig, TableColumn, SelectColumn, DataRow, SortConfig, TableStyles } from '../core/types';
import { InputVar } from '../core/Base';
import './melser-table-cell';
import './melser-table-row';
import './base-input';

import './melser-number-input';
import './melser-select';
import './melser-switch';
import './melser-date-picker';
// import './melser-table-row'; // Available for future refactoring
import { CellRendererRegistry } from '../core/CellRendererRegistry';

@customElement('data-table-lit')
export class DataTableLit extends LitElement {
    @property({ type: Array }) data: DataRow[] = [];
    @property({ type: Array }) columns: TableColumn[] = [];
    @property({ type: Object }) config: TableConfig = {
        pagination: true,
        pageSize: 5,
        selection: false,
        density: 'Normal',
        expandable: false
    };
    @property({ type: String }) searchQuery = '';
    @property({ type: Object }) customStyles: TableStyles = {};
    @property({ type: Object }) icons = {
        expand: html`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`,
        edit: html`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`,
        delete: html`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>`,
        save: html`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
        cancel: html`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
        view: html`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`,
        more: html`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>`,
        sortAsc: html`<span class="sort-icon sort-asc"></span>`,
        sortDesc: html`<span class="sort-icon sort-desc"></span>`,
    };

    // Internal State
    @state() private sortConfig: SortConfig | null = null;
    @state() private currentPage: number = 1;
    @state() private selectedRows: Set<string | number> = new Set();
    @state() private expandedRows: Set<string | number> = new Set();
    
    // Editing State
    @state() private editingId: string | number | null = null;
    @state() private editFormData: DataRow = { id: 0 };

    // Styles
    static styles = css`
        :host {
            display: block;
            font-family: inherit;
            color: ${InputVar['text-color']};
            background: ${InputVar.bg};
            border: 1px solid ${InputVar['border-color']};
            border-radius: ${InputVar.radius};
            overflow: hidden;
            height: 100%;
            display: flex;
            flex-direction: column;
            --primary-color: ${InputVar['focus-ring-color']}; 
        }
        
        .table-container {
            overflow: auto;
            flex: 1;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
        }

        thead tr {
            background: ${InputVar['bg-disabled']};
            border-bottom: 2px solid ${InputVar['border-color']};
        }

        th {
            padding: var(--cell-padding, 1rem);
            font-size: ${InputVar['font-size-small']};
            font-weight: ${InputVar['label-font-weight']};
            cursor: pointer;
            user-select: none;
            white-space: nowrap;
            color: ${InputVar['text-color']};
            transition: background 0.2s, color 0.2s;
        }

        th:hover {
            color: ${InputVar['border-color-hover']};
            background: ${InputVar['bg-hover']};
        }
        
        th:hover .sort-icon {
            opacity: 1; 
            border-bottom-color: ${InputVar['text-color']};
            border-top-color: ${InputVar['text-color']};
        }

        td {
            padding: var(--cell-padding, 1rem);
            border-bottom: 1px solid ${InputVar['border-color']};
            font-size: ${InputVar['font-size-small']};
            vertical-align: middle;
            color: ${InputVar['text-color']};
        }

        tr.data-row:hover td {
            background: ${InputVar['bg-disabled']}; /* Darker hover for better contrast */
        }
        
        tr.selected td {
            background: rgba(${InputVar['focus-ring-color']}, 0.1);
        }
        
        tr.editing td {
            background: ${InputVar['bg-disabled']};
            border-top: 1px solid ${InputVar['border-color']};
            border-bottom: 1px solid ${InputVar['border-color']};
        }
        
        /* Ensure inputs in editing rows stand out */
        tr.editing base-input,
        tr.editing me-select,
        tr.editing me-number-input,
        tr.editing me-date-picker,
        tr.editing input {
            --base-input-bg: ${InputVar['bg']};
            --base-input-border-color: ${InputVar['text-color-placeholder']}; /* Stronger border for inputs */
        }

        tr.details-row td {
            background: ${InputVar['bg-disabled']};
            padding: 0;
            box-shadow: inset 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        /* Buttons */
        .expand-btn, .action-btn {
            background: none; 
            border: none; 
            color: ${InputVar['text-color-placeholder']}; 
            cursor: pointer; 
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
            border-radius: ${InputVar.radius};
            padding: 4px;
        }
        .expand-btn:hover, .action-btn:hover {
            background: ${InputVar['bg-hover']};
            color: ${InputVar['text-color']};
        }
        .expand-btn.expanded {
            transform: rotate(90deg);
            color: ${InputVar['bg']};
        }

        .save-btn {
            background: ${InputVar['bg']};
            color: ${InputVar['text-color']};
            border-radius: ${InputVar.radius};
        }
        .save-btn:hover {
            opacity: 0.9;
        }
        .delete-btn { color: ${InputVar['error-color']}; }

        /* Form Elements - Default Styles for native inputs if used fallback */
        input[type="text"], input[type="number"], select {
            background: ${InputVar.bg};
            border: 1px solid ${InputVar['border-color']};
            color: ${InputVar['text-color']};
            border-radius: ${InputVar['radius']};
            padding: 0.25rem 0.5rem;
            font-size: ${InputVar['font-size']};
            width: 100%;
            box-sizing: border-box;
            outline: none;
        }
        
        input[type="text"]:focus, input[type="number"]:focus, select:focus {
            border-color: ${InputVar['border-color']};
        }

        /* Checkbox */
        input[type="checkbox"] {
            appearance: none;
            background-color: ${InputVar.bg};
            margin: 0;
            font: inherit;
            color: currentColor;
            width: 1.15em;
            height: 1.15em;
            border: 1px solid ${InputVar['border-color']};
            border-radius: 0.25em;
            display: grid;
            place-content: center;
            cursor: pointer;
        }
        input[type="checkbox"]::before {
            content: "";
            width: 0.65em;
            height: 0.65em;
            transform: scale(0);
            transition: 120ms transform ease-in-out;
            box-shadow: inset 1em 1em ${InputVar['focus-ring-color']};
            transform-origin: center;
            clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
        }
        input[type="checkbox"]:checked::before { transform: scale(1); }

        /* Footer */
        .footer {
            padding: 0.75rem 1rem;
            border-top: 1px solid ${InputVar['border-color']};
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: ${InputVar.bg};
        }

        button.page-btn {
            background: transparent;
            border: 1px solid ${InputVar['border-color']};
            color: ${InputVar['text-color-placeholder']};
            border-radius: ${InputVar.radius};
            width: 2rem;
            height: 2rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
        }
        button.page-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        button.page-btn.active {
            background: ${InputVar['bg']};
            color: ${InputVar['text-color']};
            font-weight: bold;
            border-color: ${InputVar['border-color']};
        }
        button.page-btn:hover { opacity: 0.8; }
        .sort-icon {
            display: inline-block;
            margin-left: 4px;
            width: 0; height: 0; 
            vertical-align: middle;
            opacity: 0.5; /* Slight fade by default */
            transition: opacity 0.2s;
        }
        .sort-asc {
            border-left: 4px solid transparent;
            border-right: 4px solid transparent;
            border-bottom: 4px solid ${InputVar['text-color']};
        }
        .sort-desc {
            border-left: 4px solid transparent;
            border-right: 4px solid transparent;
            border-top: 4px solid ${InputVar['text-color']};
        }

        .project-cell { display: flex; align-items: center; gap: 12px; }
        .icon-box {
            width: 32px; height: 32px; border-radius: 6px;
            display: flex; align-items: center; justify-content: center;
            background: ${InputVar['bg-disabled']}; border: 1px solid ${InputVar['border-color']};
            color: ${InputVar['text-color-placeholder']};
        }

        
        /* Mobile */
        @media (max-width: 640px) {
            th, td { padding: 0.5rem 0.75rem; font-size: 0.75rem; }
            .icon-box { width: 24px; height: 24px; font-size: 14px; }
        }
        
        melser-table-row {
            display: contents;
        }
    `;


    // --- Lifecycle ---

    updated(changedProperties: Map<string, any>) {
        if (changedProperties.has('searchQuery')) {
            this.currentPage = 1;
        }
        if (changedProperties.has('config')) {
            this.updateThemeVariables();
        }
        if (changedProperties.has('customStyles')) {
            this.applyCustomStyles();
        }
    }

    private updateThemeVariables() {
        let padding = '1rem';
        if (this.config.density === 'Compact') padding = '0.5rem 1rem';
        if (this.config.density === 'Spacious') padding = '1.5rem 1rem';
        
        (this as HTMLElement).style.setProperty('--cell-padding', padding);
    }

    private applyCustomStyles() {
        const map: Record<keyof TableStyles, string> = {
            background: '--base-input-bg',
            color: '--base-input-text-color',
            borderColor: '--base-input-border-color',
            headerBackground: '--base-input-bg-disabled',
            rowHoverBackground: '--base-input-bg-hover',
            primaryColor: '--base-input-focus-ring-color',
            borderRadius: '--base-input-radius',
            textColorSecondary: '--base-input-text-color-placeholder'
        };
        
        Object.entries(this.customStyles).forEach(([key, value]) => {
            const cssVar = map[key as keyof TableStyles];
            if (cssVar && value) {
                (this as HTMLElement).style.setProperty(cssVar, value);
            }
        });
        
        if (this.customStyles.primaryColor) {
             (this as HTMLElement).style.setProperty('--primary-color', this.customStyles.primaryColor);
        }
    }



    // --- Event Handlers ---

    private handleSort(key: string) {
        if (this.sortConfig?.key === key && this.sortConfig.direction === 'asc') {
            this.sortConfig = { key, direction: 'desc' };
        } else {
            this.sortConfig = { key, direction: 'asc' };
        }
    }

    private handlePageChange(newPage: number) {
        this.currentPage = newPage;
    }

    private handleSelectAll(e: Event, currentIds: (string|number)[]) {
        const checked = (e.target as HTMLInputElement).checked;
        if (checked) {
            currentIds.forEach(id => this.selectedRows.add(id));
        } else {
            currentIds.forEach(id => this.selectedRows.delete(id));
        }
        this.selectedRows = new Set(this.selectedRows); // Trigger update
        this.dispatchSelectionEvent();
    }

    private handleSelectRowEvent(e: CustomEvent) {
        const { id, selected } = e.detail;
        if (selected) {
            this.selectedRows.add(id);
        } else {
            this.selectedRows.delete(id);
        }
        this.selectedRows = new Set(this.selectedRows);
        this.dispatchSelectionEvent();
    }
    
    private handleExpandRowEvent(e: CustomEvent) {
        this.handleExpandRow(e.detail.id);
    }


    private handleExpandRow(id: string | number) {
        if (this.expandedRows.has(id)) {
            this.expandedRows.delete(id);
        } else {
            this.expandedRows.add(id);
        }
        this.expandedRows = new Set(this.expandedRows);
    }

    private dispatchSelectionEvent() {
        (this as HTMLElement).dispatchEvent(new CustomEvent('selection-change', {
            detail: { selectedIds: Array.from(this.selectedRows) },
            bubbles: true,
            composed: true
        }));
    }

    private handleEdit(row: DataRow) {
        this.editingId = row.id;
        this.editFormData = { ...row };
    }

    private handleCancel() {
        this.editingId = null;
        this.editFormData = { id: 0 };
    }

    private handleSave(id: string | number) {
        (this as HTMLElement).dispatchEvent(new CustomEvent('row-save', {
            detail: { id, data: this.editFormData },
            bubbles: true,
            composed: true
        }));
        this.editingId = null;
    }

    private handleDelete(id: string | number) {
        (this as HTMLElement).dispatchEvent(new CustomEvent('row-action', {
            detail: { action: 'delete', id },
            bubbles: true,
            composed: true
        }));
    }

    private handleInputChange(key: string, value: any) {
        this.editFormData = { ...this.editFormData, [key]: value };
    }

    private extractValue(e: any): any {
        if (e.detail && e.detail.value !== undefined) {
            return e.detail.value;
        }
        if (e.target && e.target.value !== undefined) {
            return e.target.value;
        }
        return e.target.value;
    }


    // --- Rendering ---

    render() {
        let processed = [...this.data];
        processed = TableLogic.search(processed, this.searchQuery);
        processed = TableLogic.sort(processed, this.sortConfig);
        
        const pageSize = this.config.pageSize || 5;
        const totalItems = processed.length;
        const { totalPages, startRecord, endRecord } = TableLogic.getPaginationMeta(totalItems, this.currentPage, pageSize);
        
        if (this.currentPage > totalPages && totalPages > 0) {
            this.currentPage = totalPages;
        }

        const paginated = this.config.pagination ? TableLogic.paginate(processed, this.currentPage, pageSize) : processed;

        const allCurrentIds = processed.map(r => r.id);
        const allSelected = allCurrentIds.length > 0 && allCurrentIds.every(id => this.selectedRows.has(id));
        const someSelected = allCurrentIds.some(id => this.selectedRows.has(id));

        return html`
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            ${this.config.expandable ? html`<th style="width: 40px"></th>` : nothing}
                            ${this.config.selection ? html`
                                <th style="width: 40px; padding-left: 1.5rem">
                                    <input 
                                        type="checkbox" 
                                        .checked=${allSelected}
                                        .indeterminate=${!allSelected && someSelected}
                                        @ui:change=${(e: Event) => this.handleSelectAll(e, allCurrentIds)}
                                    >
                                </th>
                            ` : nothing}

                            ${this.columns.map(col => html`
                                <th @click=${() => col.key !== 'actions' && this.handleSort(String(col.key))} 
                                    style="${col.key === 'actions' ? 'text-align: right; padding-right: 1.5rem' : ''}">
                                    ${col.label}
                                    ${this.sortConfig?.key === col.key ? html`
                                        ${this.sortConfig.direction === 'asc' ? this.icons.sortAsc : this.icons.sortDesc}
                                    ` : nothing}
                                </th>
                            `)}
                        </tr>
                    </thead>
                    <tbody>
                        ${paginated.map(row => {
                            const isSelected = this.selectedRows.has(row.id);
                            const isEditing = this.editingId === row.id;
                            const isExpanded = this.expandedRows.has(row.id);

                            return html`
                                <melser-table-row
                                    .row=${row}
                                    .columns=${this.columns}
                                    .isSelected=${isSelected}
                                    .isEditing=${isEditing}
                                    .isExpanded=${isExpanded}
                                    .editData=${this.editFormData}
                                    
                                    .hasSelection=${!!this.config.selection}
                                    .hasExpansion=${!!this.config.expandable}
                                    .icons=${this.icons}
                                    .cellRenderer=${(r: DataRow, c: TableColumn, editing: boolean) => this.renderCell(r, c, editing)}
                                    
                                    @row-select=${this.handleSelectRowEvent}
                                    @row-expand=${this.handleExpandRowEvent}
                                    @row-action=${(e: CustomEvent) => this.dispatchEvent(new CustomEvent('row-action', { detail: e.detail, bubbles: true, composed: true }))}
                                    @cell-change=${(e: CustomEvent) => this.handleInputChange(e.detail.key, e.detail.value)}
                                >
                                    ${isExpanded ? html`<slot name="details-${row.id}" slot="details-${row.id}"></slot>` : nothing}
                                </melser-table-row>
                            `;
                        })}

                        ${paginated.length === 0 ? html`
                            <tr>
                                <td colspan="${this.columns.length + (this.config.selection ? 1 : 0) + (this.config.expandable ? 1 : 0)}" 
                                    style="text-align:center; color: ${InputVar['text-color-placeholder']}; padding: 2rem;">
                                    No data available
                                </td>
                            </tr>
                        ` : nothing}
                    </tbody>
                </table>
            </div>
            ${this.renderFooter(totalItems, startRecord, endRecord, totalPages)}
        `;
    }

    private renderFooter(totalItems: number, startRecord: number, endRecord: number, totalPages: number) {
        if (!this.config.pagination || totalItems === 0) return nothing;

        return html`
            <div class="footer">
                <span style="font-size: ${InputVar['font-size-small']}; color: ${InputVar['text-color-placeholder']};">
                    Showing <strong style="color: ${InputVar['text-color']}">${startRecord}</strong> to <strong style="color: ${InputVar['text-color']}">${endRecord}</strong> of <strong style="color: ${InputVar['text-color']}">${totalItems}</strong>
                </span>
                <div style="display: flex; gap: 0.5rem;">
                    <button class="page-btn" 
                        ?disabled=${this.currentPage === 1}
                        @click=${() => this.handlePageChange(this.currentPage - 1)}>&lt;</button>
                    
                    ${(() => {
                        const window = 3;
                        const start = Math.max(1, Math.min(this.currentPage - 1, totalPages - window + 1));
                        const end = Math.min(totalPages, start + window - 1);
                        
                        return Array.from({length: end - start + 1}, (_, i) => start + i).map(p => html`
                            <button class="page-btn ${this.currentPage === p ? 'active' : ''}" 
                                @click=${() => this.handlePageChange(p)}>${p}</button>
                        `);
                    })()}

                    <button class="page-btn" 
                        ?disabled=${this.currentPage === totalPages}
                        @click=${() => this.handlePageChange(this.currentPage + 1)}>&gt;</button>
                </div>
            </div>
        `;
    }

    private handleView(row: DataRow) {
        (this as HTMLElement).dispatchEvent(new CustomEvent('row-action', {
            detail: { action: 'view', row },
            bubbles: true,
            composed: true
        }));
    }

    private renderActions(row: DataRow, col: TableColumn, isEditing: boolean) {
        if (isEditing && col) {
            return html`
                <div style="display: flex; justify-content: flex-end; gap: 4px;">
                    <button class="action-btn save-btn" @click=${(e:Event) => { e.stopPropagation(); this.handleSave(row.id); }}>
                        ${this.icons.save}
                    </button>
                    <button class="action-btn" @click=${(e:Event) => { e.stopPropagation(); this.handleCancel(); }}>
                         ${this.icons.cancel}
                    </button>
                </div>
            `;
        }
        return html`
            <div style="display: flex; justify-content: flex-end; gap: 4px;">
                <button class="action-btn" @click=${(e:Event) => { e.stopPropagation(); this.handleEdit(row); }}>
                    ${this.icons.edit}
                </button>
                <button class="action-btn" title="View Data" @click=${(e:Event) => { e.stopPropagation(); this.handleView(row); }}>
                    ${this.icons.view}
                </button>
                <button class="action-btn delete-btn" @click=${(e:Event) => { e.stopPropagation(); this.handleDelete(row.id); }}>
                    ${this.icons.delete}
                </button>
                <button class="action-btn">
                     ${this.icons.more}
                </button>
            </div>
        `;
    }

    renderCell(row: DataRow, col: TableColumn, isEditing: boolean) {
        // Use edited data if this row is being edited
        const effectiveRow = isEditing ? this.editFormData : row;
        const val = effectiveRow[col.key as string];

        // 1. Custom Slot Rendering - NUEVO SISTEMA
        const slotName = `cell-${row.id}-${String(col.key)}`;
        const slot = this.querySelector(`[slot="${slotName}"]`);
        
        if (slot) {
            // Si hay un slot personalizado, usarlo
            // Set attributes for styling and dataset usage
            slot.setAttribute('data-row', JSON.stringify(effectiveRow));
            slot.setAttribute('data-column', JSON.stringify(col));
            slot.setAttribute('data-value', String(val || ''));
            slot.setAttribute('data-editing', String(isEditing));
            // Also set standard 'value' attribute which many components observe
            slot.setAttribute('value', String(val || ''));

            // Set properties directly for complex components (like MelserTableCell)
            // that might expect objects or booleans
            const el = slot as any;
            if (el.value !== val) el.value = val;
            if (JSON.stringify(el.row) !== JSON.stringify(effectiveRow)) el.row = effectiveRow; // Simple check to avoid loops if needed, though assignment is usually safe
            el.isEditing = isEditing;

            // Permitir que el slot maneje eventos de edición
            if (isEditing) {
                 slot.addEventListener('cell-change', (e: Event) => {
                     const customEvent = e as CustomEvent;
                     this.handleInputChange(col.key as string, customEvent.detail.value);
                 }, { once: true });
            }
            
            return html`<slot name="${slotName}"></slot>`;
        }

        // 2. Custom Function Overrides (mantener compatibilidad anterior)
        if (isEditing && col.editRender) {
             return col.editRender(effectiveRow, (val: any) => this.handleInputChange(col.key as string, val));
        }
        if (!isEditing && col.render) {
             return col.render(row);
        }

        // 3. Actions Column
        if (col.type === 'actions' || col.key === 'actions') {
            return this.renderActions(row, col, isEditing);
        }

        // 3.1 Registry-based Rendering (NEW)
        if (!isEditing) {
            const renderer = CellRendererRegistry.getInstance().getRenderer(val, effectiveRow, col);
            if (renderer) {
                return renderer(val, effectiveRow, col);
            }
        }
        
        // 3.5 Use MelserTableCell for rich types
        if (['status', 'progress', 'avatar', 'currency', 'badge'].includes(col.type as string)) {
             return html`
                <melser-table-cell
                    .row=${effectiveRow}
                    .column=${col}
                    .value=${String(val)}
                    .type=${col.type as string}
                    .isEditing=${isEditing && col.editable !== false}
                    @cell-change=${(e: CustomEvent) => this.handleInputChange(col.key as string, e.detail.value)}
                ></melser-table-cell>`;
        }

        // 4. Edit Mode - Component Mapping
        if (isEditing && col.editable !== false) {
             const type = col.type || 'string';
             
             switch (type) {
                 case 'number':
                     return html`
                        <me-number-input
                            .value="${Number(val) || 0}"
                            @ui:change="${(e: any) => this.handleInputChange(col.key as string, this.extractValue(e))}"
                            style="width: 100%"
                        ></me-number-input>`;
                 case 'select':
                     const selectCol = col as SelectColumn;
                     const options = selectCol.options?.map(o => typeof o === 'string' ? {label: o, value: o} : o) || [];
                     return html`
                        <me-select
                            .value="${val}"
                            .options="${options}"
                            @ui:change="${(e: any) => this.handleInputChange(col.key as string, this.extractValue(e))}"
                            style="width: 100%"
                        ></me-select>`;

                 case 'boolean':
                     return html`
                        <me-switch
                             .value="${!!val}"
                             @ui:change="${(e: any) => this.handleInputChange(col.key as string, e.target.checked)}"
                        ></me-switch>`;
                 case 'date':
                      return html`
                         <me-date-picker
                            .value="${val}"
                            @ui:change="${(e: any) => this.handleInputChange(col.key as string, this.extractValue(e))}"
                         ></me-date-picker>`;
                 case 'string':
                 default:
                     return html`
                        <base-input
                            .value="${val || ''}"
                            type="${type === 'string' ? 'text' : type}"
                            @ui:change="${(e: any) => this.handleInputChange(col.key as string, this.extractValue(e))}"
                        ></base-input>`;

             }
        }

        // 5. View Mode - Default Rendering
        switch (col.type) {
             case 'boolean':
                 return html`<me-switch disabled .value="${!!val}"></me-switch>`;
             case 'select':
                 const selectCol = col as SelectColumn;
                 const option = selectCol.options?.find(opt => (typeof opt === 'object' ? opt.value == val : opt == val));
                 const label = option ? (typeof option === 'object' ? option.label : option) : val;
                 return html`${label}`;
             case 'date':
                 if (!val) return nothing;
                 try {
                     const d = new Date(val);
                     return html`${d.toLocaleDateString()}`;
                 } catch { return html`${val}`; }
             default:
                 return html`${val}`;
        }
    }
}
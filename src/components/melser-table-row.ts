import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { DataRow, TableColumn } from '../core/types';
import './melser-table-cell'; // Ensure element is defined

@customElement('melser-table-row')
export class MelserTableRow extends LitElement {
    @property({ type: Object }) row!: DataRow;
    @property({ type: Array }) columns!: TableColumn[];
    @property({ type: Boolean }) isSelected = false;
    @property({ type: Boolean }) isEditing = false;
    @property({ type: Boolean }) isExpanded = false;
    @property({ type: Object }) editData!: DataRow;
    
    // New Props for Table features
    @property({ type: Boolean }) hasSelection = false;
    @property({ type: Boolean }) hasExpansion = false;
    @property({ type: Object }) icons: any = {};
    @property({ attribute: false }) cellRenderer?: (row: DataRow, col: TableColumn, isEditing: boolean) => any;
    
    // Disable Shadow DOM to allow slot projection from parent
    createRenderRoot() {
        return this;
    }


    // Styles are not used in Light DOM mode - they rely on the parent context
    /*
    static styles = css`
        :host {
            display: contents;
        }
    `;
    */


    private handleExpand(e: Event) {
        e.stopPropagation();
        this.dispatchEvent(new CustomEvent('row-expand', {
            detail: { id: this.row.id },
            bubbles: true,
            composed: true
        }));
    }

    private handleSelect(e: Event) {
        e.stopPropagation();
        this.dispatchEvent(new CustomEvent('row-select', {
            detail: { id: this.row.id, selected: (e.target as HTMLInputElement).checked },
            bubbles: true,
            composed: true
        }));
    }

    render() {
        return html`
            <tr class="data-row ${this.isSelected ? 'selected' : ''} ${this.isEditing ? 'editing' : ''}">
                ${this.hasExpansion ? html`
                    <td style="padding: 0 0 0 1rem; text-align: center;">
                        <button class="expand-btn ${this.isExpanded ? 'expanded' : ''}" 
                                @click=${this.handleExpand}>
                            ${this.icons?.expand || '+'}
                        </button>
                    </td>
                ` : ''}
                
                ${this.hasSelection ? html`
                    <td style="padding-left: 1.5rem">
                        <input type="checkbox" 
                            .checked=${this.isSelected}
                            @change=${this.handleSelect}>
                    </td>
                ` : ''}

                ${this.columns.map(col => html`
                    <td>
                        ${this.cellRenderer 
                            ? this.cellRenderer(this.row, col, this.isEditing) 
                            : this.renderDefaultCell(col)}
                    </td>
                `)}
            </tr>
            
            ${this.isExpanded ? html`
                <tr class="details-row">
                    <td colspan="${this.columns.length + (this.hasSelection ? 1 : 0) + (this.hasExpansion ? 1 : 0)}">
                        <div style="padding: 1rem">
                            <slot name="details-${this.row.id}"></slot>
                        </div>
                    </td>
                </tr>
            ` : ''}
        `;
    }


    private renderDefaultCell(col: TableColumn) {
        // Use MelserTableCell which now handles Registry and Edit modes cleanly
        return html`
            <melser-table-cell
                .row="${this.row}"
                .column="${col}"
                .value="${this.isEditing ? (this.editData?.[col.key as string] ?? this.row[col.key as string]) : this.row[col.key as string]}"
                .isEditing="${this.isEditing && col.editable !== false}"
                .type="${col.type || 'text'}"
                @cell-change="${(e: CustomEvent) => this.dispatchCellChange(col.key as string, e.detail.value)}"
            ></melser-table-cell>

        `;
    }

    private dispatchCellChange(key: string, value: any) {
         this.dispatchEvent(new CustomEvent('cell-change', {
             detail: { key, value },
             bubbles: true,
             composed: true
         }));
    }
}

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { DataRow, TableColumn } from '../core/types';

@customElement('melser-table-row')
export class MelserTableRow extends LitElement {
    @property({ type: Object }) row!: DataRow;
    @property({ type: Array }) columns!: TableColumn[];
    @property({ type: Boolean }) isSelected = false;
    @property({ type: Boolean }) isEditing = false;
    @property({ type: Boolean }) isExpanded = false;
    @property({ type: Object }) editData!: DataRow;
    @property({ type: Function }) onCellChange!: (key: string, value: any) => void;

    static styles = css`
        :host {
            display: contents; /* Importante: permite que el tr se comporte como parte de la tabla */
        }
        
        td {
            padding: var(--cell-padding, 1rem);
            border-bottom: 1px solid var(--border-color, #e5e7eb);
            font-size: var(--font-size-small, 0.875rem);
            vertical-align: middle;
            color: var(--text-color, #374151);
        }
        
        ::slotted(*) {
            width: 100%;
        }
    `;

    render() {
        return html`
            <tr class="data-row ${this.isSelected ? 'selected' : ''} ${this.isEditing ? 'editing' : ''}">
                ${this.columns.map(col => html`
                    <td>
                        <slot name="cell-${String(col.key)}" 
                              .row="${this.row}" 
                              .column="${col}"
                              .value="${this.row[col.key as string]}"
                              .isEditing="${this.isEditing}">
                            ${this.renderDefaultCell(col)}
                        </slot>
                    </td>
                `)}
            </tr>
        `;
    }

    private renderDefaultCell(col: TableColumn) {
        if (this.isEditing && col.editable !== false) {
            return html`
                <input type="text" 
                       .value="${this.editData[col.key as string] || ''}"
                       @input="${(e: Event) => this.onCellChange(col.key as string, (e.target as HTMLInputElement).value)}">
            `;
        }
        return html`${this.row[col.key as string]}`;
    }
}
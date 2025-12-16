import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { DataRow, TableColumn } from '../core/types';
import { InputVar } from '../core/Base';
import './melser-table-cell'; // Ensure element is defined

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
            padding: ${InputVar.padding};
            border-bottom: 1px solid ${InputVar['border-color']};
            font-size: ${InputVar['font-size-small']};
            vertical-align: middle;
            color: ${InputVar['text-color']};
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
        // Use MelserTableCell which now handles Registry and Edit modes cleanly
        return html`
            <melser-table-cell
                .row="${this.row}"
                .column="${col}"
                .value="${this.isEditing ? (this.editData?.[col.key as string] ?? this.row[col.key as string]) : this.row[col.key as string]}"
                .isEditing="${this.isEditing && col.editable !== false}"
                .type="${col.type || 'text'}"
                @cell-change="${(e: CustomEvent) => this.onCellChange(col.key as string, e.detail.value)}"
            ></melser-table-cell>
        `;
    }
}
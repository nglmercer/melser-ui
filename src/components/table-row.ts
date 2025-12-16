import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { DataRow, TableColumn } from '../core/types';
import { InputVar } from '../core/Base';
import './table-cell'; // Ensure element is defined

@customElement('table-row')
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
    // Use Shadow DOM (default)



    // Styles are not used in Light DOM mode - they rely on the parent context
    static styles = css`
        :host {
            display: contents;
        }

        td {
            padding: var(--cell-padding, 1rem); /* Match table.ts padding variable */
            border-bottom: 1px solid ${InputVar['border-color']};
            font-size: ${InputVar['font-size-small']};
            vertical-align: middle;
            color: ${InputVar['text-color']};
            background: ${InputVar.bg}; /* Ensure background matches */
        }

        tr.data-row:hover td {
            background: ${InputVar['bg-disabled']};
        }
        
        tr.selected td {
            background: rgba(${InputVar['focus-ring-color']}, 0.1);
        }
        
        tr.editing td {
             background: ${InputVar['bg-disabled']};
             border-top: 1px solid ${InputVar['border-color']};
             border-bottom: 1px solid ${InputVar['border-color']};
        }

        /* Buttons */
        .expand-btn {
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
        .expand-btn:hover {
            background: ${InputVar['bg-hover']};
            color: ${InputVar['text-color']};
        }
        .expand-btn.expanded {
            transform: rotate(90deg);
            color: ${InputVar['bg']};
        }
        
        /* Details Row */
        tr.details-row td {
            background: ${InputVar['bg-disabled']};
            padding: 0;
            box-shadow: inset 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        /* Access to slotted content needs styling? 
           Usually slotted content is styled by light DOM, but container inside shadow might need resets.
        */
        
        ::slotted(*) {
            width: 100%;
        }
    `;



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
                    <td colspan="${this.columns.length + (this.hasSelection ? 1 : 0) + (this.hasExpansion ? 1 : 0)}" style="width: 100%;">
                        <div style="padding: 1rem; width: 100%; box-sizing: border-box;">
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
            <table-cell
                .row="${this.row}"
                .column="${col}"
                .value="${this.isEditing ? (this.editData?.[col.key as string] ?? this.row[col.key as string]) : this.row[col.key as string]}"
                .isEditing="${this.isEditing && col.editable !== false}"
                .type="${col.type || 'text'}"
                @cell-change="${(e: CustomEvent) => this.dispatchCellChange(col.key as string, e.detail.value)}"
            ></table-cell>

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

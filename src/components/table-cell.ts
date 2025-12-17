import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { DataRow, TableColumn, CellChangeDetail } from '../core/types';
import { InputVar } from '../core/Base';
import { M_EVENTS } from '../types/events';
import { cellRenderers } from '../core/CellRendererRegistry';

@customElement('table-cell')
export class MelserTableCell extends LitElement {
    @property({ type: Object }) row!: DataRow;
    @property({ type: Object }) column!: TableColumn;
    @property({ attribute: false }) value: unknown = '';
    @property({ type: Boolean }) isEditing = false;
    @property({ type: String }) type = 'text';

    static styles = css`
        :host {
            display: block;
            width: 100%;
            color: ${InputVar['text-color']};
            font-size: ${InputVar['font-size']};
        }
        
        .cell-container {
            display: flex;
            align-items: center;
            gap: ${InputVar.gap};
            width: 100%;
        }
        
        .status-badge {
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 500;
            text-transform: uppercase;
        }
        
        .status-active {
            background-color: #d1fae5;
            color: #065f46;
        }
        
        .status-inactive {
            background-color: #fee2e2;
            color: #991b1b;
        }
        
        .status-pending {
            background-color: #fef3c7;
            color: #92400e;
        }
        
        .progress-bar {
            width: 100%;
            height: 8px;
            background-color: ${InputVar['border-color']};
            border-radius: 4px;
            overflow: hidden;
        }
        
        .progress-fill {
            height: 100%;
            background-color: ${InputVar['focus-ring-color']};
            transition: width 0.3s ease;
        }
        
        .avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background-color: ${InputVar['border-color']};
            display: flex;
            align-items: center;
            justify-content: center;
            color: ${InputVar['text-color']};
            font-weight: 600;
            font-size: 0.875rem;
        }
        
        .editable-input {
            width: 100%;
            padding: ${InputVar['padding-small']};
            background-color: ${InputVar.bg};
            border: 1px solid ${InputVar['border-color']};
            border-radius: ${InputVar.radius};
            font-size: inherit;
            color: ${InputVar['text-color']};
            transition: ${InputVar['focus-transition']};
        }
        
        .editable-input:focus {
            outline: none;
            border-color: ${InputVar['focus-ring-color']};
            box-shadow: 0 0 0 2px var(--base-input-focus-ring-color, #3b82f6);
        }
    `;

    render() {
        if (this.isEditing) {
            return this.renderEditMode();
        }

        // 1. Try Registry first
        const registeredRenderer = cellRenderers.getRenderer(this.value, this.row, this.column);
        if (registeredRenderer) {
            return registeredRenderer(this.value, this.row, this.column);
        }
        
        // 2. Fallback to built-in logic
        const cellType = this.type !== 'text' ? this.type : (this.column?.type || 'text');

        switch (cellType) {
            case 'status':
                return this.renderStatusCell();
            case 'progress':
                return this.renderProgressCell();
            case 'avatar':
                return this.renderAvatarCell();
            case 'currency':
                return this.renderCurrencyCell();
            case 'badge':
                return this.renderBadgeCell();
            default:
                return html`<div class="cell-container">${this.value}</div>`;
        }
    }

    private renderEditMode() {
        return html`
            <input class="editable-input"
                   type="${this.type === 'number' ? 'number' : 'text'}"
                   .value="${String(this.value)}"
                   @input="${this.handleInputChange}"
                   @blur="${this.handleBlur}">
        `;
    }

    private renderStatusCell() {
        const val = String(this.value);
        const statusClass = this.getStatusClass(val);
        return html`
            <div class="cell-container">
                <span class="status-badge ${statusClass}">${val}</span>
            </div>
        `;
    }

    private renderProgressCell() {
        const progress = parseInt(String(this.value)) || 0;
        return html`
            <div class="cell-container">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progress}%"></div>
                </div>
                <span>${progress}%</span>
            </div>
        `;
    }

    private renderAvatarCell() {
        const val = String(this.value);
        const initials = this.getInitials(val);
        return html`
            <div class="cell-container">
                <div class="avatar">${initials}</div>
                <span>${val}</span>
            </div>
        `;
    }

    private renderCurrencyCell() {
        const amount = parseFloat(String(this.value)) || 0;
        const formatted = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
        
        return html`
            <div class="cell-container">
                <span>${formatted}</span>
            </div>
        `;
    }

    private renderBadgeCell() {
        const badges = Array.isArray(this.value) ? (this.value as unknown[]) : [String(this.value)];
        return html`
            <div class="cell-container">
                ${badges.map(badge => html`
                    <span class="status-badge status-active">${String(badge)}</span>
                `)}
            </div>
        `;
    }

    private getStatusClass(status: string): string {
        const statusMap: Record<string, string> = {
            'active': 'status-active',
            'inactive': 'status-inactive',
            'pending': 'status-pending',
            'completed': 'status-active',
            'cancelled': 'status-inactive'
        };
        return statusMap[String(status).toLowerCase()] || 'status-pending';
    }

    private getInitials(name: string): string {
        return String(name || '')
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    }

    private handleInputChange(e: Event) {
        const target = e.target as HTMLInputElement;
        this.dispatchEvent(new CustomEvent<CellChangeDetail>(M_EVENTS.CELL_CHANGE, {
            detail: { value: target.value },
            bubbles: true,
            composed: true
        }));
    }

    private handleBlur() {
        // Opcional: dispatch event cuando termina la edición
        this.dispatchEvent(new CustomEvent(M_EVENTS.CELL_EDIT_COMPLETE, {
            detail: { value: this.value },
            bubbles: true,
            composed: true
        }));
    }
}
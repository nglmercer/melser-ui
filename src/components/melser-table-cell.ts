import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { DataRow, TableColumn } from '../core/types';

@customElement('melser-table-cell')
export class MelserTableCell extends LitElement {
    @property({ type: Object }) row!: DataRow;
    @property({ type: Object }) column!: TableColumn;
    @property({ type: String }) value = '';
    @property({ type: Boolean }) isEditing = false;
    @property({ type: String }) type = 'text';

    static styles = css`
        :host {
            display: block;
            width: 100%;
        }
        
        .cell-container {
            display: flex;
            align-items: center;
            gap: 0.5rem;
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
            background-color: #e5e7eb;
            border-radius: 4px;
            overflow: hidden;
        }
        
        .progress-fill {
            height: 100%;
            background-color: #3b82f6;
            transition: width 0.3s ease;
        }
        
        .avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background-color: #6b7280;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 600;
            font-size: 0.875rem;
        }
        
        .editable-input {
            width: 100%;
            padding: 0.25rem 0.5rem;
            border: 1px solid #d1d5db;
            border-radius: 0.375rem;
            font-size: inherit;
        }
        
        .editable-input:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
    `;

    render() {
        if (this.isEditing) {
            return this.renderEditMode();
        }
        
        // Use this.type directly which is passed explicitly, or fall back to column.type if available
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
                   type="${this.type}"
                   .value="${this.value}"
                   @input="${this.handleInputChange}"
                   @blur="${this.handleBlur}">
        `;
    }

    private renderStatusCell() {
        const statusClass = this.getStatusClass(this.value);
        return html`
            <div class="cell-container">
                <span class="status-badge ${statusClass}">${this.value}</span>
            </div>
        `;
    }

    private renderProgressCell() {
        const progress = parseInt(this.value) || 0;
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
        const initials = this.getInitials(this.value);
        return html`
            <div class="cell-container">
                <div class="avatar">${initials}</div>
                <span>${this.value}</span>
            </div>
        `;
    }

    private renderCurrencyCell() {
        const amount = parseFloat(this.value) || 0;
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
        const badges = Array.isArray(this.value) ? this.value : [this.value];
        return html`
            <div class="cell-container">
                ${badges.map(badge => html`
                    <span class="status-badge status-active">${badge}</span>
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
        return statusMap[status.toLowerCase()] || 'status-pending';
    }

    private getInitials(name: string): string {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    }

    private handleInputChange(e: Event) {
        const target = e.target as HTMLInputElement;
        this.dispatchEvent(new CustomEvent('cell-change', {
            detail: { value: target.value },
            bubbles: true,
            composed: true
        }));
    }

    private handleBlur() {
        // Opcional: dispatch event cuando termina la edición
        this.dispatchEvent(new CustomEvent('cell-edit-complete', {
            detail: { value: this.value },
            bubbles: true,
            composed: true
        }));
    }
}
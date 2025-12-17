import { LitElement, html, css,type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { InputVar } from '../core/Base';
import { M_EVENTS } from '../types/events';
import type { DataRow, RowActionDetail } from '../core/types';

export interface ActionIcons {
    edit?: TemplateResult;
    delete?: TemplateResult;
    save?: TemplateResult;
    cancel?: TemplateResult;
    view?: TemplateResult;
    more?: TemplateResult;
    [key: string]: TemplateResult | undefined;
}

@customElement('table-actions')
export class MelserTableActions extends LitElement {
    @property({ type: Object }) row!: DataRow;
    @property({ type: Boolean }) isEditing = false;
    @property({ type: Object }) icons: ActionIcons = {};

    static styles = css`
        :host {
            display: block;
        }
        
        .actions-container {
            display: flex;
            justify-content: flex-end;
            gap: 4px;
        }

        .action-btn {
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
        
        .action-btn:hover {
            background: ${InputVar['bg-hover']};
            color: ${InputVar['text-color']};
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
    `;

    // Default icons if none provided
    private get defaultIcons() {
        return {
            edit: html`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`,
            delete: html`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>`,
            save: html`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
            cancel: html`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
            view: html`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`,
            more: html`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>`
        };
    }

    private dispatchAction(action: string, e: Event) {
        e.stopPropagation();
        this.dispatchEvent(new CustomEvent<RowActionDetail>(M_EVENTS.TABLE_ACTION, {
            detail: { action, row: this.row, id: this.row.id },
            bubbles: true,
            composed: true
        }));
    }

    render() {
        const icons = { ...this.defaultIcons, ...this.icons };

        if (this.isEditing) {
            return html`
                <div class="actions-container">
                    <button class="action-btn save-btn" @click=${(e: Event) => this.dispatchAction('save', e)} title="Save">
                        ${icons.save}
                    </button>
                    <button class="action-btn" @click=${(e: Event) => this.dispatchAction('cancel', e)} title="Cancel">
                         ${icons.cancel}
                    </button>
                </div>
            `;
        }

        return html`
            <div class="actions-container">
                <button class="action-btn" @click=${(e: Event) => this.dispatchAction('edit', e)} title="Edit">
                    ${icons.edit}
                </button>
                <button class="action-btn" @click=${(e: Event) => this.dispatchAction('view', e)} title="View">
                    ${icons.view}
                </button>
                <button class="action-btn delete-btn" @click=${(e: Event) => this.dispatchAction('delete', e)} title="Delete">
                    ${icons.delete}
                </button>
                <button class="action-btn" title="More">
                     ${icons.more}
                </button>
            </div>
        `;
    }
}

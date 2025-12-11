import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { z } from 'zod';
import { ZodFormController } from '../utils/form-controller';
import { Var } from '../theme/tokens';

/**
 * A generic playground form wrapper that handles Zod validation and state management automatically.
 * Useful for documentation examples.
 */
@customElement('melser-playground-form')
export class MelserPlaygroundForm extends LitElement {
    @property({ attribute: false }) schema!: z.ZodSchema;
    @property({ attribute: false }) defaultData: any = {};
    @property({ type: String }) title = 'Interactive Example';
    @property({ type: String }) description = '';

    private form!: ZodFormController<any>;

    // Track if we are initialized
    private _initialized = false;

    constructor() {
        super();
        // Initialize with empty schema temporarily until properties are set
        this.form = new ZodFormController(this, z.object({}), {});
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('ui:change', this.handleUiChange as EventListener);
        // We also listen to submit from any native form button inside
        this.addEventListener('click', this.handleClick);
    }

    protected updated(changedProperties: Map<string, any>): void {
        if (changedProperties.has('schema') || changedProperties.has('defaultData')) {
            if (this.schema) {
                this.form.updateConfig(this.schema, this.defaultData);
                this._initialized = true;
                this.syncInitialValues();
            }
        }

        if (this._initialized) {
            this.syncErrors();
        }
    }

    handleUiChange = (e: CustomEvent) => {
        // Don't stop propagation, let it bubble for other tools
        const { name, value } = e.detail;
        if (name) {
            this.form.setValue(name, value, true);
        }
    };

    handleClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        // Check if it's a submit button
        if (target.matches('button[type="submit"]') || target.closest('button[type="submit"]')) {
            e.preventDefault();
            this.handleSubmit();
        }
    }

    handleSubmit() {
        const isValid = this.form.validate();
        this.requestUpdate();

        if (isValid) {
            console.log('✅ Playground Form Valid:', this.form.data);
            this.dispatchEvent(new CustomEvent('playground:submit', {
                detail: { data: this.form.data, isValid },
                bubbles: true
            }));
        } else {
            console.warn('❌ Playground Form Invalid:', this.form.errors);
        }
    }

    /**
     * Pushes initial data values to the inputs if they are empty
     */
    syncInitialValues() {
        const inputs = this.querySelectorAll('[name]');
        inputs.forEach((el: any) => {
            const name = el.getAttribute('name') || el.name;
            if (name && this.form.data[name] !== undefined) {
                // Only set if the element supports it
                if ('value' in el) {
                    // Don't overwrite if user already typed? 
                    // For initial load it's fine.
                    el.value = this.form.data[name];
                }
                if ('checked' in el && typeof this.form.data[name] === 'boolean') {
                    el.checked = this.form.data[name];
                }
            }
        });
    }

    syncErrors() {
        const inputs = this.querySelectorAll('[name]');
        inputs.forEach((el: any) => {
            const name = el.getAttribute('name') || el.name;
            if (name) {
                const error = this.form.getError(name);
                // Set errorMessage property if it exists (Melser components)
                if ('errorMessage' in el) {
                    el.errorMessage = error || '';
                }
                // Set invalid attribute
                if (error) {
                    el.setAttribute('invalid', '');
                } else {
                    el.removeAttribute('invalid');
                }
            }
        });
    }

    render() {
        return html`
      <div class="playground-layout">
        <div class="form-section">
            ${this.title ? html`<h3 class="form-title">${this.title}</h3>` : ''}
            ${this.description ? html`<p class="form-desc">${this.description}</p>` : ''}
            
            <form class="slot-container" @submit=${(e: Event) => e.preventDefault()}>
                <slot></slot>
            </form>
            
            <div class="actions">
               <button class="validate-btn" @click=${this.handleSubmit}>Validate & Submit</button>
            </div>
        </div>
        
        <div class="debug-section">
            <div class="debug-header">
               <span>Live State</span>
               <span class="badge ${this.form.isValid ? 'valid' : 'invalid'}">
                 ${this.form.isValid ? 'Valid' : 'Invalid'}
               </span>
            </div>
            <pre class="debug-content">${JSON.stringify(this.form.data, null, 2)}</pre>
            
            ${Object.keys(this.form.errors).length > 0 ? html`
                <div class="debug-header errors-header">
                   <span>Errors</span>
                </div>
                <pre class="debug-content errors">${JSON.stringify(this.form.errors, null, 2)}</pre>
            ` : ''}
        </div>
      </div>
    `;
    }

    static styles = css`
    :host {
      display: block;
      font-family: ${Var.font.family};
    }

    .playground-layout {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
        background: ${Var.color.bg.default};
        border: 1px solid ${Var.color.border.default};
        border-radius: ${Var.radius.default};
        overflow: hidden;
    }

    @media (min-width: 768px) {
        .playground-layout {
            grid-template-columns: 3fr 2fr;
        }
    }

    .form-section {
        padding: 2rem;
    }

    .form-title {
        margin: 0 0 0.5rem 0;
        font-size: 1.25rem;
        color: ${Var.color.text.primary};
    }

    .form-desc {
        margin: 0 0 1.5rem 0;
        color: ${Var.color.text.secondary};
        font-size: 0.875rem;
    }

    .slot-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .actions {
        margin-top: 1.5rem;
        padding-top: 1.5rem;
        border-top: 1px dashed ${Var.color.border.default};
    }

    .validate-btn {
        background: ${Var.color.primary};
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: ${Var.radius.default};
        font-weight: 600;
        cursor: pointer;
        transition: opacity 0.2s;
    }
    .validate-btn:hover {
        opacity: 0.9;
    }

    .debug-section {
        background: #f8fafc; /* Slate 50 */
        border-left: 1px solid ${Var.color.border.default};
        padding: 1.5rem;
        font-size: 0.85rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .debug-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: ${Var.color.text.secondary};
        font-size: 0.75rem;
    }

    .debug-content {
        background: white;
        padding: 1rem;
        border-radius: ${Var.radius.default};
        border: 1px solid ${Var.color.border.default};
        margin: 0;
        overflow-x: auto;
        font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
        color: ${Var.color.text.primary};
    }
    
    .debug-content.errors {
        color: ${Var.color.error};
        background: #fef2f2;
        border-color: #fecaca;
    }

    .badge {
        padding: 0.25rem 0.5rem;
        border-radius: 999px;
        font-size: 0.7rem;
        font-weight: 700;
    }
    
    .badge.valid {
        background: #dcfce7;
        color: #166534;
    }
    
    .badge.invalid {
        background: #fee2e2;
        color: #991b1b;
    }
  `;
}

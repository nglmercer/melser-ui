import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { z } from 'zod';
import { ZodFormController } from '../utils/form-controller';
import { Var, setTheme } from '../theme/tokens';

export const playgroundSchema = z.object({
    fullName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    email: z.string().email("Email inválido"),
    phone: z.string().optional(),
    website: z.string().url("URL inválida").optional().or(z.literal(''))
});

// Schema Registry
export const schemas: Record<string, z.ZodSchema> = {
    'default': playgroundSchema,
    'text-input': playgroundSchema,
    'textarea': z.object({
        message: z.string().min(10, "Mínimo 10 caracteres").max(500, "Máximo 500 caracteres"),
        additionalInfo: z.string().optional()
    }),
    'checkbox': z.object({
        terms: z.boolean().refine(val => val === true, "Es obligatorio aceptar los términos")
    }),
    'radio': z.object({
        opinion: z.string().min(1, "Debes seleccionar una opinión"),
        experience: z.string().optional(),
        preference: z.string().optional()
    }),
    'select': z.object({
        country: z.string().min(1, "Selecciona tu país"),
        city: z.string().optional(),
        gender: z.string().optional()
    }),
    'switch': z.object({
        premium: z.boolean().default(false),
        dev: z.boolean().default(false),
        autosave: z.boolean().default(true),
        sound: z.boolean().default(true),
        music: z.boolean().default(true),
        vibration: z.boolean().default(false),
        gameNotifications: z.boolean().default(true)
    })
};

/**
 * A generic playground form wrapper that handles Zod validation and state management automatically.
 * Useful for documentation examples.
 */
@customElement('melser-playground-form')
export class MelserPlaygroundForm extends LitElement {
    @property({ attribute: 'schema-name' }) schemaName = '';
    @property({ attribute: false }) schema: z.ZodSchema = playgroundSchema;
    @property({ attribute: false }) defaultData: any = {};
    @property({ type: String }) title = 'Interactive Example';
    @property({ type: String }) description = '';

    private form!: ZodFormController<any>;

    // Track if we are initialized
    private _initialized = false;

    @state() private _theme: 'light' | 'dark' = 'light';

    constructor() {
        super();
        this.form = new ZodFormController(this, this.schema, {});
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('ui:change', this.handleUiChange as EventListener);
        // We also listen to submit from any native form button inside
        this.addEventListener('click', this.handleClick);
        this.syncInitialValues();
    }

    protected firstUpdated(): void {
        // Look up schema by name if provided
        if (this.schemaName && schemas[this.schemaName]) {
            this.schema = schemas[this.schemaName];
        }

        // Ensure initialized with default schema if no props changed
        if (!this._initialized) {
            this.form.updateConfig(this.schema, this.defaultData);
            this._initialized = true;
            this.syncInitialValues();
            this.syncErrors();
        }
    }

    protected updated(changedProperties: Map<string, any>): void {
        if (changedProperties.has('schemaName')) {
            if (this.schemaName && schemas[this.schemaName]) {
                this.schema = schemas[this.schemaName];
                // We might need to trigger another update or handle it directly
                this.form.updateConfig(this.schema, this.defaultData);
                this.syncInitialValues();
            }
        }

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
        e.preventDefault();
        if (target.matches('button[type="submit"]') || target.closest('button[type="submit"]')) {
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

    toggleTheme() {
        this._theme = this._theme === 'light' ? 'dark' : 'light';
        setTheme(this._theme);
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
            <div class="debug-header" style="margin-top: 0.5rem; justify-content: flex-end;">
                 <button class="theme-btn" @click=${this.toggleTheme}>
                    ${this._theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
                 </button>
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
        background: ${Var.color.surface.variant};
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
        background: ${Var.color.surface.primary};
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

    .theme-btn {
        background: transparent;
        border: 1px solid ${Var.color.border.default};
        color: ${Var.color.text.secondary};
        padding: 0.25rem 0.5rem;
        border-radius: ${Var.radius.default};
        font-size: 0.75rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.25rem;
    }
    .theme-btn:hover {
        background: ${Var.color.bg.hover};
        color: ${Var.color.text.primary};
    }
  `;
}

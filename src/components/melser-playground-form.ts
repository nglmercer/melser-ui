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

    'switch': z.object({
        premium: z.boolean().default(false),
        dev: z.boolean().default(false),
        autosave: z.boolean().default(true),
        sound: z.boolean().default(true),
        music: z.boolean().default(true),
        vibration: z.boolean().default(false),
        gameNotifications: z.boolean().default(true)
    }),
    'password-input': z.object({
        currentPassword: z.string().min(1, "La contraseña actual es requerida"),
        newPassword: z.string().min(8, "La nueva contraseña debe tener al menos 8 caracteres"),
        confirmPassword: z.string().min(1, "Confirma la contraseña")
    }).refine((data) => data.newPassword === data.confirmPassword, {
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
    }),
    'number-input': z.object({
        age: z.number().min(18, "Debes ser mayor de 18 años").max(100, "Edad máxima 100").optional(),
        price: z.number().min(0, "El precio no puede ser negativo").optional(),
        quantity: z.number().min(1, "Mínimo 1 unidad").max(50, "Máximo 50 unidades").optional(),
        discount: z.number().min(0, "Mínimo 0%").max(50, "Máximo 50%").optional()
    }),
    'otp-input': z.object({
        email: z.string().email("Correo electrónico inválido").optional(),
        otpCode: z.string().min(6, "El código debe tener 6 dígitos").max(6, "El código debe tener 6 dígitos"),
        rememberDevice: z.boolean().optional()
    }),
    'color-picker': z.object({
        primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Debe ser un código hexadecimal válido (ej: #FF0000)"),
        backgroundColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Debe ser un código hexadecimal válido").optional()
    }),
    'tags-input': z.object({
        title: z.string().min(5, "El título es muy corto"),
        tags: z.array(z.string()).min(1, "Debes agregar al menos una etiqueta").max(8, "Máximo 8 etiquetas"),
        published: z.boolean().optional()
    }),
    'file-upload': z.object({
        demoImage: z.any().optional(),
        demoFiles: z.any().optional()
    }),
    'date-picker': z.object({
        eventDate: z.string().min(1, "Debe seleccionar una fecha"),
        enrollmentRange: z.union([z.string(), z.array(z.string())]).optional(),
        breakDates: z.union([z.string(), z.array(z.string())]).optional(),
        creationYear: z.string().optional()
    }),
    'time-picker': z.object({
        startTime: z.string().min(1, "Hora de inicio requerida"),
        endTime: z.string().min(1, "Hora de fin requerida"),
        breakTime: z.string().optional(),
        reminder: z.string().optional()
    }),
    'range': z.object({
        brightness: z.coerce.number().min(0).max(100),
        volume: z.coerce.number().min(0).max(100)
    }),
    'dual-range': z.object({
        priceRange: z.array(z.coerce.number()).length(2).optional(),
        sizeRange: z.array(z.coerce.number()).length(2).optional(),
        distanceRange: z.array(z.coerce.number()).length(2).optional()
    }),
    'select': z.object({
        country: z.string().min(1, "Selecciona una opción"),
        city: z.string().optional(),
        gender: z.string().optional()
    }),
    'multi-select': z.object({
        subjects: z.array(z.string()).min(1, "Selecciona al menos una materia"),
        frameworks: z.array(z.string()).min(1, "Selecciona al menos un framework").optional()
    }),
    'combobox': z.object({
        language: z.string().min(1, "Selecciona un lenguaje")
    })
};

/**
 * A generic playground form wrapper that handles Zod validation and state management automatically.
 * Useful for documentation examples.
 */
@customElement('me-playground-form')
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
    @state() private _colorScheme: 'primary' | 'success' | 'warning' | 'danger' = 'primary';

    constructor() {
        super();
        this.form = new ZodFormController(this, this.schema, {});
    }

    connectedCallback() {
        super.connectedCallback();
        // Custom Event from Melser Components
        this.addEventListener('ui:change', this.handleUiChange as EventListener);

        // Native Events for standard inputs
        this.addEventListener('input', this.handleNativeInput);
        this.addEventListener('change', this.handleNativeChange);

        // We also listen to submit from any native form button inside
        this.addEventListener('click', this.handleClick);
        this.syncInitialValues();

        // Listen to theme updates if any
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
                this.syncErrors();
            }
        }

        if (changedProperties.has('schema') || changedProperties.has('defaultData')) {
            if (this.schema) {
                this.form.updateConfig(this.schema, this.defaultData);
                this._initialized = true;
                this.syncInitialValues();
                this.syncErrors();
            }
        }

        if (changedProperties.has('_colorScheme')) {
            this.syncColors();
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

    handleNativeInput = (e: Event) => {
        const target = e.target as HTMLInputElement;
        // Ignore Melser components that might bubble input
        if (target.tagName.includes('-')) return;

        const name = target.getAttribute('name') || target.name;
        if (name) {
            this.form.setValue(name, target.value, true);
        }
    }

    handleNativeChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        if (target.tagName.includes('-')) return;

        const name = target.getAttribute('name') || target.name;
        if (name) {
            let value: any = target.value;
            if (target.type === 'checkbox') {
                value = target.checked;
            } else if (target.type === 'number') {
                value = target.value === '' ? undefined : Number(target.value);
            }
            this.form.setValue(name, value, true);
        }
    }

    handleClick = (e: MouseEvent) => {
        const path = e.composedPath();
        const target = path[0] as HTMLElement;

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
            
            // Visual feedback: Change color scheme to warning (as requested)
            this._colorScheme = 'warning';
            this.syncColors();

            this.dispatchEvent(new CustomEvent('playground:submit', {
                detail: { data: this.form.data, isValid },
                bubbles: true
            }));
        } else {
            console.warn('❌ Playground Form Invalid:', this.form.errors);
            // Optional: revert to danger or primary on error?
            // this._colorScheme = 'danger'; 
        }
    }

    handleReset() {
        this.form.updateConfig(this.schema, this.defaultData);
        // Clear inputs visually
        const inputs = this.querySelectorAll<HTMLInputElement>('[name]');
        inputs.forEach(el => {
            const name = el.getAttribute('name') || el.name;
            if (!name) return;
            const initialVal = this.defaultData[name]; // undefined if not in defaultData

            // Checkbox/Radio
            if ('checked' in el && (el.type === 'checkbox' || el.type === 'radio')) {
                el.checked = !!initialVal;
            }
            // Value based inputs
            else if ('value' in el) {
                el.value = initialVal !== undefined ? String(initialVal) : '';
            }

            // Reset UI error state for Melser components
            if ('errorMessage' in el) {
                (el as any).errorMessage = '';
            }
            // Reset invalid attribute
            el.removeAttribute('invalid');
        });

        this.requestUpdate();
    }

    toggleTheme() {
        this._theme = this._theme === 'light' ? 'dark' : 'light';
        setTheme(this._theme);
    }

    /**
     * Pushes initial data values to the inputs if they are empty
     */
    syncInitialValues() {
        const inputs = this.querySelectorAll<HTMLElement>('[name]');
        inputs.forEach(el => {
            const name = el.getAttribute('name') || (el as any).name;
            if (name && this.form.data[name] !== undefined) {
                const value = this.form.data[name];

                // Handle Checkboxes/Switches
                if ('checked' in el) {
                    (el as any).checked = value === true;
                }
                // Handle Value
                else if ('value' in el) {
                    (el as any).value = value;
                }
            }
        });
    }

    syncErrors() {
        const inputs = this.querySelectorAll<HTMLElement>('[name]');
        inputs.forEach(el => {
            const name = el.getAttribute('name') || (el as any).name;
            if (name) {
                const error = this.form.getError(name);
                // Set errorMessage property if it exists (Melser components)
                if ('errorMessage' in el) {
                    (el as any).errorMessage = error || '';
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

    syncColors() {

        // Recursive function to find and update nested components if needed, 
        // but finding direct named inputs or iterating everything is safer.
        // We'll traverse the light DOM of the playground.
        const traverse = (element: Element) => {
            if ('color' in element) {
                (element as any).color = this._colorScheme;
            }
            Array.from(element.children).forEach(child => traverse(child));
        };
        
        Array.from(this.children).forEach(child => traverse(child));
    }

    handleColorChange(e: Event) {
        const select = e.target as HTMLSelectElement;
        this._colorScheme = select.value as any;
    }

    render() {
        return html`
      <div class="playground-layout">
        <div class="form-section">
            <div class="header-row">
                ${this.title ? html`<h3 class="form-title">${this.title}</h3>` : ''}
                ${this.description ? html`<p class="form-desc">${this.description}</p>` : ''}
            </div>
            
            <form class="slot-container" @submit=${(e: Event) => e.preventDefault()}>
                <slot></slot>
            </form>
            
            <div class="actions">
                <button class="btn validate-btn" @click=${this.handleSubmit}>Validate & Submit</button>
                <button class="btn reset-btn" @click=${this.handleReset}>Reset</button>
            </div>
        </div>
        
        <div class="debug-section">
            <div class="debug-header">
               <span>Live State</span>
               <div style="display: flex; gap: 0.5rem; align-items: center;">
                    <select class="color-select" @change=${this.handleColorChange} .value=${this._colorScheme}>
                        <option value="primary">Primary</option>
                        <option value="success">Success</option>
                        <option value="warning">Warning</option>
                        <option value="danger">Danger</option>
                    </select>

                    <span class="badge ${this.form.isValid ? 'valid' : 'invalid'}">
                        ${this.form.isValid ? 'Valid' : 'Invalid'}
                    </span>
                    <button class="theme-btn" @click=${this.toggleTheme} title="Toggle Theme">
                        ${this._theme === 'light' ? '🌙' : '☀️'}
                    </button>
               </div>
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
        background: ${Var.color.bg.default};
        border: 1px solid ${Var.color.border.default};
        border-radius: ${Var.radius.default};
        overflow: hidden;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    }

    @media (min-width: 900px) {
        .playground-layout {
            grid-template-columns: 3fr 2fr;
        }
    }

    .form-section {
        padding: 2rem;
        border-right: 1px solid ${Var.color.border.default};
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .header-row {
        margin-bottom: 2rem;
    }

    .form-title {
        margin: 0 0 0.5rem 0;
        font-size: 1.5rem;
        font-weight: 700;
        color: ${Var.color.text.primary};
        letter-spacing: -0.025em;
    }

    .form-desc {
        margin: 0;
        color: ${Var.color.text.secondary};
        font-size: 0.95rem;
        line-height: 1.5;
    }

    .slot-container {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
    }

    .actions {
        margin-top: 2rem;
        padding-top: 1.5rem;
        border-top: 1px solid ${Var.color.border.default};
        display: flex;
        gap: 1rem;
    }

    .btn {
        padding: 0.75rem 1.5rem;
        border-radius: ${Var.radius.default};
        font-weight: 600;
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.2s;
        border: 1px solid transparent;
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }

    .validate-btn {
        background: ${Var.color.primary};
        color: white;
        box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
    }
    .validate-btn:hover {
        filter: brightness(1.1);
        transform: translateY(-1px);
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    }
    .validate-btn:active {
        transform: translateY(0);
    }

    .reset-btn {
        background: transparent;
        color: ${Var.color.text.secondary};
        border-color: ${Var.color.border.default};
    }
    .reset-btn:hover {
        background: ${Var.color.bg.hover};
        color: ${Var.color.text.primary};
        border-color: ${Var.color.text.secondary};
    }

    .debug-section {
        background: ${Var.color.surface.variant};
        padding: 1.5rem;
        font-size: 0.85rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        max-height: 600px;
        overflow-y: auto;
    }

    .debug-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: ${Var.color.text.secondary};
        font-size: 0.75rem;
        margin-bottom: 0.25rem;
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
        font-size: 0.8rem;
        line-height: 1.4;
    }
    
    .debug-content.errors {
        color: ${Var.color.error};
        background: #fef2f2;
        border-color: #fecaca;
    }
    :host([theme="dark"]) .debug-content.errors {
        background: #450a0a;
        border-color: #7f1d1d;
    }

    .badge {
        padding: 0.25rem 0.6rem;
        border-radius: 999px;
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
    }
    
    .badge.valid {
        background: #dcfce7;
        color: #166534;
    }
    :host([theme="dark"]) .badge.valid {
         background: #14532d;
         color: #dcfce7;
    }
    
    .badge.invalid {
        background: #fee2e2;
        color: #991b1b;
    }
    :host([theme="dark"]) .badge.invalid {
        background: #7f1d1d;
        color: #fee2e2;
    }

    .theme-btn {
        background: transparent;
        border: 1px solid ${Var.color.border.default};
        color: ${Var.color.text.secondary};
        width: 28px;
        height: 28px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        padding: 0;
        font-size: 1rem;
        transition: all 0.2s;
    }
    .theme-btn:hover {
        background: ${Var.color.bg.hover};
        color: ${Var.color.text.primary};
        border-color: ${Var.color.text.secondary};
    }

    .color-select {
        padding: 0.25rem 0.5rem;
        border-radius: ${Var.radius.default};
        border: 1px solid ${Var.color.border.default};
        background: transparent;
        color: ${Var.color.text.secondary};
        font-size: 0.8rem;
        cursor: pointer;
    }
  `;
}

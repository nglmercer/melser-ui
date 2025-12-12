
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { z } from 'zod';
import { ZodFormController } from '../utils/form-controller';
import { Var } from '../theme/tokens';

// Import basic components
import './base-input';
import './melser-number-input';
import './melser-switch';
import './melser-checkbox';
import './melser-select';
import './melser-date-picker';
// Add others as needed

@customElement('me-schema-form')
export class MelserSchemaForm extends LitElement {
    @property({ attribute: false }) schema!: z.ZodObject<any>;
    @property({ attribute: false }) defaultData: any = {};
    @property({ type: Boolean }) showSubmit = true;
    @property({ type: String }) submitLabel = 'Submit';

    public form: ZodFormController<any>;

    constructor() {
        super();
        this.form = new ZodFormController(this, z.object({}), {});
    }

    connectedCallback() {
        super.connectedCallback();
        // Initialize form logic
        this.initForm();
    }

    updated(changedProps: Map<string, any>) {
        if (changedProps.has('schema') || changedProps.has('defaultData')) {
            this.initForm();
        }
    }

    private initForm() {
        if (this.schema) {
            this.form.updateConfig(this.schema, { ...this.defaultData });
        }
    }

    // Public methods to interact with the form
    public setData(data: any) {
        this.defaultData = data;
        this.form.updateConfig(this.schema, data);
    }

    public clearData() {
        this.defaultData = {};
        this.form.updateConfig(this.schema, {});
    }

    public submit() {
        if (this.form.validate()) {
            this.dispatchEvent(new CustomEvent('submit', {
                detail: { data: this.form.data },
                bubbles: true,
                composed: true
            }));
            return this.form.data;
        }
        return null;
    }

    private handleUiChange(name: string, e: CustomEvent) {
        const target = e.target as any;
        let value = target.value;
        
        // Basic Checkbox/Switch handling
        if (target.type === 'checkbox' || target.tagName.toLowerCase() === 'me-checkbox' || target.tagName.toLowerCase() === 'me-switch') {
             value = target.checked !== undefined ? target.checked : target.value;
        }

        // Type-Specific Conversion based on Schema
        if (this.schema && this.schema.shape && this.schema.shape[name]) {
            const fieldType = this.getZodType(this.schema.shape[name]);
            
            if (fieldType === 'number') {
                 // Convert to number, or undefined if empty string to avoid 0
                 if (value === '' || value === null || value === undefined) {
                     value = undefined; 
                 } else {
                     const num = Number(value);
                     value = isNaN(num) ? value : num; // Keep original if NaN (let Zod handle validation error)
                 }
            } else if (fieldType === 'boolean') {
                 // If not handled by checkbox logic above
                 if (typeof value === 'string') value = value === 'true';
            } else if (fieldType === 'date') {
                // Convert string to Date - siempre convertir para mantener consistencia
                if (typeof value === 'string' && value) {
                    const d = new Date(value);
                    if (!isNaN(d.getTime())) {
                        value = d;
                    } else {
                        // Si la fecha es inválida, mantener como string vacío
                        value = undefined;
                    }
                } else if (value === '') {
                    // Convertir string vacío a undefined para campos opcionales
                    value = undefined;
                }
            }
        }
        
        console.log(`[SchemaForm] Setting value for ${name}:`, value, typeof value);
        this.form.setValue(name, value, true);
    }

    private getZodType(schema: z.ZodTypeAny): string {
        if (!schema) {
            return 'unknown';
        }

        let current = schema;
        let depth = 0;
        
        // Unwrap optional/nullable/default/effects
        while (depth < 10) {
            const def = (current as any)._def;
            if (!def) break;
            
            const tName = def.typeName;
            const cName = current.constructor.name;
            
            const isWrapper = 
                tName === 'ZodOptional' || tName === 'ZodNullable' || tName === 'ZodDefault' || tName === 'ZodEffects' ||
                cName === 'ZodOptional' || cName === 'ZodNullable' || cName === 'ZodDefault' || cName === 'ZodEffects';

            if (isWrapper) {
                if (def.innerType) current = def.innerType;
                else if (def.schema) current = def.schema;
                else break;
            } else {
                break;
            }
            depth++;
        }

        const def = (current as any)._def;
        const tName = def?.typeName;
        const cName = current.constructor.name;
        
        if (tName === 'ZodString' || cName.includes('ZodString')) return 'string';
        if (tName === 'ZodNumber' || cName.includes('ZodNumber')) return 'number';
        if (tName === 'ZodBoolean' || cName.includes('ZodBoolean')) return 'boolean';
        if (tName === 'ZodEnum' || tName === 'ZodNativeEnum' || cName.includes('ZodEnum') || cName.includes('ZodNativeEnum')) return 'enum';
        if (tName === 'ZodDate' || cName.includes('ZodDate')) return 'date';
        if (tName === 'ZodArray' || cName.includes('ZodArray')) return 'array';

        // Debugging fallback if still unknown
        console.warn('[SchemaForm] Unknown type:', { tName, cName, keys: def ? Object.keys(def) : [] });
        return 'unknown';
    }

    private renderField(key: string, fieldSchema: z.ZodTypeAny) {
        const type = this.getZodType(fieldSchema);
        const value = this.form.data[key];
        const error = this.form.getError(key);
        const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'); 
        
        // Extract optional possibilities for Select
        let options: {label: string, value: string}[] = [];
        let current = fieldSchema;
        
        // Unwrap logic for options
        let depth = 0;
        while (depth < 10) {
             const def = (current as any)._def;
             if (!def) break;
             
             const tName = def.typeName;
             const cName = current.constructor.name;
             
             const isWrapper = 
                tName === 'ZodOptional' || tName === 'ZodNullable' || tName === 'ZodDefault' || tName === 'ZodEffects' ||
                cName === 'ZodOptional' || cName === 'ZodNullable' || cName === 'ZodDefault' || cName === 'ZodEffects';

             if (isWrapper) {
                if (def.innerType) current = def.innerType;
                else if (def.schema) current = def.schema;
                else break;
             } else {
                 break;
             }
             depth++;
        }

        const cName = current.constructor.name;
        const tName = (current as any)._def?.typeName;

        if (tName === 'ZodEnum' || cName.includes('ZodEnum')) {
            const opts = (current as any).options || (current as any)._def?.values;
            if (Array.isArray(opts)) {
                options = opts.map((o: string) => ({ label: o, value: o }));
            }
        } else if (tName === 'ZodNativeEnum' || cName.includes('ZodNativeEnum')) {
            const enumObj = (current as any).enum || (current as any)._def?.values;
             if (enumObj) {
                options = Object.values(enumObj)
                    .filter(v => typeof v === 'string' || typeof v === 'number')
                    .map((v: any) => ({ label: String(v), value: String(v) }));
             }
        }

        switch (type) {
            case 'string':
                const isPassword = key.toLowerCase().includes('password');
                const iType = isPassword ? 'password' : 'text';
                
                return html`
                    <base-input
                        name="${key}"
                        label="${label}"
                        type="${iType}"
                        value="${value || ''}"
                        .errorMessage="${error || ''}"
                        @change="${(e: any) => this.handleUiChange(key, e)}"
                        @ui:change="${(e: any) => this.handleUiChange(key, e)}"
                        @input="${(e: any) => this.handleUiChange(key, e)}"
                    ></base-input>
                `;
            case 'number':
                return html`
                    <me-number-input
                        name="${key}"
                        label="${label}"
                        .value="${Number(value) || 0}"
                        .errorMessage="${error || ''}"
                        @change="${(e: any) => this.handleUiChange(key, e)}"
                        @ui:change="${(e: any) => this.handleUiChange(key, e)}"
                    ></me-number-input>
                `;
            case 'boolean':
                return html`
                    <me-switch
                        name="${key}"
                        label="${label}"
                        .value="${!!value}"
                        .errorMessage="${error || ''}"
                        @change="${(e: any) => this.handleUiChange(key, e)}"
                        @ui:change="${(e: any) => this.handleUiChange(key, e)}"
                    ></me-switch>
                `;
            case 'date':
                // Convertir Date a string ISO para el input date
                let dateValue = '';
                if (value) {
                    if (value instanceof Date) {
                        const year = value.getFullYear();
                        const month = String(value.getMonth() + 1).padStart(2, '0');
                        const day = String(value.getDate()).padStart(2, '0');
                        dateValue = `${year}-${month}-${day}`;
                    } else if (typeof value === 'string') {
                        dateValue = value;
                    }
                }
                return html`
                    <me-date-picker
                        name="${key}"
                        label="${label}"
                        value="${dateValue}"
                        .errorMessage="${error || ''}"
                        @change="${(e: any) => this.handleUiChange(key, e)}"
                        @ui:change="${(e: any) => this.handleUiChange(key, e)}"
                    ></me-date-picker>
                `;
            case 'enum':
                return html`
                    <me-select
                        name="${key}"
                        label="${label}"
                        .value="${value || ''}"
                        .options="${options}"
                        .errorMessage="${error || ''}"
                        @change="${(e: any) => this.handleUiChange(key, e)}"
                        @ui:change="${(e: any) => this.handleUiChange(key, e)}"
                    ></me-select>
                `;
            default:
                // Debug Information only if truly unknown
                 return html`
                    <div style="color: red; padding: 10px; border: 1px dashed red; margin-bottom: 5px;">
                         <strong>Unknown Type: ${key}</strong><br/>
                         Detected: ${type}<br/>
                         Constructor: ${cName}
                    </div>
                `;
        }
    }

    render() {
        if (!this.schema) return nothing;
        
        const shape = this.schema.shape;
        const keys = Object.keys(shape);

        return html`
            <form @submit="${(e: Event) => { e.preventDefault(); this.submit(); }}" class="schema-form">
                <div class="fields-grid">
                    ${keys.map(key => html`
                        <div class="field-item">
                            ${this.renderField(key, shape[key])}
                        </div>
                    `)}
                </div>
                
                ${this.showSubmit ? html`
                    <div class="form-actions">
                        <button type="submit" class="submit-btn">${this.submitLabel}</button>
                    </div>
                ` : nothing}
            </form>
        `;
    }

    static styles = css`
        :host {
            display: block;
        }
        .schema-form {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }
        .fields-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1rem;
        }
        @media(min-width: 600px) {
            .fields-grid {
                 /* Optional: grid-template-columns: 1fr 1fr; for denser forms if desired */
            }
        }
        .form-actions {
            display: flex;
            justify-content: flex-start;
        }
        .submit-btn {
            background-color: ${Var.color.primary};
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: ${Var.radius.default};
            cursor: pointer;
            font-weight: 600;
            transition: opacity 0.2s;
        }
        .submit-btn:hover {
            opacity: 0.9;
        }
    `;
}

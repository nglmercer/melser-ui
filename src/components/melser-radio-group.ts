import { html, css } from 'lit';
import { customElement, property, state,query } from 'lit/decorators.js';
import { MelserBaseInput } from '../core/melser-base-input';
import type { MelserDataType, SelectOption } from '../types/index';

interface InternalOption extends SelectOption {
  disabled?: boolean;
  group?: string; // Para manejar los títulos de fieldset/legend
  inputName?: string; // Por si el usuario fuerza un name distinto por opción
}

@customElement('melser-radio-group')
export class MelserRadioGroup extends MelserBaseInput<string> {
  @property({ type: String }) value = '';
  @property({ type: Array }) options: InternalOption[] = [];
  @query('input') inputElement!: HTMLInputElement;
  @state() private _renderedOptions: InternalOption[] = [];

  readonly dataType: MelserDataType = 'string';

  override firstUpdated() {
    this.syncOptions();
    if (!this.name) {
       this.name = `melser-radio-${Math.random().toString(36).substr(2, 9)}`;
    }
  }

  private syncOptions() {
    // 1. Si hay opciones por JS, usarlas
    if (this.options && this.options.length > 0) {
      this._renderedOptions = [...this.options];
      return;
    }

    // 2. Leer del Slot (HTML) inteligentemente
    const newOptions: InternalOption[] = [];
    const children = Array.from(this.children);

    children.forEach(child => {
      const tagName = child.tagName.toLowerCase();

      // CASO A: <fieldset> con <legend> (Tu caso de uso)
      if (tagName === 'fieldset') {
        const fieldset = child as HTMLFieldSetElement;
        const legend = fieldset.querySelector('legend')?.textContent || '';
        
        // Buscar options dentro del fieldset
        const nestedOptions = Array.from(fieldset.querySelectorAll('option'));
        nestedOptions.forEach(opt => this._extractOption(opt, newOptions, legend));
      }
      
      // CASO B: <optgroup> (Estándar HTML select)
      else if (tagName === 'optgroup') {
        const groupLabel = (child as HTMLOptGroupElement).label;
        const groupOptions = Array.from(child.querySelectorAll('option'));
        groupOptions.forEach(opt => this._extractOption(opt, newOptions, groupLabel));
      }

      // CASO C: <option> directo
      else if (tagName === 'option') {
        this._extractOption(child as HTMLOptionElement, newOptions);
      }
    });

    this._renderedOptions = newOptions;
  }

  // Helper para extraer datos de una etiqueta <option>
  private _extractOption(opt: HTMLOptionElement, list: InternalOption[], groupName?: string) {
    // Aquí está la corrección clave: leemos 'label' attr O textContent
    const labelText = opt.getAttribute('label') || opt.textContent || opt.value;
    
    list.push({
      label: labelText,
      value: opt.value,
      disabled: opt.hasAttribute('disabled'),
      inputName: opt.getAttribute('name') || undefined, // Soporte para names mixtos
      group: groupName
    });

    if (opt.hasAttribute('selected') && !this.value) {
      this.value = opt.value;
    }
  }

  handleChange(e: Event, optionValue: string) {
    const input = e.target as HTMLInputElement;
    if (input.checked) {
      this.value = optionValue;
      this.dispatchChange();
    }
  }

  render() {
    return html`
      <div class="input-wrapper">
        ${this.label ? html`<label class="main-label">${this.label}</label>` : ''}
        
        <slot style="display: none" @slotchange="${this.syncOptions}"></slot>

        <div class="radio-group" role="radiogroup">
          ${this._renderedOptions.map((opt, index) => {
            // Lógica para mostrar Título de Grupo (simulando legend)
            const prevOpt = this._renderedOptions[index - 1];
            const showGroupHeader = opt.group && (!prevOpt || prevOpt.group !== opt.group);

            return html`
              ${showGroupHeader ? html`<div class="group-header">${opt.group}</div>` : ''}

              <label class="radio-label ${opt.disabled || this.disabled ? 'disabled' : ''}">
                <input
                  type="radio"
                  name="${opt.inputName || this.name}" 
                  value="${opt.value}"
                  .checked="${this.value === opt.value}"
                  ?disabled="${this.disabled || opt.disabled}"
                  @change="${(e: Event) => this.handleChange(e, opt.value)}"
                  part="input"
                />
                <span class="label-text">${opt.label}</span>
              </label>
            `;
          })}
        </div>
        <div class="error" part="error">${this.errorMessage}</div>
      </div>
    `;
  }

  static styles = [
    MelserBaseInput.styles,
    css`
      .main-label {
        display: block;
        margin-bottom: 0.75rem;
        font-weight: 700;
        font-size: 1rem;
        color: var(--melser-text);
      }

      .radio-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      /* Estilos para el título de grupo (reemplazo visual de legend) */
      .group-header {
        font-size: 0.85rem;
        font-weight: 700;
        text-transform: uppercase;
        color: var(--melser-text-secondary, #6b7280);
        margin-top: 0.75rem;
        margin-bottom: 0.25rem;
        padding-left: 0.25rem;
        border-bottom: 1px solid var(--melser-border, #e5e7eb);
      }
      
      /* Primer header sin margen top */
      .group-header:first-child {
        margin-top: 0;
      }

      .radio-label {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.25rem 0.5rem;
        cursor: pointer;
        border-radius: 4px;
        transition: background 0.1s;
      }

      .radio-label:hover {
        background-color: var(--melser-hover-bg, #f9fafb);
      }

      .radio-label.disabled {
        cursor: not-allowed;
        opacity: 0.6;
      }

      input[type="radio"] {
        appearance: none;
        width: 1.15em;
        height: 1.15em;
        margin: 0;
        cursor: pointer;
        border: 2px solid var(--melser-border, #d1d5db);
        border-radius: 50%;
        background-color: var(--melser-input-bg, white);
        display: grid;
        place-content: center;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      }

      input[type="radio"]::before {
        content: "";
        width: 0.6em;
        height: 0.6em;
        border-radius: 50%;
        transform: scale(0);
        transition: 0.15s transform ease-in-out;
        background-color: var(--melser-primary, #007bff);
      }

      input[type="radio"]:checked {
        border-color: var(--melser-primary, #007bff);
      }

      input[type="radio"]:checked::before {
        transform: scale(1);
      }
      
      input[type="radio"]:disabled {
        border-color: #e5e7eb;
        background-color: #f3f4f6;
      }
    `
  ];
}
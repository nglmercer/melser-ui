import { html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { MelserBaseInput, InputVar } from '../core/Base';
import { Var } from '../theme/tokens';
import type { MelserDataType, SelectOption } from '../types/index';

interface InternalOption extends SelectOption {
  disabled?: boolean;
  group?: string; // Para manejar los títulos de fieldset/legend
  inputName?: string; // Por si el usuario fuerza un name distinto por opción
}

@customElement('me-radio-group')
export class MelserRadioGroup extends MelserBaseInput<string> {
  @property({ type: String }) value = '';
  @property({ type: Array }) options: InternalOption[] = [];
  @query('input') inputElement!: HTMLInputElement;
  @state() private _renderedOptions: InternalOption[] = [];

  readonly dataType: MelserDataType = 'string';

  override firstUpdated() {
    this.syncOptions();
    if (!this.name) {
      this.name = `me-radio-${Math.random().toString(36).substr(2, 9)}`;
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
        margin-bottom: ${InputVar.gap};
        font-weight: ${InputVar['label-font-weight']};
        font-size: ${InputVar['font-size-medium']};
        color: ${InputVar['label-color']};
      }

      .radio-group {
        display: flex;
        flex-direction: column;
        gap: ${InputVar['container-gap']};
      }

      /* Group header styling */
      .group-header {
        font-size: ${Var.font.size.small};
        font-weight: ${InputVar['label-font-weight']};
        text-transform: uppercase;
        color: ${InputVar['text-color-placeholder']};
        margin-top: ${InputVar.gap};
        margin-bottom: ${InputVar['container-gap']};
        padding-left: ${InputVar['container-gap']};
        border-bottom: 1px solid ${InputVar['border-color']};
      }
      
      /* First header without top margin */
      .group-header:first-child {
        margin-top: 0;
      }

      .radio-label {
        display: flex;
        align-items: center;
        gap: ${InputVar.gap};
        padding: ${InputVar['container-gap']} ${InputVar['container-gap']};
        cursor: pointer;
        border-radius: ${InputVar.radius};
        transition: ${InputVar['hover-transition']};
      }

      .radio-label:hover {
        background-color: ${InputVar['bg-hover']};
      }

      .radio-label.disabled {
        cursor: ${InputVar['disabled-cursor']};
        opacity: ${InputVar['opacity-disabled']};
      }

      input[type="radio"] {
        appearance: none;
        width: ${InputVar['radio-size']};
        height: ${InputVar['radio-size']};
        margin: 0;
        cursor: pointer;
        border: ${InputVar['control-border-width']} solid ${InputVar['control-border-color']};
        border-radius: 50%;
        background-color: ${InputVar.bg};
        display: grid;
        place-content: center;
        transition: ${InputVar['hover-transition']};
      }

      input[type="radio"]::before {
        content: "";
        width: ${InputVar['radio-dot-size']};
        height: ${InputVar['radio-dot-size']};
        border-radius: 50%;
        transform: scale(${InputVar['icon-scale']});
        transition: 0.15s transform ease-in-out;
        background-color: ${InputVar['control-bg-checked']};
      }

      input[type="radio"]:checked {
        border-color: ${InputVar['control-border-color-checked']};
      }

      input[type="radio"]:checked::before {
        transform: scale(${InputVar['radio-scale-checked']});
      }
      
      input[type="radio"]:focus-visible {
        box-shadow: ${InputVar['focus-shadow']};
      }

      input[type="radio"]:disabled {
        border-color: ${InputVar['control-border-color-disabled']};
        background-color: ${InputVar['control-bg-disabled']};
        cursor: ${InputVar['disabled-cursor']};
      }

      .label-text {
        color: ${InputVar['text-color']};
        font-size: ${InputVar['font-size']};
      }
    `
  ];
}
import { html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { BaseInput, InputVar } from '../core/Base';
import type { MelserDataType, SelectOption } from '../types/index';

// Extendemos la interfaz para soportar grupos si es necesario
// interface InternalOption extends SelectOption {
//   group?: string;
// }

@customElement('me-select')
export class MelserSelect extends BaseInput<string> {
  @property({ type: String }) value = '';
  @query('select') inputElement!: HTMLSelectElement;
  // Mantenemos la propiedad por si quieren pasar datos vía JS
  @property({ type: Array }) options: SelectOption[] = [];

  // Estado interno para combinar props + slots
  @state() private _renderedOptions: SelectOption[] = [];

  readonly dataType: MelserDataType = 'string';

  override firstUpdated() {
    this.syncOptions();
  }

  // Esta función lee el HTML dentro de tu componente (Light DOM)
  // y lo convierte al array de objetos que tu componente necesita
  private syncOptions() {

    // Si el usuario pasó options por propiedad, tienen prioridad
    if (this.options && this.options.length > 0) {
      this._renderedOptions = [...this.options];
      return;
    }

    const newOptions: SelectOption[] = [];
    const children = Array.from(this.children);
    let initialSelectedValue: string | undefined;

    children.forEach(child => {
      // Manejar <optgroup>
      if (child.tagName.toLowerCase() === 'optgroup') {
        const groupLabel = (child as HTMLOptGroupElement).label;
        const groupOptions = Array.from(child.querySelectorAll('option'));

        groupOptions.forEach(opt => {
          newOptions.push({
            label: opt.textContent || '',
            value: opt.value,
            group: groupLabel,
            disabled: opt.disabled
          });

          if (opt.hasAttribute('selected') && !initialSelectedValue) {
            initialSelectedValue = opt.value;
          }
        });
      }
      // Manejar <option> directos
      else if (child.tagName.toLowerCase() === 'option') {
        const opt = child as HTMLOptionElement;
        newOptions.push({
          label: opt.textContent || '',
          value: opt.value,
          disabled: opt.disabled
        });

        // Si el usuario puso el atributo 'selected' en el HTML
        if (opt.hasAttribute('selected') && !initialSelectedValue) {
          initialSelectedValue = opt.value;
        }
      }
    });

    this._renderedOptions = newOptions;

    // Solo establecer valor inicial de atributos si no hay valor actual
    if (initialSelectedValue !== undefined && !this.value) {
      this.value = initialSelectedValue;
    }
  }

  handleChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    this.value = select.value;
    this.dispatchChange();
  }

  render() {
    return html`
      <div class="input-wrapper">
        ${this.label ? html`<label for="${this.inputId}">${this.label}</label>` : ''}
        
        <slot style="display: none;" @slotchange="${this.syncOptions}"></slot>

        <select
          id="${this.inputId}"
          .value="${this.value}"
          ?disabled="${this.disabled}"
          ?required="${this.required}"
          @change="${this.handleChange}"
          part="select"
        >
          <option value="" disabled ?selected="${!this.value}">Select an option</option>
          
          ${this._renderOptionsWithGroups()}
          
        </select>
        <div class="error" part="error">${this.errorMessage}</div>
      </div>
    `;
  }

  // Helper para renderizar grupos o opciones planas
  private _renderOptionsWithGroups() {
    // Verificar si hay grupos
    const hasGroups = this._renderedOptions.some(o => o.group);

    if (!hasGroups) {
      return this._renderedOptions.map(opt => html`
        <option value="${opt.value}" ?selected="${opt.value === this.value}" ?disabled="${opt.disabled}">
          ${opt.label}
        </option>
      `);
    }

    // Lógica de agrupación
    const groups: Record<string, SelectOption[]> = {};
    const orphans: SelectOption[] = [];

    this._renderedOptions.forEach(opt => {
      if (opt.group) {
        if (!groups[opt.group]) groups[opt.group] = [];
        groups[opt.group].push(opt);
      } else {
        orphans.push(opt);
      }
    });

    return html`
      ${orphans.map(opt => html`<option value="${opt.value}" ?selected="${opt.value === this.value}" ?disabled="${opt.disabled}">${opt.label}</option>`)}
      ${Object.entries(groups).map(([groupName, opts]) => html`
        <optgroup label="${groupName}">
          ${opts.map(opt => html`<option value="${opt.value}" ?selected="${opt.value === this.value}" ?disabled="${opt.disabled}">${opt.label}</option>`)}
        </optgroup>
      `)}
    `;
  }

  static styles = [
    BaseInput.styles,
    css`
      select {
        appearance: none;
        width: 100%; /* Asegurar ancho completo */
        background-image: ${InputVar['select-bg-image']};
        background-repeat: ${InputVar['select-bg-repeat']};
        background-position: ${InputVar['select-bg-position']};
        background-size: ${InputVar['select-bg-size']};
      }
    `
  ];
}

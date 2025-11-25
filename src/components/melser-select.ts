import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { MelserBaseInput } from '../core/melser-base-input';
import type { MelserDataType, SelectOption } from '../types/index';

// Extendemos la interfaz para soportar grupos si es necesario
interface InternalOption extends SelectOption {
  group?: string;
}

@customElement('melser-select')
export class MelserSelect extends MelserBaseInput<string> {
  @property({ type: String }) value = '';
  
  // Mantenemos la propiedad por si quieren pasar datos vía JS
  @property({ type: Array }) options: InternalOption[] = [];

  // Estado interno para combinar props + slots
  @state() private _renderedOptions: InternalOption[] = [];

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

    const newOptions: InternalOption[] = [];
    const children = Array.from(this.children);

    children.forEach(child => {
      // Manejar <optgroup>
      if (child.tagName.toLowerCase() === 'optgroup') {
        const groupLabel = (child as HTMLOptGroupElement).label;
        const groupOptions = Array.from(child.querySelectorAll('option'));
        
        groupOptions.forEach(opt => {
           newOptions.push({
             label: opt.textContent || '',
             value: opt.value,
             group: groupLabel
           });
        });
      } 
      // Manejar <option> directos
      else if (child.tagName.toLowerCase() === 'option') {
        const opt = child as HTMLOptionElement;
        newOptions.push({
          label: opt.textContent || '',
          value: opt.value
        });
        
        // Si el usuario puso el atributo 'selected' en el HTML
        if (opt.hasAttribute('selected') && !this.value) {
            this.value = opt.value;
        }
      }
    });

    this._renderedOptions = newOptions;
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
        <option value="${opt.value}" ?selected="${opt.value === this.value}">
          ${opt.label}
        </option>
      `);
    }

    // Lógica de agrupación
    const groups: Record<string, InternalOption[]> = {};
    const orphans: InternalOption[] = [];

    this._renderedOptions.forEach(opt => {
      if (opt.group) {
        if (!groups[opt.group]) groups[opt.group] = [];
        groups[opt.group].push(opt);
      } else {
        orphans.push(opt);
      }
    });

    return html`
      ${orphans.map(opt => html`<option value="${opt.value}" ?selected="${opt.value === this.value}">${opt.label}</option>`)}
      ${Object.entries(groups).map(([groupName, opts]) => html`
        <optgroup label="${groupName}">
          ${opts.map(opt => html`<option value="${opt.value}" ?selected="${opt.value === this.value}">${opt.label}</option>`)}
        </optgroup>
      `)}
    `;
  }

  static styles = [
    MelserBaseInput.styles,
    css`
      select {
        appearance: none;
        width: 100%; /* Asegurar ancho completo */
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-position: right 1rem center;
        background-size: 1em;
      }
    `
  ];
}

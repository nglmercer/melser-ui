import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { MelserBaseInput } from '../core/melser-base-input';
import type { MelserDataType, SelectOption } from '../types/index';

// Icono de flecha (Chevron)
const chevronIcon = html`
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
`;

@customElement('melser-combobox')
export class MelserCombobox extends MelserBaseInput<string> {
  @property({ type: String }) value = '';
  @property({ type: Array }) options: SelectOption[] = [];
  @property({ type: String }) placeholder = 'Search...';

  @state() private _isOpen = false;
  @state() private _inputValue = '';
  @state() private _filteredOptions: SelectOption[] = [];

  readonly dataType: MelserDataType = 'string';

  connectedCallback() {
    super.connectedCallback();
    this._filteredOptions = this.options;
    this.syncInputWithInternalValue();
  }

  updated(changedProps: Map<string, any>) {
    super.updated(changedProps);
    // Si cambian las opciones externamente, re-filtrar
    if (changedProps.has('options')) {
      this._filteredOptions = this.options;
    }
    // Si cambia el value externamente, actualizar el texto del input
    if (changedProps.has('value')) {
      this.syncInputWithInternalValue();
    }
  }

  private syncInputWithInternalValue() {
    const selected = this.options.find(o => o.value === this.value);
    if (selected) {
      this._inputValue = selected.label;
    } else if (!this.value) {
      this._inputValue = '';
    }
  }

  handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this._inputValue = input.value;
    this._isOpen = true;

    const term = this._inputValue.toLowerCase();
    this._filteredOptions = this.options.filter(opt =>
      opt.label.toLowerCase().includes(term)
    );

    // Si el usuario borra todo, limpiamos el valor interno
    if (!this._inputValue) {
      this.value = '';
      this.dispatchChange();
    }
  }

  handleOptionClick(option: SelectOption, e: Event) {
    // Evitamos que el blur se dispare antes de tiempo
    e.preventDefault();
    e.stopPropagation();

    this.selectOption(option);
  }

  selectOption(option: SelectOption) {
    this.value = option.value;
    this._inputValue = option.label;
    this._isOpen = false;
    this.dispatchChange();

    // Devolvemos el foco al input (opcional, por si acaso)
    // this.shadowRoot?.querySelector('input')?.focus();
  }

  toggleDropdown() {
    if (this.disabled) return;
    this._isOpen = !this._isOpen;
    if (this._isOpen) {
      // Al abrir, reseteamos el filtro para mostrar todo si el texto coincide con la selección actual
      const selected = this.options.find(o => o.value === this.value);
      if (selected && this._inputValue === selected.label) {
        this._filteredOptions = this.options;
      }
      // Foco al input para poder escribir
      this.shadowRoot?.querySelector('input')?.focus();
    }
  }

  handleBlur() {
    // Cerramos el menú
    this._isOpen = false;

    // Validación estricta: Si lo que está escrito no coincide con una opción válida
    const match = this.options.find(o => o.label.toLowerCase() === this._inputValue.toLowerCase());

    if (match) {
      // Si el usuario escribió el nombre exacto pero no hizo click, lo seleccionamos
      if (this.value !== match.value) {
        this.value = match.value;
        this._inputValue = match.label; // Normalizamos mayúsculas/minúsculas
        this.dispatchChange();
      }
    } else {
      // Si no hay match, revertimos a lo que estaba seleccionado o limpiamos
      // Opción A: Limpiar si es inválido (Strict Mode)
      if (this._inputValue !== '') {
        this.value = '';
        this._inputValue = '';
        this.dispatchChange();
      }
    }
  }

  render() {
    return html`
      <div class="input-wrapper">
        ${this.label ? html`<label>${this.label}</label>` : ''}
        
        <div class="combobox-container">
          <input
            type="text"
            .value="${this._inputValue}"
            .placeholder="${this.placeholder}"
            ?disabled="${this.disabled}"
            @input="${this.handleInput}"
            @focus="${() => this._isOpen = true}"
            @blur="${this.handleBlur}"
            part="input"
            autocomplete="off"
          />
          
          <div 
            class="chevron ${this._isOpen ? 'open' : ''}" 
            @mousedown="${(e: Event) => { e.preventDefault(); this.toggleDropdown(); }}"
          >
            ${chevronIcon}
          </div>
          
          ${this._isOpen ? html`
            <ul class="options-list">
              ${this._filteredOptions.length > 0 ? this._filteredOptions.map(opt => html`
                <li 
                  class="${opt.value === this.value ? 'selected' : ''}"
                  @mousedown="${(e: Event) => this.handleOptionClick(opt, e)}"
                >
                  ${opt.label}
                </li>
              `) : html`
                <li class="no-results">No results found</li>
              `}
            </ul>
          ` : ''}
        </div>
        <div class="error" part="error">${this.errorMessage}</div>
      </div>
    `;
  }

  static styles = [
    MelserBaseInput.styles,
    css`
      :host {
        display: block;
        width: 100%;
      }

      .input-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
      }

      .combobox-container {
        position: relative;
        width: 100%;
      }

      input {
        width: 100%;
        box-sizing: border-box; /* Vital para que padding no rompa el ancho */
        padding-right: 2.5rem; /* Espacio para el chevron */
        height: 40px;
        border: 1px solid var(--melser-border);
        border-radius: var(--melser-radius);
        background-color: var(--melser-input-bg);
        color: var(--melser-text);
        padding-left: 0.75rem;
        transition: border-color 0.2s;
      }

      input:focus {
        outline: none;
        border-color: var(--melser-primary);
        box-shadow: 0 0 0 2px hsla(var(--melser-primary-h), var(--melser-primary-s), var(--melser-primary-l), 0.2);
      }

      .chevron {
        position: absolute;
        right: 0.75rem;
        top: 50%;
        transform: translateY(-50%);
        color: var(--melser-text-secondary, #888);
        cursor: pointer;
        display: flex;
        align-items: center;
        transition: transform 0.2s;
        pointer-events: auto; /* Permitir click */
      }

      .chevron.open {
        transform: translateY(-50%) rotate(180deg);
      }

      .options-list {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0; /* Ancho completo relativo al container */
        background: var(--melser-surface);
        border: 1px solid var(--melser-border);
        border-radius: var(--melser-radius);
        margin-top: 4px;
        padding: 0;
        list-style: none;
        max-height: 200px;
        overflow-y: auto;
        z-index: 100; /* Z-index alto para flotar sobre otros inputs */
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      }

      li {
        padding: 0.75rem;
        cursor: pointer;
        transition: background-color 0.1s;
        color: var(--melser-text);
      }

      li:hover {
        background-color: var(--melser-hover-bg, #f0f0f0);
      }

      li.selected {
        background-color: var(--melser-primary-light, #e6f0ff);
        color: var(--melser-primary);
        font-weight: 500;
      }
      
      .no-results {
        padding: 0.75rem;
        color: var(--melser-text-secondary);
        cursor: default;
        font-style: italic;
        text-align: center;
      }

      /* Scrollbar styling opcional */
      .options-list::-webkit-scrollbar {
        width: 6px;
      }
      .options-list::-webkit-scrollbar-track {
        background: transparent;
      }
      .options-list::-webkit-scrollbar-thumb {
        background-color: var(--melser-border);
        border-radius: 3px;
      }
    `
  ];
}
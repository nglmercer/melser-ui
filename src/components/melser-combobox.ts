import { html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { MelserBaseInput } from '../core/melser-base-input';
import type { MelserDataType, SelectOption } from '../types/index';

// Extendemos la interfaz para manejo interno de grupos
interface InternalOption extends SelectOption {
  group?: string;
}

const chevronIcon = html`
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
`;

@customElement('melser-combobox')
export class MelserCombobox extends MelserBaseInput<string> {
  @property({ type: String }) value = '';
  @property({ type: String }) placeholder = 'Select an option...';
  @property({ type: Array }) options: InternalOption[] = [];

  @state() private _isOpen = false;
  @state() private _inputValue = '';
  
  // Usamos InternalOption para incluir la propiedad 'group'
  @state() private _allOptions: InternalOption[] = [];
  @state() private _filteredOptions: InternalOption[] = [];
  @state() private _highlightedIndex = -1;

  @query('input') inputElement!: HTMLInputElement;
  @query('.options-list') listElement!: HTMLUListElement;

  readonly dataType: MelserDataType = 'string';

  override firstUpdated() {
    this.syncOptionsFromSlots();
  }

  private syncOptionsFromSlots() {
    // 1. Prioridad a props JS
    if (this.options && this.options.length > 0) {
      this._allOptions = [...this.options];
    } else {
      // 2. Leer del Slot (HTML)
      const optionsFromSlot: InternalOption[] = [];
      const children = Array.from(this.children);
      
      children.forEach(child => {
        const tagName = child.tagName.toLowerCase();

        // CASO A: <optgroup>
        if (tagName === 'optgroup') {
            const groupLabel = (child as HTMLOptGroupElement).label;
            const groupOptions = Array.from(child.querySelectorAll('option'));
            
            groupOptions.forEach(opt => {
                optionsFromSlot.push({
                    label: opt.textContent || '',
                    value: opt.value,
                    group: groupLabel // Asignamos el grupo
                });
                this.checkSelected(opt);
            });
        } 
        // CASO B: <option> suelto
        else if (tagName === 'option') {
          const opt = child as HTMLOptionElement;
          optionsFromSlot.push({
            label: opt.textContent || '',
            value: opt.value
          });
          this.checkSelected(opt);
        }
      });
      this._allOptions = optionsFromSlot;
    }
    
    this._filteredOptions = this._allOptions;
    this.syncInputWithInternalValue();
  }

  private checkSelected(opt: HTMLOptionElement) {
      if (opt.hasAttribute('selected') && !this.value) {
          this.value = opt.value;
      }
  }

  private syncInputWithInternalValue() {
    const selected = this._allOptions.find(o => o.value === this.value);
    if (selected) {
      this._inputValue = selected.label;
    } else if (!this._isOpen) {
       this._inputValue = '';
    }
  }

  handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this._inputValue = input.value;
    this._isOpen = true;
    this._highlightedIndex = 0;

    const term = this._inputValue.toLowerCase();
    
    // Filtramos la lista plana. Los grupos se pintarán dinámicamente si sus hijos sobreviven al filtro.
    this._filteredOptions = this._allOptions.filter(opt =>
      opt.label.toLowerCase().includes(term)
    );

    if (!this._inputValue) {
      this.value = '';
      this.dispatchChange();
      this._filteredOptions = this._allOptions;
    }
  }

  handleKeyDown(e: KeyboardEvent) {
    if (this.disabled) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this._isOpen = true;
        this._highlightedIndex = Math.min(this._highlightedIndex + 1, this._filteredOptions.length - 1);
        this.scrollHighlightedIntoView();
        break;
      
      case 'ArrowUp':
        e.preventDefault();
        this._isOpen = true;
        this._highlightedIndex = Math.max(this._highlightedIndex - 1, 0);
        this.scrollHighlightedIntoView();
        break;

      case 'Enter':
        e.preventDefault();
        if (this._isOpen && this._highlightedIndex >= 0) {
            const opt = this._filteredOptions[this._highlightedIndex];
            if (opt) this.selectOption(opt);
        } else {
             this._isOpen = true;
        }
        break;

      case 'Escape':
        this._isOpen = false;
        this.inputElement.blur();
        break;
    }
  }

  scrollHighlightedIntoView() {
    setTimeout(() => {
        if (!this.listElement) return;
        // Buscamos el elemento LI que tenga la clase highlighted (no los headers)
        const highlightedItem = this.listElement.querySelector(`li[data-index="${this._highlightedIndex}"]`);
        if (highlightedItem) {
            highlightedItem.scrollIntoView({ block: 'nearest' });
        }
    }, 0);
  }

  selectOption(option: InternalOption) {
    this.value = option.value;
    this._inputValue = option.label;
    this._isOpen = false;
    this._filteredOptions = this._allOptions; 
    this.dispatchChange();
  }

  handleBlur() {
    setTimeout(() => {
        this._isOpen = false;
        const exactMatch = this._allOptions.find(o => o.label.toLowerCase() === this._inputValue.toLowerCase());
        
        if (exactMatch && this.value !== exactMatch.value) {
            this.selectOption(exactMatch);
        } else {
            this.syncInputWithInternalValue();
        }
    }, 200);
  }

  toggleDropdown() {
    if (this.disabled) return;
    if (this._isOpen) {
        this._isOpen = false;
    } else {
        this._isOpen = true;
        this._filteredOptions = this._allOptions;
        this.inputElement.focus();
        const index = this._filteredOptions.findIndex(o => o.value === this.value);
        this._highlightedIndex = index >= 0 ? index : 0;
        this.scrollHighlightedIntoView();
    }
  }

  render() {
    return html`
      <div class="input-wrapper">
        ${this.label ? html`<label>${this.label}</label>` : ''}
        <slot style="display: none" @slotchange="${this.syncOptionsFromSlots}"></slot>

        <div class="combobox-container">
          <input
            type="text"
            .value="${this._inputValue}"
            .placeholder="${this.placeholder}"
            ?disabled="${this.disabled}"
            @input="${this.handleInput}"
            @keydown="${this.handleKeyDown}"
            @focus="${() => { this._isOpen = true; }}"
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
              ${this._filteredOptions.length > 0 ? this._filteredOptions.map((opt, index) => {
                // Lógica para mostrar Header de Grupo
                // Mostramos header si:
                // 1. Es el primer elemento Y tiene grupo
                // 2. O si el grupo de este elemento es diferente al del anterior
                const prevOpt = this._filteredOptions[index - 1];
                const showGroupHeader = opt.group && (!prevOpt || prevOpt.group !== opt.group);

                return html`
                  ${showGroupHeader ? html`<li class="group-header">${opt.group}</li>` : ''}
                  
                  <li 
                    class="option-item ${opt.value === this.value ? 'selected' : ''} ${index === this._highlightedIndex ? 'highlighted' : ''}"
                    data-index="${index}"
                    @mousedown="${(e: Event) => { e.preventDefault(); this.selectOption(opt); }}"
                    @mouseenter="${() => this._highlightedIndex = index}"
                  >
                    ${opt.label}
                  </li>
                `;
              }) : html`
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
      :host { display: block; width: 100%; }
      .input-wrapper { width: 100%; display: flex; flex-direction: column; }
      .combobox-container { position: relative; width: 100%; }

      input {
        width: 100%;
        box-sizing: border-box;
        padding-right: 2.5rem;
        height: 40px;
        border: 1px solid var(--melser-border, #ccc);
        border-radius: var(--melser-radius, 4px);
        background-color: var(--melser-input-bg, white);
        color: var(--melser-text, black);
        padding-left: 0.75rem;
      }
      input:focus {
        outline: none;
        border-color: var(--melser-primary, #007bff);
        box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
      }

      .chevron {
        position: absolute; right: 0.75rem; top: 50%;
        transform: translateY(-50%); color: #888; cursor: pointer;
        display: flex; align-items: center; transition: transform 0.2s;
      }
      .chevron.open { transform: translateY(-50%) rotate(180deg); }

      .options-list {
        position: absolute; top: 100%; left: 0; right: 0;
        background: var(--melser-surface, white);
        border: 1px solid var(--melser-border, #ccc);
        border-radius: var(--melser-radius, 4px);
        margin-top: 4px; padding: 0; list-style: none;
        max-height: 250px; overflow-y: auto; z-index: 100;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      }

      /* Estilo para los Headers de Grupo */
      .group-header {
        padding: 8px 12px;
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
        color: var(--melser-text-secondary, #6b7280);
        background-color: var(--melser-bg-secondary, #f9fafb);
        pointer-events: none; /* No interactuable */
        letter-spacing: 0.05em;
        position: sticky; /* Opcional: headers pegajosos */
        top: 0;
      }

      /* Estilo para las Opciones */
      .option-item {
        padding: 0.75rem 0.75rem 0.75rem 1.5rem; /* Un poco más de indentación para jerarquía */
        cursor: pointer;
        color: var(--melser-text, black);
        transition: background 0.1s;
      }

      .option-item.highlighted {
        background-color: var(--melser-hover-bg, #f3f4f6);
      }

      .option-item.selected {
        background-color: var(--melser-primary-light, #e6f0ff);
        color: var(--melser-primary, #007bff);
        font-weight: 600;
      }
      
      .option-item.selected.highlighted {
        background-color: var(--melser-primary-light-hover, #d0e1fd);
      }

      .no-results { padding: 0.75rem; color: #888; text-align: center; font-style: italic; }
    `
  ];
}
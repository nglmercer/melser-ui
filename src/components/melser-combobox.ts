import { html, css, type PropertyValues } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js'; // Cleaner classes
import { BaseInput, InputVar } from '../core/Base';

import type { MelserDataType, SelectOption } from '../types/index';

// interface InternalOption extends SelectOption {
//   group?: string;
//   originalIndex?: number; // Helps with tracking selection after filtering
// }

type InternalComboboxOption = SelectOption & { originalIndex?: number };

const chevronIcon = html`
  <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
`;

@customElement('me-combobox')
export class MelserCombobox extends BaseInput<string> {
  @property({ type: String }) value = '';
  @property({ type: String }) placeholder = 'Select an option...';
  @property({ type: Array }) options: SelectOption[] = [];

  @state() private _isOpen = false;
  @state() private _inputValue = '';
  @state() private _allOptions: InternalComboboxOption[] = [];
  @state() private _filteredOptions: InternalComboboxOption[] = [];
  @state() private _highlightedIndex = -1;

  @query('input') inputElement!: HTMLInputElement;
  @query('.options-list') listElement!: HTMLUListElement;

  readonly dataType: MelserDataType = 'string';
  private _blurTimeout: number | null = null;

  // React to prop changes (Options)
  protected willUpdate(changedProps: PropertyValues): void {
    if (changedProps.has('options')) {
      this.syncOptionsFromProps();
    }
    // If value changes externally, update the display text
    if (changedProps.has('value')) {
      this.syncInputWithInternalValue();
    }
  }

  private syncOptionsFromProps() {
    // If props are provided, they take precedence over slots
    if (this.options && this.options.length > 0) {
      this._allOptions = [...this.options];
      this._filteredOptions = this._allOptions;
    }
  }

  private handleSlotChange() {
    // Only parse slots if no JS options are provided
    if (this.options && this.options.length > 0) return;

    const optionsFromSlot: InternalComboboxOption[] = [];
    const children = Array.from(this.children);

    children.forEach(child => {
      const tagName = child.tagName.toLowerCase();
      if (tagName === 'optgroup') {
        const groupLabel = (child as HTMLOptGroupElement).label;
        const groupOptions = Array.from(child.querySelectorAll('option'));
        groupOptions.forEach(opt => {
          optionsFromSlot.push({
            label: opt.textContent || '',
            value: opt.value,
            group: groupLabel,
            disabled: opt.disabled
          });
          this.checkInitialSelected(opt);
        });
      } else if (tagName === 'option') {
        const opt = child as HTMLOptionElement;
        optionsFromSlot.push({
          label: opt.textContent || '',
          value: opt.value,
          disabled: opt.disabled
        });
        this.checkInitialSelected(opt);
      }
    });

    this._allOptions = optionsFromSlot;
    this._filteredOptions = this._allOptions;
    this.syncInputWithInternalValue();
  }

  private checkInitialSelected(opt: HTMLOptionElement) {
    if (opt.hasAttribute('selected') && !this.value) {
      this.value = opt.value;
    }
  }

  private syncInputWithInternalValue() {
    const selected = this._allOptions.find(o => o.value === this.value);
    // Only update input text if the menu is closed or we have a definite match
    if (selected) {
      this._inputValue = selected.label;
    }
  }

  handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this._inputValue = input.value;
    this._isOpen = true;
    this._highlightedIndex = 0;

    const term = this._inputValue.toLowerCase();
    this._filteredOptions = this._allOptions.filter(opt =>
      opt.label.toLowerCase().includes(term)
    );

    if (!this._inputValue) {
      this.value = '';
      this.dispatchChange();
    }
  }

  handleKeyDown(e: KeyboardEvent) {
    if (this.disabled) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this.openMenu();
        this._highlightedIndex = Math.min(this._highlightedIndex + 1, this._filteredOptions.length - 1);
        this.scrollHighlightedIntoView();
        break;

      case 'ArrowUp':
        e.preventDefault();
        this.openMenu();
        this._highlightedIndex = Math.max(this._highlightedIndex - 1, 0);
        this.scrollHighlightedIntoView();
        break;

      case 'Enter':
        e.preventDefault();
        if (this._isOpen && this._highlightedIndex >= 0) {
          const opt = this._filteredOptions[this._highlightedIndex];
          if (opt && !opt.disabled) this.selectOption(opt);
        } else {
          this.openMenu();
        }
        break;

      case 'Escape':
      case 'Tab': // Close on Tab to allow moving to next field
        this.closeMenu();
        break;
    }
  }

  scrollHighlightedIntoView() {
    // RequestAnimationFrame is better than setTimeout(0) for visual updates
    requestAnimationFrame(() => {
      if (!this.listElement) return;
      const highlightedItem = this.listElement.querySelector(`li[data-index="${this._highlightedIndex}"]`);
      if (highlightedItem) {
        highlightedItem.scrollIntoView({ block: 'nearest' });
      }
    });
  }

  selectOption(option: InternalComboboxOption) {
    this.value = option.value;
    this._inputValue = option.label;
    this.closeMenu();
    this._filteredOptions = this._allOptions;
    this.dispatchChange();
  }

  /**
   * ROBUST BLUR HANDLING:
   * Instead of a naked setTimeout, we use FocusEvent.relatedTarget.
   * If the user clicks the scrollbar or something inside the shadowRoot,
   * relatedTarget checks if the new focus is still 'inside' us.
   */
  handleFocusOut(e: FocusEvent) {
    // Check if the new focus is inside this component (Shadow DOM) or the component host
    const currentTarget = e.currentTarget as HTMLElement;
    const relatedTarget = e.relatedTarget as HTMLElement;

    if (currentTarget.contains(relatedTarget)) {
      return; // Focus is still inside our component
    }

    // Delay closing slightly to allow "click" events on options to fire first
    // if the user clicked an option directly.
    this._blurTimeout = window.setTimeout(() => {
      this.closeMenu();

      // Reset text if invalid
      const exactMatch = this._allOptions.find(o => o.label.toLowerCase() === this._inputValue.toLowerCase());
      if (exactMatch) {
        if (this.value !== exactMatch.value) this.selectOption(exactMatch);
      } else {
        // Revert to last valid value
        this.syncInputWithInternalValue();
      }
    }, 150);
  }

  openMenu() {
    if (this.disabled || this._isOpen) return;
    this._isOpen = true;
    this._filteredOptions = this._allOptions;
    // Find current index
    const index = this._filteredOptions.findIndex(o => o.value === this.value);
    this._highlightedIndex = index >= 0 ? index : 0;
    this.scrollHighlightedIntoView();
  }

  closeMenu() {
    this._isOpen = false;
    if (this._blurTimeout) clearTimeout(this._blurTimeout);
  }

  toggleDropdown() {
    if (this._isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
      this.inputElement.focus();
    }
  }

  render() {
    const listId = `${this.inputId}-list`;
    const labelId = `${this.inputId}-label`;

    return html`
      <div 
        class="input-wrapper" 
        @focusout="${this.handleFocusOut}"
      >
        ${this.label ? html`<label id="${labelId}" for="${this.inputId}">${this.label}</label>` : ''}
        
        <slot style="display: none" @slotchange="${this.handleSlotChange}"></slot>

        <div class="combobox-container">
          <input
            id="${this.inputId}"
            type="text"
            role="combobox" 
            aria-autocomplete="list"
            aria-expanded="${this._isOpen}"
            aria-controls="${listId}"
            aria-activedescendant="${this._isOpen && this._highlightedIndex >= 0 ? `option-${this._highlightedIndex}` : ''}"
            .value="${this._inputValue}"
            .placeholder="${this.placeholder}"
            ?disabled="${this.disabled}"
            @input="${this.handleInput}"
            @keydown="${this.handleKeyDown}"
            @focus="${this.openMenu}"
            part="input"
            autocomplete="off"
          />
          
          <div 
            class="${classMap({ chevron: true, open: this._isOpen })}" 
            @mousedown="${(e: Event) => { e.preventDefault(); this.toggleDropdown(); }}"
            aria-hidden="true"
          >
            ${chevronIcon}
          </div>
          
          <ul 
            id="${listId}"
            class="${classMap({ 'options-list': true, 'hidden': !this._isOpen })}"
            role="listbox"
            aria-labelledby="${labelId}"
          >
            ${this._filteredOptions.length > 0 ? this._filteredOptions.map((opt, index) => {
      const prevOpt = this._filteredOptions[index - 1];
      const showGroupHeader = opt.group && (!prevOpt || prevOpt.group !== opt.group);
      const isSelected = opt.value === this.value;
      const isHighlighted = index === this._highlightedIndex;

      return html`
                ${showGroupHeader ? html`
                    <li role="presentation" class="group-header">${opt.group}</li>
                ` : ''}
                
                <li 
                  id="option-${index}"
                  role="option"
                  aria-selected="${isSelected}"
                  class="${classMap({
        'option-item': true,
        'selected': isSelected,
        'highlighted': isHighlighted,
        'disabled': !!opt.disabled
      })}"
                  data-index="${index}"
                  aria-disabled="${!!opt.disabled}"
                  @mousedown="${(e: Event) => {
          if (opt.disabled) return;
          // Prevent default to avoid blur triggering before click
          e.preventDefault();
          this.selectOption(opt);
        }}"
                  @mouseenter="${() => this._highlightedIndex = index}"
                >
                  ${opt.label}
                  ${isSelected ? html`<span class="check-icon">✓</span>` : ''}
                </li>
              `;
    }) : html`
              <li class="no-results" role="option" aria-disabled="true">No results found</li>
            `}
          </ul>
        </div>
        <div class="error" part="error">${this.errorMessage}</div>
      </div>
    `;
  }

  static styles = [
    BaseInput.styles,
    css`
      :host { display: block; width: 100%; position: relative; }
      .combobox-container { position: relative; width: 100%; }

      input { padding-right: 2.5rem; width: 100%; }

      .chevron {
        position: absolute; right: 0.75rem; top: 50%;
        transform: translateY(-50%); color: ${InputVar['text-color-placeholder']}; cursor: pointer;
        display: flex; align-items: center; transition: transform 0.2s;
        z-index: 2;
      }
      .chevron.open { transform: translateY(-50%) rotate(180deg); }

      .options-list {
        position: absolute; top: 100%; left: 0; right: 0;
        background: ${InputVar['bg']};
        border: 1px solid ${InputVar['border-color']};
        border-radius: ${InputVar.radius};
        margin-top: 4px; padding: 0; list-style: none;
        max-height: 250px; overflow-y: auto; z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        opacity: 1; transform: translateY(0);
        transition: opacity 0.1s, transform 0.1s;
      }

      .options-list.hidden {
        opacity: 0; pointer-events: none; transform: translateY(-5px);
        /* We hide it visually but keep it for transition, or use display: none */
        display: none; 
      }

      .group-header {
        padding: 8px 12px; font-size: 0.75rem; font-weight: 700;
        text-transform: uppercase; color: ${InputVar['text-color-placeholder']};
        background-color: ${InputVar['bg-disabled']};
        position: sticky; top: 0; z-index: 1;
      }

      .option-item {
        padding: ${InputVar['option-padding']};
        cursor: pointer; color: ${InputVar['option-color']};
        display: flex; justify-content: space-between; align-items: center;
      }

      .option-item.highlighted { background-color: ${InputVar['option-bg-hover']}; color: ${InputVar['option-color-hover']}; }
      
      .option-item.selected { 
          color: ${InputVar['option-color-checked']}; 
          font-weight: 600; 
          background-color: ${InputVar['option-bg-checked']}; 
      }
      
      .option-item.disabled {
          opacity: 0.5;
          cursor: not-allowed;
          background-color: transparent;
      }
      
      /* If needed, we can add a specific selected-highlighted state, 
         but option-bg-checked is usually strong enough.
         For now let's reuse checked style + opacity or darken ? 
      */
      .option-item.selected.highlighted { 
         filter: brightness(0.95);
      }
      
      .no-results { padding: 0.75rem; color: ${InputVar['text-color-placeholder']}; text-align: center; font-style: italic; }
      
      .check-icon { font-size: 0.8em; }
    `
  ];
}
import { html, css } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { MelserBaseInput } from '../core/melser-base-input';
import { Var } from '../theme/tokens';
import type { MelserDataType, SelectOption } from '../types/index';

@customElement('melser-multi-select')
export class MelserMultiSelect extends MelserBaseInput<string[]> {
  @property({ type: Array }) value: string[] = [];
  @property({ type: Array }) options: SelectOption[] = [];
  @query('input') inputElement!: HTMLInputElement;

  readonly dataType: MelserDataType = 'array';

  handleChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    const selectedOptions = Array.from(select.selectedOptions).map(opt => opt.value);
    this.value = selectedOptions;
    this.dispatchChange();
  }

  checkValidity(): boolean {
    if (this.required && (this.value.length === 0)) {
      return false;
    }
    return true;
  }

  @state() private _renderedOptions: SelectOption[] = [];

  override firstUpdated() {
    this.syncOptions();
  }

  private syncOptions() {
    if (this.options && this.options.length > 0) {
      this._renderedOptions = [...this.options];
      return;
    }

    const newOptions: SelectOption[] = [];
    const children = Array.from(this.children);
    const initialSelectedValues: string[] = [];

    children.forEach(child => {
      if (child.tagName.toLowerCase() === 'option') {
        const opt = child as HTMLOptionElement;
        newOptions.push({
          label: opt.textContent || '',
          value: opt.value
        });
        
        if (opt.hasAttribute('selected')) {
          initialSelectedValues.push(opt.value);
        }
      }
    });

    this._renderedOptions = newOptions;

    // Only set initial value from attributes if no value is currently present
    if (initialSelectedValues.length > 0 && this.value.length === 0) {
      this.value = initialSelectedValues;
    }
  }

  render() {
    return html`
      <div class="input-wrapper">
        ${this.label ? html`<label for="${this.inputId}">${this.label}</label>` : ''}
        <slot style="display: none;" @slotchange="${this.syncOptions}"></slot>
        <select
          id="${this.inputId}"
          multiple
          ?disabled="${this.disabled}"
          ?required="${this.required}"
          @change="${this.handleChange}"
          part="select"
        >
          ${this._renderedOptions.map(opt => html`
            <option 
              value="${opt.value}" 
              ?selected="${this.value.includes(opt.value)}"
            >
              ${opt.label}
            </option>
          `)}
        </select>
        <div class="error" part="error">${this.errorMessage}</div>
        <div class="help-text">Hold Ctrl/Cmd to select multiple</div>
      </div>
    `;
  }

  static styles = [
    MelserBaseInput.styles,
    css`
      select[multiple] {
        height: auto;
        min-height: 100px;
        background-image: none;
        padding: 0.5rem;
      }
      .help-text {
        font-size: ${Var.font.size.small};
        color: ${Var.color.text.secondary};
        margin-top: -0.25rem;
      }
    `
  ];
}

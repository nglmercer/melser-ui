import { html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { MelserBaseInput, InputVar } from '../core/melser-base-input';
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

  render() {
    return html`
      <div class="input-wrapper">
        ${this.label ? html`<label for="${this.inputId}">${this.label}</label>` : ''}
        <select
          id="${this.inputId}"
          multiple
          ?disabled="${this.disabled}"
          ?required="${this.required}"
          @change="${this.handleChange}"
          part="select"
        >
          ${this.options.map(opt => html`
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

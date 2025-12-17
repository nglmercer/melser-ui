import { html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { BaseInput } from '../core/Base';
import type { MelserDataType } from '../types/index';

@customElement('me-textarea')
export class MelserTextarea extends BaseInput<string> {
  @property({ type: String }) value = '';
  @property({ type: String }) placeholder = '';
  @property({ type: Number }) rows = 4;
  @query('textarea') inputElement!: HTMLTextAreaElement;
  readonly dataType: MelserDataType = 'string';

  handleInput(e: Event) {
    const input = e.target as HTMLTextAreaElement;
    this.value = input.value;
    this.dispatchChange();
  }

  render() {
    return html`
      <div class="input-wrapper">
        ${this.label ? html`<label for="${this.inputId}">${this.label}</label>` : ''}
        <textarea
          id="${this.inputId}"
          .value="${this.value}"
          .placeholder="${this.placeholder}"
          .rows="${this.rows}"
          ?disabled="${this.disabled}"
          ?required="${this.required}"
          @input="${this.handleInput}"
          part="input"
        ></textarea>
        <div class="error" part="error">${this.errorMessage}</div>
      </div>
    `;
  }

  static styles = [
    BaseInput.styles,
    css`
      textarea {
        resize: vertical;
        font-family: inherit;
      }
    `
  ];
}

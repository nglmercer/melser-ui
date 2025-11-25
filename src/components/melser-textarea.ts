import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MelserBaseInput } from '../core/melser-base-input';
import type { MelserDataType } from '../types/index';

@customElement('melser-textarea')
export class MelserTextarea extends MelserBaseInput<string> {
    @property({ type: String }) value = '';
    @property({ type: String }) placeholder = '';
    @property({ type: Number }) rows = 4;

    readonly dataType: MelserDataType = 'string';

    handleInput(e: Event) {
        const input = e.target as HTMLTextAreaElement;
        this.value = input.value;
        this.dispatchChange();
    }

    render() {
        return html`
      <div class="input-wrapper">
        ${this.label ? html`<label for="input">${this.label}</label>` : ''}
        <textarea
          id="input"
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
        MelserBaseInput.styles,
        css`
      textarea {
        resize: vertical;
        font-family: inherit;
      }
    `
    ];
}

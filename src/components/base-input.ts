import { html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { MelserBaseInput, InputVar } from '../core/Base';
import type { MelserDataType } from '../types/index';

@customElement('base-input')
export class MelserTextInput extends MelserBaseInput<string> {
  @property({ type: String }) value = '';
  @property({ type: String }) placeholder = '';
  @property({ type: String }) type = 'text';
  @property({ type: Boolean }) readonly = false;

  @query('input') inputElement!: HTMLInputElement;

  readonly dataType: MelserDataType = 'string';

  handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this.dispatchChange();
  }

  render() {
    return html`
      <div class="input-wrapper">
        ${this.label ? html`
          <label for="${this.inputId}" part="label">
            ${this.label}
            ${this.required ? html`<span class="required-mark" part="required">*</span>` : ''}
          </label>
        ` : ''}
        
        <div class="input-container" part="container">
          <input
            id="${this.inputId}"
            .type="${this.type}"
            .value="${this.value}"
            .placeholder="${this.placeholder}"
            ?disabled="${this.disabled}"
            ?required="${this.required}"
            ?readonly="${this.readonly}"
            @input="${this.handleInput}"
            part="input"
          />
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

      .input-container {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
      }

      input {
        /* 2. Aseguramos que el input ocupe todo el ancho */
        width: 100%;
        /* 3. IMPORTANTE: border-box evita que el padding rompa el ancho del 100% */
        box-sizing: border-box;        
        /* Estilos base heredados o reseteados */
        height: 40px; /* Altura consistente */
        border: 1px solid ${InputVar['border-color']};
        border-radius: ${InputVar.radius};
        background-color: ${InputVar.bg};
        color: ${InputVar['text-color']};
        padding-left: 0.75rem;
        transition: border-color 0.2s, box-shadow 0.2s;
      }

      input:focus {
        outline: none;
        border-color: ${InputVar['focus-ring-color']};
        box-shadow: ${InputVar['focus-shadow']};
      }

      input:disabled {
        background-color: ${InputVar['bg-disabled']};
        cursor: not-allowed;
      }
    `
  ];
}

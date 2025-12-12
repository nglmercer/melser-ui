import { html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { MelserBaseInput, InputVar } from '../core/Base';

import type { MelserDataType } from '../types/index';

// Iconos extraídos para limpiar el render
const eyeIcon = html`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
const eyeOffIcon = html`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;

@customElement('me-password-input')
export class MelserPasswordInput extends MelserBaseInput<string> {
  @property({ type: String }) value = '';
  @property({ type: String }) placeholder = '';
  @query('input') inputElement!: HTMLInputElement;
  @state() private showPassword = false;

  readonly dataType: MelserDataType = 'string';

  handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this.dispatchChange();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  render() {
    return html`
      <div class="input-wrapper">
        ${this.label ? html`<label for="${this.inputId}">${this.label}</label>` : ''}
        
        <div class="password-container">
          <input
            id="${this.inputId}"
            .type="${this.showPassword ? 'text' : 'password'}"
            .value="${this.value}"
            .placeholder="${this.placeholder}"
            ?disabled="${this.disabled}"
            ?required="${this.required}"
            @input="${this.handleInput}"
            part="input"
          />
          
          <button 
            type="button" 
            class="toggle-btn" 
            @click="${this.togglePasswordVisibility}"
            aria-label="${this.showPassword ? 'Hide password' : 'Show password'}"
            ?disabled="${this.disabled}"
          >
            ${this.showPassword ? eyeOffIcon : eyeIcon}
          </button>
        </div>
        <div class="error" part="error">${this.errorMessage}</div>
      </div>
    `;
  }

  static styles = [
    MelserBaseInput.styles,
    css`
      /* 1. Corrección del ancho del componente */
      :host {
        display: block;
        width: 100%;
      }

      .input-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
      }

      .password-container {
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
        padding-right: 3rem; /* Espacio reservado para el botón */
        
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

      .toggle-btn {
        position: absolute;
        right: 0.5rem;
        top: 50%;
        transform: translateY(-50%); /* Centrado vertical perfecto */
        background: none;
        border: none;
        cursor: pointer;
        color: ${InputVar['text-color-placeholder']};
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.25rem;
        border-radius: 50%;
        transition: color 0.2s, background-color 0.2s;
        height: 32px;
        width: 32px;
      }

      .toggle-btn:hover:not(:disabled) {
        color: ${InputVar['icon-color']};
        background-color: ${InputVar['bg-hover']};
      }
      
      .toggle-btn:focus {
        outline: none;
        box-shadow: 0 0 0 2px ${InputVar['focus-ring-color']};
      }

      .toggle-btn:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }
    `
  ];
}

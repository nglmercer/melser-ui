import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MelserBaseInput } from '../core/melser-base-input';
import type { MelserDataType } from '../types/index';

@customElement('melser-color-picker')
export class MelserColorPicker extends MelserBaseInput<string> {
  // Usamos reflect para que el atributo HTML cambie visualmente en el inspector
  @property({ type: String, reflect: true }) value = '#000000';

  readonly dataType: MelserDataType = 'string';

  // Validador simple para Hex de 6 dígitos
  private isValidHex(hex: string): boolean {
    return /^#[0-9A-F]{6}$/i.test(hex);
  }

  handleColorInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this.dispatchChange();
  }

  handleTextInput(e: Event) {
    const input = e.target as HTMLInputElement;
    let val = input.value;

    // Si el usuario borra el #, lo agregamos implícitamente si está escribiendo hex
    if (!val.startsWith('#')) {
      val = '#' + val;
    }

    this.value = val;

    // Solo disparamos el evento de cambio externo si es un color válido
    if (this.isValidHex(val)) {
      this.dispatchChange();
    }
  }

  render() {
    // Para el input type="color", si el valor actual no es válido (ej: usuario escribiendo),
    // usamos #000000 o el último color válido para evitar warnings del navegador,
    // PERO mantenemos this.value intacto para el input de texto.
    const colorValue = this.isValidHex(this.value) ? this.value : '#000000';

    return html`
      <div class="input-wrapper">
        ${this.label ? html`<label>${this.label}</label>` : ''}
        
        <div class="color-container">
          <input
            type="color"
            .value="${colorValue}"
            ?disabled="${this.disabled}"
            @input="${this.handleColorInput}"
            part="color-swatch"
          />
          
          <input
            type="text"
            .value="${this.value}"
            ?disabled="${this.disabled}"
            @input="${this.handleTextInput}"
            part="input"
            class="hex-input"
            maxlength="7"
            placeholder="#000000"
          />
        </div>
        <div class="error" part="error">${this.errorMessage}</div>
      </div>
    `;
  }

  static styles = [
    MelserBaseInput.styles,
    css`
      .color-container {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        position: relative;
      }

      input[type="color"] {
        -webkit-appearance: none;
        border: none;
        width: 3rem;
        height: 3rem;
        padding: 0;
        border-radius: var(--melser-radius);
        overflow: hidden;
        cursor: pointer;
        background: none;
        flex-shrink: 0; /* Evita que se aplaste */
      }
      
      input[type="color"]::-webkit-color-swatch-wrapper {
        padding: 0;
      }
      
      input[type="color"]::-webkit-color-swatch {
        border: 1px solid var(--melser-border);
        border-radius: var(--melser-radius);
      }

      .hex-input {
        flex: 1;
        font-family: monospace;
        text-transform: uppercase;
        height: 3rem; /* Igualar altura visualmente */
        box-sizing: border-box;
      }
    `
  ];
}
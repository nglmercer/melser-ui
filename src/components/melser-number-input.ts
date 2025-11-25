import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MelserBaseInput } from '../core/melser-base-input';
import type { MelserDataType } from '../types/index';

@customElement('melser-number-input')
export class MelserNumberInput extends MelserBaseInput<number> {
  @property({ type: Number }) value = 0;
  @property({ type: Number }) min = Number.MIN_SAFE_INTEGER;
  @property({ type: Number }) max = Number.MAX_SAFE_INTEGER;
  @property({ type: Number }) step = 1;

  readonly dataType: MelserDataType = 'number';

  handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    // Previene NaN si el usuario borra todo el input
    const val = input.value === '' ? 0 : parseFloat(input.value);

    if (!isNaN(val)) {
      this.value = val;
      this.dispatchChange();
    }
  }

  // Helper para evitar errores de punto flotante (ej: 0.1 + 0.2 = 0.300000004)
  private safeMath(operation: 'add' | 'sub'): number {
    const current = this.value || 0;
    // Multiplicamos por un factor para operar con enteros y luego dividir
    // Esto es básico, si necesitas precisión financiera usa librerías como decimal.js
    const precision = 100000;
    const v = Math.round(current * precision);
    const s = Math.round(this.step * precision);

    const result = operation === 'add' ? v + s : v - s;
    return result / precision;
  }

  increment() {
    if (this.disabled) return;
    const newValue = this.safeMath('add');

    if (newValue <= this.max) {
      this.value = newValue;
      this.dispatchChange();
    }
  }

  decrement() {
    if (this.disabled) return;
    const newValue = this.safeMath('sub');

    if (newValue >= this.min) {
      this.value = newValue;
      this.dispatchChange();
    }
  }

  render() {
    return html`
      <div class="input-wrapper">
        ${this.label ? html`<label for="${this.inputId}">${this.label}</label>` : ''}
        
        <div class="number-control">
          <button 
            type="button" 
            class="stepper-btn" 
            @click="${this.decrement}"
            ?disabled="${this.disabled || (this.value <= this.min)}"
            aria-label="Decrease value"
            tabindex="-1" 
          >−</button>
          
          <input
            id="${this.inputId}"
            type="number"
            .value="${this.value}"
            .min="${this.min}"
            .max="${this.max}"
            .step="${this.step}"
            ?disabled="${this.disabled}"
            ?required="${this.required}"
            @input="${this.handleInput}"
            part="input"
          />
          
          <button 
            type="button" 
            class="stepper-btn" 
            @click="${this.increment}"
            ?disabled="${this.disabled || (this.value >= this.max)}"
            aria-label="Increase value"
            tabindex="-1"
          >+</button>
        </div>
        <div class="error" part="error">${this.errorMessage}</div>
      </div>
    `;
  }

  static styles = [
    MelserBaseInput.styles,
    css`
      /* 1. Hacemos que el componente ocupe todo el espacio disponible */
      :host {
        display: block;
        width: 100%;
        box-sizing: border-box;
      }

      .input-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
      }

      .number-control {
        display: flex;
        align-items: stretch; /* Asegura que botones e input tengan misma altura */
        border: 1px solid var(--melser-border);
        border-radius: var(--melser-radius);
        background-color: var(--melser-input-bg);
        width: 100%; /* Ocupa el ancho del wrapper */
        overflow: hidden;
        transition: border-color 0.2s, box-shadow 0.2s;
        height: 40px; /* Opcional: fija altura para consistencia */
      }

      .number-control:focus-within {
        border-color: var(--melser-primary);
        box-shadow: 0 0 0 2px hsla(var(--melser-primary-h), var(--melser-primary-s), var(--melser-primary-l), 0.2);
      }

      input[type="number"] {
        /* 2. Hacemos que el input crezca para ocupar el espacio entre botones */
        flex: 1;
        width: 0; /* Truco de flexbox para evitar desbordamientos */
        min-width: 0;
        
        border: none;
        border-radius: 0;
        text-align: center;
        -moz-appearance: textfield;
        background: transparent;
        box-shadow: none;
        height: 100%;
        color: var(--melser-text);
        font-size: 1rem;
        padding: 0; /* Remover padding para centrar mejor verticalmente */
      }
      
      input[type="number"]:focus {
        outline: none; /* El foco lo maneja el contenedor padre */
      }

      input[type="number"]::-webkit-outer-spin-button,
      input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      .stepper-btn {
        background: var(--melser-surface);
        border: none;
        color: var(--melser-text);
        width: 40px; /* Ancho fijo para botones */
        flex-shrink: 0; /* Evita que los botones se aplasten */
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 1.2rem;
        transition: background-color 0.2s;
        margin: 0;
        padding: 0;
        height: auto; /* Toma la altura del padre (flex stretch) */
      }

      .stepper-btn:hover:not(:disabled) {
        background-color: var(--melser-border);
      }

      .stepper-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        background-color: transparent;
      }
    `
  ];
}

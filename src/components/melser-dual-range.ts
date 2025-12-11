import { html, css, type PropertyValues } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { MelserBaseInput, InputVar } from '../core/base-input';
import { Var } from '../theme/tokens';
import type { MelserDataType } from '../types/index';

@customElement('me-dual-range')
export class MelserDualRange extends MelserBaseInput<number[]> {
  // FIX: Added custom converter to handle "30,70" string format commonly used in HTML
  @property({
    converter: {
      fromAttribute: (value: string | null) => {
        if (!value) return null;

        // 1. Try JSON (Standard Lit format: "[30, 70]")
        if (value.trim().startsWith('[')) {
          try {
            return JSON.parse(value);
          } catch {
            // Ignore JSON error and try simple format
          }
        }

        // 2. Try comma-separated (HTML friendly format: "30, 70")
        const parts = value.split(',').map((v) => parseFloat(v.trim()));
        if (parts.length >= 2 && !parts.some(isNaN)) {
          return parts;
        }

        return null;
      },
    },
  })
  value = [0, 100];

  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 100;
  @property({ type: Number }) step = 1;

  @state() private _activeThumb: number | null = null;

  readonly dataType: MelserDataType = 'array';
  @query('input') inputElement!: HTMLInputElement;

  /**
   * Lifecycle method called before the component updates.
   * We use this to ensure 'value' is never null or invalid before rendering.
   */
  willUpdate(changedProperties: PropertyValues) {
    super.willUpdate(changedProperties);

    // FIX: Guard against null, undefined, or invalid array structures.
    // This ensures that even if the consumer sets .value = null,
    // the component self-corrects to a valid state [min, max].
    if (!Array.isArray(this.value) || this.value.length < 2) {
      this.value = [this.min, this.max];
    }
  }

  handleInput(index: number, e: Event) {
    const input = e.target as HTMLInputElement;
    const rawVal = parseFloat(input.value);

    // Actualizamos el estado interno
    this.updateValue(index, rawVal);

    // FIX CRÍTICO:
    // Si el usuario arrastró más allá del límite, el estado interno (this.value) 
    // habrá sido corregido por updateValue, pero el input visual del navegador 
    // puede seguir en la posición incorrecta si Lit no detectó un cambio de estado.
    // Forzamos manualmente que el input coincida con el estado real.
    // Nota: Agregamos chequeo de this.value[index] por seguridad, aunque willUpdate ya lo garantiza.
    if (this.value && this.value[index] !== undefined && parseFloat(input.value) !== this.value[index]) {
      input.value = String(this.value[index]);
    }
  }

  updateValue(index: number, val: number) {
    // Safety check just in case updateValue is called before first render/validation
    const currentValues = Array.isArray(this.value) ? this.value : [this.min, this.max];
    const newValues = [...currentValues];

    // 1. Clamping global (Min/Max del componente)
    let clampedVal = Math.max(this.min, Math.min(this.max, val));

    // 2. Snap al step
    clampedVal = Math.round(clampedVal / this.step) * this.step;

    // 3. Clamping relativo (Evitar cruce de manijas)
    if (index === 0) {
      // Si movemos el Mínimo, no puede superar al Máximo actual
      const currentMax = newValues[1];
      clampedVal = Math.min(clampedVal, currentMax);
    } else {
      // Si movemos el Máximo, no puede ser menor al Mínimo actual
      const currentMin = newValues[0];
      clampedVal = Math.max(clampedVal, currentMin);
    }

    // Solo actualizamos si hay un cambio real para evitar ciclos
    if (newValues[index] !== clampedVal) {
      newValues[index] = clampedVal;
      this.value = newValues;
      this.dispatchChange();
    }

    this._activeThumb = index;
  }

  handleContainerClick(e: PointerEvent) {
    if (this.disabled) return;

    // Ignorar si se hace click directamente en los inputs (el nativo ya lo maneja)
    if ((e.target as HTMLElement).tagName === 'INPUT') return;

    const rect = this.shadowRoot!.querySelector('.range-container')!.getBoundingClientRect();
    // Calcular posición relativa
    const percent = (e.clientX - rect.left) / rect.width;
    let rawValue = this.min + (this.max - this.min) * percent;

    // Ajustar al step inmediatamente para calcular distancia real
    rawValue = Math.round(rawValue / this.step) * this.step;

    // Asegurar que value es válido antes de acceder
    const currentValues = Array.isArray(this.value) && this.value.length >= 2 ? this.value : [this.min, this.max];

    // Encontrar la manija más cercana
    const dist0 = Math.abs(currentValues[0] - rawValue);
    const dist1 = Math.abs(currentValues[1] - rawValue);

    let targetIndex = 0;

    // Lógica mejorada para decidir cuál mover si están equidistantes o cerca
    if (dist1 < dist0) {
      targetIndex = 1;
    } else if (dist1 === dist0) {
      // Si están a la misma distancia, movemos el que nos permita ir en esa dirección
      if (rawValue > currentValues[1]) targetIndex = 1;
      else targetIndex = 0;
    }

    this.updateValue(targetIndex, rawValue);

    // Enfocar el input correspondiente
    const inputs = this.shadowRoot!.querySelectorAll('input');
    if (inputs[targetIndex]) {
      inputs[targetIndex].focus();
      // También forzamos el valor visual en el click por seguridad
      // Verificación de nulidad en targetIndex
      if (this.value && this.value[targetIndex] !== undefined) {
        inputs[targetIndex].value = String(this.value[targetIndex]);
      }
    }
  }

  render() {
    // Safety Fallback for Render: Ensure we have numbers to calculate percentages
    // (Even with willUpdate, this is defensive coding for the template)
    const val0 = (this.value && typeof this.value[0] === 'number') ? this.value[0] : this.min;
    const val1 = (this.value && typeof this.value[1] === 'number') ? this.value[1] : this.max;

    const range = this.max - this.min;
    // Evitar división por cero
    const safeRange = range === 0 ? 1 : range;

    const leftPercent = ((val0 - this.min) / safeRange) * 100;
    const rightPercent = ((val1 - this.min) / safeRange) * 100;

    return html`
      <div class="input-wrapper">
        ${this.label ? html`<label>${this.label}</label>` : ''}
        <div class="range-container" @pointerdown="${this.handleContainerClick}">
          <div class="track-bg"></div>
          <div class="track-fill" style="left: ${leftPercent}%; width: ${rightPercent - leftPercent}%"></div>
          
          <div class="tooltip" style="left: ${leftPercent}%; transform: translateX(-50%) ${this._activeThumb === 0 ? 'scale(1)' : ''}">
            ${val0}
          </div>
          <div class="tooltip" style="left: ${rightPercent}%; transform: translateX(-50%) ${this._activeThumb === 1 ? 'scale(1)' : ''}">
            ${val1}
          </div>

          <input
            type="range"
            class="${this._activeThumb === 0 ? 'active' : ''}"
            .min="${this.min}"
            .max="${this.max}"
            .step="${this.step}"
            .value="${val0}"
            @input="${(e: Event) => this.handleInput(0, e)}"
            @focus="${() => this._activeThumb = 0}"
            @blur="${() => this._activeThumb = null}"
            ?disabled="${this.disabled}"
            aria-label="Minimum value"
          />
          <input
            type="range"
            class="${this._activeThumb === 1 ? 'active' : ''}"
            .min="${this.min}"
            .max="${this.max}"
            .step="${this.step}"
            .value="${val1}"
            @input="${(e: Event) => this.handleInput(1, e)}"
            @focus="${() => this._activeThumb = 1}"
            @blur="${() => this._activeThumb = null}"
            ?disabled="${this.disabled}"
            aria-label="Maximum value"
          />
        </div>
        <div class="error" part="error">${this.errorMessage}</div>
      </div>
    `;
  }

  static styles = [
    MelserBaseInput.styles,
    css`
      .range-container {
        position: relative;
        height: 3rem;
        display: flex;
        align-items: center;
        margin-top: 1rem;
        cursor: pointer;
        touch-action: none; /* Importante para móviles */
      }

      input[type=range] {
        position: absolute;
        width: 100%;
        pointer-events: none;
        appearance: none;
        background: none;
        margin: 0;
        z-index: 2;
        border: none;
        padding: 0;
        height: 100%;
        background-color: transparent !important;
      }

      /* Traer el activo al frente para que no se quede atascado debajo del otro */
      input[type=range].active {
        z-index: 10;
      }
      
      input[type=range]:focus {
        outline: none;
      }

      /* --- Estilos del Thumb (Webkit) --- */
      input[type=range]::-webkit-slider-thumb {
        pointer-events: auto; /* Habilita interacción solo en la bolita */
        appearance: none;
        width: 1.2rem;
        height: 1.2rem;
        background: ${Var.color.primary};
        border-radius: 50%;
        cursor: grab;
        border: 2px solid ${Var.color.primary};
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        margin-top: -0.5rem; 
        transition: transform 0.1s, background-color 0.2s;
        position: relative;
        z-index: 11; /* Mayor que el input */
      }

      /* --- Estilos del Thumb (Firefox) --- */
      input[type=range]::-moz-range-thumb {
        pointer-events: auto;
        width: 1.2rem;
        height: 1.2rem;
        background: ${Var.color.primary};
        border-radius: 50%;
        cursor: grab;
        border: 2px solid ${Var.color.primary};
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        z-index: 11;
      }

      /* Estados Focus y Active para los Thumbs */
      input[type=range]:focus::-webkit-slider-thumb {
        background: ${Var.color.primary};
        border-color: white;
        transform: scale(1.1);
      }
      
      input[type=range]:focus::-moz-range-thumb {
        background: ${Var.color.primary};
        border-color: white;
        transform: scale(1.1);
      }

      input[type=range]:active::-webkit-slider-thumb {
        cursor: grabbing;
        transform: scale(1.1);
      }

      /* Track Styles */
      .track-bg {
        position: absolute;
        width: 100%;
        height: 0.25rem;
        background: ${InputVar['border-color']};
        border-radius: 1rem;
        z-index: 1;
        pointer-events: none;
      }

      .track-fill {
        position: absolute;
        height: 0.25rem;
        background: ${Var.color.primary};
        z-index: 1;
        border-radius: 1rem;
        pointer-events: none;
      }
      
      /* Tooltips */
      .tooltip {
        position: absolute;
        top: -1.5rem;
        background: ${Var.color.primary};
        color: white;
        font-size: 0.75rem;
        padding: 0.2rem 0.5rem;
        border-radius: 4px;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.2s, transform 0.2s;
        white-space: nowrap;
        z-index: 20;
      }
      
      .range-container:hover .tooltip,
      .tooltip[style*="scale(1)"] {
        opacity: 1;
      }
    `
  ];
}
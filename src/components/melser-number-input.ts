import { html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { MelserBaseInput, InputVar } from '../core/melser-base-input';
import { Var } from '../theme/tokens';
import type { MelserDataType } from '../types/index';

@customElement('melser-number-input')
export class MelserNumberInput extends MelserBaseInput<number> {
  @property({ type: Number }) value = 0;
  @property({ type: Number }) min = Number.MIN_SAFE_INTEGER;
  @property({ type: Number }) max = Number.MAX_SAFE_INTEGER;
  @property({ type: Number }) step = 1;

  @query('input') inputElement!: HTMLInputElement;

  readonly dataType: MelserDataType = 'number';

  /**
   * Calculates how many decimal places are in the step
   * to ensure we format the number correctly.
   * e.g. step 0.01 => returns 2
   */
  private get precision(): number {
    if (!isFinite(this.step) || this.step === 0) return 0;
    let e = 1;
    let p = 0;
    while (Math.round(this.step * e) / e !== this.step) {
      e *= 10;
      p++;
    }
    return p;
  }

  /**
   * Safe math helper that respects the current step precision
   */
  private safeMath(operation: 'add' | 'sub'): number {
    const precisionFactor = Math.pow(10, this.precision);
    const current = isNaN(this.value) ? 0 : this.value;

    const v = Math.round(current * precisionFactor);
    const s = Math.round(this.step * precisionFactor);

    const result = operation === 'add' ? v + s : v - s;
    return result / precisionFactor;
  }

  /**
   * Validates a number against min, max, and step.
   * Returns the "corrected" number.
   */
  private validateAndSnap(val: number): number {
    if (isNaN(val)) return this.min > 0 ? this.min : 0;

    // 1. Clamp Min/Max
    let safeVal = Math.max(this.min, Math.min(this.max, val));

    // 2. Snap to Step
    // Formula: round(value / step) * step
    // We use a precision factor to avoid 0.3000004 floating point errors
    if (this.step > 0) {
      const precisionFactor = Math.pow(10, this.precision);
      const stepInt = Math.round(this.step * precisionFactor);
      const valInt = Math.round(safeVal * precisionFactor);

      // Find nearest multiple
      const remainder = valInt % stepInt;
      let snappedInt = valInt;

      if (remainder !== 0) {
        if (remainder >= stepInt / 2) {
          snappedInt = valInt + (stepInt - remainder);
        } else {
          snappedInt = valInt - remainder;
        }
      }

      safeVal = snappedInt / precisionFactor;
    }

    return safeVal;
  }

  /**
   * Live Typing Handler.
   * We parse the input but DO NOT force validation formatting here.
   * This allows the user to type "1." or "0.0" without the cursor jumping.
   */
  handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    const rawValue = input.value;

    // Handle empty state
    if (rawValue === '') {
      return;
    }

    const val = parseFloat(rawValue);

    // Only update internal state if it's a valid number
    if (!isNaN(val)) {
      this.value = val;
      this.dispatchChange();
    }
  }

  /**
   * Blur/Enter Handler.
   * STRICT Validation happens here. We force the value to be valid
   * and update the input text to match.
   */
  handleChange(e: Event) {
    const input = e.target as HTMLInputElement;

    // If empty on blur, decide behavior (reset to min, 0, or leave empty)
    if (input.value === '') {
      return;
    }

    let val = parseFloat(input.value);

    // Run strict validation logic
    const validatedVal = this.validateAndSnap(val);

    // Update internal state
    this.value = validatedVal;

    // Format the visual input to the correct decimal places
    // This fixes visual issues like "10" showing as "10.000000001"
    const displayValue = this.precision > 0
      ? validatedVal.toFixed(this.precision)
      : validatedVal.toString();

    if (this.inputElement) {
      this.inputElement.value = displayValue;
    }

    this.dispatchChange();
  }

  increment() {
    if (this.disabled) return;
    const rawNewValue = this.safeMath('add');
    const validValue = this.validateAndSnap(rawNewValue);

    this.value = validValue;

    // Update input display immediately for buttons
    if (this.inputElement) {
      this.inputElement.value = this.precision > 0
        ? validValue.toFixed(this.precision)
        : validValue.toString();
    }

    this.dispatchChange();
  }

  decrement() {
    if (this.disabled) return;
    const rawNewValue = this.safeMath('sub');
    const validValue = this.validateAndSnap(rawNewValue);

    this.value = validValue;

    if (this.inputElement) {
      this.inputElement.value = this.precision > 0
        ? validValue.toFixed(this.precision)
        : validValue.toString();
    }

    this.dispatchChange();
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
            .min="${this.min}"
            .max="${this.max}"
            .step="${this.step}"
            .value="${this.value}" 
            ?disabled="${this.disabled}"
            ?required="${this.required}"
            @input="${this.handleInput}"
            @change="${this.handleChange}" 
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
        align-items: stretch;
        border: 1px solid ${InputVar['border-color']};
        border-radius: ${InputVar.radius};
        background-color: ${InputVar.bg};
        width: 100%;
        overflow: hidden;
        transition: border-color 0.2s, box-shadow 0.2s;
        height: 40px;
      }
      .number-control:focus-within {
        border-color: ${InputVar['focus-ring-color']};
        box-shadow: ${InputVar['focus-shadow']};
      }
      input[type="number"] {
        flex: 1;
        width: 0;
        min-width: 0;
        border: none;
        border-radius: 0;
        text-align: center;
        -moz-appearance: textfield;
        background: transparent;
        box-shadow: none;
        height: 100%;
        color: ${InputVar['text-color']};
        font-size: 1rem;
        padding: 0;
      }
      input[type="number"]:focus {
        outline: none;
      }
      /* Hide native spinners */
      input[type="number"]::-webkit-outer-spin-button,
      input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      .stepper-btn {
        background: ${Var.color.surface.variant};
        border: none;
        color: ${InputVar['text-color']};
        width: 40px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 1.2rem;
        transition: background-color 0.2s;
        margin: 0;
        padding: 0;
        height: auto;
      }
      .stepper-btn:hover:not(:disabled) {
        background-color: ${InputVar['border-color-hover']};
      }
      .stepper-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        background-color: transparent;
      }
    `
  ];
}
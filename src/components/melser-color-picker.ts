import { html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { MelserBaseInput, InputVar } from '../core/Base';
import type { MelserDataType } from '../types/index';

@customElement('me-color-picker')
export class MelserColorPicker extends MelserBaseInput<string> {
  @property({ type: String, reflect: true }) override value = '#000000';
  @query('input[type="color"]') inputElement!: HTMLInputElement;
  readonly dataType: MelserDataType = 'string';
  private readonly hexRegex = /^#[0-9A-F]{6}$/i;

  private isValidHex(hex: string): boolean {
    return this.hexRegex.test(hex);
  }

  private handleColorInput(e: Event): void {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this.dispatchChange();
  }

  private handleTextInput(e: Event): void {
    const input = e.target as HTMLInputElement;
    let val = input.value;
    if (!val.startsWith('#')) val = `#${val}`;
    this.value = val;
    if (this.isValidHex(val)) this.dispatchChange();
  }

  override render() {
    const colorValue = this.isValidHex(this.value) ? this.value : '#000000';

    return html`
      <div class="input-wrapper">
        ${this.label ? html`<label for="${this.inputId}">${this.label}</label>` : ''}
        
        <div class="color-container">
          <input
            id="${this.inputId}"
            type="color"
            .value="${colorValue}"
            ?disabled="${this.disabled}"
            @input="${this.handleColorInput}"
            part="color-swatch"
            aria-label="${this.label || 'Color picker'}"
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
            aria-label="${this.label ? `${this.label} hex value` : 'Hex color value'}"
          />
        </div>
        ${this.errorMessage ? html`<div class="error" part="error" role="alert">${this.errorMessage}</div>` : ''}
      </div>
    `;
  }

  static override styles = [
    MelserBaseInput.styles,
    css`
      :host {
        /* Use InputVar for focus color consistency */
        --focus-color: ${InputVar['focus-ring-color']};
      }

      .color-container {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        position: relative;
      }

      /* --- COLOR INPUT STYLES --- */
      input[type="color"] {
        -webkit-appearance: none;
        appearance: none;
        border: none;
        width: 3rem;
        height: 3rem;
        padding: 0;
        border-radius: ${InputVar.radius};
        background: none;
        cursor: pointer;
        flex-shrink: 0;
        
        /* CRITICAL FIX 1: Allow outline to be seen outside the box */
        overflow: visible; 
      }
      
      /* CRITICAL FIX 2: Explicit Focus Styles */
      input[type="color"]:focus {
        outline: none; /* Reset default to prevent double outlines */
      }

      input[type="color"]:focus-visible {
        /* Use a strong outline color */
        outline: 2px solid ${InputVar['focus-ring-color']};
        outline-offset: 2px;
        /* Optional: Add box-shadow for better visibility/softness */
        box-shadow: 0 0 0 4px${InputVar['bg-hover']}; 
        border-radius: ${InputVar.radius};
      }
      
      /* Webkit specific inner parts */
      input[type="color"]::-webkit-color-swatch-wrapper {
        padding: 0; 
      }
      
      input[type="color"]::-webkit-color-swatch {
        border: 1px solid ${InputVar['border-color']};
        border-radius: ${InputVar.radius};
        /* Ensure the swatch doesn't bleed out */
        box-sizing: border-box;
      }

      /* Firefox specific inner parts */
      input[type="color"]::-moz-color-swatch {
        border: 1px solid ${InputVar['border-color']};
        border-radius: ${InputVar.radius};
      }

      /* --- TEXT INPUT STYLES --- */
      .hex-input {
        flex: 1;
        font-family: monospace;
        text-transform: uppercase;
        height: 3rem;
        box-sizing: border-box;
        border: 1px solid ${InputVar['border-color']};
        border-radius: ${InputVar.radius};
        padding: 0 1rem;
      }

      /* Text Input Focus */
      .hex-input:focus {
        outline: none;
      }

      .hex-input:focus-visible {
        border-color: ${InputVar['focus-ring-color']};
        outline: 2px solid ${InputVar['focus-ring-color']};
        outline-offset: -1px; /* Draws outline inside/on border to prevent layout shifts */
      }

      .error {
        color: ${InputVar['error-color']};
        font-size: ${InputVar['error-font-size']};
        margin-top: ${InputVar['error-margin-top']};
      }
    `
  ];
}
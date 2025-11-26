import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MelserBaseInput } from '../core/melser-base-input';
import type { MelserDataType } from '../types/index';

@customElement('melser-color-picker')
export class MelserColorPicker extends MelserBaseInput<string> {
  @property({ type: String, reflect: true }) override value = '#000000';
  
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
        /* Define a default focus color if not provided globally */
        --focus-color: var(--melser-focus, #2563eb);
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
        border-radius: var(--melser-radius, 4px);
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
        outline: 2px solid var(--focus-color);
        outline-offset: 2px;
        /* Optional: Add box-shadow for better visibility/softness */
        box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.2); 
        border-radius: var(--melser-radius, 4px);
      }
      
      /* Webkit specific inner parts */
      input[type="color"]::-webkit-color-swatch-wrapper {
        padding: 0; 
      }
      
      input[type="color"]::-webkit-color-swatch {
        border: 1px solid var(--melser-border, #ccc);
        border-radius: var(--melser-radius, 4px);
        /* Ensure the swatch doesn't bleed out */
        box-sizing: border-box;
      }

      /* Firefox specific inner parts */
      input[type="color"]::-moz-color-swatch {
        border: 1px solid var(--melser-border, #ccc);
        border-radius: var(--melser-radius, 4px);
      }

      /* --- TEXT INPUT STYLES --- */
      .hex-input {
        flex: 1;
        font-family: monospace;
        text-transform: uppercase;
        height: 3rem;
        box-sizing: border-box;
        border: 1px solid var(--melser-border, #ccc);
        border-radius: var(--melser-radius, 4px);
        padding: 0 1rem;
      }

      /* Text Input Focus */
      .hex-input:focus {
        outline: none;
      }

      .hex-input:focus-visible {
        border-color: var(--focus-color);
        outline: 2px solid var(--focus-color);
        outline-offset: -1px; /* Draws outline inside/on border to prevent layout shifts */
      }

      .error {
        color: var(--melser-error, #ff0000);
        font-size: 0.75rem;
        margin-top: 0.25rem;
      }
    `
  ];
}
import { html, css, nothing } from 'lit';
import { customElement, property,query } from 'lit/decorators.js';
import { MelserBaseInput } from '../core/melser-base-input';
import type { MelserDataType } from '../types/index';

@customElement('melser-checkbox')
export class MelserCheckbox extends MelserBaseInput<boolean> {
  @property({ type: Boolean }) value = false;
  
  @property({ type: Boolean, reflect: true }) checked = false;
  @query('input') inputElement!: HTMLInputElement;
  readonly dataType: MelserDataType = 'boolean';

  handleChange(e: Event) {
    const input = e.target as HTMLInputElement;
    
    this.value = input.checked;
    this.checked = input.checked;
    this.dispatchChange();
  }

  checkValidity(): boolean {
    this.checked = this.value;
    return this.required ? this.checked : true;
  }

  render() {
    return html`
      <div class="input-wrapper" part="wrapper">
        <label class="checkbox-container" part="container">
          
          <input
            class="visually-hidden"
            type="checkbox"
            .checked="${(this.checked || this.value)}" 
            ?disabled="${this.disabled}"
            ?required="${this.required}"
            @change="${this.handleChange}"
            part="native-input" 
          />

          <span class="control" part="control">
            <svg viewBox="0 0 24 24" part="icon">
              <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/>
            </svg>
          </span>

          <span class="label-text" part="label">
            ${this.label}
            ${this.required ? html`<span class="required-mark">*</span>` : nothing}
          </span>
          
        </label>

        <div class="error" part="error-message">
           ${this.errorMessage}
        </div>
      </div>
    `;
  }

  static styles = [
    MelserBaseInput.styles, 
    css`
      :host {
        display: block;
        --_chk-size: 1.25rem;
        --_chk-bg: var(--melser-input-bg, #fff);
        --_chk-border: var(--melser-border, #ccc);
        --_chk-active: var(--melser-primary, #6200ee);
        --_chk-radius: var(--melser-radius, 4px);
      }

      :host([size="small"]) {
        --_chk-size: 1rem;
        font-size: 0.875rem;
      }
      
      :host([size="large"]) {
        --_chk-size: 1.6rem;
        font-size: 1.15rem;
      }

      .checkbox-container {
        display: inline-flex;
        align-items: center;
        gap: 0.75em;
        cursor: pointer;
        position: relative;
        width: 100%;
      }

      .visually-hidden {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
        margin: 0;
      }

      .control {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: var(--_chk-size);
        height: var(--_chk-size);
        border: 2px solid var(--_chk-border);
        border-radius: var(--_chk-radius);
        background-color: var(--_chk-bg);
        transition: all 0.2s ease-in-out;
        flex-shrink: 0;
      }

      .control svg {
        width: 70%;
        height: 70%;
        fill: white;
        transform: scale(0);
        transition: transform 0.2s ease-in-out;
      }

      input:checked + .control {
        background-color: var(--_chk-active);
        border-color: var(--_chk-active);
      }

      input:checked + .control svg {
        transform: scale(1);
      }

      input:focus-visible + .control {
        box-shadow: 0 0 0 3px hsla(var(--melser-primary-h), var(--melser-primary-s), var(--melser-primary-l), 0.3);
      }

      :host([disabled]) {
        opacity: 0.6;
        pointer-events: none;
      }
      :host([disabled]) .control {
        background-color: var(--melser-surface, #eee);
      }

      :host([variant="card"]) .checkbox-container {
        border: 1px solid var(--_chk-border);
        padding: 1rem;
        border-radius: var(--melser-radius);
        transition: border-color 0.2s;
      }

      :host([variant="card"]) input:checked ~ .checkbox-container,
      :host([variant="card"]) .checkbox-container:has(input:checked) {
        border-color: var(--_chk-active);
        background-color: hsla(var(--melser-primary-h), var(--melser-primary-s), var(--melser-primary-l), 0.05);
      }

      .required-mark {
        color: var(--melser-error);
        margin-left: 2px;
      }
    `
  ];
}
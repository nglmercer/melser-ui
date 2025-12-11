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
      }

      .checkbox-container {
        display: inline-flex;
        align-items: center;
        gap: var(--base-input-gap);
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
        width: var(--base-input-control-size);
        height: var(--base-input-control-size);
        border: var(--base-input-control-border-width) solid var(--base-input-control-border-color);
        border-radius: var(--base-input-control-radius);
        background-color: var(--base-input-control-bg);
        transition: var(--base-input-hover-transition);
        flex-shrink: 0;
      }

      .control svg {
        width: var(--base-input-icon-size);
        height: var(--base-input-icon-size);
        fill: white;
        transform: scale(var(--base-input-icon-scale));
        transition: transform 0.2s ease-in-out;
      }

      input:checked + .control {
        background-color: var(--base-input-control-bg-checked);
        border-color: var(--base-input-control-border-color-checked);
      }

      input:checked + .control svg {
        transform: scale(var(--base-input-icon-scale-checked));
      }

      input:focus-visible + .control {
        box-shadow: var(--base-input-focus-shadow);
      }

      /* Hover state for control */
      input:hover:not(:disabled) + .control {
        border-color: var(--base-input-control-border-color-hover);
        background-color: var(--base-input-control-bg-hover);
      }

      :host([variant="card"]) .checkbox-container {
        border: 1px solid var(--base-input-control-border-color);
        padding: var(--base-input-padding-large);
        border-radius: var(--base-input-radius);
        transition: var(--base-input-hover-transition);
        background-color: var(--base-input-container-bg);
      }

      :host([variant="card"]) input:checked ~ .checkbox-container,
      :host([variant="card"]) .checkbox-container:has(input:checked) {
        border-color: var(--base-input-control-border-color-checked);
        background-color: hsla(var(--melser-primary-h), var(--melser-primary-s), var(--melser-primary-l), 0.05);
      }

      /* Disabled states are inherited from base-input */
      :host([disabled]) .control {
        background-color: var(--base-input-control-bg-disabled);
        border-color: var(--base-input-control-border-color-disabled);
        cursor: var(--base-input-disabled-cursor);
      }

      /* Label text styling */
      .label-text {
        color: var(--base-input-text-color);
        font-size: var(--base-input-font-size);
      }

      .label-text .required-mark {
        color: var(--base-input-label-color-required);
        margin-left: 2px;
      }
    `
  ];
}
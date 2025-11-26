import { LitElement, css, type CSSResultGroup, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import type { InputData, MelserDataType } from '../types/index';

export abstract class MelserBaseInput<T = unknown> extends LitElement {
  @property({ type: String }) name = '';
  @property({ type: String }) label = '';
  @property({ type: Boolean }) required = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) errorMessage = '';
  @property({ type: Boolean }) debug = false;
  @property({ type: String, attribute: 'input-id' }) inputId = '';
  @property({ type: String, reflect: true }) variant: 'outlined' | 'filled' | 'standard' = 'outlined';
  @property({ type: String, reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  abstract value: T;
  abstract readonly dataType: MelserDataType;
  protected abstract get inputElement(): HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null;
  
  getData(): InputData<T> {
    return {
      name: this.name,
      value: this.value,
      isValid: this.checkValidity(),
      componentType: this.tagName.toLowerCase(),
      dataType: this.dataType
    };
  }

  override connectedCallback(): void {
    super.connectedCallback();
    if (!this.inputId) {
      this.inputId = `melser-${crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2, 9)}`;
    }
  }
  override focus(options?: FocusOptions) {
    this.inputElement?.focus(options);
  }
  checkValidity(): boolean {
    const isValueEmpty = this.value === null || this.value === undefined || this.value === '';
    return !(this.required && isValueEmpty);
  }

  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    if (changedProperties.has('value') && this.debug) {
      this.validateValueType();
    }
  }

  private validateValueType(): void {
    if (this.value == null) return;

    const typeValidators: Record<MelserDataType, (v: unknown) => boolean> = {
      string: (v) => typeof v === 'string',
      number: (v) => typeof v === 'number' && !isNaN(v as number),
      boolean: (v) => typeof v === 'boolean',
      array: (v) => Array.isArray(v),
      date: (v) => v instanceof Date,
      object: (v) => typeof v === 'object' && !Array.isArray(v) && v !== null
    };

    const validator = typeValidators[this.dataType];
    const isValid = validator ? validator(this.value) : true;

    if (!isValid) {
      console.warn(
        `[Type Error] Component <${this.tagName.toLowerCase()}> expected '${this.dataType}' but got '${typeof this.value}'`,
        this
      );
    }
  }

  protected dispatchChange(): void {
    this.dispatchEvent(new CustomEvent('ui:change', {
      detail: this.getData(),
      bubbles: true,
      composed: true
    }));
  }

  static styles: CSSResultGroup = css`
    :host {
      display: block;
      margin-bottom: var(--melser-spacing, 1rem);
      font-family: var(--melser-font-family, sans-serif);
      
      --_input-padding: var(--melser-input-padding, 0.75rem);
      --_input-bg: var(--melser-input-bg, var(--melser-bg, #ffffff));
      --_border-color: var(--melser-border, #cccccc);
      
      /* Accessibility Focus Colors */
      --_focus-ring-color: var(--melser-focus-ring, var(--melser-primary, #005fcc));
      --_focus-ring-width: 2px;
      --_focus-offset: 2px;
    }

    :host([size="small"]) { --_input-padding: 0.4rem 0.5rem; font-size: 0.85rem; }
    :host([size="large"]) { --_input-padding: 1rem 1.2rem; font-size: 1.25rem; }

    .input-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    label {
      font-weight: 600;
      color: var(--melser-label-color, var(--melser-text));
      font-size: 0.9em;
    }

    /* base  */
    input:not([type="checkbox"]):not([type="radio"]), 
    select, 
    textarea {
      width: min(max-content, 100%);
      box-sizing: border-box;
      font-family: inherit;
      padding: var(--_input-padding);
      background-color: var(--_input-bg);
      color: var(--melser-input-text, var(--melser-text));
      transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
      
      /* Remove default browser outline to replace with custom accessible one */
      outline: none; 
    }

    /* ACCESSIBILITY: Visible Focus Styles */
    input:focus-visible, 
    select:focus-visible, 
    textarea:focus-visible {
      border-color: var(--_focus-ring-color);
      /* Use outline for high contrast mode support and clear visibility */
      outline: var(--_focus-ring-width) solid var(--_focus-ring-color);
      outline-offset: var(--_focus-offset);
    }

    /* Fallback for browsers (Safari) where focus-visible might behave differently on click */
    input:focus:not(:focus-visible),
    select:focus:not(:focus-visible),
    textarea:focus:not(:focus-visible) {
      border-color: var(--_focus-ring-color);
    }

    /* VARIANTE: OUTLINED (Default) */
    :host([variant="outlined"]) input,
    :host([variant="outlined"]) select,
    :host([variant="outlined"]) textarea {
      border: 1px solid var(--_border-color);
      border-radius: var(--melser-radius, 4px);
    }

    :host([variant="filled"]) input,
    :host([variant="filled"]) select,
    :host([variant="filled"]) textarea {
      border: none;
      border-bottom: 2px solid var(--_border-color);
      background-color: var(--melser-surface, #f5f5f5);
      border-radius: var(--melser-radius, 4px) var(--melser-radius, 4px) 0 0;
    }
    
    :host([variant="standard"]) input,
    :host([variant="standard"]) select,
    :host([variant="standard"]) textarea {
      border: none;
      border-bottom: 1px solid var(--_border-color);
      border-radius: 0;
      background-color: transparent;
      padding-left: 0;
    }

    :host([invalid]) input {
       border-color: var(--melser-error, #d32f2f);
    }
    
    /* Error state should also update focus color to red */
    :host([invalid]) input:focus-visible {
       outline-color: var(--melser-error, #d32f2f);
       --_focus-ring-color: var(--melser-error, #d32f2f);
    }
  `;
}
import { LitElement, css, type CSSResultGroup } from 'lit';
import { property } from 'lit/decorators.js';
import type { InputData, MelserDataType } from '../types/index';

export abstract class MelserBaseInput<T = any> extends LitElement {
  @property({ type: String }) name = '';
  @property({ type: String }) label = '';
  @property({ type: Boolean }) required = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) errorMessage = '';
  @property({ type: Boolean }) debug = false;
  // Abstract value property that implementing classes must handle
  abstract value: T;

  // Define the data type for Zod compatibility
  abstract readonly dataType: MelserDataType;

  // Method to get standardized data
  getData(): InputData<T> {
    return {
      name: this.name,
      value: this.value,
      isValid: this.checkValidity(),
      componentType: this.tagName.toLowerCase(),
      dataType: this.dataType
    };
  }

  // Basic validation (can be overridden)
  checkValidity(): boolean {
    if (this.required && (this.value === null || this.value === undefined || this.value === '')) {
      return false;
    }
    return true;
  }

  protected updated(changedProperties: Map<string | number | symbol, unknown>): void {
    super.updated(changedProperties);
    if (changedProperties.has('value')) {
      this.validateValueType();
    }
  }

  private validateValueType() {
    // Skip validation if value is null/undefined (unless required, but that's handled by checkValidity)
    if (this.value === null || this.value === undefined) return;

    let isValidType = true;
    const actualType = typeof this.value;

    // Debug log to verify validation is running (can be removed later)
    // console.log(`Validating ${this.tagName}:`, { value: this.value, type: actualType, expected: this.dataType });

    switch (this.dataType) {
      case 'string':
        isValidType = actualType === 'string';
        break;
      case 'number':
        // Check for NaN specifically for number types
        isValidType = actualType === 'number' && !isNaN(this.value as any);
        break;
      case 'boolean':
        isValidType = actualType === 'boolean';
        break;
      case 'array':
        isValidType = Array.isArray(this.value);
        break;
      case 'date':
        isValidType = this.value instanceof Date;
        break;
      case 'object':
        isValidType = actualType === 'object' && !Array.isArray(this.value);
        break;
    }

    if (!isValidType && this.debug) {
      console.warn(
        `%c[Type Error]%c Component <${this.tagName.toLowerCase()}> expected type '${this.dataType}' but received '${Array.isArray(this.value) ? 'array' : actualType}' (Value: ${this.value})`,
        'color: #ff4444; font-weight: bold;',
        'color: inherit;',
        this
      );
    }
  }

  protected dispatchChange() {
    this.dispatchEvent(new CustomEvent('melser-change', {
      detail: this.getData(),
      bubbles: true,
      composed: true
    }));
  }

  static styles: CSSResultGroup = css`
    :host {
      display: block;
      margin-bottom: 1rem;
      font-family: var(--melser-font-family, sans-serif);
      color: var(--melser-text);
    }

    .input-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    label {
      font-weight: 600;
      color: var(--melser-text);
      font-size: 0.9rem;
    }

    .error {
      color: var(--melser-error);
      font-size: 0.8rem;
      min-height: 1.2em;
    }
    
    /* Base styles for text-like inputs */
    input:not([type="checkbox"]):not([type="radio"]):not([type="range"]), 
    select, 
    textarea {
      padding: 0.75rem;
      border: 1px solid var(--melser-border);
      border-radius: var(--melser-radius);
      font-size: 1rem;
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
      width: max(max-content, 100%);
      max-width: 100%;
      box-sizing: border-box;
      background-color: var(--melser-input-bg);
      color: var(--melser-text);
    }

    input:not([type="checkbox"]):not([type="radio"]):not([type="range"]):focus, 
    select:focus, 
    textarea:focus {
      border-color: var(--melser-primary);
      box-shadow: 0 0 0 2px hsla(var(--melser-primary-h), var(--melser-primary-s), var(--melser-primary-l), 0.2);
    }

    input:not([type="checkbox"]):not([type="radio"]):not([type="range"]):disabled, 
    select:disabled, 
    textarea:disabled {
      background-color: var(--melser-surface);
      cursor: not-allowed;
      opacity: 0.7;
    }
  `;
}

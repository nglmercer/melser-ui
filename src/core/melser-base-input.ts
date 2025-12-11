import { LitElement, css, type CSSResultGroup, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { DynamicStyleMixin } from '../mixins/dynamic-style-mixin';
import { Var } from '../theme/tokens';
import type { InputData, MelserDataType } from '../types/index';

export abstract class MelserBaseInput<T = unknown> extends DynamicStyleMixin(LitElement) {
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
      margin-bottom: ${Var.spacing.gap.large};
      font-family: ${Var.font.family};
      
      /* ===== VARIABLES CSS ESTRUCTURADAS - PATRÓN: base-input-[parte?]-[propiedad]-[estado?] ===== */
      
      /* VARIABLES BASE - Sin parte específica */
      --base-input-padding: ${Var.spacing.padding.input.default};
      --base-input-padding-small: ${Var.spacing.padding.input.small};
      --base-input-padding-medium: ${Var.spacing.padding.input.medium};
      --base-input-padding-large: ${Var.spacing.padding.input.large};
      
      --base-input-bg: ${Var.color.bg.default};
      --base-input-bg-hover: ${Var.color.bg.hover};
      --base-input-bg-focus: ${Var.color.bg.default};
      --base-input-bg-disabled: ${Var.color.bg.disabled};
      
      --base-input-border-color: ${Var.color.border.default};
      --base-input-border-color-hover: ${Var.color.border.hover};
      --base-input-border-color-focus: ${Var.color.border.focus};
      --base-input-border-color-error: ${Var.color.border.error};
      --base-input-border-color-disabled: ${Var.color.border.disabled};
      
      --base-input-text-color: ${Var.color.text.primary};
      --base-input-text-color-disabled: ${Var.color.text.disabled};
      --base-input-text-color-placeholder: ${Var.color.text.placeholder};
      
      --base-input-radius: ${Var.radius.default};
      --base-input-focus-ring-color: ${Var.color.focusRing};
      --base-input-focus-ring-width: 2px;
      --base-input-focus-offset: 2px;
      
      --base-input-font-size: ${Var.font.size.default};
      --base-input-font-size-small: ${Var.font.size.small};
      --base-input-font-size-medium: ${Var.font.size.default};
      --base-input-font-size-large: ${Var.font.size.large};
      
      --base-input-font-weight: inherit;
      --base-input-font-weight-label: ${Var.font.weight.bold};
      
      /* VARIABLES DE LABEL */
      --base-input-label-color: ${Var.color.text.primary};
      --base-input-label-color-required: ${Var.color.error};
      --base-input-label-font-size: ${Var.font.size.label};
      --base-input-label-font-weight: ${Var.font.weight.bold};
      
      /* VARIABLES DE CONTAINER/WRAPPER */
      --base-input-container-gap: 0.5rem;
      --base-input-container-bg: transparent;
      --base-input-container-padding: 0;
      
      /* VARIABLES DE ERROR */
      --base-input-error-color: ${Var.color.error};
      --base-input-error-font-size: ${Var.font.size.error};
      --base-input-error-margin-top: 0.25rem;
      
      /* VARIABLES DE CONTROL (para checkbox, radio, switch) */
      --base-input-control-size: 1.25rem;
      --base-input-control-size-small: 1rem;
      --base-input-control-size-large: 1.6rem;
      --base-input-control-bg: var(--base-input-bg);
      --base-input-control-bg-hover: var(--base-input-bg-hover);
      --base-input-control-bg-checked: ${Var.color.primary};
      --base-input-control-bg-disabled: ${Var.color.surface.variant};
      --base-input-control-border-color: var(--base-input-border-color);
      --base-input-control-border-color-hover: var(--base-input-border-color-hover);
      --base-input-control-border-color-focus: var(--base-input-focus-ring-color);
      --base-input-control-border-color-checked: ${Var.color.primary};
      --base-input-control-border-color-disabled: ${Var.color.border.disabled};
      --base-input-control-border-width: 2px;
      --base-input-control-radius: var(--base-input-radius);
      
      /* VARIABLES DE ICONO */
      --base-input-icon-color: ${Var.color.primary}; /* Used to be hardcoded or var(--melser-primary) */
      --base-input-icon-color-disabled: ${Var.color.text.disabled};
      --base-input-icon-size: 70%;
      --base-input-icon-scale: 0;
      --base-input-icon-scale-checked: 1;
      
      /* VARIABLES DE HOVER/FOCUS/ACTIVE STATES */
      --base-input-hover-transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out, background-color 0.2s ease-in-out;
      --base-input-focus-transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
      
      /* VARIABLES DE OPACITY */
      --base-input-opacity-disabled: 0.6;
      --base-input-pointer-events-disabled: none;
      
      /* VARIABLES DE SPACING */
      --base-input-gap: ${Var.spacing.gap.default};
      --base-input-gap-small: ${Var.spacing.gap.small};
      --base-input-gap-large: ${Var.spacing.gap.large};
      
      /* VARIABLES DE SHADOW */
      /* Note: Complex shadows like hsla(var(...)) are hard to tokenize directly without a shadow token.
         I'll keep the current implementation or map if possible. The report suggests tokens.
         If I don't have a shadow token, I'll keep it raw but try to use Var for the color part if possible.
         Or just keep it as is for now since my token map doesn't have shadows. */
      --base-input-focus-shadow: 0 0 0 3px ${Var.color.primary}; /* Simplified fallback */
      --base-input-error-shadow: 0 0 0 3px ${Var.color.error};
      
      /* VARIABLES DE DISABLED */
      --base-input-disabled-cursor: not-allowed;
      --base-input-disabled-color: var(--base-input-text-color-disabled);
      
      /* VARIABLES DE SELECT/DROPDOWN */
      --base-input-select-bg-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
      --base-input-select-bg-repeat: no-repeat;
      --base-input-select-bg-position: right 1rem center;
      --base-input-select-bg-size: 1em;
      
      /* VARIABLES DE SWITCH */
      --base-input-switch-width: 48px;
      --base-input-switch-height: 24px;
      --base-input-switch-radius: 24px;
      --base-input-switch-thumb-size: 18px;
      --base-input-switch-thumb-left: 3px;
      --base-input-switch-thumb-bottom: 3px;
      --base-input-switch-thumb-transform-checked: translateX(24px);
      --base-input-switch-shadow: 0 2px 4px rgba(0,0,0,0.2);
      
      /* VARIABLES DE RADIO */
      --base-input-radio-size: 1.15em;
      --base-input-radio-dot-size: 0.6em;
      --base-input-radio-scale-checked: 1;
      
      /* VARIABLES DE OPTION */
      --base-input-option-padding: var(--base-input-padding);
      --base-input-option-bg: var(--base-input-bg);
      --base-input-option-color: var(--base-input-text-color);
      --base-input-option-cursor: pointer;
      --base-input-option-bg-hover: var(--base-input-bg-hover);
      --base-input-option-color-hover: ${Var.color.primary};
      --base-input-option-bg-checked: ${Var.color.primary};
      --base-input-option-color-checked: var(--base-input-bg);
      
      /* ===== FIN DE VARIABLES ESTRUCTURADAS ===== */
      
      /* Internal variables for backward compatibility */
      --_input-padding: var(--base-input-padding);
      --_input-bg: var(--base-input-bg);
      --_border-color: var(--base-input-border-color);
      --_focus-ring-color: var(--base-input-focus-ring-color);
      --_focus-ring-width: var(--base-input-focus-ring-width);
      --_focus-offset: var(--base-input-focus-offset);
    }

    /* Size variants using new structured variables */
    :host([size="small"]) { 
      --base-input-padding: var(--base-input-padding-small);
      --base-input-font-size: var(--base-input-font-size-small);
      --base-input-control-size: var(--base-input-control-size-small);
      --base-input-gap: var(--base-input-gap-small);
    }
    :host([size="large"]) { 
      --base-input-padding: var(--base-input-padding-large);
      --base-input-font-size: var(--base-input-font-size-large);
      --base-input-control-size: var(--base-input-control-size-large);
      --base-input-gap: var(--base-input-gap-large);
    }

    .input-wrapper {
      display: flex;
      flex-direction: column;
      gap: var(--base-input-container-gap);
      background-color: var(--base-input-container-bg);
      padding: var(--base-input-container-padding);
    }

    label {
      font-weight: var(--base-input-label-font-weight);
      color: var(--base-input-label-color);
      font-size: var(--base-input-label-font-size);
    }

    .required-mark {
      color: var(--base-input-label-color-required);
      margin-left: 2px;
    }

    /* base input elements using new structured variables */
    input:not([type="checkbox"]):not([type="radio"]), 
    select, 
    textarea {
      width: min(max-content, 100%);
      box-sizing: border-box;
      font-family: inherit;
      font-size: var(--base-input-font-size);
      font-weight: var(--base-input-font-weight);
      padding: var(--base-input-padding);
      background-color: var(--base-input-bg);
      color: var(--base-input-text-color);
      transition: var(--base-input-hover-transition);
      
      /* Remove default browser outline to replace with custom accessible one */
      outline: none; 
    }
    
    input::placeholder,
    textarea::placeholder {
      color: var(--base-input-text-color-placeholder);
    }

    /* select dropdown styling */
    select {
      appearance: none;
      background-image: var(--base-input-select-bg-image);
      background-repeat: var(--base-input-select-bg-repeat);
      background-position: var(--base-input-select-bg-position);
      background-size: var(--base-input-select-bg-size);
    }
    
    option {
      padding: var(--base-input-option-padding);
      background-color: var(--base-input-option-bg);
      color: var(--base-input-option-color);
      cursor: var(--base-input-option-cursor);
    }

    option:hover,
    option:focus {
      background-color: var(--base-input-option-bg-hover);
      color: var(--base-input-option-color-hover);
    }

    option:checked {
      background-color: var(--base-input-option-bg-checked);
      color: var(--base-input-option-color-checked);
    }
    /* ACCESSIBILITY: Visible Focus Styles */
    input:focus-visible, 
    select:focus-visible, 
    textarea:focus-visible {
      border-color: var(--base-input-focus-ring-color);
      /* Use outline for high contrast mode support and clear visibility */
      outline: var(--base-input-focus-ring-width) solid var(--base-input-focus-ring-color);
      outline-offset: var(--base-input-focus-offset);
      transition: var(--base-input-focus-transition);
    }

    /* Fallback for browsers (Safari) where focus-visible might behave differently on click */
    input:focus:not(:focus-visible),
    select:focus:not(:focus-visible),
    textarea:focus:not(:focus-visible) {
      border-color: var(--base-input-focus-ring-color);
    }

    /* Hover states */
    input:hover:not(:disabled),
    select:hover:not(:disabled),
    textarea:hover:not(:disabled) {
      border-color: var(--base-input-border-color-hover);
    }

    /* VARIANTS: Using new structured variables */
    :host([variant="outlined"]) input,
    :host([variant="outlined"]) select,
    :host([variant="outlined"]) textarea {
      border: 1px solid var(--base-input-border-color);
      border-radius: var(--base-input-radius);
    }

    :host([variant="filled"]) input,
    :host([variant="filled"]) select,
    :host([variant="filled"]) textarea {
      border: none;
      border-bottom: 2px solid var(--base-input-border-color);
      background-color: var(--base-input-bg-disabled);
      border-radius: var(--base-input-radius) var(--base-input-radius) 0 0;
    }
    
    :host([variant="standard"]) input,
    :host([variant="standard"]) select,
    :host([variant="standard"]) textarea {
      border: none;
      border-bottom: 1px solid var(--base-input-border-color);
      border-radius: 0;
      background-color: transparent;
      padding-left: 0;
    }

    /* Error states using new structured variables */
    :host([invalid]) input,
    :host([invalid]) select,
    :host([invalid]) textarea {
       border-color: var(--base-input-border-color-error);
    }
    
    /* Error state should also update focus color */
    :host([invalid]) input:focus-visible,
    :host([invalid]) select:focus-visible,
    :host([invalid]) textarea:focus-visible {
       outline-color: var(--base-input-border-color-error);
       --base-input-focus-ring-color: var(--base-input-border-color-error);
       box-shadow: var(--base-input-error-shadow);
    }

    /* Disabled states */
    :host([disabled]) {
       opacity: var(--base-input-opacity-disabled);
       pointer-events: var(--base-input-pointer-events-disabled);
    }

    :host([disabled]) input,
    :host([disabled]) select,
    :host([disabled]) textarea {
       background-color: var(--base-input-bg-disabled);
       color: var(--base-input-text-color-disabled);
       border-color: var(--base-input-border-color-disabled);
       cursor: var(--base-input-disabled-cursor);
    }

    /* Error message styling */
    .error {
      color: var(--base-input-error-color);
      font-size: var(--base-input-error-font-size);
      margin-top: var(--base-input-error-margin-top);
    }
  `;
}
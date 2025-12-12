import { LitElement, css, type CSSResultGroup, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { DynamicStyleMixin } from '../mixins/dynamic-style-mixin';
import { Var } from '../theme/tokens';
import { createComponentTheme } from '../theme/style-generator';
import type { InputData, MelserDataType } from '../types/index';

/**
 * Define component-specific tokens using the style generator.
 * This simplifies the CSS and makes the variable definitions more maintainable/readable.
 */
export const { styles: BaseInputStyles, vars: InputVar } = createComponentTheme('base-input', {
  // Base
  'padding': Var.spacing.padding.input.default,
  'padding-small': Var.spacing.padding.input.small,
  'padding-medium': Var.spacing.padding.input.medium,
  'padding-large': Var.spacing.padding.input.large,

  'bg': Var.color.bg.default,
  'bg-hover': Var.color.bg.hover,
  'bg-focus': Var.color.bg.default,
  'bg-disabled': Var.color.bg.disabled,

  'border-color': Var.color.border.default,
  'border-color-hover': Var.color.border.hover,
  'border-color-focus': Var.color.border.focus,
  'border-color-error': Var.color.border.error,
  'border-color-disabled': Var.color.border.disabled,

  'text-color': Var.color.text.primary,
  'text-color-disabled': Var.color.text.disabled,
  'text-color-placeholder': Var.color.text.placeholder,

  'radius': Var.radius.default,
  'focus-ring-color': Var.color.primary,
  'focus-ring-width': '2px',
  'focus-offset': '2px',

  'font-size': Var.font.size.default,
  'font-size-small': Var.font.size.small,
  'font-size-medium': Var.font.size.default,
  'font-size-large': Var.font.size.large,

  'font-weight': 'inherit',
  'font-weight-label': Var.font.weight.bold,

  // Label
  'label-color': Var.color.text.primary,
  'label-color-required': Var.color.error,
  'label-font-size': Var.font.size.label,
  'label-font-weight': Var.font.weight.bold,

  // Container
  'container-gap': '0.5rem',
  'container-bg': 'transparent',
  'container-padding': '0',

  // Error
  'error-color': Var.color.error,
  'error-font-size': Var.font.size.error,
  'error-margin-top': '0.25rem',

  // Control (Checkbox, Radio, Switch)
  'control-size': '1.25rem',
  'control-size-small': '1rem',
  'control-size-large': '1.6rem',
  'control-bg': 'var(--base-input-bg)',
  'control-bg-hover': 'var(--base-input-bg-hover)',
  'control-bg-checked': Var.color.primary,
  'control-bg-disabled': Var.color.surface.variant,
  'control-border-color': 'var(--base-input-border-color)',
  'control-border-color-hover': 'var(--base-input-border-color-hover)',
  'control-border-color-focus': 'var(--base-input-focus-ring-color)',
  'control-border-color-checked': Var.color.primary,
  'control-border-color-disabled': Var.color.border.disabled,
  'control-border-width': '2px',
  'control-radius': 'var(--base-input-radius)',

  // Icon
  'icon-color': Var.color.primary,
  'icon-color-disabled': Var.color.text.disabled,
  'icon-size': '70%',
  'icon-scale': '0',
  'icon-scale-checked': '1',

  // States
  'hover-transition': 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out, background-color 0.2s ease-in-out',
  'focus-transition': 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',

  'opacity-disabled': '0.6',
  'pointer-events-disabled': 'none',

  // Spacing
  'gap': Var.spacing.gap.default,
  'gap-small': Var.spacing.gap.small,
  'gap-large': Var.spacing.gap.large,

  // Shadow
  'focus-shadow': css`0 0 0 3px var(--base-input-focus-ring-color)`,
  'error-shadow': css`0 0 0 3px ${Var.color.error}`,

  // Disabled
  'disabled-cursor': 'not-allowed',
  'disabled-color': 'var(--base-input-text-color-disabled)',

  // Select
  'select-bg-image': `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
  'select-bg-repeat': 'no-repeat',
  'select-bg-position': 'right 1rem center',
  'select-bg-size': '1em',

  // Switch
  'switch-width': '48px',
  'switch-height': '24px',
  'switch-radius': '24px',
  'switch-thumb-size': '18px',
  'switch-thumb-left': '3px',
  'switch-thumb-bottom': '3px',
  'switch-thumb-transform-checked': 'translateX(24px)',
  'switch-shadow': '0 2px 4px rgba(0,0,0,0.2)',

  // Radio
  'radio-size': '1.15em',
  'radio-dot-size': '0.6em',
  'radio-scale-checked': '1',

  // Option
  'option-padding': 'var(--base-input-padding)',
  'option-bg': 'var(--base-input-bg)',
  'option-color': 'var(--base-input-text-color)',
  'option-cursor': 'pointer',
  'option-bg-hover': 'var(--base-input-bg-hover)',
  'option-color-hover': Var.color.primary,
  'option-bg-checked': Var.color.primary,
  'option-color-checked': 'var(--base-input-bg)',
});


export abstract class MelserBaseInput<T = unknown> extends DynamicStyleMixin(LitElement) {
  @property({ type: String }) name = '';
  @property({ type: String }) label = '';
  @property({ type: Boolean }) required = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) errorMessage = '';
  @property({ type: Boolean }) debug = false;
  @property({ type: String, attribute: 'input-id' }) inputId = '';
  @property({ type: String, reflect: true }) variant: 'outlined' | 'filled' | 'standard' = 'outlined';
  @property({ type: String, reflect: true }) size: 'small' | 'medium' | 'large' | 'sm' | 'md' | 'lg' = 'medium';
  @property({ type: String, reflect: true }) color: 'primary' | 'success' | 'warning' | 'danger' = 'primary';

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
      this.inputId = `me-${crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2, 9)}`;
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

  static styles: CSSResultGroup = [
    BaseInputStyles, // Generated variables block
    css`
    :host {
      display: block;
      margin-bottom: ${InputVar.gap};
      font-family: ${Var.font.family};
      
      /* Internal variables for backward compatibility */
      --_input-padding: ${InputVar.padding};
      --_input-bg: ${InputVar.bg};
      --_border-color: ${InputVar['border-color']};
      --_focus-ring-color: ${InputVar['focus-ring-color']};
      --_focus-ring-width: ${InputVar['focus-ring-width']};
      --_focus-offset: ${InputVar['focus-offset']};
    }

    /* Size variants overrides */
    :host([size="small"]),
    :host([size="sm"]) { 
      --base-input-padding: ${InputVar['padding-small']};
      --base-input-font-size: ${InputVar['font-size-small']};
      --base-input-control-size: ${InputVar['control-size-small']};
      --base-input-gap: ${InputVar['gap-small']};
    }
    :host([size="large"]),
    :host([size="lg"]) { 
      --base-input-padding: ${InputVar['padding-large']};
      --base-input-font-size: ${InputVar['font-size-large']};
      --base-input-control-size: ${InputVar['control-size-large']};
      --base-input-gap: ${InputVar['gap-large']};
    }

    .input-wrapper {
      display: flex;
      flex-direction: column;
      gap: ${InputVar['container-gap']};
      background-color: ${InputVar['container-bg']};
      padding: ${InputVar['container-padding']};
    }

    label {
      font-weight: ${InputVar['label-font-weight']};
      color: ${InputVar['label-color']};
      font-size: ${InputVar['label-font-size']};
    }

    .required-mark {
      color: ${InputVar['label-color-required']};
      margin-left: 2px;
    }

    /* base input elements using new structured variables */
    input:not([type="checkbox"]):not([type="radio"]), 
    select, 
    textarea {
      width: min(max-content, 100%);
      box-sizing: border-box;
      font-family: inherit;
      font-size: ${InputVar['font-size']};
      font-weight: ${InputVar['font-weight']};
      padding: ${InputVar.padding};
      background-color: ${InputVar.bg};
      color: ${InputVar['text-color']};
      transition: ${InputVar['hover-transition']};
      
      /* Remove default browser outline to replace with custom accessible one */
      outline: none; 
    }
    
    input::placeholder,
    textarea::placeholder {
      color: ${InputVar['text-color-placeholder']};
    }

    /* select dropdown styling */
    select {
      appearance: none;
      background-image: ${InputVar['select-bg-image']};
      background-repeat: ${InputVar['select-bg-repeat']};
      background-position: ${InputVar['select-bg-position']};
      background-size: ${InputVar['select-bg-size']};
    }
    
    option {
      padding: ${InputVar['option-padding']};
      background-color: ${InputVar['option-bg']};
      color: ${InputVar['option-color']};
      cursor: ${InputVar['option-cursor']};
    }

    option:hover,
    option:focus {
      background-color: ${InputVar['option-bg-hover']};
      color: ${InputVar['option-color-hover']};
    }

    option:checked {
      background-color: ${InputVar['option-bg-checked']};
      color: ${InputVar['option-color-checked']};
    }
    /* ACCESSIBILITY: Visible Focus Styles */
    input:focus-visible, 
    select:focus-visible, 
    textarea:focus-visible {
      border-color: ${InputVar['focus-ring-color']};
      /* Use outline for high contrast mode support and clear visibility */
      outline: ${InputVar['focus-ring-width']} solid ${InputVar['focus-ring-color']};
      outline-offset: ${InputVar['focus-offset']};
      transition: ${InputVar['focus-transition']};
    }

    /* Fallback for browsers (Safari) where focus-visible might behave differently on click */
    input:focus:not(:focus-visible),
    select:focus:not(:focus-visible),
    textarea:focus:not(:focus-visible) {
      border-color: ${InputVar['focus-ring-color']};
    }

    /* Hover states */
    input:hover:not(:disabled),
    select:hover:not(:disabled),
    textarea:hover:not(:disabled) {
      border-color: ${InputVar['border-color-hover']};
    }

    /* VARIANTS */
    :host([variant="outlined"]) input,
    :host([variant="outlined"]) select,
    :host([variant="outlined"]) textarea {
      border: 1px solid ${InputVar['border-color']};
      border-radius: ${InputVar.radius};
    }

    :host([variant="filled"]) input,
    :host([variant="filled"]) select,
    :host([variant="filled"]) textarea {
      border: none;
      border-bottom: 2px solid ${InputVar['border-color']};
      background-color: ${InputVar['bg-disabled']};
      border-radius: ${InputVar.radius} ${InputVar.radius} 0 0;
    }
    
    :host([variant="standard"]) input,
    :host([variant="standard"]) select,
    :host([variant="standard"]) textarea {
      border: none;
      border-bottom: 1px solid ${InputVar['border-color']};
      border-radius: 0;
      background-color: transparent;
      padding-left: 0;
    }

    /* Error states */
    :host([invalid]) input,
    :host([invalid]) select,
    :host([invalid]) textarea {
       border-color: ${InputVar['border-color-error']};
    }
    
    :host([invalid]) input:focus-visible,
    :host([invalid]) select:focus-visible,
    :host([invalid]) textarea:focus-visible {
       outline-color: ${InputVar['border-color-error']};
       --base-input-focus-ring-color: ${InputVar['border-color-error']}; 
       box-shadow: ${InputVar['error-shadow']};
    }

    /* Disabled states */
    :host([disabled]) {
       opacity: ${InputVar['opacity-disabled']};
       pointer-events: ${InputVar['pointer-events-disabled']};
    }

    :host([disabled]) input,
    :host([disabled]) select,
    :host([disabled]) textarea {
       background-color: ${InputVar['bg-disabled']};
       color: ${InputVar['text-color-disabled']};
       border-color: ${InputVar['border-color-disabled']};
       cursor: ${InputVar['disabled-cursor']};
    }

    /* Error message styling */
    .error {
      color: ${InputVar['error-color']};
      font-size: ${InputVar['error-font-size']};
      margin-top: ${InputVar['error-margin-top']};
    }

    /* Color Variants */
    :host([color="success"]) {
      --base-input-control-bg-checked: ${Var.color.success};
      --base-input-control-border-color-checked: ${Var.color.success};
      --base-input-focus-ring-color: ${Var.color.success};
      --base-input-option-bg-checked: ${Var.color.success};
      --base-input-option-color-hover: ${Var.color.success};
      --base-input-icon-color: ${Var.color.success};
    }

    :host([color="warning"]) {
      --base-input-control-bg-checked: ${Var.color.warning};
      --base-input-control-border-color-checked: ${Var.color.warning};
      --base-input-focus-ring-color: ${Var.color.warning};
      --base-input-option-bg-checked: ${Var.color.warning};
      --base-input-option-color-hover: ${Var.color.warning};
      --base-input-icon-color: ${Var.color.warning};
    }

    :host([color="danger"]) {
      --base-input-control-bg-checked: ${Var.color.danger};
      --base-input-control-border-color-checked: ${Var.color.danger};
      --base-input-focus-ring-color: ${Var.color.danger};
      --base-input-option-bg-checked: ${Var.color.danger};
      --base-input-option-color-hover: ${Var.color.danger};
      --base-input-icon-color: ${Var.color.danger};
    }

  `];
}

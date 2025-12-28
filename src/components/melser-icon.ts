import { LitElement, css, type CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DynamicStyleMixin } from '../mixins/dynamic-style-mixin';
import { Var } from '../theme/tokens';
import { createComponentTheme } from '../theme/style-generator';
import { svgIconRegistry } from '../core/SvgIconRegistry';

/**
 * MelserIcon - SVG Icon Component
 * 
 * Renders SVG icons from the registry with full theming support.
 * Supports dynamic styling, size variants, and color customization.
 */
export const { styles: MelserIconStyles, vars: IconVar } = createComponentTheme('me-icon', {
  // Sizes
  'size-xs': '12px',
  'size-sm': '16px',
  'size-md': '24px',
  'size-lg': '32px',
  'size-xl': '48px',

  // Colors
  'color': 'currentColor',
  'color-primary': Var.color.primary,
  'color-success': Var.color.success,
  'color-warning': Var.color.warning,
  'color-danger': Var.color.danger,
  'color-disabled': Var.color.text.disabled,

  // Transition
  'transition': 'color 0.2s ease-in-out',

  // Stroke width
  'stroke-width': '2',

  // Padding/spacing
  'padding': '0',
  'margin': '0',
});

@customElement('me-icon')
export class MelserIcon extends DynamicStyleMixin(LitElement) {
  @property({ type: String }) name = '';

  @property({ type: String, reflect: true })
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  @property({ type: String, reflect: true })
  color: 'default' | 'primary' | 'success' | 'warning' | 'danger' = 'default';

  @property({ type: Number })
  strokeWidth?: number;

  @property({ type: Boolean, reflect: true })
  filled = false;

  @property({ type: Boolean, reflect: true })
  rotate = false;

  @property({ type: String })
  rotateDeg = '180deg';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  protected render() {
    const sizeValue = this.getSizeValue();
    const strokeWidthValue = String(this.strokeWidth || 2);
    const fillValue = this.filled ? 'currentColor' : 'none';

    return svgIconRegistry.render(this.name, {
      width: sizeValue,
      height: sizeValue,
      'stroke-width': strokeWidthValue,
      fill: fillValue,
      'aria-hidden': 'true',
    });
  }

  private getSizeValue(): string {
    const sizeMap: Record<string, string> = {
      xs: '12px',
      sm: '16px',
      md: '24px',
      lg: '32px',
      xl: '48px',
    };
    return sizeMap[this.size] || '24px';
  }

  static styles: CSSResultGroup = [
    MelserIconStyles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: ${IconVar.padding};
        margin: ${IconVar.margin};
        color: ${IconVar.color};
        transition: ${IconVar.transition};
        vertical-align: middle;
        line-height: 0;
        flex-shrink: 0;
      }

      /* Size variants */
      :host([size="xs"]) {
        --icon-size: ${IconVar['size-xs']};
      }
      :host([size="sm"]) {
        --icon-size: ${IconVar['size-sm']};
      }
      :host([size="md"]) {
        --icon-size: ${IconVar['size-md']};
      }
      :host([size="lg"]) {
        --icon-size: ${IconVar['size-lg']};
      }
      :host([size="xl"]) {
        --icon-size: ${IconVar['size-xl']};
      }

      /* Color variants */
      :host([color="primary"]) {
        color: ${IconVar['color-primary']};
      }
      :host([color="success"]) {
        color: ${IconVar['color-success']};
      }
      :host([color="warning"]) {
        color: ${IconVar['color-warning']};
      }
      :host([color="danger"]) {
        color: ${IconVar['color-danger']};
      }

      /* Disabled state */
      :host([disabled]) {
        color: ${IconVar['color-disabled']};
        cursor: not-allowed;
        opacity: 0.6;
      }

      /* Rotate animation */
      :host([rotate]) {
        animation: rotate 0.3s ease-in-out;
        animation-fill-mode: forwards;
      }

      @keyframes rotate {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(var(--rotate-deg, 180deg));
        }
      }

      /* SVG styling */
      :host svg {
        width: var(--icon-size);
        height: var(--icon-size);
        display: block;
      }

      /* Hover effect (optional, can be enabled via CSS variable) */
      :host(:hover:not([disabled])) {
        filter: brightness(1.1);
      }

      /* Focus visible for accessibility when used as button */
      :host(:focus-visible) {
        outline: 2px solid ${Var.color.focusRing};
        outline-offset: 2px;
        border-radius: 4px;
      }

      /* Custom property support for dynamic styling */
      :host {
        --me-icon-color: currentColor;
        --me-icon-stroke-width: 2;
        --me-icon-size: 24px;
        --me-icon-rotate-deg: 180deg;
      }
    `,
  ];
}

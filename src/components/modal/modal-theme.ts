import { css, CSSResult, unsafeCSS } from 'lit';
import { Var } from '../../theme/tokens'; // Asumiendo que tus tokens globales están aquí

/**
 * Helper to generate component-specific CSS variables.
 */
const getCssText = (value: string | number | CSSResult): string => {
    if (value instanceof CSSResult) {
        return (value as any).cssText ?? String(value);
    }
    return String(value);
};

export function createComponentTheme<T extends Record<string, CSSResult | string | number>>(
    prefix: string,
    tokens: T
) {
    const styleLines = Object.entries(tokens).map(([key, value]) => {
        const valStr = getCssText(value);
        return `--${prefix}-${key}: ${valStr};`;
    }).join('\n');

    const styles = css`
    :host {
      ${unsafeCSS(styleLines)}
    }
  `;

    const vars = Object.keys(tokens).reduce((acc, key) => {
        const varName = `--${prefix}-${key}`;
        const defaultValue = getCssText(tokens[key]);
        acc[key as keyof T] = css`var(${unsafeCSS(varName)}, ${unsafeCSS(defaultValue)})`;
        return acc;
    }, {} as Record<keyof T, CSSResult>);

    return { styles, vars };
}

/**
 * Modal Theme Definition
 */
export const { styles: ModalThemeStyles, vars: ModalVar } = createComponentTheme('me-modal', {
    // Z-index
    'z-index-backdrop': '1000',
    'z-index-modal': '1001',

    // Backdrop
    'backdrop-bg': 'rgba(0, 0, 0, 0.5)',
    'backdrop-blur': '4px',

    // Modal dimensions
    'width-sm': '400px',
    'width-md': '560px',
    'width-lg': '800px',
    'width-xl': '1140px',
    'width-full': '95vw',
    'max-width': '90vw',
    'max-height': '90vh',

    // Colors & Surface
    'bg': Var?.color?.surface?.primary || '#ffffff',
    'border-color': Var?.color?.border?.default || '#e5e7eb',
    'radius': Var?.radius?.default || '12px',
    'shadow': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',

    // Text
    'text-primary': Var?.color?.text?.primary || '#111827',
    'text-secondary': Var?.color?.text?.secondary || '#6b7280',

    // Spacing
    'header-padding': '1.25rem 1.5rem',
    'body-padding': '1.5rem',
    'footer-padding': '1rem 1.5rem',
    'gap': '0.75rem',

    // Transitions
    'transition-duration': '250ms',
    'transition-easing': 'cubic-bezier(0.4, 0, 0.2, 1)',
});

import { css, CSSResult, unsafeCSS } from 'lit';

/**
 * Helper to generate component-specific CSS variables.
 * 
 * @param prefix The component prefix (e.g. 'base-input')
 * @param tokens A key-value map of token names to their values (e.g. { 'bg': Var.color.bg.default })
 * @returns An object containing:
 *  - `styles`: A CSSResult with the :host declaration block.
 *  - `vars`: A proxy/object to access the generated variables as CSSResults (e.g. vars.bg -> var(--base-input-bg))
 */
const getCssText = (value: string | number | CSSResult): string => {
    if (value instanceof CSSResult) {
        return value.cssText ?? String(value);
    }
    return String(value);
};

export function createComponentTheme<T extends Record<string, CSSResult | string | number>>(
    prefix: string,
    tokens: T
) {
    // 1. Generate the CSS styles for :host
    // We construct a single string because Lit's css`` tag does not support interpolating an array of CSSResults inside a rule block.
    const styleLines = Object.entries(tokens).map(([key, value]) => {
        const valStr = getCssText(value);
        return `--${prefix}-${key}: ${valStr};`;
    }).join('\n');

    const styles = css`
    :host {
      ${unsafeCSS(styleLines)}
    }
  `;

    // 2. Generate accessors for usage
    // The resulting object allows using vars.bg -> css`var(--base-input-bg)`
    const vars = Object.keys(tokens).reduce((acc, key) => {
        const varName = `--${prefix}-${key}`;
        // Include the default value as a fallback
        const defaultValue = getCssText(tokens[key]);
        acc[key as keyof T] = css`var(${unsafeCSS(varName)}, ${unsafeCSS(defaultValue)})`;
        return acc;
    }, {} as Record<keyof T, CSSResult>);

    return { styles, vars };
}

import { css, CSSResult, unsafeCSS } from 'lit';

export type TokenValue = string | number;
export interface DesignToken {
    $value: TokenValue;
    $type?: string;
    [key: string]: unknown;
}
export type TokenNode = TokenValue | DesignToken;
export interface TokenGroup {
    [key: string]: TokenNode | TokenGroup;
}

/**
 * Utility: flattenTokens
 * Recursively flattens a nested design token object into a single-level map of CSS variable names and values.
 * 
 * @param obj - The nested token object source.
 * @param prefix - The system prefix (e.g., 'melser') to avoid global namespace collisions.
 * @param currentPath - Used for recursion to track the key hierarchy.
 * @returns An object where keys are CSS variable names (e.g., --me-color-primary) and values are the token values.
 */
export function flattenTokens(
    obj: TokenGroup,
    prefix: string = 'melser',
    currentPath: string = ''
): Record<string, string> {
    let flattened: Record<string, string> = {};

    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            // Construct the kebab-case key
            const newPath = currentPath ? `${currentPath}-${key}` : key;

            // Check if this is a leaf node (DTCG standard uses $value, but we also handle direct values)
            const isDTCGToken = typeof value === 'object' && value !== null && '$value' in value;
            const isGroup = typeof value === 'object' && value !== null && !isDTCGToken && !Array.isArray(value);

            if (isDTCGToken) {
                // It's a token object { $value: "#fff", $type: "color" }
                const token = value as DesignToken;
                let valStr = String(token.$value);
                // Resolve aliases: {palette.blue.700} -> var(--me-palette-blue-700)
                if (valStr.includes('{')) {
                    valStr = valStr.replace(/\{([^}]+)\}/g, (_, aliasPath) => {
                        const varName = `--${prefix}-${aliasPath.replace(/\./g, '-')}`;
                        return `var(${varName})`;
                    });
                }
                flattened[`--${prefix}-${newPath}`] = valStr;
            } else if (isGroup) {
                // It's a nested group, recurse deeper
                const nested = flattenTokens(value as TokenGroup, prefix, newPath);
                flattened = { ...flattened, ...nested };
            } else {
                // It's a direct primitive value
                let valStr = String(value);
                // Resolve aliases for direct values too, just in case
                if (valStr.includes('{')) {
                    valStr = valStr.replace(/\{([^}]+)\}/g, (_, aliasPath) => {
                        const varName = `--${prefix}-${aliasPath.replace(/\./g, '-')}`;
                        return `var(${varName})`;
                    });
                }
                flattened[`--${prefix}-${newPath}`] = valStr;
            }
        }
    }

    return flattened;
}

// 2. Recursive type to map values to CSSResult
export type TokenCSSMap<T> = {
    [K in keyof T]: T[K] extends { $value: any }
    ? CSSResult // If it's a token, it becomes a CSSResult
    : T[K] extends object
    ? TokenCSSMap<T[K]> // If it's a group, recurse
    : CSSResult; // Fallback for simple values
};

/**
 * Utility: createTokenAccessors
 * Creates a mirrored object where every leaf node returns `var(--prefix-path)` 
 * wrapped in Lit's css`` tag for safe interpolation.
 */
export function createTokenAccessors<T extends object>(
    obj: T,
    prefix: string = 'melser',
    path: string = ''
): TokenCSSMap<T> {
    // Use Record<string, unknown> to safely build the object dynamically without 'any'
    const accessors: Record<string, unknown> = {};

    for (const key in obj) {
        const newPath = path ? `${path}-${key}` : key;
        const value = obj[key as keyof T];
        
        const isDTCGToken = typeof value === 'object' && value !== null && '$value' in value;
        const isGroup = typeof value === 'object' && value !== null && !isDTCGToken && !Array.isArray(value);

        if (isGroup) {
            // Recurse
            accessors[key] = createTokenAccessors(value as T[keyof T] & object, prefix, newPath);
        } else {
            // It's a leaf. Return the CSS variable reference.
            const varName = `--${prefix}-${newPath}`;
            
            // Use unsafeCSS to create a CSSResult from the variable name string
            // Then wrap it in var()
            accessors[key] = css`var(${unsafeCSS(varName)})`;
        }
    }

    // Assert the final shape matches the mapped type
    return accessors as TokenCSSMap<T>;
}

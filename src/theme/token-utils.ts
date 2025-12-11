import { css, CSSResult } from 'lit';

/**
 * Utility: flattenTokens
 * Recursively flattens a nested design token object into a single-level map of CSS variable names and values.
 * 
 * @param obj - The nested token object source.
 * @param prefix - The system prefix (e.g., 'melser') to avoid global namespace collisions.
 * @param currentPath - Used for recursion to track the key hierarchy.
 * @returns An object where keys are CSS variable names (e.g., --melser-color-primary) and values are the token values.
 */
export function flattenTokens(
    obj: Record<string, any>,
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
                let valStr = String(value.$value);
                // Resolve aliases: {palette.blue.700} -> var(--melser-palette-blue-700)
                if (valStr.includes('{')) {
                    valStr = valStr.replace(/\{([^}]+)\}/g, (_, aliasPath) => {
                        const varName = `--${prefix}-${aliasPath.replace(/\./g, '-')}`;
                        return `var(${varName})`;
                    });
                }
                flattened[`--${prefix}-${newPath}`] = valStr;
            } else if (isGroup) {
                // It's a nested group, recurse deeper
                const nested = flattenTokens(value, prefix, newPath);
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
    const accessors: any = {};

    for (const key in obj) {
        const newPath = path ? `${path}-${key}` : key;
        const value = (obj as any)[key];
        const isDTCGToken = typeof value === 'object' && value !== null && '$value' in value;
        const isGroup = typeof value === 'object' && value !== null && !isDTCGToken;

        if (isGroup) {
            accessors[key] = createTokenAccessors(value, prefix, newPath);
        } else {
            // It's a leaf. Return the CSS variable reference.
            // Note: We use unsafeCSS here safely because the input is controlled by our token system.
            // However, Lit recommends just returning the string in a css`` template.
            // The output is: css`var(--melser-color-primary)`
            const varName = `--${prefix}-${newPath}`;
            // We implement a custom toString so it can be interpolated
            // accessors[key] = css`var(${css([varName] as any)})`; 
            // The prompt suggested: accessors[key] = css`var(${css([varName] as any)})`;
            // But css function from lit takes TemplateStringsArray.
            // A safer way compatible with Lit is creating a CSSResult that behaves like the variable call.
            // However, usually one just wants the Variable Name or the whole var(...) string.
            // Prompt says: accessors[key] = css`var(${css([varName] as any)})`; 
            // Let's try to follow the prompt's implementation strictly if possible, or fix it if it's broken.
            // css([varName]) might not work if TS complains. css`...` is the standard.
            // Let's use unsafeCSS for the variable name construction if needed, 
            // or just construct the string.
            // If we behave like the prompt:
            const safeVarName = css([varName] as unknown as TemplateStringsArray);
            accessors[key] = css`var(${safeVarName})`;
        }
    }

    return accessors;
}

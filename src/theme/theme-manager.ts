/**
 * Melser Theme Manager
 * A utility class to manage the lifecycle of CSS variables in the application.
 */
export class ThemeManager {
    private static _root: HTMLElement = document.documentElement;

    /**
     * Sets the root element for variable injection (default: <html>).
     * Useful if you want to scope the theme to a specific container.
     */
    static setRoot(element: HTMLElement) {
        this._root = element;
    }

    /**
     * Replaces all current CSS variables with a new set.
     * Efficiently uses style.setProperty.
     * 
     * @param variables - A flat map of variable names and values.
     */
    static setVariables(variables: Record<string, string>) {
        // Use requestAnimationFrame to batch DOM updates preventing layout thrashing
        requestAnimationFrame(() => {
            Object.entries(variables).forEach(([key, value]) => {
                // Ensure variable starts with --
                const prop = key.startsWith('--') ? key : `--${key}`;
                this._root.style.setProperty(prop, value);
            });
        });
    }

    /**
     * Updates a single variable. 
     * Useful for dynamic user overrides (e.g., color picker).
     */
    static updateVariable(name: string, value: string) {
        const prop = name.startsWith('--') ? name : `--${name}`;
        this._root.style.setProperty(prop, value);
    }

    /**
     * Retrieves the computed value of a variable.
     * Essential for using CSS values in JavaScript logic (e.g., canvas drawing).
     */
    static getVariable(name: string): string {
        const prop = name.startsWith('--') ? name : `--${name}`;
        return getComputedStyle(this._root).getPropertyValue(prop).trim();
    }

    /**
     * Removes a variable, allowing it to fall back to the CSS definition.
     */
    static removeVariable(name: string) {
        const prop = name.startsWith('--') ? name : `--${name}`;
        this._root.style.removeProperty(prop);
    }
}

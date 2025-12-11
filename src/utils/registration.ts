import { LitElement } from 'lit';

/**
 * Registers a component with a specific tag name.
 * If the component class is already registered (e.g. via @customElement), 
 * it creates a subclass to allow re-registration under a new name.
 * 
 * @param tagName - The custom element tag name (must contain a hyphen)
 * @param componentClass - The LitElement class to register
 */
export function registerComponent(tagName: string, componentClass: typeof LitElement) {
    if (customElements.get(tagName)) {
        console.warn(`Custom element ${tagName} is already defined.`);
        return;
    }

    try {
        customElements.define(tagName, componentClass);
    } catch (e) {
        // If registration fails because class is already registered, subclass it
        // This allows creating aliases like <my-input> for <base-input>
        if (e instanceof DOMException && e.name === 'NotSupportedError') {
            class AliasedComponent extends componentClass { }
            customElements.define(tagName, AliasedComponent);
        } else {
            throw e;
        }
    }
}

/**
 * Helper to register a set of components with a custom prefix.
 * 
 * Example: 
 * registerWithPrefix('app', { Button: MelserButton }) 
 * // Registers <app-button>
 * 
 * @param prefix - The prefix to use (e.g. 'my-lib')
 * @param components - Object mapping names to component classes
 */
export function registerWithPrefix(prefix: string, components: Record<string, typeof LitElement>) {
    Object.entries(components).forEach(([name, clazz]) => {
        // Convert CamelCase or PascalCase to kebab-case
        // e.g. "TextInput" -> "text-input"
        const kebabName = name
            .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
            .toLowerCase();

        // Remove existing prefix if present in the key to avoid double prefixing
        // e.g. if key is "MelserTextInput", we might want just "text-input"
        const cleanName = kebabName.replace(/^me-/, '');

        const tagName = `${prefix}-${cleanName}`;
        registerComponent(tagName, clazz);
    });
}

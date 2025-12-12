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

/**
 * Registra todos los componentes Melser UI con sus nombres de etiqueta predeterminados.
 *
 * Ejemplo de uso:
 * ```typescript
 * import { registerComponents } from 'melser-ui';
 * registerComponents(); // Registra todos los componentes con prefijo 'me-'
 * ```
 *
 * Esto es equivalente a:
 * ```typescript
 * registerComponent('me-text-input', MelserTextInput);
 * registerComponent('me-checkbox', MelserCheckbox);
 * registerComponent('me-select', MelserSelect);
 * // ... y así sucesivamente para todos los componentes
 * ```
 */
export function registerComponents() {
    // Importar todos los componentes dinámicamente para evitar dependencias circulares
    import('../components/base-input').then(m => registerComponent('me-text-input', m.MelserTextInput));
    import('../components/melser-checkbox').then(m => registerComponent('me-checkbox', m.MelserCheckbox));
    import('../components/melser-select').then(m => registerComponent('me-select', m.MelserSelect));
    import('../components/melser-number-input').then(m => registerComponent('me-number-input', m.MelserNumberInput));
    import('../components/melser-password-input').then(m => registerComponent('me-password-input', m.MelserPasswordInput));
    import('../components/melser-textarea').then(m => registerComponent('me-textarea', m.MelserTextarea));
    import('../components/melser-radio-group').then(m => registerComponent('me-radio-group', m.MelserRadioGroup));
    import('../components/melser-switch').then(m => registerComponent('me-switch', m.MelserSwitch));
    import('../components/melser-range').then(m => registerComponent('me-range', m.MelserRange));
    import('../components/melser-dual-range').then(m => registerComponent('me-dual-range', m.MelserDualRange));
    import('../components/melser-multi-select').then(m => registerComponent('me-multi-select', m.MelserMultiSelect));
    import('../components/melser-combobox').then(m => registerComponent('me-combobox', m.MelserCombobox));
    import('../components/melser-tags-input').then(m => registerComponent('me-tags-input', m.MelserTagsInput));
    import('../components/melser-otp-input').then(m => registerComponent('me-otp-input', m.MelserOtpInput));
    import('../components/melser-date-picker').then(m => registerComponent('me-date-picker', m.MelserDatePicker));
    import('../components/melser-time-picker').then(m => registerComponent('me-time-picker', m.MelserTimePicker));
    import('../components/melser-color-picker').then(m => registerComponent('me-color-picker', m.MelserColorPicker));
    import('../components/melser-file-upload').then(m => registerComponent('me-file-upload', m.MelserFileUpload));
    import('../components/melser-rating').then(m => registerComponent('me-rating', m.MelserRating));
}

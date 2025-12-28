import { LitElement } from 'lit';

// Bandera global para evitar ejecuciones múltiples innecesarias
let areComponentsRegistered = false;

/**
 * Registra un componente de forma segura.
 * Si ya existe, no hace nada (evita errores de redefinición).
 * Si la clase ya está usada por otro tag, crea una subclase automáticamente.
 */
export function registerComponent(tagName: string, componentClass: typeof LitElement) {
    // 1. Verificación estricta: Si el tag ya existe, salimos silenciosamente.
    // Esto es vital para la navegación interna donde el script se vuelve a ejecutar.
    if (customElements.get(tagName)) {
        return; 
    }

    try {
        customElements.define(tagName, componentClass);
    } catch (e: unknown) {
        // Validación de tipo segura para TypeScript
        if (e instanceof Error && e.name === 'NotSupportedError') {
            // El error suele ser: "The constructor has already been used with this registry"
            // Solución: Crear una clase anónima que extienda la original
            class AliasedComponent extends componentClass { }
            
            // Intentamos definir de nuevo con la nueva referencia de clase
            // Si esto falla, dejamos que el error suba para debuggear
            try {
                customElements.define(tagName, AliasedComponent);
            } catch (aliasError) {
                console.error(`Error crítico al registrar alias para ${tagName}:`, aliasError);
            }
        } else {
            console.error(`Error desconocido al registrar ${tagName}:`, e);
        }
    }
}

/**
 * Helper para registrar componentes con prefijo.
 */
export function registerWithPrefix(prefix: string, components: Record<string, typeof LitElement>) {
    Object.entries(components).forEach(([name, clazz]) => {
        const kebabName = name
            .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
            .toLowerCase();

        // Evitar duplicar el prefijo si el nombre de la clase ya lo incluye
        // Ejemplo: prefix='me', class='MelserButton' -> 'me-button' (no 'me-melser-button')
        const prefixRegex = new RegExp(`^${prefix}-?`, 'i');
        const cleanName = kebabName.replace(prefixRegex, '');

        const tagName = `${prefix}-${cleanName}`;
        registerComponent(tagName, clazz);
    });
}

/**
 * Registra todos los componentes Melser UI.
 * * MEJORA: Ahora es asíncrona y usa un flag de estado.
 * Solo ejecutará los imports la primera vez que se llame.
 * * Uso con Router:
 * await registerComponents();
 */
export async function registerComponents(): Promise<void> {
    // Si ya se registraron, no hacemos nada (ahorra recursos y evita errores)
    if (areComponentsRegistered) {
        return;
    }

    // Array de promesas de importación
    // Only dynamically import components that are NOT statically exported in index.ts
    // This prevents warnings about components being both statically and dynamically imported
    const imports: Promise<void>[] = [
        // Note: Components are already registered via static imports in index.ts
        // This function is kept for backwards compatibility and future use cases
    ];

    try {
        // Esperamos a que todos los módulos se carguen y registren
        await Promise.all(imports);
        areComponentsRegistered = true; // Marcamos como listo
    } catch (error) {
        console.error("Error cargando componentes de Melser UI:", error);
    }
}

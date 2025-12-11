---
title: Uso de Alias @/
---

# Uso de Alias @/ para Imports/Exports

Esta página demuestra cómo usar los alias `@/` configurados en Vite para evitar problemas con rutas relativas.

## Configuración de Alias

El proyecto está configurado con los siguientes alias:

```typescript
// vite.config.ts
resolve: {
  alias: {
    '@/': './src/',
    '@/components': './src/components/',
    '@/core': './src/core/',
    '@/styles': './src/styles/',
    '@/types': './src/types/',
    '@/utils': './src/utils/'
  }
}
```

## Ejemplos de Import/Export con Alias

### Importaciones Correctas ✅

```typescript
// ✅ Usando alias @/ - Recomendado
import { MelserBaseInput } from "@/core/base-input";
import { registerComponents } from "@/utils/registration";
import type { MelserComponent } from "@/types";

// ✅ Importaciones específicas de componentes
import { MelserCheckbox } from "@/components/me-checkbox";
import { MelserTextInput } from "@/components/base-input";
import { MelserButton } from "@/components/button ";

// ✅ Importación de estilos
import "@/styles/theme.css";
import "@/components/me-checkbox.css";
```

### Rutas Relativas (Evitar) ❌

```typescript
// ❌ Rutas relativas - Pueden causar problemas
import { MelserBaseInput } from "../core/base-input";
import { registerComponents } from "../../utils/registration";
import type { MelserComponent } from "../types";

// ❌ Rutas muy anidadas
import { MelserCheckbox } from "../../../src/components/me-checkbox";
```

## Ejemplo de Uso en Componentes

### Archivo: `src/components/me-form.ts`

```typescript
// ✅ Importaciones con alias
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { MelserBaseInput } from "@/core/base-input";
import { registerComponents } from "@/utils/registration";
import type { MelserFormData } from "@/types";

// ✅ Importar otros componentes
import "@/components/base-input";
import "@/components/me-checkbox";
import "@/components/button ";

@customElement("me-form")
export class MelserForm extends LitElement {
  // ✅ Usar tipos con alias
  private formData: MelserFormData = {};

  // ✅ Usar métodos de la clase base con alias
  private handleInput(event: Event) {
    const target = event.target as MelserBaseInput;
    this.formData[target.name] = target.value;
  }

  render() {
    return html`
      <form @submit=${this.handleSubmit}>
        <base-input
          name="email"
          label="Email"
          @input=${this.handleInput}
          required
        >
        </base-input>

        <me-checkbox
          name="terms"
          label="Acepto los términos"
          @change=${this.handleInput}
          required
        >
        </me-checkbox>

        <button type="submit" variant="primary">Enviar</button>
      </form>
    `;
  }

  private async handleSubmit(event: Event) {
    event.preventDefault();

    // ✅ Usar utility con alias
    const isValid = await this.validateForm();

    if (isValid) {
      // ✅ Emitir evento personalizado
      this.dispatchEvent(
        new CustomEvent("form-submit", {
          detail: this.formData,
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  private async validateForm(): Promise<boolean> {
    // ✅ Lógica de validación
    return Object.keys(this.formData).length > 0;
  }

  static styles = css`
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      max-width: 400px;
    }
  `;
}
```

## Ejemplo de Uso de Utils

### Archivo: `src/utils/helpers.ts`

```typescript
// ✅ Exportaciones con alias
export interface HelperConfig {
  validateEmail(email: string): boolean;
  formatPhone(phone: string): string;
  sanitizeInput(input: string): string;
}

// ✅ Funciones helper
export const helpers: HelperConfig = {
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  formatPhone(phone: string): string {
    // Remover caracteres no numéricos
    const cleaned = phone.replace(/\D/g, "");

    // Aplicar formato (XXX) XXX-XXXX
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }

    return phone;
  },

  sanitizeInput(input: string): string {
    return input.trim().replace(/[<>]/g, "");
  },
};
```

## Ventajas de Usar Alias @/

1. **Rutas más limpias**: `@/components/me-checkbox` vs `../../../src/components/me-checkbox`
2. **Menos errores**: No tienes que contar niveles de directorio
3. **Refactoring más fácil**: Si mueves archivos, solo cambias la configuración
4. **Mejor IntelliSense**: Los IDEs pueden resolver mejor los alias
5. **Consistencia**: Todos los imports usan el mismo patrón

## Configuración en TypeScript

Para que TypeScript reconozca los alias, necesitas actualizar `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/core/*": ["./src/core/*"],
      "@/styles/*": ["./src/styles/*"],
      "@/types/*": ["./src/types/*"],
      "@/utils/*": ["./src/utils/*"]
    }
  }
}
```

## Mejores Prácticas

1. ✅ **Siempre usar alias** para imports del proyecto
2. ✅ **Usar rutas absolutas** para librerías externas (ej: `lit`, `vite`)
3. ❌ **Evitar rutas relativas** como `../` o `./`
4. ✅ **Agrupar imports** por tipo (componentes, utils, tipos)
5. ✅ **Usar imports específicos** en lugar de `import *`

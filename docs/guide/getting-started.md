---
title: Empezar
---

# Empezar

Melser UI es una colección de componentes web modernos construidos con Lit. Esta guía te ayudará a empezar rápidamente.

## Instalación

```bash
npm install melser-ui
```

## Uso Básico

### Importar los componentes

Puedes importar componentes individuales o toda la librería:

```typescript
// Importar componente específico
import "melser-ui/components/me-checkbox.js";

// Importar toda la librería
import "melser-ui";
```

### Usar en HTML

Una vez importados, puedes usar los componentes directamente en tu HTML:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Ejemplo Melser UI</title>
  </head>
  <body>
    <h1>Ejemplo de Melser UI</h1>

    <!-- Usar componente checkbox -->
    <me-checkbox label="Acepto los términos" checked> </me-checkbox>

    <!-- Usar componente text input -->
    <base-input label="Nombre" placeholder="Escribe tu nombre"> </base-input>
  </body>
</html>
```

## Verificación de Compatibilidad

### Tags HTML Válidos

Los componentes usan nombres de tags con prefijo para evitar conflictos:

- ✅ `me-checkbox` - Válido
- ✅ `base-input` - Válido
- ✅ `me-color-picker` - Válido
- ❌ `checkbox` - Podría conflitar // no te deja utilizar sin un - por defecto asi que no hay problemas

### TypeScript y Imports

```typescript
// Tipado correcto
import type { MelserCheckbox, MelserTextInput } from "melser-ui/types";

// Usar con tipado
const checkbox = document.querySelector("me-checkbox") as MelserCheckbox;
const input = document.querySelector("base-input") as MelserTextInput;
```

## Próximos Pasos

- [Instalación detallada](./installation)
- [Visión general de componentes](../components/overview)
- [Personalización del tema](./aliases)

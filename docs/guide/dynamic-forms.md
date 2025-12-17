# Formularios Dinámicos con Zod

Melser UI incluye capacidades para generar formularios automáticamente a partir de definiciones de esquemas Zod. Esto es extremadamente útil para crear interfaces administrativas, tablas de datos editables y prototipos rápidos donde el esquema de datos define la UI.

## Componente `me-schema-form`

Hemos creado un componente ejemplo llamado `me-schema-form` ubicado en `src/components/melser-schema-form.ts`. Este componente acepta un objeto Zod y renderiza los inputs correspondientes.

### Características

- **Generación Automática**: Crea inputs basados en el tipo de Zod (`ZodString`, `ZodNumber`, `ZodBoolean`, `ZodEnum`, `ZodDate`).
- **Validación Integrada**: Utiliza el mismo `ZodFormController` que el resto de la librería para validar en tiempo real.
- **API Pública**: Métodos para establecer y limpiar datos programáticamente.

### Ejemplo de Uso

```typescript
import { html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { z } from "zod";
import "./components/melser-schema-form";

const userSchema = z.object({
  fullName: z.string().min(2, "Nombre muy corto"),
  email: z.string().email(),
  age: z.number().min(18).max(100),
  role: z.enum(["Admin", "Editor", "Viewer"]),
  isActive: z.boolean(),
  startDate: z.date(), // O z.string() si usas strings para fechas
});

@customElement("my-dynamic-feature")
class MyDynamicFeature extends LitElement {
  @state() formData = {};

  handleEdit(user) {
    // Cargar datos en el formulario
    const form = this.shadowRoot.querySelector("me-schema-form");
    form.setData(user);
  }

  handleClear() {
    const form = this.shadowRoot.querySelector("me-schema-form");
    form.clearData();
  }

  handleSubmit(e) {
    console.log("Datos válidos enviados:", e.detail.data);
  }

  render() {
    return html`
      <div>
        <h2>Editar Usuario</h2>
        <button
          @click="${() =>
            this.handleEdit({
              fullName: "John Doe",
              email: "john@example.com",
              age: 30,
              role: "Admin",
              isActive: true,
            })}"
        >
          Cargar Ejemplo
        </button>

        <button @click="${this.handleClear}">Limpiar</button>

        <me-schema-form
          .schema="${userSchema}"
          @submit="${this.handleSubmit}"
        ></me-schema-form>
      </div>
    `;
  }
}
```

## API del Componente

### Propiedades

| Propiedad     | Tipo          | Descripción                                                  |
| ------------- | ------------- | ------------------------------------------------------------ |
| `schema`      | `z.ZodObject` | El esquema Zod que define el formulario.                     |
| `defaultData` | `Object`      | Datos iniciales para el formulario.                          |
| `showSubmit`  | `Boolean`     | Muestra u oculta el botón de submit nativo. Default: `true`. |
| `submitLabel` | `String`      | Texto del botón de submit. Default: 'Submit'.                |

### Métodos

Puedes acceder a estos métodos obteniendo la referencia al elemento (`querySelector('me-schema-form')`).

- **`setData(data: Record<string, unknown>): void`**
  Actualiza los valores del formulario y valida contra el esquema. Útil para "Editar" un registro de una tabla.
- **`clearData(): void`**
  Resetea el formulario a un estado vacío (o valores por defecto del esquema).
- **`submit(): Record<string, unknown> | null`**
  Ejecuta la validación manualmente. Si es exitoso, dispara el evento `submit` y retorna los datos. Si falla, muestra errores en la UI y retorna `null`.

## Mapeo de Tipos

El componente mapea automáticamente los tipos de Zod a componentes de Melser UI:

- `z.string()` -> `<base-input type="text">` (o `password` si el nombre del campo incluye "password")
- `z.number()` -> `<me-number-input>`
- `z.boolean()` -> `<me-switch>`
- `z.enum([...])` -> `<me-select>`
- `z.date()` -> `<me-date-picker>`

Para personalizaciones más avanzadas (como `textarea`, `range`, `file-upload`), se recomienda extender el componente `MelserSchemaForm` y sobrescribir el método `renderField`.

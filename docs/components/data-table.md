# Componente de Tabla de Datos

El componente `data-table-lit` es una solución de tabla potente y rica en características construida con Lit. Soporta ordenamiento, paginación, selección, edición en línea, filas expandibles, paginación del lado del servidor y una amplia personalización mediante un registro de renderizadores de celdas.

## Características

- **Ordenamiento**: Haga clic en los encabezados de columna para ordenar datos (ascendente/descendente)
- **Paginación**: Paginación del lado del cliente o servidor con tamaño de página personalizable
- **Selección**: Selección múltiple de filas con funcionalidad de seleccionar todo
- **Edición en Línea**: Edite celdas directamente con componentes de entrada apropiados
- **Filas Expandibles**: Muestre detalles adicionales en secciones de filas expandibles
- **Renderizado de Celdas Personalizado**: Use `CellRendererRegistry` para una personalización avanzada
- **Tematización**: Personalice colores, bordes y apariencia con variables CSS
- **Control de Densidad**: Ajuste el espaciado de filas (Compacto, Normal, Espacioso)
- **Diseño Responsivo**: Funciona perfectamente en todos los tamaños de pantalla

## Uso

### Ejemplo Básico

```html
<script type="module">
  import { DataTableLit } from "melser-ui";
</script>

<data-table-lit id="my-table"></data-table-lit>

<script>
  const table = document.getElementById("my-table");

  table.columns = [
    { key: "id", label: "ID", type: "number" },
    { key: "name", label: "Nombre", type: "string", editable: true },
    { key: "role", label: "Rol", type: "select", options: ["Admin", "Usuario"] },
    { key: "active", label: "Activo", type: "boolean", editable: true },
  ];

  table.data = [
    { id: 1, name: "Juan Pérez", role: "Admin", active: true },
    { id: 2, name: "María García", role: "Usuario", active: false },
    { id: 3, name: "Carlos López", role: "Usuario", active: true },
  ];

  table.config = {
    pagination: true,
    pageSize: 10,
    selection: true,
    density: "Normal", // 'Compacto' | 'Normal' | 'Espacioso'
    expandable: false,
  };
</script>
```

### Paginación del Lado del Servidor

Para conjuntos de datos grandes, use paginación del lado del servidor:

```javascript
table.pagination = {
  page: 1,
  limit: 10,
  total: 1000,
  totalPages: 100
};

// Solo proporcione datos para la página actual
table.data = [
  { id: 1, name: "Juan Pérez", role: "Admin" },
  { id: 2, name: "María García", role: "Usuario" },
  // ... hasta elementos pageSize
];

// Escuche cambios de página
table.addEventListener("page-change", (e) => {
  const { page, pageSize } = e.detail;
  // Obtenga datos del servidor para esta página
  fetchData(page, pageSize);
});
```

### Filas Expandibles

Active filas expandibles para mostrar detalles adicionales:

```javascript
table.config.expandable = true;

table.data = [
  { 
    id: 1, 
    name: "Juan Pérez", 
    email: "juan@example.com",
    details: "Información adicional..."
  }
];
```

Luego use slots para proporcionar contenido de detalle personalizado:

```html
<data-table-lit id="table">
  <div slot="details-1">
    <p><strong>Email:</strong> juan@example.com</p>
    <p><strong>Detalles:</strong> Información adicional...</p>
  </div>
</data-table-lit>
```

### Slots de Celdas Personalizados

Proporcione contenido personalizado para celdas específicas usando slots:

```html
<data-table-lit id="table">
  <div slot="cell-1-name">Visualización de Nombre Personalizado</div>
  <div slot="cell-2-email">
    <a href="mailto:maria@example.com">maria@example.com</a>
  </div>
</data-table-lit>
```

## Referencia de API

### Propiedades

| Propiedad      | Tipo            | Por Defecto | Descripción                                      |
| -------------- | --------------- | ----------- | ------------------------------------------------ |
| `data`         | `DataRow[]`     | `[]`        | Array de objetos de datos para mostrar.          |
| `columns`      | `TableColumn[]` | `[]`        | Configuración para columnas de la tabla.         |
| `config`       | `TableConfig`   | `{...}`     | Configuración general de la tabla (paginación, etc). |
| `pagination`   | `PaginationState` | `undefined` | Estado de paginación del lado del servidor.     |
| `searchQuery`  | `string`        | `''`        | Texto para filtrar globalmente los datos de la tabla. |
| `customStyles` | `TableStyles`   | `{}`        | Sobrescrituras de variables CSS para tematización. |
| `icons`        | `Object`        | `{...}`     | Objeto que contiene plantillas Lit para iconos de la tabla. |

### Eventos

| Evento             | Detalle                                      | Descripción                                                       |
| ------------------ | ------------------------------------------- | ----------------------------------------------------------------- |
| `selection-change` | `{ selectedIds: (string\|number)[] }`       | Se dispara cuando cambia la selección de filas.                  |
| `row-action`       | `{ action: string, row: DataRow, id: ... }` | Se dispara cuando se hace clic en un botón de acción (editar, eliminar, ver, etc). |
| `row-save`         | `{ id: string\|number, data: DataRow }`     | Se dispara cuando se guarda la edición en línea.                 |
| `row-expand`       | `{ id: string\|number }`                    | Se dispara cuando se expande una fila.                           |
| `cell-change`      | `{ key: string, value: unknown }`           | Se dispara cuando cambia el valor de una celda durante la edición. |
| `page-change`      | `{ page: number, pageSize: number }`       | Se dispara cuando cambia la paginación (especialmente en modo del lado del servidor). |

## Configuración de Columna (`TableColumn`)

Cada objeto en el array `columns` puede tener las siguientes propiedades:

- `key`: (Requerido) El nombre de la propiedad en la fila de datos.
- `label`: Texto del encabezado.
- `type`: Tipo de datos o clave de renderizador (`string`, `number`, `boolean`, `date`, `select`, `actions`, `avatar`, `status`, `badge`, `progress`, `currency`).
- `editable`: Booleano para habilitar/deshabilitar la edición para esta columna (por defecto: `true` para tipos editables).
- `width`: Cadena de ancho CSS (por ejemplo, `'100px'`).
- `align`: Alineación de texto (`'left'`, `'center'`, `'right'`).
- `options`: Array de opciones para columnas de tipo `select`.
- `render`: Función opcional `(row) => TemplateResult` para renderizado de vista personalizado.
- `editRender`: Función opcional `(row, changeCallback) => TemplateResult` para renderizado de edición personalizado.
- `transform`: Función para transformar el valor para visualización (por ejemplo, formatear fechas).
- `reverseTransform`: Función para revertir la transformación del valor antes de guardar (por ejemplo, analizar fechas).

### Tipos de Columnas

- **`string`**: Entrada de texto para editar, texto plano para ver
- **`number`**: Entrada numérica para editar, número formateado para ver
- **`boolean`**: Componente switch para editar y ver
- **`date`**: Selector de fecha para editar, fecha formateada para ver
- **`select`**: Desplegable para editar, etiqueta de opción para ver
- **`actions`**: Botones de acción (editar, eliminar, guardar, cancelar, ver)
- **`avatar`**: Muestra imagen de avatar con nombre
- **`status`**: Insignia de estado con codificación de colores
- **`badge`**: Componente de insignia genérico
- **`progress`**: Visualización de barra de progreso
- **`currency`**: Formato de moneda

## Renderizado de Celdas Personalizado

Puede personalizar cómo se renderizan las celdas usando `CellRendererRegistry`. Esto le permite definir renderizadores globales para tipos específicos o basados en lógica personalizada.

### 1. Registro por Tipo

Registre un renderizador para un `type` de columna específico (por ejemplo, 'avatar').

```javascript
import { CellRendererRegistry } from "melser-ui";
import { html } from "lit";

CellRendererRegistry.getInstance().register("avatar", (val, row) => {
  return html`
    <div class="avatar" style="display: flex; align-items: center; gap: 0.5rem;">
      <img 
        src="${row.avatarUrl || "default.png"}" 
        alt="${val}" 
        style="width: 32px; height: 32px; border-radius: 50%;"
      />
      <span>${val}</span>
    </div>
  `;
});
```

Luego úselo en su definición de columna:

```javascript
table.columns = [
  { key: "username", label: "Usuario", type: "avatar" }, // Usa el renderizador 'avatar' registrado
];
```

### 2. Registro por Lógica

Registre un renderizador que se aplique cuando se cumpla una condición.

```javascript
CellRendererRegistry.getInstance().register(
  (val, row, col) => col.key === "status", // Función de coincidencia
  (val) => {
    const colors = {
      'Activo': '#10b981',
      'Inactivo': '#ef4444',
      'Pendiente': '#f59e0b'
    };
    const color = colors[val as string] || '#6b7280';
    return html`
      <span 
        style="
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          background: ${color}20;
          color: ${color};
          font-size: 0.875rem;
          font-weight: 500;
        "
      >
        ${val}
      </span>
    `;
  }
);
```

### 3. Columna de Acciones Personalizada

Puede reemplazar completamente la columna de acciones predeterminada.

```javascript
CellRendererRegistry.getInstance().register(
  "actions",
  (val, row, col, isEditing) => {
    const dispatch = (action, e) => {
      e.target.dispatchEvent(
        new CustomEvent("table-action", {
          detail: { action, row, id: row.id },
          bubbles: true,
          composed: true,
        })
      );
    };

    if (isEditing) {
      return html`
        <div style="display: flex; gap: 0.5rem;">
          <button 
            @click=${(e) => dispatch("save", e)}
            style="padding: 0.25rem 0.5rem; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer;"
          >
            Guardar
          </button>
          <button 
            @click=${(e) => dispatch("cancel", e)}
            style="padding: 0.25rem 0.5rem; background: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer;"
          >
            Cancelar
          </button>
        </div>
      `;
    }

    return html`
      <div style="display: flex; gap: 0.5rem;">
        <button 
          @click=${(e) => dispatch("edit", e)}
          style="padding: 0.25rem 0.5rem; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;"
        >
          Editar
        </button>
        <button 
          @click=${(e) => dispatch("delete", e)}
          style="padding: 0.25rem 0.5rem; background: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer;"
        >
          Eliminar
        </button>
        <button 
          @click=${(e) => console.log("¡Acción personalizada!", row)}
          style="padding: 0.25rem 0.5rem; background: #8b5cf6; color: white; border: none; border-radius: 4px; cursor: pointer;"
        >
          Personalizado
        </button>
      </div>
    `;
  }
);
```

### 4. Usando Funciones de Transformación

Transforme valores para visualización y reviértalos para guardar:

```javascript
table.columns = [
  {
    key: "createdAt",
    label: "Creado En",
    type: "date",
    transform: (val) => {
      if (!val) return '';
      const d = new Date(val as string);
      return d.toLocaleDateString('es-ES', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    },
    reverseTransform: (val) => {
      if (!val) return null;
      const d = new Date(val as string);
      return d.toISOString();
    }
  }
];
```

## Demo Interactivo

Para una demostración interactiva completa de todas las características de la tabla, use el componente `me-table-playground`:

<me-table-playground></me-table-playground>

El playground proporciona:
- **Gestión de Datos**: Agregar, editar, eliminar filas y exportar datos
- **Configuración en Vivo**: Alternar paginación, selección, densidad y filas expandibles
- **Estilizado en Tiempo Real**: Personalizar colores, bordes y apariencia
- **Monitoreo de Eventos**: Ver todos los eventos de la tabla en tiempo real
- **Sistema de Plantillas**: Cambiar entre diferentes plantillas de datos (usuarios, productos)

## Tematización

Use `customStyles` para sobrescribir los colores y apariencia predeterminados.

```javascript
table.customStyles = {
  background: "#ffffff",
  color: "#1f2937",
  borderColor: "#e5e7eb",
  headerBackground: "#f9fafb",
  rowHoverBackground: "#f3f4f6",
  primaryColor: "#6366f1",
  borderRadius: "8px",
  textColorSecondary: "#6b7280"
};
```

### Propiedades de Estilo Disponibles

| Propiedad            | Descripción                          | Variable CSS                |
| -------------------- | ------------------------------------ | --------------------------- |
| `background`         | Color de fondo de la tabla           | `--base-input-bg`           |
| `color`              | Color de texto de la tabla           | `--base-input-text-color`   |
| `borderColor`        | Color del borde                      | `--base-input-border-color` |
| `headerBackground`   | Fondo de fila de encabezado          | `--base-input-bg-disabled`  |
| `rowHoverBackground` | Fondo de hover de fila               | `--base-input-bg-hover`     |
| `primaryColor`       | Color de acento primario             | `--base-input-focus-ring-color` |
| `borderRadius`       | Radio de borde para la tabla         | `--base-input-radius`       |
| `textColorSecondary` | Color de texto secundario (paginación) | `--base-input-text-color-placeholder` |

## Opciones de Densidad

Controle el espaciado de las filas de la tabla:

```javascript
table.config.density = "Compacto";  // padding de 0.5rem
table.config.density = "Normal";     // padding de 1rem (predeterminado)
table.config.density = "Espacioso"; // padding de 1.5rem
```

## Mejores Prácticas

1. **Paginación del Lado del Servidor**: Use la propiedad `pagination` para conjuntos de datos grandes (>1000 filas)
2. **Tipos de Columnas**: Siempre especifique el `type` apropiado para una mejor experiencia de edición
3. **Funciones de Transformación**: Use `transform` y `reverseTransform` para formateo de fechas/moneda
4. **Renderizadores Personalizados**: Registre renderizadores globalmente para componentes de celda reutilizables
5. **Manejo de Eventos**: Escuche `row-save` para persistir cambios en el backend
6. **Rendimiento**: Use `editRender` para componentes de edición complejos para evitar re-renderizados

## Accesibilidad

El componente de tabla incluye:
- Soporte de navegación por teclado
- Atributos ARIA para lectores de pantalla
- Estructura de tabla semántica
- Gestión de enfoque para edición

## Soporte de Navegadores

Funciona en todos los navegadores modernos que soportan:
- Web Components (Custom Elements v1)
- Shadow DOM
- JavaScript ES6+

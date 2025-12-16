# Celdas Personalizadas en Data Table

El componente `data-table-lit` ahora soporta celdas personalizadas mediante slots y componentes personalizados, permitiendo crear interfaces de tabla altamente personalizables.

## Métodos de Personalización

### 1. Slots Personalizados (Recomendado)

Cada celda puede ser personalizada usando slots con el formato: `cell-{rowId}-{columnKey}`

```html
<data-table-lit id="my-table"></data-table-lit>

<!-- Slot personalizado para la celda ID=1, Columna='name' -->
<div slot="cell-1-name" class="custom-cell">
  <img src="avatar.jpg" alt="Avatar" />
  <span>John Doe</span>
</div>

<!-- Usar el componente table-cell -->
<table-cell slot="cell-1-status" type="status" value="active"> </table-cell>
```

### 2. Funciones de Renderizado (Método tradicional)

```javascript
table.columns = [
  {
    key: "name",
    label: "Name",
    render: (row) => html`
      <div class="custom-name">
        <strong>${row.name}</strong>
        <small>${row.email}</small>
      </div>
    `,
  },
];
```

## Componente `table-cell`

### Tipos de Celdas Disponibles

#### Status Badge

```html
<table-cell type="status" value="active"></table-cell>
```

Muestra un badge con colores según el estado:

- `active`: Verde
- `inactive`: Rojo
- `pending`: Amarillo

#### Progress Bar

```html
<table-cell type="progress" value="75"></table-cell>
```

Muestra una barra de progreso con el porcentaje.

#### Avatar

```html
<table-cell type="avatar" value="John Doe"></table-cell>
```

Muestra un avatar con las iniciales del nombre.

#### Currency

```html
<table-cell type="currency" value="75000"></table-cell>
```

Muestra el valor formateado como moneda USD.

#### Badge

```html
<table-cell type="badge" value="['tag1', 'tag2']"></table-cell>
```

Muestra múltiples badges.

### Edición Personalizada

Las celdas personalizadas también soportan edición:

```html
<table-cell slot="cell-1-name" type="avatar" value="John Doe" is-editing="true">
</table-cell>
```

## Ejemplo Completo

```html
<!DOCTYPE html>
<html>
  <head>
    <script type="module">
      import { DataTableLit, MelserTableCell } from "./src/index.ts";
    </script>
  </head>
  <body>
    <data-table-lit id="demo-table"></data-table-lit>

    <!-- Celdas personalizadas -->
    <table-cell slot="cell-1-name" type="avatar" value="John Doe"></table-cell>
    <table-cell slot="cell-1-status" type="status" value="active"></table-cell>
    <table-cell slot="cell-1-progress" type="progress" value="85"></table-cell>

    <!-- HTML personalizado -->
    <div slot="cell-2-name" class="custom-cell">
      <div class="user-info">
        <img src="jane.jpg" class="avatar" />
        <div>
          <div class="name">Jane Smith</div>
          <div class="subtitle">jane@example.com</div>
        </div>
      </div>
    </div>
  </body>
</html>
```

```javascript
// Configurar la tabla
const table = document.getElementById("demo-table");
table.columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "status", label: "Status" },
  { key: "progress", label: "Progress" },
];

table.data = [
  { id: 1, name: "John Doe", status: "active", progress: 85 },
  { id: 2, name: "Jane Smith", status: "inactive", progress: 45 },
];
```

## Eventos

Las celdas personalizadas pueden disparar eventos:

### cell-change

Cuando el valor de una celda en edición cambia:

```javascript
cell.addEventListener("cell-change", (e) => {
  console.log("New value:", e.detail.value);
});
```

### cell-edit-complete

Cuando termina la edición:

```javascript
cell.addEventListener("cell-edit-complete", (e) => {
  console.log("Edit completed:", e.detail.value);
});
```

## CSS Personalizado

Puedes personalizar el estilo de las celdas:

```css
/* Para slots personalizados */
[slot^="cell-"] {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Para table-cell */
table-cell {
  --cell-padding: 0.5rem;
  --cell-border-radius: 4px;
}
```

## Mejores Prácticas

1. **Usa slots para contenido estático** que no cambie durante la edición
2. **Usa funciones render** para contenido dinámico que dependa de múltiples campos
3. **Combina ambos métodos** según las necesidades de cada columna
4. **Mantén la consistencia visual** con el tema general de tu aplicación
5. **Considera la accesibilidad** al crear celdas personalizadas

## Migración desde Funciones Render

Si tienes código existente con funciones render, puedes migrar gradualmente:

```javascript
// Antes (función render)
{
    key: 'status',
    render: (row) => html`<span class="status-${row.status}">${row.status}</span>`
}

// Después (slot personalizado)
// En HTML:
<table-cell slot="cell-${row.id}-status"
                   type="status"
                   value="${row.status}">
</table-cell>
```

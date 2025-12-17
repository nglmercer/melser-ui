# Data Table Component

The `data-table-lit` component is a powerful, feature-rich table solution built with Lit. It supports sorting, pagination, selection, inline editing, expandable rows, and extensive customization via a cell renderer registry.

## Usage

```html
<script type="module">
  import { DataTableLit } from "melser-ui";
</script>

<data-table-lit id="my-table"></data-table-lit>

<script>
  const table = document.getElementById("my-table");

  table.columns = [
    { key: "id", label: "ID", type: "number" },
    { key: "name", label: "Name", type: "string", editable: true },
    { key: "role", label: "Role", type: "select", options: ["Admin", "User"] },
  ];

  table.data = [
    { id: 1, name: "John Doe", role: "Admin" },
    { id: 2, name: "Jane Smith", role: "User" },
  ];

  table.config = {
    pagination: true,
    pageSize: 10,
    selection: true,
    density: "Normal", // 'Compact' | 'Normal' | 'Spacious'
    expandable: false,
  };
</script>
```

## API Reference

### Properties

| Property       | Type            | Default | Description                                      |
| -------------- | --------------- | ------- | ------------------------------------------------ |
| `data`         | `DataRow[]`     | `[]`    | Array of data objects to display.                |
| `columns`      | `TableColumn[]` | `[]`    | Configuration for table columns.                 |
| `config`       | `TableConfig`   | `{...}` | General table configuration (pagination, etc).   |
| `searchQuery`  | `string`        | `''`    | Text to filter the table data globally.          |
| `customStyles` | `TableStyles`   | `{}`    | CSS variable overrides for theming.              |
| `icons`        | `Object`        | `{...}` | Object containing Lit templates for table icons. |

### Events

| Event              | Detail                                      | Description                                                       |
| ------------------ | ------------------------------------------- | ----------------------------------------------------------------- |
| `selection-change` | `{ selectedIds: (string\|number)[] }`       | Fired when row selection changes.                                 |
| `row-action`       | `{ action: string, row: DataRow, id: ... }` | Fired when an action button is clicked (edit, delete, view, etc). |
| `row-save`         | `{ id: string\|number, data: DataRow }`     | Fired when inline editing is saved.                               |
| `row-expand`       | `{ id: string\|number }`                    | Fired when a row is expanded.                                     |
| `cell-change`      | `{ key: string, value: unknown }`           | Fired when a cell value changes during editing.                   |

## Column Configuration (`TableColumn`)

Each object in the `columns` array can have the following properties:

- `key`: (Required) The property name in the data row.
- `label`: Header text.
- `type`: Data type or renderer key (`string`, `number`, `boolean`, `date`, `select`, `actions`, `avatar`, `status`, `badge`).
- `editable`: Boolean to enable/disable editing for this column.
- `width`: CSS width string (e.g., `'100px'`).
- `align`: Text alignment (`'left'`, `'center'`, `'right'`).
- `options`: Array of options for `select` type columns.
- `render`: Optional function `(row) => TemplateResult` for custom view rendering.
- `editRender`: Optional function `(row, changeCallback) => TemplateResult` for custom edit rendering.

## Custom Cell Rendering

You can customize how cells are rendered using the `CellRendererRegistry`. This allows you to define global renderers for specific types or based on custom logic.

### 1. Registering by Type

Register a renderer for a specific column `type` (e.g., 'avatar').

```javascript
import { CellRendererRegistry } from "melser-ui";
import { html } from "lit";

CellRendererRegistry.getInstance().register("avatar", (val, row) => {
  return html`
    <div class="avatar">
      <img src="${row.avatarUrl || "default.png"}" alt="${val}" />
      <span>${val}</span>
    </div>
  `;
});
```

Then use it in your column definition:

```javascript
table.columns = [
  { key: "username", label: "User", type: "avatar" }, // Uses the registered 'avatar' renderer
];
```

### 2. Registering by Logic

Register a renderer that applies when a condition is met.

```javascript
CellRendererRegistry.getInstance().register(
  (val, row, col) => col.key === "status", // Matcher function
  (val) => {
    const color = val === "Active" ? "green" : "red";
    return html`<span style="color: ${color}">${val}</span>`;
  }
);
```

### 3. Custom Actions Column

You can fully replace the default actions column.

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
      return html`<button @click=${(e) => dispatch("save", e)}>Save</button>`;
    }

    return html`
      <button @click=${(e) => dispatch("edit", e)}>Edit</button>
      <button @click=${(e) => dispatch("delete", e)}>Delete</button>
      <button @click=${(e) => console.log("Custom!", row)}>Custom</button>
    `;
  }
);
```

### Demo

<data-table-lit id="demo-table">
</data-table-lit>

## Theming

Use `customStyles` to override default colors and appearance.

```javascript
table.customStyles = {
  primaryColor: "#6366f1",
  headerBackground: "#f3f4f6",
  rowHoverBackground: "#f9fafb",
};
```

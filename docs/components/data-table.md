# Data Table

The `<data-table-lit>` component is a feature-rich table solution that supports sorting, pagination, row selection, expandable details, and inline editing. It is designed to be highly customizable and themeable.

## Basic Usage

```html
<script type="module">
  import "melser-ui/src/components/table.ts";

  const table = document.querySelector("data-table-lit");

  table.columns = [
    { key: "id", label: "ID", type: "number" },
    { key: "name", label: "Name", type: "string", editable: true },
    { key: "role", label: "Role", type: "select", options: ["Admin", "User"] },
  ];

  table.data = [
    { id: 1, name: "Alice", role: "Admin" },
    { id: 2, name: "Bob", role: "User" },
  ];
</script>

<data-table-lit></data-table-lit>
```

## Properties

| Property       | Type            | Default | Description                                                            |
| -------------- | --------------- | ------- | ---------------------------------------------------------------------- |
| `data`         | `DataRow[]`     | `[]`    | Array of data objects to display. Each object must have a unique `id`. |
| `columns`      | `TableColumn[]` | `[]`    | Configuration for table columns.                                       |
| `config`       | `TableConfig`   | `{...}` | General configuration for pagination, selection, density, etc.         |
| `searchQuery`  | `string`        | `''`    | Filter data across all columns based on this string.                   |
| `customStyles` | `TableStyles`   | `{}`    | Override internal CSS variables for specific theming.                  |

## Configuration Interfaces

### TableConfig

```typescript
interface TableConfig {
  pagination?: boolean; // Enable/disable pagination (default: true)
  pageSize?: number; // Rows per page (default: 5)
  selection?: boolean; // Enable checkbox selection (default: false)
  density?: "Compact" | "Normal" | "Spacious"; // Cell padding (default: 'Normal')
  expandable?: boolean; // Enable expandable detail rows (default: false)
}
```

### TableColumn

```typescript
interface TableColumn {
  key: string; // Property name in data object
  label: string; // Column header text
  type?: "string" | "number" | "boolean" | "date" | "select" | "actions";
  options?: (string | { label: string; value: any })[]; // For 'select' type
  editable?: boolean; // Enable inline editing for this column
  width?: string; // CSS width value
  align?: "left" | "center" | "right";
  render?: (row: DataRow) => TemplateResult; // Custom render function for view mode
  editRender?: (row: DataRow, onChange: (val: any) => void) => TemplateResult; // Custom render for edit mode
}
```

## Events

| Event Name         | Detail                                     | Description                                         |
| ------------------ | ------------------------------------------ | --------------------------------------------------- |
| `selection-change` | `{ selectedIds: (string\|number)[] }`      | Fired when row selection changes.                   |
| `row-save`         | `{ id: string\|number, data: DataRow }`    | Fired when an inline edit is saved.                 |
| `row-action`       | `{ action: 'delete', id: string\|number }` | Fired when a row action (like delete) is triggered. |

## Custom Rendering

You can customize how cells are rendered using the `render` property in the column definition.

```javascript
table.columns = [
  {
    key: "status",
    label: "Status",
    render: (row) => {
      const color = row.status === "active" ? "green" : "red";
      return html`<span style="color: ${color}">${row.status}</span>`;
    },
  },
];
```

## Expanding Rows

To using expandable rows, set `config.expandable = true`. Content for expanded rows is provided via slots named `details-{id}` or handled dynamically.

```html
<data-table-lit id="my-table">
  <div slot="details-1">Extra details for Row 1...</div>
  <div slot="details-2">Extra details for Row 2...</div>
</data-table-lit>
```

## Theming

The table uses the Melser UI design system by default but accepts overrides via `customStyles`.

```javascript
table.customStyles = {
  headerBackground: "#f3f4f6",
  primaryColor: "#3b82f6",
  rowHoverBackground: "#eff6ff",
};
```

Available keys in `customStyles`:

- `background`
- `color`
- `borderColor`
- `borderRadius`
- `headerBackground`
- `rowHoverBackground`
- `primaryColor`
- `textColorSecondary`

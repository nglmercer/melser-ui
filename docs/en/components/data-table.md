# Data Table Component

The `data-table-lit` component is a powerful, feature-rich table solution built with Lit. It supports sorting, pagination, selection, inline editing, expandable rows, server-side pagination, and extensive customization via a cell renderer registry.

## Features

- **Sorting**: Click column headers to sort data (ascending/descending)
- **Pagination**: Client-side or server-side pagination with customizable page size
- **Selection**: Multi-row selection with select-all functionality
- **Inline Editing**: Edit cells directly with appropriate input components
- **Expandable Rows**: Show additional details in expandable row sections
- **Custom Cell Rendering**: Use `CellRendererRegistry` for advanced customization
- **Theming**: Customize colors, borders, and appearance with CSS variables
- **Density Control**: Adjust row spacing (Compact, Normal, Spacious)
- **Responsive Design**: Works seamlessly on all screen sizes

## Usage

### Basic Example

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
    { key: "active", label: "Active", type: "boolean", editable: true },
  ];

  table.data = [
    { id: 1, name: "John Doe", role: "Admin", active: true },
    { id: 2, name: "Jane Smith", role: "User", active: false },
    { id: 3, name: "Bob Johnson", role: "User", active: true },
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

### Server-Side Pagination

For large datasets, use server-side pagination:

```javascript
table.pagination = {
  page: 1,
  limit: 10,
  total: 1000,
  totalPages: 100
};

// Only provide data for current page
table.data = [
  { id: 1, name: "John Doe", role: "Admin" },
  { id: 2, name: "Jane Smith", role: "User" },
  // ... up to pageSize items
];

// Listen for page changes
table.addEventListener("page-change", (e) => {
  const { page, pageSize } = e.detail;
  // Fetch data from server for this page
  fetchData(page, pageSize);
});
```

### Expandable Rows

Enable expandable rows to show additional details:

```javascript
table.config.expandable = true;

table.data = [
  { 
    id: 1, 
    name: "John Doe", 
    email: "john@example.com",
    details: "Additional information..."
  }
];
```

Then use slots to provide custom detail content:

```html
<data-table-lit id="table">
  <div slot="details-1">
    <p><strong>Email:</strong> john@example.com</p>
    <p><strong>Details:</strong> Additional information...</p>
  </div>
</data-table-lit>
```

### Custom Cell Slots

Provide custom content for specific cells using slots:

```html
<data-table-lit id="table">
  <div slot="cell-1-name">Custom Name Display</div>
  <div slot="cell-2-email">
    <a href="mailto:jane@example.com">jane@example.com</a>
  </div>
</data-table-lit>
```

## API Reference

### Properties

| Property       | Type            | Default | Description                                      |
| -------------- | --------------- | ------- | ------------------------------------------------ |
| `data`         | `DataRow[]`     | `[]`    | Array of data objects to display.                |
| `columns`      | `TableColumn[]` | `[]`    | Configuration for table columns.                 |
| `config`       | `TableConfig`   | `{...}` | General table configuration (pagination, etc).   |
| `pagination`   | `PaginationState` | `undefined` | Server-side pagination state.                    |
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
| `page-change`      | `{ page: number, pageSize: number }`       | Fired when pagination changes (especially in server-side mode).   |

## Column Configuration (`TableColumn`)

Each object in the `columns` array can have the following properties:

- `key`: (Required) The property name in the data row.
- `label`: Header text.
- `type`: Data type or renderer key (`string`, `number`, `boolean`, `date`, `select`, `actions`, `avatar`, `status`, `badge`, `progress`, `currency`).
- `editable`: Boolean to enable/disable editing for this column (default: `true` for editable types).
- `width`: CSS width string (e.g., `'100px'`).
- `align`: Text alignment (`'left'`, `'center'`, `'right'`).
- `options`: Array of options for `select` type columns.
- `render`: Optional function `(row) => TemplateResult` for custom view rendering.
- `editRender`: Optional function `(row, changeCallback) => TemplateResult` for custom edit rendering.
- `transform`: Function to transform value for display (e.g., formatting dates).
- `reverseTransform`: Function to reverse transform value before saving (e.g., parsing dates).

### Column Types

- **`string`**: Text input for editing, plain text for viewing
- **`number`**: Number input for editing, formatted number for viewing
- **`boolean`**: Switch component for both editing and viewing
- **`date`**: Date picker for editing, formatted date for viewing
- **`select`**: Dropdown for editing, option label for viewing
- **`actions`**: Action buttons (edit, delete, save, cancel, view)
- **`avatar`**: Displays avatar image with name
- **`status`**: Status badge with color coding
- **`badge`**: Generic badge component
- **`progress`**: Progress bar visualization
- **`currency`**: Currency formatting

## Custom Cell Rendering

You can customize how cells are rendered using the `CellRendererRegistry`. This allows you to define global renderers for specific types or based on custom logic.

### 1. Registering by Type

Register a renderer for a specific column `type` (e.g., 'avatar').

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
    const colors = {
      'Active': '#10b981',
      'Inactive': '#ef4444',
      'Pending': '#f59e0b'
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
      return html`
        <div style="display: flex; gap: 0.5rem;">
          <button 
            @click=${(e) => dispatch("save", e)}
            style="padding: 0.25rem 0.5rem; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer;"
          >
            Save
          </button>
          <button 
            @click=${(e) => dispatch("cancel", e)}
            style="padding: 0.25rem 0.5rem; background: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer;"
          >
            Cancel
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
          Edit
        </button>
        <button 
          @click=${(e) => dispatch("delete", e)}
          style="padding: 0.25rem 0.5rem; background: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer;"
        >
          Delete
        </button>
        <button 
          @click=${(e) => console.log("Custom action!", row)}
          style="padding: 0.25rem 0.5rem; background: #8b5cf6; color: white; border: none; border-radius: 4px; cursor: pointer;"
        >
          Custom
        </button>
      </div>
    `;
  }
);
```

### 4. Using Transform Functions

Transform values for display and reverse them for saving:

```javascript
table.columns = [
  {
    key: "createdAt",
    label: "Created At",
    type: "date",
    transform: (val) => {
      if (!val) return '';
      const d = new Date(val as string);
      return d.toLocaleDateString('en-US', { 
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

## Interactive Demo

For a comprehensive interactive demonstration of all table features, use the `me-table-playground` component:

<me-table-playground></me-table-playground>

The playground provides:
- **Data Management**: Add, edit, delete rows and export data
- **Live Configuration**: Toggle pagination, selection, density, and expandable rows
- **Real-time Styling**: Customize colors, borders, and appearance
- **Event Monitoring**: Watch all table events in real-time
- **Template System**: Switch between different data templates (users, products)

## Theming

Use `customStyles` to override default colors and appearance.

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

### Available Style Properties

| Property              | Description                          | CSS Variable                |
| --------------------- | ------------------------------------ | --------------------------- |
| `background`          | Table background color               | `--base-input-bg`           |
| `color`               | Table text color                     | `--base-input-text-color`   |
| `borderColor`         | Border color                         | `--base-input-border-color` |
| `headerBackground`    | Header row background                | `--base-input-bg-disabled`  |
| `rowHoverBackground`  | Row hover background                 | `--base-input-bg-hover`     |
| `primaryColor`        | Primary accent color                 | `--base-input-focus-ring-color` |
| `borderRadius`        | Border radius for table              | `--base-input-radius`       |
| `textColorSecondary`  | Secondary text color (pagination)    | `--base-input-text-color-placeholder` |

## Density Options

Control the spacing of table rows:

```javascript
table.config.density = "Compact";  // 0.5rem padding
table.config.density = "Normal";   // 1rem padding (default)
table.config.density = "Spacious"; // 1.5rem padding
```

## Best Practices

1. **Server-Side Pagination**: Use `pagination` prop for large datasets (>1000 rows)
2. **Column Types**: Always specify appropriate `type` for better editing experience
3. **Transform Functions**: Use `transform` and `reverseTransform` for date/currency formatting
4. **Custom Renderers**: Register renderers globally for reusable cell components
5. **Event Handling**: Listen to `row-save` to persist changes to backend
6. **Performance**: Use `editRender` for complex editing components to avoid re-renders

## Accessibility

The table component includes:
- Keyboard navigation support
- ARIA attributes for screen readers
- Semantic table structure
- Focus management for editing

## Browser Support

Works in all modern browsers that support:
- Web Components (Custom Elements v1)
- Shadow DOM
- ES6+ JavaScript

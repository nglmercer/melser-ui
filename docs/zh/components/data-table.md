# 数据表格组件

`data-table-lit` 组件是一个使用 Lit 构建的强大、功能丰富的表格解决方案。它支持排序、分页、选择、行内编辑、可展开行以及通过单元格渲染器注册表进行的广泛定制。

## 用法

```html
<script type="module">
  import { DataTableLit } from "melser-ui";
</script>

<data-table-lit id="my-table"></data-table-lit>

<script>
  const table = document.getElementById("my-table");

  table.columns = [
    { key: "id", label: "ID", type: "number" },
    { key: "name", label: "姓名", type: "string", editable: true },
    { key: "role", label: "角色", type: "select", options: ["Admin", "User"] },
  ];

  table.data = [
    { id: 1, name: "John Doe", role: "Admin" },
    { id: 2, name: "Jane Smith", role: "User" },
  ];

  table.config = {
    pagination: true,
    pageSize: 10,
    selection: true,
    density: "Normal", // 'Compact' (紧凑) | 'Normal' (正常) | 'Spacious' (宽敞)
    expandable: false,
  };
</script>
```

## API 参考

### 属性

| 属性           | 类型            | 默认值  | 描述                            |
| -------------- | --------------- | ------- | ------------------------------- |
| `data`         | `DataRow[]`     | `[]`    | 要显示的数据对象数组。          |
| `columns`      | `TableColumn[]` | `[]`    | 表格列的配置。                  |
| `config`       | `TableConfig`   | `{...}` | 通用表格配置（分页等）。        |
| `searchQuery`  | `string`        | `''`    | 用于全局过滤表格数据的文本。    |
| `customStyles` | `TableStyles`   | `{}`    | 用于主题化的 CSS 变量覆盖。     |
| `icons`        | `Object`        | `{...}` | 包含表格图标的 Lit 模板的对象。 |

### 事件

| 事件               | 详情                                        | 描述                                         |
| ------------------ | ------------------------------------------- | -------------------------------------------- |
| `selection-change` | `{ selectedIds: (string\|number)[] }`       | 当行选择更改时触发。                         |
| `row-action`       | `{ action: string, row: DataRow, id: ... }` | 当点击操作按钮（编辑、删除、查看等）时触发。 |
| `row-save`         | `{ id: string\|number, data: DataRow }`     | 当行内编辑保存时触发。                       |
| `row-expand`       | `{ id: string\|number }`                    | 当行展开时触发。                             |
| `cell-change`      | `{ key: string, value: unknown }`           | 在编辑期间单元格值更改时触发。               |

## 列配置 (`TableColumn`)

`columns` 数组中的每个对象可以具有以下属性：

- `key`: (必填) 数据行中的属性名称。
- `label`: 标题文本。
- `type`: 数据类型或渲染器键 (`string`, `number`, `boolean`, `date`, `select`, `actions`, `avatar`, `status`, `badge`)。
- `editable`: 启用/禁用此列编辑的布尔值。
- `width`: CSS 宽度字符串 (例如 `'100px'`)。
- `align`: 文本对齐 (`'left'`, `'center'`, `'right'`)。
- `options`: `select` 类型列的选项数组。
- `render`: 可选函数 `(row) => TemplateResult` 用于自定义视图渲染。
- `editRender`: 可选函数 `(row, changeCallback) => TemplateResult` 用于自定义编辑渲染。

## 自定义单元格渲染

您可以使用 `CellRendererRegistry` 自定义单元格的渲染方式。这允许您为特定类型或基于自定义逻辑定义全局渲染器。

### 1. 按类型注册

为特定列 `type`（例如 'avatar'）注册渲染器。

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

然后在您的列定义中使用它：

```javascript
table.columns = [
  { key: "username", label: "用户", type: "avatar" }, // 使用注册的 'avatar' 渲染器
];
```

### 2. 按逻辑注册

注册一个在满足条件时应用的渲染器。

```javascript
CellRendererRegistry.getInstance().register(
  (val, row, col) => col.key === "status", // 匹配函数
  (val) => {
    const color = val === "Active" ? "green" : "red";
    return html`<span style="color: ${color}">${val}</span>`;
  }
);
```

### 3. 自定义操作列

您可以完全替换默认的操作列。

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
      return html`<button @click=${(e) => dispatch("save", e)}>保存</button>`;
    }

    return html`
      <button @click=${(e) => dispatch("edit", e)}>编辑</button>
      <button @click=${(e) => dispatch("delete", e)}>删除</button>
      <button @click=${(e) => console.log("自定义!", row)}>自定义</button>
    `;
  }
);
```

### 演示

<data-table-lit id="demo-table">
</data-table-lit>

## 主题化

使用 `customStyles` 覆盖默认颜色和外观。

```javascript
table.customStyles = {
  primaryColor: "#6366f1",
  headerBackground: "#f3f4f6",
  rowHoverBackground: "#f9fafb",
};
```

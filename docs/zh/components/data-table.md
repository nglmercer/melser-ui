# 数据表格组件

`data-table-lit` 组件是一个使用 Lit 构建的强大、功能丰富的表格解决方案。它支持排序、分页、选择、行内编辑、可展开行、服务器端分页以及通过单元格渲染器注册表进行的广泛定制。

## 特性

- **排序**：点击列标题对数据进行排序（升序/降序）
- **分页**：客户端或服务器端分页，可自定义页面大小
- **选择**：支持全选功能的多行选择
- **行内编辑**：使用适当的输入组件直接编辑单元格
- **可展开行**：在可展开的行部分显示额外详细信息
- **自定义单元格渲染**：使用 `CellRendererRegistry` 进行高级定制
- **主题化**：使用 CSS 变量自定义颜色、边框和外观
- **密度控制**：调整行间距（紧凑、正常、宽敞）
- **响应式设计**：在所有屏幕尺寸上完美工作

## 用法

### 基本示例

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
    { key: "role", label: "角色", type: "select", options: ["管理员", "用户"] },
    { key: "active", label: "活跃", type: "boolean", editable: true },
  ];

  table.data = [
    { id: 1, name: "张三", role: "管理员", active: true },
    { id: 2, name: "李四", role: "用户", active: false },
    { id: 3, name: "王五", role: "用户", active: true },
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

### 服务器端分页

对于大型数据集，使用服务器端分页：

```javascript
table.pagination = {
  page: 1,
  limit: 10,
  total: 1000,
  totalPages: 100
};

// 只提供当前页面的数据
table.data = [
  { id: 1, name: "张三", role: "管理员" },
  { id: 2, name: "李四", role: "用户" },
  // ... 最多 pageSize 项
];

// 监听页面变化
table.addEventListener("page-change", (e) => {
  const { page, pageSize } = e.detail;
  // 从服务器获取该页面的数据
  fetchData(page, pageSize);
});
```

### 可展开行

启用可展开行以显示额外详细信息：

```javascript
table.config.expandable = true;

table.data = [
  { 
    id: 1, 
    name: "张三", 
    email: "zhangsan@example.com",
    details: "附加信息..."
  }
];
```

然后使用 slots 提供自定义详细信息内容：

```html
<data-table-lit id="table">
  <div slot="details-1">
    <p><strong>邮箱：</strong> zhangsan@example.com</p>
    <p><strong>详情：</strong> 附加信息...</p>
  </div>
</data-table-lit>
```

### 自定义单元格 Slots

使用 slots 为特定单元格提供自定义内容：

```html
<data-table-lit id="table">
  <div slot="cell-1-name">自定义姓名显示</div>
  <div slot="cell-2-email">
    <a href="mailto:lisi@example.com">lisi@example.com</a>
  </div>
</data-table-lit>
```

## API 参考

### 属性

| 属性           | 类型            | 默认值  | 描述                            |
| -------------- | --------------- | ------- | ------------------------------- |
| `data`         | `DataRow[]`     | `[]`    | 要显示的数据对象数组。          |
| `columns`      | `TableColumn[]` | `[]`    | 表格列的配置。                  |
| `config`       | `TableConfig`   | `{...}` | 通用表格配置（分页等）。        |
| `pagination`   | `PaginationState` | `undefined` | 服务器端分页状态。              |
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
| `page-change`      | `{ page: number, pageSize: number }`       | 当分页更改时触发（特别是在服务器端模式）。   |

## 列配置 (`TableColumn`)

`columns` 数组中的每个对象可以具有以下属性：

- `key`: (必填) 数据行中的属性名称。
- `label`: 标题文本。
- `type`: 数据类型或渲染器键 (`string`, `number`, `boolean`, `date`, `select`, `actions`, `avatar`, `status`, `badge`, `progress`, `currency`)。
- `editable`: 启用/禁用此列编辑的布尔值（可编辑类型默认为 `true`）。
- `width`: CSS 宽度字符串 (例如 `'100px'`)。
- `align`: 文本对齐 (`'left'`, `'center'`, `'right'`)。
- `options`: `select` 类型列的选项数组。
- `render`: 可选函数 `(row) => TemplateResult` 用于自定义视图渲染。
- `editRender`: 可选函数 `(row, changeCallback) => TemplateResult` 用于自定义编辑渲染。
- `transform`: 函数，用于转换值以供显示（例如，格式化日期）。
- `reverseTransform`: 函数，在保存前反转值的转换（例如，解析日期）。

### 列类型

- **`string`**: 文本输入用于编辑，纯文本用于查看
- **`number`**: 数字输入用于编辑，格式化数字用于查看
- **`boolean`**: 开关组件用于编辑和查看
- **`date`**: 日期选择器用于编辑，格式化日期用于查看
- **`select`**: 下拉菜单用于编辑，选项标签用于查看
- **`actions`**: 操作按钮（编辑、删除、保存、取消、查看）
- **`avatar`**: 显示头像图像和姓名
- **`status`**: 带颜色编码的状态徽章
- **`badge`**: 通用徽章组件
- **`progress`**: 进度条可视化
- **`currency`**: 货币格式化

## 自定义单元格渲染

您可以使用 `CellRendererRegistry` 自定义单元格的渲染方式。这允许您为特定类型或基于自定义逻辑定义全局渲染器。

### 1. 按类型注册

为特定列 `type`（例如 'avatar'）注册渲染器。

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
    const colors = {
      '活跃': '#10b981',
      '非活跃': '#ef4444',
      '待定': '#f59e0b'
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
      return html`
        <div style="display: flex; gap: 0.5rem;">
          <button 
            @click=${(e) => dispatch("save", e)}
            style="padding: 0.25rem 0.5rem; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer;"
          >
            保存
          </button>
          <button 
            @click=${(e) => dispatch("cancel", e)}
            style="padding: 0.25rem 0.5rem; background: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer;"
          >
            取消
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
          编辑
        </button>
        <button 
          @click=${(e) => dispatch("delete", e)}
          style="padding: 0.25rem 0.5rem; background: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer;"
        >
          删除
        </button>
        <button 
          @click=${(e) => console.log("自定义操作!", row)}
          style="padding: 0.25rem 0.5rem; background: #8b5cf6; color: white; border: none; border-radius: 4px; cursor: pointer;"
        >
          自定义
        </button>
      </div>
    `;
  }
);
```

### 4. 使用转换函数

转换值以供显示并在保存前反转：

```javascript
table.columns = [
  {
    key: "createdAt",
    label: "创建时间",
    type: "date",
    transform: (val) => {
      if (!val) return '';
      const d = new Date(val as string);
      return d.toLocaleDateString('zh-CN', { 
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

## 交互式演示

有关所有表格功能的全面交互式演示，请使用 `me-table-playground` 组件：

<me-table-playground></me-table-playground>

演练场提供：
- **数据管理**：添加、编辑、删除行和导出数据
- **实时配置**：切换分页、选择、密度和可展开行
- **实时样式**：自定义颜色、边框和外观
- **事件监控**：实时查看所有表格事件
- **模板系统**：在不同的数据模板（用户、产品）之间切换

## 主题化

使用 `customStyles` 覆盖默认颜色和外观。

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

### 可用的样式属性

| 属性              | 描述                          | CSS 变量                     |
| ----------------- | ----------------------------- | ---------------------------- |
| `background`      | 表格背景颜色                  | `--base-input-bg`            |
| `color`           | 表格文本颜色                  | `--base-input-text-color`    |
| `borderColor`     | 边框颜色                      | `--base-input-border-color`  |
| `headerBackground`| 标题行背景                    | `--base-input-bg-disabled`   |
| `rowHoverBackground`| 行悬停背景                  | `--base-input-bg-hover`      |
| `primaryColor`    | 主要强调色                    | `--base-input-focus-ring-color` |
| `borderRadius`    | 表格的边框圆角                | `--base-input-radius`        |
| `textColorSecondary`| 次要文本颜色（分页）       | `--base-input-text-color-placeholder` |

## 密度选项

控制表格行的间距：

```javascript
table.config.density = "Compact";  // 0.5rem 内边距
table.config.density = "Normal";   // 1rem 内边距（默认）
table.config.density = "Spacious"; // 1.5rem 内边距
```

## 最佳实践

1. **服务器端分页**：对于大型数据集（>1000 行），使用 `pagination` 属性
2. **列类型**：始终指定适当的 `type` 以获得更好的编辑体验
3. **转换函数**：使用 `transform` 和 `reverseTransform` 进行日期/货币格式化
4. **自定义渲染器**：全局注册渲染器以实现可重用的单元格组件
5. **事件处理**：监听 `row-save` 以将更改持久化到后端
6. **性能**：使用 `editRender` 处理复杂的编辑组件，避免重新渲染

## 可访问性

表格组件包括：
- 键盘导航支持
- 屏幕阅读器的 ARIA 属性
- 语义化表格结构
- 编辑的焦点管理

## 浏览器支持

在所有支持以下内容的现代浏览器中工作：
- Web Components (Custom Elements v1)
- Shadow DOM
- ES6+ JavaScript

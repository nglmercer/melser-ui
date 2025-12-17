# 使用 Zod 的动态表单

Melser UI 包含从 Zod 架构定义自动生成表单的功能。這对于创建管理界面、可编辑数据表和以数据架构定义 UI 的快速原型非常有用。

## `me-schema-form` 组件

我们在 `src/components/melser-schema-form.ts` 中创建了一个名为 `me-schema-form` 的示例组件。该组件接受一个 Zod 对象并渲染相应的输入框。

### 特性

- **自动生成**：根据 Zod 类型创建输入框（`ZodString`，`ZodNumber`，`ZodBoolean`，`ZodEnum`，`ZodDate`）。
- **集成验证**：使用与库其余部分相同的 `ZodFormController` 进行实时验证。
- **公共 API**：以编程方式设置和清除数据的方法。

### 使用示例

```typescript
import { html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { z } from "zod";
import "./components/melser-schema-form";

const userSchema = z.object({
  fullName: z.string().min(2, "名字太短"),
  email: z.string().email(),
  age: z.number().min(18).max(100),
  role: z.enum(["Admin", "Editor", "Viewer"]),
  isActive: z.boolean(),
  startDate: z.date(), // 如果使用字符串作为日期，则使用 z.string()
});

@customElement("my-dynamic-feature")
class MyDynamicFeature extends LitElement {
  @state() formData = {};

  handleEdit(user) {
    // 将数据加载到表单中
    const form = this.shadowRoot.querySelector("me-schema-form");
    form.setData(user);
  }

  handleClear() {
    const form = this.shadowRoot.querySelector("me-schema-form");
    form.clearData();
  }

  handleSubmit(e) {
    console.log("提交的有效数据：", e.detail.data);
  }

  render() {
    return html`
      <div>
        <h2>编辑用户</h2>
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
          加载示例
        </button>

        <button @click="${this.handleClear}">清除</button>

        <me-schema-form
          .schema="${userSchema}"
          @submit="${this.handleSubmit}"
        ></me-schema-form>
      </div>
    `;
  }
}
```

## 组件 API

### 属性

| 属性          | 类型          | 描述                                     |
| ------------- | ------------- | ---------------------------------------- |
| `schema`      | `z.ZodObject` | 定义表单的 Zod 架构。                    |
| `defaultData` | `Object`      | 表单的初始数据。                         |
| `showSubmit`  | `Boolean`     | 显示或隐藏原生提交按钮。默认值：`true`。 |
| `submitLabel` | `String`      | 提交按钮文本。默认值：'Submit'。         |

### 方法

您可以通过获取元素引用来访问这些方法 (`querySelector('me-schema-form')`)。

- **`setData(data: Record<string, unknown>): void`**
  更新表单值并根据架构进行验证。用于“编辑”表格记录。
- **`clearData(): void`**
  将表单重置为空状态（或架构默认值）。
- **`submit(): Record<string, unknown> | null`**
  手动执行验证。如果成功，触发 `submit` 事件并返回数据。如果失败，在 UI 中显示错误并返回 `null`。

## 类型映射

该组件自动将 Zod 类型映射到 Melser UI 组件：

- `z.string()` -> `<base-input type="text">` (如果字段名称包含 "password" 则为 `password`)
- `z.number()` -> `<me-number-input>`
- `z.boolean()` -> `<me-switch>`
- `z.enum([...])` -> `<me-select>`
- `z.date()` -> `<me-date-picker>`

对于更高级的自定义（例如 `textarea`, `range`, `file-upload`），建议扩展 `MelserSchemaForm` 组件并覆盖 `renderField` 方法。

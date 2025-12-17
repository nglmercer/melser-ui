---
title: MelserTextInput
---

# MelserTextInput

一个高级且可定制的文本输入组件，具有验证、图标和完整的表单支持。

## 基本示例

```html
<base-input label="全名" placeholder="输入您的姓名"> </base-input>
```

## 属性

| 属性           | 类型      | 默认值      | 描述                                       |
| -------------- | --------- | ----------- | ------------------------------------------ |
| `type`         | `string`  | `'text'`    | 输入类型 (text, password, email, tel, url) |
| `label`        | `string`  | `''`        | 可见字段标签                               |
| `placeholder`  | `string`  | `''`        | 占位符文本                                 |
| `value`        | `string`  | `''`        | 字段值                                     |
| `disabled`     | `boolean` | `false`     | 禁用交互                                   |
| `readonly`     | `boolean` | `false`     | 只读                                       |
| `required`     | `boolean` | `false`     | 表单必填字段                               |
| `name`         | `string`  | `''`        | 表单名称                                   |
| `minlength`    | `number`  | `undefined` | 允许的最小长度                             |
| `maxlength`    | `number`  | `undefined` | 允许的最大长度                             |
| `pattern`      | `string`  | `''`        | 用于验证的正则表达式                       |
| `autocomplete` | `string`  | `'off'`     | 自动完成控制                               |
| `autofocus`    | `boolean` | `false`     | 自动聚焦                                   |
| `error`        | `string`  | `''`        | 自定义错误消息                             |
| `hint`         | `string`  | `''`        | 帮助文本                                   |
| `size`         | `string`  | `'md'`      | 输入框尺寸 (sm, md, lg)                    |

## 事件

| 事件      | 描述                         |
| --------- | ---------------------------- |
| `input`   | 当值更改时触发（实时）       |
| `change`  | 当更改确认时触发（失去焦点） |
| `focus`   | 当获得焦点时触发             |
| `blur`    | 当失去焦点时触发             |
| `keydown` | 当按下键时触发               |
| `keyup`   | 当释放键时触发               |

## 用法示例

### 带有邮箱验证的输入框

```html
<base-input
  label="电子邮箱"
  type="email"
  placeholder="you@email.com"
  required
  pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
  hint="请输入有效的电子邮箱"
>
</base-input>
```

### 带有字符计数的输入框

```html
<base-input
  label="简介"
  placeholder="介绍一下你自己..."
  maxlength="200"
  hint="最多 200 个字符"
>
</base-input>
```

### 带有自动完成的输入框

```html
<base-input
  label="国家"
  placeholder="选择一个国家"
  autocomplete="country"
  datalist="countries"
>
</base-input>

<datalist id="countries">
  <option value="Spain"></option>
  <option value="Mexico"></option>
  <option value="Argentina"></option>
  <option value="Colombia"></option>
  <option value="Peru"></option>
</datalist>
```

### 带有状态的输入框

```html
<base-input
  label="用户名"
  placeholder="3-20 个字符"
  minlength="3"
  maxlength="20"
  pattern="[a-zA-Z0-9_]+"
  error="仅允许字母、数字和下划线"
>
</base-input>
```

## 表单集成

### 完整的注册表单

```html
<form id="registration-form">
  <base-input
    label="全名 *"
    name="fullName"
    required
    minlength="2"
    placeholder="John Doe"
  >
  </base-input>

  <base-input
    label="电子邮箱 *"
    type="email"
    name="email"
    required
    placeholder="john@email.com"
  >
  </base-input>

  <base-input
    label="电话"
    type="tel"
    name="phone"
    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
    placeholder="123-456-7890"
  >
  </base-input>

  <base-input
    label="网站"
    type="url"
    name="website"
    placeholder="https://myweb.com"
  >
  </base-input>

  <button type="submit" variant="primary">注册</button>
</form>
```

```javascript
const form = document.getElementById("registration-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    console.log("表单数据:", data);

    // 额外的手动验证
    if (!data.fullName || !data.email) {
      alert("请完成所有必填字段");
      return;
    }

    alert("表单提交成功！");
  });
}
```

## 表单演示

<me-playground-form id="text-input-playground" schema-name="text-input" title="示例表单" description="带有自动 Zod 验证的交互式示例。">
  <div style="margin-bottom: 1rem;">
    <base-input 
      label="全名 *"
      name="fullName"
      required
      minlength="2"
      placeholder="John Doe">
    </base-input>
  </div>
  
  <div style="margin-bottom: 1rem;">
    <base-input 
      label="电子邮箱 *"
      type="email"
      name="email"
      required
      placeholder="john@email.com">
    </base-input>
  </div>
  
  <div style="margin-bottom: 1rem;">
    <base-input 
      label="电话"
      type="tel"
      name="phone"
      placeholder="123-456-7890">
    </base-input>
  </div>
  
  <div style="margin-bottom: 1rem;">
    <base-input 
      label="网站"
      type="url"
      name="website"
      placeholder="https://myweb.com">
    </base-input>
  </div>
</me-playground-form>

## 通过 CSS 定制

### CSS 变量

由于新的设计令牌系统，变量现在遵循一致的 `base-input-*` 模式。

```css
base-input {
  /* 主要变量 */
  --base-input-bg: #ffffff;
  --base-input-bg-hover: #f9fafb;
  --base-input-bg-focus: #ffffff;

  --base-input-text-color: #333333;
  --base-input-text-color-placeholder: #6b7280;

  --base-input-border-color: #cccccc;
  --base-input-border-color-hover: #999999;
  --base-input-border-color-focus: #3b82f6;

  --base-input-padding: 0.75rem;
  --base-input-radius: 4px;
  --base-input-font-size: 1rem;

  --base-input-focus-ring-color: #3b82f6;
  --base-input-focus-ring-width: 2px;
}
```

### 定制示例

```html
<style>
  .custom-input base-input {
    --base-input-focus-ring-color: #10b981;
    --base-input-border-color-focus: #10b981;
    --base-input-radius: 12px;
    --base-input-bg: #ecfdf5;
  }

  .large-input base-input {
    --base-input-padding: 1rem 1.5rem;
    --base-input-font-size: 1.25rem;
  }

  .dark-theme-input base-input {
    --base-input-bg: #1f2937;
    --base-input-border-color: #374151;
    --base-input-text-color: #f3f4f6;
    --base-input-text-color-placeholder: #9ca3af;
    --base-input-focus-ring-color: #8b5cf6;
  }
</style>

<div class="custom-input" style="margin-bottom: 1rem;">
  <base-input label="自定义输入框 (绿色)" placeholder="自定义样式">
  </base-input>
</div>

<div class="large-input" style="margin-bottom: 1rem;">
  <base-input label="大号输入框" placeholder="使用更舒适"> </base-input>
</div>

<div class="dark-theme-input">
  <base-input
    label="深色主题 (手动)"
    placeholder="手动样式覆盖"
    value="深色主题文本"
  >
  </base-input>
</div>
```

<h3>颜色</h3>
<div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1rem;">
  <base-input label="成功输入框" color="success" placeholder="正确" value="有效值"></base-input>
  <base-input label="警告输入框" color="warning" placeholder="警告" value="可疑值"></base-input>
  <base-input label="危险输入框" color="danger" placeholder="错误" value="无效值"></base-input>
</div>

## 无障碍性

MelserTextInput 组件包括：

- **关联标签**：标签和输入框之间的语义关系
- **Aria-describedby**：用于提示和错误消息
- **焦点状态**：清晰的视觉指示器
- **键盘导航**：Tab, Enter, Escape
- **可访问的验证**：屏幕阅读器宣布错误消息

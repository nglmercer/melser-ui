---
title: MelserCheckbox
---

# MelserCheckbox

一个高度可定制的、无障碍的二进制选择组件（复选框），与 Melser 设计系统保持一致。

## 主要特性

- 🎨 **3 级定制：** 预定义变体、CSS 变量和 Shadow Parts。
- 📏 **自适应尺寸：** 原生支持 `small`（小）、`medium`（中）和 `large`（大）。
- ♿ **无障碍优先：** 隐藏原生输入框以保持键盘导航和屏幕阅读器支持。
- ✨ **动画：** 平滑的状态和焦点过渡。

## 基本示例

```html
<me-checkbox label="我接受条款和条件"></me-checkbox>
```

## 交互式演示

<div style="display: flex; flex-direction: column; gap: 1rem;">
<me-checkbox id="demo-basic" label="基本复选框"></me-checkbox>
<me-checkbox id="demo-checked" label="默认选中" checked></me-checkbox>
<me-checkbox id="demo-disabled" label="禁用复选框" disabled></me-checkbox>
<me-checkbox id="demo-error" label="带有验证错误" required errorMessage="您必须勾选此框"></me-checkbox>
</div>

<h3>颜色</h3>
<div style="display: flex; gap: 1rem; flex-wrap: wrap;">
  <me-checkbox label="主要" color="primary" checked></me-checkbox>
  <me-checkbox label="成功" color="success" checked></me-checkbox>
  <me-checkbox label="警告" color="warning" checked></me-checkbox>
  <me-checkbox label="危险" color="danger" checked></me-checkbox>
</div>

## 组件 API

### 属性

| 属性       | 类型                             | 默认值       | 描述                                   |
| ---------- | -------------------------------- | ------------ | -------------------------------------- |
| `checked`  | `boolean`                        | `false`      | 复选框的当前状态。与 `value` 同步。    |
| `value`    | `boolean`                        | `false`      | `checked` 的别名（继承自 BaseInput）。 |
| `label`    | `string`                         | `''`         | 显示在复选框旁边的文本。               |
| `disabled` | `boolean`                        | `false`      | 禁用交互并降低不透明度。               |
| `required` | `boolean`                        | `false`      | 将字段标记为表单必填项。               |
| `size`     | `'small' \| 'medium' \| 'large'` | `'medium'`   | **新增：** 控制控件和文本的大小。      |
| `variant`  | `'outlined' \| 'card'`           | `'outlined'` | **新增：** 更改容器的视觉样式。        |
| `name`     | `string`                         | `''`         | 表单提交的标识符。                     |

### Shadow Parts (用于高级 CSS)

使用 `::part(name)` 在不使用变量的情况下设置内部元素的样式。

| Part            | 描述                         |
| --------------- | ---------------------------- |
| `wrapper`       | 组件的主容器。               |
| `container`     | 包裹输入框和文本的 `label`。 |
| `control`       | 视觉方块（“伪”复选框）。     |
| `icon`          | 控件内的 SVG 勾选图标。      |
| `label`         | 标签的文本元素。             |
| `error-message` | 错误消息容器。               |

### 事件

| 事件        | 详情 (`e.detail`)              | 描述                                   |
| ----------- | ------------------------------ | -------------------------------------- |
| `ui:change` | `{ name, value, isValid ... }` | 统一的 Melser 系统事件。在更改时触发。 |
| `change`    | `Event`                        | 标准原生事件。                         |

---

## 定制指南

### 1. 使用尺寸

无需使用 CSS 来改变尺寸，使用 `size` 属性即可。

```html
<me-checkbox size="small" label="小"></me-checkbox>

<me-checkbox size="medium" label="普通"></me-checkbox>

<me-checkbox size="large" label="大"></me-checkbox>
```

### 2. 使用变体

组件“开箱即用”地包含替代样式。

**卡片变体：** 将复选框转变为可选择的卡片。

```html
<me-checkbox variant="card" label="高级选项（包含所有内容）" name="plan">
</me-checkbox>
```

### 3. 通过 CSS 定制 (变量)

组件继承全局颜色，但您可以使用 `base-input-*` 变量在局部覆盖它们。

```css
/* 在您的全局样式表或父组件中 */
.my-custom-checkbox {
  /* 选中时的背景颜色 */
  --base-input-control-bg-checked: #ff4081;
  /* 非活动边框颜色 */
  --base-input-control-border-color: #b0bec5;
  /* 边框半径（使其变圆） */
  --base-input-control-radius: 50%;
}
```

```html
<me-checkbox
  class="my-custom-checkbox"
  label="粉色圆形复选框"
  checked
></me-checkbox>
```

### 4. 精细定制 (Shadow Parts)

对于变量无法覆盖的更改，请使用 `::part`。

```css
/* 示例：使标签加粗并倾斜 */
me-checkbox::part(label) {
  font-weight: 800;
  font-style: italic;
  color: #333;
}

/* 示例：仅在此状态下更改勾选图标颜色 */
me-checkbox[checked]::part(icon) {
  fill: #fff; /* 确保对比度 */
}

/* 示例：将文本移动到框的左侧（反转） */
me-checkbox::part(container) {
  flex-direction: row-reverse;
  justify-content: flex-end;
}
```

---

## 表单集成

组件发出事件并验证其内部状态。

```html
<me-playground-form
  id="checkbox-playground"
  schema-name="checkbox"
  title="注册"
  description="条款和条件验证。"
>
  <me-checkbox name="terms" label="我接受条款 *" required> </me-checkbox>
</me-playground-form>
```

## 故障排除

**打印时未应用样式 (打印样式)：**
浏览器有时会在打印时移除 `background-color`。

```css
@media print {
  me-checkbox::part(control) {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
```

**在长段落中复选框未与文本对齐：**
默认情况下，复选框垂直居中 (`align-items: center`)。如果您有多行文本并希望复选框位于顶部：

```css
me-checkbox::part(container) {
  align-items: flex-start; /* 顶部对齐 */
}
me-checkbox::part(control) {
  margin-top: 2px; /* 微小的视觉调整 */
}
```

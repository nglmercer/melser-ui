---
title: MelserColorPicker
---

# MelserColorPicker

**MelserColorPicker** 是一个专为十六进制颜色选择而设计的输入组件。它结合了原生视觉颜色选择器 (`input type="color"`) 和用于手动输入十六进制代码的文本字段。

## 基本示例

```html
<me-color-picker label="背景颜色" value="#3b82f6"> </me-color-picker>
```

## 交互式演示

<me-color-picker 
  id="demo-basic" 
  label="基本选择器" 
  value="#3b82f6">
</me-color-picker>

<me-color-picker 
  id="demo-sizesm" 
  label="小" 
  value="#3b82f6"
  size="small">
</me-color-picker>

<me-color-picker 
  id="demo-size-lg" 
  label="大" 
  value="#3b82f6"
  size="large">
</me-color-picker>

<me-color-picker 
  id="demo-disabled" 
  label="禁用" 
  value="#ef4444"
  disabled>
</me-color-picker>

<h3>颜色 (状态)</h3>
<div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
  <me-color-picker label="成功" color="success" value="#10b981"></me-color-picker>
  <me-color-picker label="警告" color="warning" value="#f59e0b"></me-color-picker>
  <me-color-picker label="危险" color="danger" value="#ef4444"></me-color-picker>
</div>

## 属性

| 属性           | 类型                                              | 默认值       | 描述                                |
| :------------- | :------------------------------------------------ | :----------- | :---------------------------------- |
| `value`        | `string`                                          | `'#000000'`  | HEX 格式的颜色值 (例如 `#FF0000`)。 |
| `label`        | `string`                                          | `''`         | 可见的字段标签。                    |
| `name`         | `string`                                          | `''`         | 表单标识符。                        |
| `variant`      | `'outlined' \| 'filled' \| 'standard'`            | `'outlined'` | 输入框视觉样式。                    |
| `size`         | `'small' \| 'medium' \| 'large'`                  | `'medium'`   | 组件尺寸。                          |
| `color`        | `'primary' \| 'success' \| 'warning' \| 'danger'` | `'primary'`  | 状态的配色方案。                    |
| `required`     | `boolean`                                         | `false`      | 将字段标记为必填。                  |
| `disabled`     | `boolean`                                         | `false`      | 禁用交互。                          |
| `errorMessage` | `string`                                          | `''`         | 要显示的错误消息。                  |

## 事件

| 事件        | 描述                                                  |
| :---------- | :---------------------------------------------------- |
| `ui:change` | 当用户更改颜色（视觉或文本）且值是有效的 HEX 时触发。 |
| `input`     | 每次文本更改时触发。                                  |
| `change`    | 确认更改时触发。                                      |

## 用法示例

### 设计变体

```html
<div style="display: flex; gap: 1rem;">
  <me-color-picker
    label="轮廓 (Outlined)"
    variant="outlined"
    value="#7c3aed"
  ></me-color-picker>
  <me-color-picker
    label="填充 (Filled)"
    variant="filled"
    value="#db2777"
  ></me-color-picker>
  <me-color-picker
    label="标准 (Standard)"
    variant="standard"
    value="#059669"
  ></me-color-picker>
</div>
```

### 在 JS 中监听更改

```javascript
const picker = document.querySelector("me-color-picker");

picker.addEventListener("ui:change", (e) => {
  const { value, isValid } = e.detail;
  console.log("选中的新颜色:", value);
  document.body.style.setProperty("--main-bg-color", value);
});
```

## 表单集成

### 定制表单

```html
<form id="theme-form">
  <me-color-picker
    label="主色 *"
    name="primary"
    required
    value="#3b82f6"
    error-message="您必须选择一种主色"
  ></me-color-picker>

  <me-color-picker
    label="辅助色"
    name="secondary"
    value="#10b981"
  ></me-color-picker>

  <button type="submit">保存主题</button>
</form>
```

```javascript
document.getElementById("theme-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  console.log(Object.fromEntries(formData));
});
```

## 表单演示

<me-playground-form id="color-playground" schema-name="color-picker" title="主题定制" description="选择您的界面颜色。">
  <div style="margin-bottom: 1.5rem;">
    <me-color-picker 
      label="主色 *"
      name="primaryColor"
      required
      value="#3b82f6">
    </me-color-picker>
  </div>
  
  <div style="margin-bottom: 1.5rem;">
    <me-color-picker 
      label="背景颜色"
      name="backgroundColor"
      value="#ffffff">
    </me-color-picker>
  </div>
</me-playground-form>

## 通过 CSS 定制

### CSS 变量

```css
me-color-picker {
  /* 通用 */
  --me-font-family: "Roboto", sans-serif;

  /* 颜色 */
  --me-primary: #3b82f6;
  --me-error: #ef4444;
  --me-text: #1f2937;
  --me-label-color: #374151;
  --me-border: #d1d5db;
  --me-bg: #ffffff;

  /* 尺寸 */
  --me-radius: 0.5rem;
}
```

## 无障碍性

- **双向同步**：文本输入和颜色选择器针对键盘和鼠标用户保持同步。
- **标签**：始终包含关联的标签。
- **视觉验证**：错误会清晰显示并通过 ARIA 宣布。

---
title: MelserRange
---

# MelserRange

一个可定制的范围组件（滑块），用于选择数值，带有视觉控制和完整的表单支持。

## 基本示例

```html
<me-range min="0" max="100" value="50"> </me-range>
```

## 交互式演示

<me-range 
  id="demo-basic" 
  min="0" 
  max="100" 
  value="50"
  label="基本范围">
</me-range>

<me-range 
  id="demo-steps" 
  min="0" 
  max="10" 
  value="3"
  step="1"
  label="带步长的范围">
</me-range>

<me-range 
  id="demo-disabled" 
  min="0" 
  max="100" 
  value="75"
  disabled
  label="禁用的范围">
</me-range>

## 属性

| 属性        | 类型      | 默认值  | 描述           |
| ----------- | --------- | ------- | -------------- |
| `min`       | `number`  | `0`     | 最小范围值     |
| `max`       | `number`  | `100`   | 最大范围值     |
| `value`     | `number`  | `50`    | 当前值         |
| `step`      | `number`  | `1`     | 值的增量/减量  |
| `disabled`  | `boolean` | `false` | 禁用交互       |
| `name`      | `string`  | `''`    | 表单名称       |
| `label`     | `string`  | `''`    | 范围的可见标签 |
| `showValue` | `boolean` | `true`  | 显示当前值     |

## 事件

| 事件     | 描述                   |
| -------- | ---------------------- |
| `input`  | 当值更改时触发（实时） |
| `change` | 当更改确认时触发       |
| `focus`  | 当组件获得焦点时触发   |
| `blur`   | 当组件失去焦点时触发   |

## 用法示例

### 带标签的范围

```html
<me-range min="0" max="200" value="75" label="月度预算 ($)"> </me-range>
```

### 带步长的范围

```html
<me-range min="0" max="10" value="7" step="1" label="评分 (1-10)"> </me-range>
```

### 价格范围

```html
<me-range
  min="100"
  max="1000"
  value="500"
  step="50"
  show-value
  label="价格范围"
>
</me-range>
```

## 表单集成

### 设置表单

```html
<form id="settings-form">
  <h3>用户设置</h3>

  <me-range name="brightness" min="0" max="100" value="70" label="屏幕亮度">
  </me-range>

  <me-range name="volume" min="0" max="100" value="50" label="音量"> </me-range>

  <button type="submit" variant="primary">保存设置</button>
</form>
```

```javascript
const form = document.getElementById("settings-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    console.log("设置已保存:", data);
    alert("设置保存成功！");
  });
}
```

## 演示

<me-playground-form id="range-playground" schema-name="range" title="音频/视频设置" description="亮度和音量调节。">
  <div style="margin-bottom: 1.5rem;">
    <me-range 
      name="brightness"
      min="0" 
      max="100" 
      value="70"
      label="屏幕亮度">
    </me-range>
  </div>
  
  <div style="margin-bottom: 1.5rem;">
    <me-range 
      name="volume"
      min="0" 
      max="100" 
      value="50"
      label="音量">
    </me-range>
  </div>
</me-playground-form>

## CSS 定制

### CSS 变量

```css
me-range {
  --me-range-height: 6px;
  --me-range-bg: #e5e7eb;
  --me-range-fill: #3b82f6;
  --me-range-thumb: #ffffff;
  --me-range-thumb-border: #3b82f6;
  --me-range-thumb-size: 20px;
  --me-range-focus-color: #2563eb;
  --me-range-disabled-bg: #f3f4f6;
  --me-range-disabled-thumb: #d1d5db;
}
```

### 自定义示例

```html
<style>
  .custom-range {
    --me-range-fill: #10b981;
    --me-range-thumb-border: #10b981;
    --me-range-focus-color: #059669;
  }
</style>

<div class="custom-range" style="margin-bottom: 1rem;">
  <me-range min="0" max="100" value="65" label="自定义范围 (绿色)"> </me-range>
</div>
```

<h3>颜色</h3>
<div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
  <me-range label="成功" color="success" min="0" max="100" value="70"></me-range>
  <me-range label="警告" color="warning" min="0" max="100" value="50"></me-range>
  <me-range label="危险" color="danger" min="0" max="100" value="30"></me-range>
</div>

## 无障碍性

MelserRange 组件包括：

- **键盘导航**：箭头键用于调整值
- **屏幕阅读器支持**：宣布值和限制
- **视觉焦点**：清晰的焦点指示器
- **高对比度**：兼容高对比度模式

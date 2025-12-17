---
title: MelserNumberInput
---

# MelserNumberInput

一个带有增量/减量控件、范围验证和格式化的数字输入组件。

## 基本示例

```html
<me-number-input label="数量" placeholder="输入数字"> </me-number-input>
```

## 交互式演示

<me-number-input 
  id="demo-basic" 
  label="基本数字" 
  placeholder="0"
  value="0">
</me-number-input>

<me-number-input 
  id="demo-range" 
  label="带范围 (1-100)" 
  placeholder="50"
  min="1"
  max="100"
  value="50">
</me-number-input>

<me-number-input 
  id="demo-steps" 
  label="带步长 (0.5)" 
  placeholder="0"
  min="0"
  max="10"
  step="0.5"
  value="2.5">
</me-number-input>

<me-number-input 
  id="demo-decimals" 
  label="小数 (最多 2 位)" 
  placeholder="0.00"
  step="0.01"
  min="0"
  max="2.00">
</me-number-input>

<me-number-input 
  id="demo-disabled" 
  label="禁用" 
  value="100"
  disabled>
</me-number-input>

<me-number-input 
  id="demo-negative" 
  label="负数" 
  min="-50"
  max="50"
  step="5"
  value="-10">
</me-number-input>

## 属性

| 属性             | 类型      | 默认值      | 描述                 |
| ---------------- | --------- | ----------- | -------------------- |
| `min`            | `number`  | `undefined` | 允许的最小值         |
| `max`            | `number`  | `undefined` | 允许的最大值         |
| `step`           | `number`  | `1`         | 增量/减量步长        |
| `precision`      | `number`  | `undefined` | 显示的小数位数       |
| `show-controls`  | `boolean` | `true`      | 显示 + 和 - 按钮     |
| `format-on-blur` | `boolean` | `false`     | 失去焦点时格式化     |
| `locale`         | `string`  | `'en-US'`   | 用于格式化的区域设置 |
| `label`          | `string`  | `''`        | 可见字段标签         |
| `placeholder`    | `string`  | `''`        | 占位符文本           |
| `value`          | `number`  | `0`         | 数字字段值           |
| `disabled`       | `boolean` | `false`     | 禁用交互             |
| `readonly`       | `boolean` | `false`     | 只读                 |
| `required`       | `boolean` | `false`     | 表单必填字段         |

## 事件

| 事件        | 描述             |
| ----------- | ---------------- |
| `input`     | 当值更改时触发   |
| `change`    | 当更改确认时触发 |
| `step-up`   | 当递增时触发     |
| `step-down` | 当递减时触发     |
| `focus`     | 当获得焦点时触发 |
| `blur`      | 当失去焦点时触发 |
| `invalid`   | 当值无效时触发   |

## 用法示例

### 特定范围的输入

```html
<me-number-input
  label="年龄 (岁)"
  min="18"
  max="100"
  placeholder="25"
  hint="仅限 18 岁以上人群"
>
</me-number-input>
```

### 自定义步长的输入

```html
<me-number-input
  label="百分比 (%)"
  min="0"
  max="100"
  step="5"
  value="25"
  show-controls
  format-on-blur
>
</me-number-input>
```

### 精确的小数输入

```html
<me-number-input
  label="价格 (€)"
  min="0"
  step="0.01"
  precision="2"
  placeholder="0.00"
  locale="zh-CN"
  hint="精确到 2 位小数"
>
</me-number-input>
```

### 购物车数量输入

```html
<me-number-input
  label="数量"
  min="1"
  max="99"
  step="1"
  value="1"
  show-controls
  class="cart-quantity"
>
</me-number-input>
```

## 表单集成

### 产品表单

```html
<form id="product-form">
  <me-number-input
    label="价格 (€) *"
    name="price"
    type="number"
    min="0"
    step="0.01"
    precision="2"
    required
    placeholder="0.00"
  >
  </me-number-input>

  <me-number-input
    label="可用库存 *"
    name="stock"
    min="0"
    max="1000"
    required
    value="0"
  >
  </me-number-input>

  <me-number-input
    label="折扣 (%)"
    name="discount"
    min="0"
    max="50"
    step="5"
    value="0"
  >
  </me-number-input>

  <button type="submit" variant="primary">保存产品</button>
</form>
```

```javascript
const form = document.getElementById("product-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const price = parseFloat(
      form.querySelector('[name="price"]')?.value || "0"
    );
    const stock = parseInt(form.querySelector('[name="stock"]')?.value || "0");
    const discount = parseFloat(
      form.querySelector('[name="discount"]')?.value || "0"
    );

    if (price <= 0) {
      alert("Price must be greater than 0");
      return;
    }

    if (stock < 0) {
      alert("Stock cannot be negative");
      return;
    }

    const finalPrice = price * (1 - discount / 100);
    console.log("Product:", { price, stock, discount, finalPrice });
    alert("产品保存成功！");
  });
}
```

## 表单演示

<me-playground-form id="number-input-playground" schema-name="number-input" title="产品计算器" description="带有实时验证的价格计算器。">
  <div style="margin-bottom: 1rem;">
    <me-number-input 
      label="年龄 *"
      name="age"
      min="18"
      max="100"
      required
      placeholder="25">
    </me-number-input>
  </div>
  
  <div style="margin-bottom: 1rem;">
    <me-number-input 
      label="价格 (€) *"
      name="price"
      min="0"
      step="0.01"
      precision="2"
      required
      placeholder="0.00">
    </me-number-input>
  </div>
  
  <div style="margin-bottom: 1rem;">
    <me-number-input 
      label="数量"
      name="quantity"
      min="1"
      max="50"
      value="1">
    </me-number-input>
  </div>
  
  <div style="margin-bottom: 1rem;">
    <me-number-input 
      label="折扣 (%)"
      name="discount"
      min="0"
      max="50"
      step="5"
      value="0">
    </me-number-input>
  </div>
</me-playground-form>

## 通过 CSS 定制

### CSS 变量

```css
me-number-input {
  --me-number-input-width: 120px;
  --me-number-input-height: 40px;
  --me-number-input-padding: 8px 40px 8px 12px;
  --me-number-controls-width: 32px;
  --me-number-controls-bg: #f8f9fa;
  --me-number-controls-hover-bg: #e9ecef;
  --me-number-controls-border: #d1d5db;
  --me-number-controls-border-radius: 0 6px 6px 0;
}
```

## 高级功能

### 自动格式化

```javascript
const numberInput = document.querySelector("me-number-input");
if (numberInput) {
  numberInput.formatOnBlur = true;
  numberInput.locale = "zh-CN";

  numberInput.addEventListener("blur", (e) => {
    // 失去焦点时自动格式化
    console.log("格式化后的值:", e.target.value);
  });
}
```

### 自定义验证

```javascript
const numberInput = document.querySelector("me-number-input");
if (numberInput) {
  numberInput.addEventListener("invalid", (e) => {
    const value = parseFloat(e.target.value);
    const min = parseFloat(e.target.min);
    const max = parseFloat(e.target.max);

    if (isNaN(value)) {
      console.log("⚠️ 值不是数字");
    } else if (value < min) {
      console.log(`⚠️ 值必须大于或等于 ${min}`);
    } else if (value > max) {
      console.log(`⚠️ 值必须小于或等于 ${max}`);
    }
  });
}
```

### 键盘控制

```html
<me-number-input
  label="键盘导航"
  placeholder="使用上下箭头"
  min="0"
  max="100"
  step="1"
></me-number-input>
```

**可用控制：**

- ↑ (向上箭头): 增加值
- ↓ (向下箭头): 减少值
- Page Up: 增加 10
- Page Down: 减少 10
- Home: 跳转至最小值
- End: 跳转至最大值

## 无障碍性

- **无障碍控件**：带有适当 aria-label 的 + 和 - 按钮
- **键盘导航**：箭头键和 Page Up/Down 可用
- **语义验证**：错误由屏幕阅读器宣布
- **焦点管理**：清晰的视觉指示器
- **值公告**：自动宣布值更改

---
title: MelserDualRange
---

# MelserDualRange

一个双范围组件（双滑块），用于选择具有两个滑动控件（最小值和最大值）的数值范围。

## 基本示例

```html
<me-dual-range min="0" max="100" value="30,70"> </me-dual-range>
```

## 交互式演示

<me-dual-range 
  id="demo-basic" 
  min="0" 
  max="100" 
  value="30,70"
  label="基本双范围选择">
</me-dual-range>

<me-dual-range 
  id="demo-steps" 
  min="0" 
  max="50" 
  value="10,40"
  step="5"
  label="带步长的双范围">
</me-dual-range>

<me-dual-range 
  id="demo-disabled" 
  min="0" 
  max="100" 
  value="25,75"
  disabled
  label="禁用的双范围">
</me-dual-range>

## 属性

| 属性         | 类型      | 默认值    | 描述                 |
| :----------- | :-------- | :-------- | :------------------- |
| `min`        | `number`  | `0`       | 最小范围值           |
| `max`        | `number`  | `100`     | 最大范围值           |
| `value`      | `string`  | `'30,70'` | 当前值 (min,max)     |
| `step`       | `number`  | `1`       | 值的增量/减量        |
| `disabled`   | `boolean` | `false`   | 禁用交互             |
| `name`       | `string`  | `''`      | 表单名称             |
| `label`      | `string`  | `''`      | 范围的可见标签       |
| `showValues` | `boolean` | `true`    | 显示当前值           |
| `separator`  | `string`  | `' - '`   | 值之间的分隔符字符串 |

## 事件

| 事件     | 描述                   |
| :------- | :--------------------- |
| `input`  | 当值更改时触发（实时） |
| `change` | 当更改确认时触发       |
| `focus`  | 当组件获得焦点时触发   |
| `blur`   | 当组件失去焦点时触发   |

## 用法示例

### 价格范围

```html
<me-dual-range
  min="100"
  max="1000"
  value="250,750"
  step="50"
  label="价格范围 ($)"
>
</me-dual-range>
```

### 年龄范围

```html
<me-dual-range min="18" max="65" value="25,45" label="年龄范围">
</me-dual-range>
```

### 时间范围

```html
<me-dual-range min="0" max="24" value="9,17" step="0.5" label="工作时间">
</me-dual-range>
```

## 表单集成

### 筛选表单

```html
<form id="filters-form">
  <h3>搜索筛选</h3>

  <me-dual-range
    name="priceRange"
    min="0"
    max="5000"
    value="500,2500"
    step="100"
    label="价格范围 ($)"
  >
  </me-dual-range>

  <me-dual-range
    name="sizeRange"
    min="10"
    max="500"
    value="50,200"
    label="面积 (m²)"
  >
  </me-dual-range>

  <me-dual-range
    name="distanceRange"
    min="0"
    max="100"
    value="0,25"
    step="5"
    label="距离 (km)"
  >
  </me-dual-range>

  <button type="submit" variant="primary">应用筛选</button>
</form>
```

```javascript
const form = document.getElementById("filters-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    console.log("Hooks applied:", data);
    alert("筛选已成功应用！");
  });
}
```

## 演示

<me-playground-form id="dual-range-playground" schema-name="dual-range" title="搜索筛选" description="价格和尺寸范围。">
  <div style="margin-bottom: 1.5rem;">
    <me-dual-range 
      name="priceRange"
      min="0" 
      max="5000" 
      value="500,2500"
      step="100"
      label="价格范围 ($)">
    </me-dual-range>
  </div>
  
  <div style="margin-bottom: 1.5rem;">
    <me-dual-range 
      name="sizeRange"
      min="10" 
      max="500" 
      value="50,200"
      label="面积 (m²)">
    </me-dual-range>
  </div>
  
  <div style="margin-bottom: 1.5rem;">
    <me-dual-range 
      name="distanceRange"
      min="0" 
      max="100" 
      value="0,25"
      step="5"
      label="距离 (km)">
    </me-dual-range>
  </div>
</me-playground-form>

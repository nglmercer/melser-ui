---
title: MelserDatePicker
---

# MelserDatePicker

一个高级日期选择器组件，具有日历、范围验证、本地化和多种格式支持。

## 基本示例

```html
<me-date-picker label="选择日期" placeholder="dd/mm/yyyy"> </me-date-picker>
```

## 交互式演示

<me-date-picker 
  id="demo-basic" 
  label="基本日期" 
  placeholder="选择日期">
</me-date-picker>

<me-date-picker 
  id="demo-min-max" 
  label="带范围 (2020-2030)" 
  min="2020-01-01"
  max="2030-12-31"
  placeholder="2020 到 2030 之间">
</me-date-picker>

<me-date-picker 
  id="demo-range" 
  label="范围选择器" 
  mode="range"
  placeholder="选择范围">
</me-date-picker>

<me-date-picker 
  id="demo-locale" 
  label="法语日期" 
  locale="fr"
  placeholder="选择日期">
</me-date-picker>

<h3>颜色</h3>
<div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
  <me-date-picker label="成功" color="success" placeholder="成功" value="2024-01-01"></me-date-picker>
  <me-date-picker label="警告" color="warning" placeholder="警告" value="2024-01-01"></me-date-picker>
  <me-date-picker label="危险" color="danger" placeholder="危险" value="2024-01-01"></me-date-picker>
</div>

## 属性

| 属性                | 类型                                              | 默认值         | 描述                          |
| :------------------ | :------------------------------------------------ | :------------- | :---------------------------- |
| `value`             | `string`                                          | `''`           | 选中的日期 (YYYY-MM-DD)       |
| `min`               | `string`                                          | `''`           | 允许的最小日期                |
| `max`               | `string`                                          | `''`           | 允许的最大日期                |
| `disabled`          | `boolean`                                         | `false`        | 禁用交互                      |
| `required`          | `boolean`                                         | `false`        | 表单必填字段                  |
| `readonly`          | `boolean`                                         | `false`        | 只读                          |
| `placeholder`       | `string`                                          | `''`           | 占位符文本                    |
| `format`            | `string`                                          | `'YYYY-MM-DD'` | 日期格式                      |
| `locale`            | `string`                                          | `'en'`         | 日历区域设置                  |
| `mode`              | `'single' \| 'range' \| 'multiple'`               | `'single'`     | 选择模式                      |
| `view`              | `'day' \| 'month' \| 'year'`                      | `'day'`        | 初始视图                      |
| `color`             | `'primary' \| 'success' \| 'warning' \| 'danger'` | `'primary'`    | 状态的配色方案。              |
| `first-day-of-week` | `number`                                          | `0`            | 每周的第一天 (0=周日, 1=周一) |
| `show-today`        | `boolean`                                         | `true`         | 显示“今天”按钮                |
| `show-clear`        | `boolean`                                         | `true`         | 显示“清除”按钮                |
| `label`             | `string`                                          | `''`           | 可见的字段标签                |

## 事件

| 事件              | 描述                       |
| :---------------- | :------------------------- |
| `change`          | 日期更改时触发             |
| `focus`           | 获得焦点时触发             |
| `blur`            | 失去焦点时触发             |
| `range-change`    | 范围更改时触发（范围模式） |
| `multiple-change` | 多个日期更改时触发         |
| `view-change`     | 视图更改时触发             |

## 用法示例

### 日期范围选择器

```html
<me-date-picker
  label="旅行期间"
  name="travelPeriod"
  mode="range"
  placeholder="从 - 到"
  show-clear
  hint="选择开始和结束"
>
</me-date-picker>
```

### 带约束的选择器

```html
<me-date-picker
  label="预约日期"
  name="appointmentDate"
  required
  min="today"
  max="2024-12-31"
  locale="zh-CN"
  first-day-of-week="1"
>
</me-date-picker>
```

### 高级本地化配置

```javascript
const picker = document.querySelector("me-date-picker");
picker.locale = "zh-CN";
picker.firstDayOfWeek = 1;
picker.format = "DD/MM/YYYY";
picker.addEventListener("view-change", (e) => {
  console.log("视图更改为:", e.detail.view);
});
```

## 表单集成

```html
<form id="booking-form">
  <me-date-picker
    label="入住 *"
    name="checkIn"
    required
    min="today"
  ></me-date-picker>

  <me-date-picker label="退房 *" name="checkOut" required></me-date-picker>

  <button type="submit">预订</button>
</form>
```

## 表单演示

<me-playground-form id="date-picker-playground" schema-name="date-picker" title="活动策划" description="带有范围和验证的日期管理。">
  <div style="margin-bottom: 1rem;">
    <me-date-picker 
      label="活动日期 *"
      name="eventDate"
      required
      min="today"
      placeholder="选择日期"
      locale="zh-CN">
    </me-date-picker>
  </div>
  
  <div style="margin-bottom: 1rem;">
    <me-date-picker 
      label="报名范围"
      name="enrollmentRange"
      mode="range"
      placeholder="从 - 到"
      show-clear>
    </me-date-picker>
  </div>
</me-playground-form>

## 通过 CSS 定制

### CSS 变量

```css
me-date-picker {
  --me-date-picker-width: 100%;
  --me-date-picker-height: 40px;
  --me-date-picker-padding: 8px 12px;
  --me-date-picker-border: 1px solid #d1d5db;
  --me-date-picker-border-radius: 6px;
  --me-date-picker-focus-border: #3b82f6;
  --me-date-picker-calendar-bg: #ffffff;
  --me-date-picker-calendar-border: #e5e7eb;
  --me-date-picker-day-hover-bg: #f3f4f6;
  --me-date-picker-day-selected-bg: #3b82f6;
  --me-date-picker-day-selected-color: #ffffff;
  --me-date-picker-today-border: #3b82f6;
  --me-date-picker-disabled-color: #9ca3af;
}
```

## 无障碍性

- **键盘导航**：箭头键、Tab 键、回车键、Esc 键。
- **屏幕阅读器公告**：日期和更改均有正确标签。
- **ARIA**：完全标签化。
- **对比度**：颜色已针对可读性进行优化。

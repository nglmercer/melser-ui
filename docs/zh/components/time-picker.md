---
title: MelserTimePicker
---

# MelserTimePicker

一个高级时间选择器组件，支持 12h/24h 格式、自定义间隔和时间验证。

## 基本示例

```html
<me-time-picker label="选择时间" placeholder="HH:MM"> </me-time-picker>
```

## 交互式演示

<me-time-picker 
  id="demo-basic" 
  label="基本时间" 
  placeholder="选择时间">
</me-time-picker>

<me-time-picker 
  id="demo-12h" 
  label="12 小时制" 
  format="12h"
  placeholder="12:00 PM">
</me-time-picker>

<me-time-picker 
  id="demo-24h" 
  label="24 小时制" 
  format="24h"
  placeholder="14:30">
</me-time-picker>

<me-time-picker 
  id="demo-steps" 
  label="15 分钟间隔" 
  step="900"
  placeholder="15 分钟间隔">
</me-time-picker>

<me-time-picker 
  id="demo-min-max" 
  label="营业时间 (9-17)" 
  min="09:00"
  max="17:00"
  placeholder="上午 9:00 到下午 5:00 之间">
</me-time-picker>

<me-time-picker 
  id="demo-value" 
  label="带有初始时间" 
  value="14:30"
  placeholder="预定义时间">
</me-time-picker>

<me-time-picker 
  id="demo-disabled" 
  label="禁用" 
  value="09:00"
  disabled>
</me-time-picker>

<me-time-picker 
  id="demo-seconds" 
  label="带有秒" 
  show-seconds
  step="1"
  placeholder="HH:MM:SS">
</me-time-picker>

<h3>颜色</h3>
<div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
  <me-time-picker label="成功" color="success" value="09:00"></me-time-picker>
  <me-time-picker label="警告" color="warning" value="12:00"></me-time-picker>
  <me-time-picker label="危险" color="danger" value="15:00"></me-time-picker>
</div>

## 属性

| 属性           | 类型                                              | 默认值      | 描述                              |
| :------------- | :------------------------------------------------ | :---------- | :-------------------------------- |
| `value`        | `string`                                          | `''`        | 选定的时间 (HH:MM:SS)             |
| `min`          | `string`                                          | `''`        | 允许的最小时间                    |
| `max`          | `string`                                          | `''`        | 允许的最大时间                    |
| `format`       | `string`                                          | `'24h'`     | 时间格式 (12h, 24h)               |
| `step`         | `number`                                          | `60`        | 间隔秒数 (60=1 分钟, 900=15 分钟) |
| `show-seconds` | `boolean`                                         | `false`     | 显示秒数选择器                    |
| `disabled`     | `boolean`                                         | `false`     | 禁用交互                          |
| `readonly`     | `boolean`                                         | `false`     | 只读                              |
| `required`     | `boolean`                                         | `false`     | 表单必填字段                      |
| `placeholder`  | `string`                                          | `''`        | 占位符文本                        |
| `label`        | `string`                                          | `''`        | 可见字段标签                      |
| `color`        | `'primary' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | 状态的配色方案。                  |

## 事件

| 事件               | 描述                 |
| :----------------- | :------------------- |
| `change`           | 当时间更改时触发     |
| `focus`            | 当获得焦点时触发     |
| `blur`             | 当失去焦点时触发     |
| `validation-error` | 当出现验证错误时触发 |

## 用法示例

### 简单时间选择器

```html
<me-time-picker
  label="预约时间"
  name="appointmentTime"
  required
  placeholder="选择时间"
>
</me-time-picker>
```

### 带有时间限制的时间选择器

```html
<me-time-picker
  label="送货时间"
  name="deliveryTime"
  min="08:00"
  max="22:00"
  step="1800"
  placeholder="上午 8:00 到晚上 10:00 之间"
  hint="每 30 分钟可送货"
>
</me-time-picker>
```

### 营业时间选择器

```html
<me-time-picker
  label="开始时间 *"
  name="workStart"
  required
  min="06:00"
  max="12:00"
  step="900"
  placeholder="开始时间 (6:00 AM - 12:00 PM)"
  format="12h"
>
</me-time-picker>
```

### 12 小时制选择器

```html
<me-time-picker
  label="会议时间"
  name="meetingTime"
  format="12h"
  show-seconds
  step="300"
  placeholder="例如: 2:30:45 PM"
>
</me-time-picker>
```

## 表单集成

### 预约安排表单

```html
<form id="appointment-form">
  <div
    style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;"
  >
    <h4>🗓️ 预约安排</h4>

    <me-time-picker
      label="预约时间 *"
      name="time"
      required
      min="09:00"
      max="17:00"
      step="1800"
      placeholder="上午 9:00 到下午 5:00 之间"
      format="12h"
      id="form-time"
    >
    </me-time-picker>

    <me-time-picker
      label="预计时长"
      name="duration"
      value="01:00"
      step="900"
      placeholder="预约时长"
      format="12h"
      id="form-duration"
    >
    </me-time-picker>
  </div>

  <button type="submit">安排预约</button>
</form>
```

```javascript
document.getElementById("appointment-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  console.log("Time:", formData.get("time"));
});
```

## 表单演示

<me-playground-form id="time-picker-playground" schema-name="time-picker" title="日程配置" description="轮班和提醒定义。">
  <div style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
  <h4>⏰ 日程配置</h4>
    
  <me-time-picker 
    label="开始时间 *"
    name="startTime"
    required
    placeholder="开始时间"
    format="12h">
  </me-time-picker>
  
  <me-time-picker 
    label="结束时间 *"
    name="endTime"
    required
    placeholder="结束时间"
    format="12h"
    min="09:00">
  </me-time-picker>
  
  <me-time-picker 
    label="休息时间"
    name="breakTime"
    step="1800"
    placeholder="休息时长"
    format="12h">
  </me-time-picker>
  
  <me-time-picker 
    label="自动提醒"
    name="reminder"
    step="300"
    placeholder="何时提醒"
    format="24h"
    show-seconds>
  </me-time-picker>
  </div>
</me-playground-form>

## 通过 CSS 定制

### CSS 变量

```css
me-time-picker {
  --me-time-picker-width: 100%;
  --me-time-picker-height: 40px;
  --me-time-picker-padding: 8px 12px;
  --me-time-picker-border: 1px solid #d1d5db;
  --me-time-picker-border-radius: 6px;
  --me-time-picker-focus-border: #3b82f6;
  --me-time-picker-calendar-bg: #ffffff;
  --me-time-picker-calendar-border: #e5e7eb;
  --me-time-picker-hour-hover-bg: #f3f4f6;
  --me-time-picker-hour-selected-bg: #3b82f6;
  --me-time-picker-hour-selected-color: #ffffff;
  --me-time-picker-disabled-color: #9ca3af;
}
```

### 定制示例

```html
<style>
  .custom-time-picker {
    --me-time-picker-focus-border: #10b981;
    --me-time-picker-hour-selected-bg: #10b981;
  }

  .compact-time-picker {
    --me-time-picker-height: 32px;
    --me-time-picker-padding: 4px 8px;
    --me-time-picker-border-radius: 4px;
  }

  .dark-time-picker {
    --me-time-picker-border: 1px solid #374151;
    --me-time-picker-focus-border: #8b5cf6;
    --me-time-picker-calendar-bg: #1f2937;
    --me-time-picker-calendar-border: #374151;
    --me-time-picker-hour-hover-bg: #374151;
    --me-time-picker-hour-selected-bg: #8b5cf6;
    --me-time-picker-hour-selected-color: #f9fafb;
  }
</style>

<div class="custom-time-picker" style="margin-bottom: 1rem;">
  <me-time-picker
    label="自定义时间选择器"
    value="14:30"
    placeholder="自定义绿色"
  >
  </me-time-picker>
</div>

<div class="compact-time-picker" style="margin-bottom: 1rem;">
  <me-time-picker label="紧凑时间选择器" value="09:00" placeholder="更小">
  </me-time-picker>
</div>

<div class="dark-time-picker">
  <me-time-picker
    label="深色主题时间选择器"
    value="15:45"
    show-seconds
    placeholder="用于深色界面"
  >
  </me-time-picker>
</div>
```

## 高级功能

### 自定义格式配置

```javascript
const picker = document.querySelector("me-time-picker");
if (picker) {
  // 配置 12 小时制，带 AM/PM
  picker.format = "12h";
  picker.showSeconds = true;
  picker.step = 1; // 显示每一秒
}
```

## 无障碍性

- **键盘导航**：箭头键、Tab、Enter、Space
- **屏幕阅读器公告**：时间和更改会被宣布
- **ARIA 标签**：完全标记以供无障碍访问
- **焦点管理**：逻辑选择器导航
- **禁用状态**：正确宣布

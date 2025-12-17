---
title: MelserTimePicker
---

# MelserTimePicker

An advanced time picker component with 12h/24h format, customizable intervals, and time validation.

## Basic Example

```html
<me-time-picker label="Select a time" placeholder="HH:MM"> </me-time-picker>
```

## Interactive Demo

<me-time-picker 
  id="demo-basic" 
  label="Basic Time" 
  placeholder="Select a time">
</me-time-picker>

<me-time-picker 
  id="demo-12h" 
  label="12-hour Format" 
  format="12h"
  placeholder="12:00 PM">
</me-time-picker>

<me-time-picker 
  id="demo-24h" 
  label="24-hour Format" 
  format="24h"
  placeholder="14:30">
</me-time-picker>

<me-time-picker 
  id="demo-steps" 
  label="15 min Intervals" 
  step="900"
  placeholder="15 minute intervals">
</me-time-picker>

<me-time-picker 
  id="demo-min-max" 
  label="Business Hours (9-17)" 
  min="09:00"
  max="17:00"
  placeholder="Between 9:00 AM and 5:00 PM">
</me-time-picker>

<me-time-picker 
  id="demo-value" 
  label="With Initial Time" 
  value="14:30"
  placeholder="Predefined time">
</me-time-picker>

<me-time-picker 
  id="demo-disabled" 
  label="Disabled" 
  value="09:00"
  disabled>
</me-time-picker>

<me-time-picker 
  id="demo-seconds" 
  label="With seconds" 
  show-seconds
  step="1"
  placeholder="HH:MM:SS">
</me-time-picker>

<h3>Colors</h3>
<div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
  <me-time-picker label="Success" color="success" value="09:00"></me-time-picker>
  <me-time-picker label="Warning" color="warning" value="12:00"></me-time-picker>
  <me-time-picker label="Danger" color="danger" value="15:00"></me-time-picker>
</div>

## Properties

| Property       | Type                                              | Default     | Description                              |
| :------------- | :------------------------------------------------ | :---------- | :--------------------------------------- |
| `value`        | `string`                                          | `''`        | Selected time (HH:MM:SS)                 |
| `min`          | `string`                                          | `''`        | Minimum allowed time                     |
| `max`          | `string`                                          | `''`        | Maximum allowed time                     |
| `format`       | `string`                                          | `'24h'`     | Time format (12h, 24h)                   |
| `step`         | `number`                                          | `60`        | Interval in seconds (60=1min, 900=15min) |
| `show-seconds` | `boolean`                                         | `false`     | Shows seconds selector                   |
| `disabled`     | `boolean`                                         | `false`     | Disables interaction                     |
| `readonly`     | `boolean`                                         | `false`     | Read-only                                |
| `required`     | `boolean`                                         | `false`     | Required field in forms                  |
| `placeholder`  | `string`                                          | `''`        | Placeholder text                         |
| `label`        | `string`                                          | `''`        | Visible field label                      |
| `color`        | `'primary' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | Color scheme of the state.               |

## Events

| Event              | Description                  |
| :----------------- | :--------------------------- |
| `change`           | Fires when time changes      |
| `focus`            | Fires when focus is gained   |
| `blur`             | Fires when focus is lost     |
| `validation-error` | Fires with validation errors |

## Usage Examples

### Simple Time Picker

```html
<me-time-picker
  label="Appointment Time"
  name="appointmentTime"
  required
  placeholder="Select time"
>
</me-time-picker>
```

### Time Picker with Schedule Constraints

```html
<me-time-picker
  label="Delivery Time"
  name="deliveryTime"
  min="08:00"
  max="22:00"
  step="1800"
  placeholder="Between 8:00 AM and 10:00 PM"
  hint="Deliveries available every 30 minutes"
>
</me-time-picker>
```

### Business Hours Picker

```html
<me-time-picker
  label="Start Time *"
  name="workStart"
  required
  min="06:00"
  max="12:00"
  step="900"
  placeholder="Start time (6:00 AM - 12:00 PM)"
  format="12h"
>
</me-time-picker>
```

### 12h Format Picker

```html
<me-time-picker
  label="Meeting Time"
  name="meetingTime"
  format="12h"
  show-seconds
  step="300"
  placeholder="Ex: 2:30:45 PM"
>
</me-time-picker>
```

## Form Integration

### Appointment Scheduling Form

```html
<form id="appointment-form">
  <div
    style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;"
  >
    <h4>🗓️ Appointment Scheduling</h4>

    <me-time-picker
      label="Appointment Time *"
      name="time"
      required
      min="09:00"
      max="17:00"
      step="1800"
      placeholder="Between 9:00 AM and 5:00 PM"
      format="12h"
      id="form-time"
    >
    </me-time-picker>

    <me-time-picker
      label="Estimated Duration"
      name="duration"
      value="01:00"
      step="900"
      placeholder="Appointment duration"
      format="12h"
      id="form-duration"
    >
    </me-time-picker>
  </div>

  <button type="submit">Schedule Appointment</button>
</form>
```

```javascript
document.getElementById("appointment-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  console.log("Time:", formData.get("time"));
});
```

## Form Demo

<me-playground-form id="time-picker-playground" schema-name="time-picker" title="Schedule Configuration" description="Shift and reminder definition.">
  <div style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
  <h4>⏰ Schedule Config</h4>
    
  <me-time-picker 
    label="Start Time *"
    name="startTime"
    required
    placeholder="Start time"
    format="12h">
  </me-time-picker>
  
  <me-time-picker 
    label="End Time *"
    name="endTime"
    required
    placeholder="End time"
    format="12h"
    min="09:00">
  </me-time-picker>
  
  <me-time-picker 
    label="Break Time"
    name="breakTime"
    step="1800"
    placeholder="Break duration"
    format="12h">
  </me-time-picker>
  
  <me-time-picker 
    label="Auto Reminder"
    name="reminder"
    step="300"
    placeholder="When to remind"
    format="24h"
    show-seconds>
  </me-time-picker>
  </div>
</me-playground-form>

## Customization with CSS

### CSS Variables

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

### Customization Examples

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
    label="Custom Time Picker"
    value="14:30"
    placeholder="Custom Green">
  </me-time-picker>
</div>

<div class="compact-time-picker" style="margin-bottom: 1rem;">
  <me-time-picker 
    label="Compact Time Picker"
    value="09:00"
    placeholder="Smaller">
  </me-time-picker>
</div>

<div class="dark-time-picker">
  <me-time-picker 
    label="Dark Theme Time Picker"
    value="15:45"
    show-seconds
    placeholder="For dark interfaces">
  </me-time-picker>
</div>

## Advanced Features

### Custom Format Configuration

```javascript
const picker = document.querySelector("me-time-picker");
if (picker) {
  // Configure 12h format with AM/PM
  picker.format = "12h";
  picker.showSeconds = true;
  picker.step = 1; // Show every second
}
```

## Accessibility

- **Keyboard Navigation**: Arrows, Tab, Enter, Space
- **Screen Reader Announcements**: Times and changes announced
- **ARIA labels**: Fully labeled for accessibility
- **Focus management**: Logical picker navigation
- **Disabled States**: Correctly announced

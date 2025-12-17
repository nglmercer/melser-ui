---
title: MelserDatePicker
---

# MelserDatePicker

An advanced date picker component with calendar, range validation, localization, and multiple formats.

## Basic Example

```html
<me-date-picker label="Select a date" placeholder="dd/mm/yyyy">
</me-date-picker>
```

## Interactive Demo

<me-date-picker 
  id="demo-basic" 
  label="Basic Date" 
  placeholder="Select a date">
</me-date-picker>

<me-date-picker 
  id="demo-min-max" 
  label="With range (2020-2030)" 
  min="2020-01-01"
  max="2030-12-31"
  placeholder="Between 2020 and 2030">
</me-date-picker>

<me-date-picker 
  id="demo-range" 
  label="Range Selector" 
  mode="range"
  placeholder="Select a range">
</me-date-picker>

<me-date-picker 
  id="demo-locale" 
  label="French Date" 
  locale="fr"
  placeholder="Select a date">
</me-date-picker>

<h3>Colors</h3>
<div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
  <me-date-picker label="Success" color="success" placeholder="Success" value="2024-01-01"></me-date-picker>
  <me-date-picker label="Warning" color="warning" placeholder="Warning" value="2024-01-01"></me-date-picker>
  <me-date-picker label="Danger" color="danger" placeholder="Danger" value="2024-01-01"></me-date-picker>
</div>

## Properties

| Property            | Type                                              | Default        | Description                                |
| :------------------ | :------------------------------------------------ | :------------- | :----------------------------------------- |
| `value`             | `string`                                          | `''`           | Selected date (YYYY-MM-DD)                 |
| `min`               | `string`                                          | `''`           | Minimum allowed date                       |
| `max`               | `string`                                          | `''`           | Maximum allowed date                       |
| `disabled`          | `boolean`                                         | `false`        | Disables interaction                       |
| `required`          | `boolean`                                         | `false`        | Required field in forms                    |
| `readonly`          | `boolean`                                         | `false`        | Read-only                                  |
| `placeholder`       | `string`                                          | `''`           | Placeholder text                           |
| `format`            | `string`                                          | `'YYYY-MM-DD'` | Date format                                |
| `locale`            | `string`                                          | `'en'`         | Calendar locale                            |
| `mode`              | `'single' \| 'range' \| 'multiple'`               | `'single'`     | Selection mode                             |
| `view`              | `'day' \| 'month' \| 'year'`                      | `'day'`        | Initial view                               |
| `color`             | `'primary' \| 'success' \| 'warning' \| 'danger'` | `'primary'`    | Color scheme of the state.                 |
| `first-day-of-week` | `number`                                          | `0`            | First day of the week (0=Sunday, 1=Monday) |
| `show-today`        | `boolean`                                         | `true`         | Shows "Today" button                       |
| `show-clear`        | `boolean`                                         | `true`         | Shows "Clear" button                       |
| `label`             | `string`                                          | `''`           | Visible field label                        |

## Events

| Event             | Description                           |
| :---------------- | :------------------------------------ |
| `change`          | Fires when date changes               |
| `focus`           | Fires when focus is gained            |
| `blur`            | Fires when focus is lost              |
| `range-change`    | Fires when range changes (range mode) |
| `multiple-change` | Fires when multiple dates change      |
| `view-change`     | Fires when view changes               |

## Usage Examples

### Date Range Selector

```html
<me-date-picker
  label="Travel Period"
  name="travelPeriod"
  mode="range"
  placeholder="From - To"
  show-clear
  hint="Select start and end"
>
</me-date-picker>
```

### Selector with Constraints

```html
<me-date-picker
  label="Appointment Date"
  name="appointmentDate"
  required
  min="today"
  max="2024-12-31"
  locale="es"
  first-day-of-week="1"
>
</me-date-picker>
```

### Advanced Localization Config

```javascript
const picker = document.querySelector("me-date-picker");
picker.locale = "es";
picker.firstDayOfWeek = 1;
picker.format = "DD/MM/YYYY";
picker.addEventListener("view-change", (e) => {
  console.log("View changed to:", e.detail.view);
});
```

## Form Integration

```html
<form id="booking-form">
  <me-date-picker
    label="Check-in *"
    name="checkIn"
    required
    min="today"
  ></me-date-picker>

  <me-date-picker label="Check-out *" name="checkOut" required></me-date-picker>

  <button type="submit">Book</button>
</form>
```

## Form Demo

<me-playground-form id="date-picker-playground" schema-name="date-picker" title="Event Planning" description="Date management with ranges and validation.">
  <div style="margin-bottom: 1rem;">
    <me-date-picker 
      label="Event Date *"
      name="eventDate"
      required
      min="today"
      placeholder="Select date"
      locale="en">
    </me-date-picker>
  </div>
  
  <div style="margin-bottom: 1rem;">
    <me-date-picker 
      label="Enrollment Range"
      name="enrollmentRange"
      mode="range"
      placeholder="From - To"
      show-clear>
    </me-date-picker>
  </div>
</me-playground-form>

## Customization with CSS

### CSS Variables

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

## Accessibility

- **Keyboard Navigation**: Arrows, Tab, Enter, Escape.
- **Screen Reader Announcements**: Dates and changes correctly labeled.
- **ARIA**: Fully labeled.
- **Contrast**: Colors optimized for readability.

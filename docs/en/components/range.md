---
title: MelserRange
---

# MelserRange

A customizable range component (slider) for selecting numeric values with visual controls and full form support.

## Basic Example

```html
<me-range min="0" max="100" value="50"> </me-range>
```

## Interactive Demo

<me-range 
  id="demo-basic" 
  min="0" 
  max="100" 
  value="50"
  label="Basic range">
</me-range>

<me-range 
  id="demo-steps" 
  min="0" 
  max="10" 
  value="3"
  step="1"
  label="Range with steps">
</me-range>

<me-range 
  id="demo-disabled" 
  min="0" 
  max="100" 
  value="75"
  disabled
  label="Disabled range">
</me-range>

## Properties

| Property    | Type      | Default | Description                    |
| ----------- | --------- | ------- | ------------------------------ |
| `min`       | `number`  | `0`     | Minimum range value            |
| `max`       | `number`  | `100`   | Maximum range value            |
| `value`     | `number`  | `50`    | Current value                  |
| `step`      | `number`  | `1`     | Increment/decrement for values |
| `disabled`  | `boolean` | `false` | Disables interaction           |
| `name`      | `string`  | `''`    | Name for forms                 |
| `label`     | `string`  | `''`    | Visible label for the range    |
| `showValue` | `boolean` | `true`  | Shows the current value        |

## Events

| Event    | Description                          |
| -------- | ------------------------------------ |
| `input`  | Fires when value changes (real-time) |
| `change` | Fires when change is confirmed       |
| `focus`  | Fires when the component gains focus |
| `blur`   | Fires when the component loses focus |

## Usage Examples

### Range with Label

```html
<me-range min="0" max="200" value="75" label="Monthly Budget ($)"> </me-range>
```

### Range with Steps

```html
<me-range min="0" max="10" value="7" step="1" label="Rating from 1 to 10">
</me-range>
```

### Price Range

```html
<me-range
  min="100"
  max="1000"
  value="500"
  step="50"
  show-value
  label="Price Range"
>
</me-range>
```

## Form Integration

### Settings Form

```html
<form id="settings-form">
  <h3>User Settings</h3>

  <me-range
    name="brightness"
    min="0"
    max="100"
    value="70"
    label="Screen Brightness"
  >
  </me-range>

  <me-range name="volume" min="0" max="100" value="50" label="Volume">
  </me-range>

  <button type="submit" variant="primary">Save Settings</button>
</form>
```

```javascript
const form = document.getElementById("settings-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    console.log("Settings saved:", data);
    alert("Settings saved successfully!");
  });
}
```

## Playground Demo

<me-playground-form id="range-playground" schema-name="range" title="Audio/Video Settings" description="Brightness and volume adjustments.">
  <div style="margin-bottom: 1.5rem;">
    <me-range 
      name="brightness"
      min="0" 
      max="100" 
      value="70"
      label="Screen Brightness">
    </me-range>
  </div>
  
  <div style="margin-bottom: 1.5rem;">
    <me-range 
      name="volume"
      min="0" 
      max="100" 
      value="50"
      label="Volume">
    </me-range>
  </div>
</me-playground-form>

## CSS Customization

### CSS Variables

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

### Custom Example

<style>
  .custom-range {
    --me-range-fill: #10b981;
    --me-range-thumb-border: #10b981;
    --me-range-focus-color: #059669;
  }
  
  .large-range {
    --me-range-height: 8px;
    --me-range-thumb-size: 24px;
  }
</style>

<div class="custom-range" style="margin-bottom: 1rem;">
  <me-range 
    min="0" 
    max="100" 
    value="65"
    label="Custom range (green)">
  </me-range>
</div>

<div class="large-range">
  <me-range 
    min="0" 
    max="100" 
    value="40"
    label="Large range">
  </me-range>
</div>

<h3>Colors</h3>
<div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
  <me-range label="Success" color="success" min="0" max="100" value="70"></me-range>
  <me-range label="Warning" color="warning" min="0" max="100" value="50"></me-range>
  <me-range label="Danger" color="danger" min="0" max="100" value="30"></me-range>
</div>

## Accessibility

The MelserRange component includes:

- **Keyboard navigation**: Arrow keys to adjust values
- **Screen reader support**: Announces values and limits
- **Visible focus**: Clear focus indicator
- **High contrast**: Compatible with high contrast mode

## Best Practices

1. **Always include a label** to describe the purpose.
2. **Use appropriate steps** for the data type.
3. **Show the current value** when useful.
4. **Use appropriate ranges** for the application.
5. **Validate values** before submitting forms.

## Troubleshooting

### Range does not respond to events

```javascript
// Verify the component is imported
import "melser-ui/components/me-range.js";

// Verify it is not disabled
console.log(range.disabled); // Should be false
```

### Value not submitted in form

```html
<!-- Make sure to include the name attribute -->
<me-range name="volume" min="0" max="100" value="50"> </me-range>
```

### Accessibility issues

```html
<!-- For complex ranges, use aria-label -->
<me-range
  aria-label="Temperature in degrees Celsius"
  min="-20"
  max="50"
  value="22"
>
</me-range>
```

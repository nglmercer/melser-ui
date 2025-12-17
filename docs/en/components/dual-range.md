---
title: MelserDualRange
---

# MelserDualRange

A dual range component (dual slider) for selecting value ranges with two sliding controls for minimum and maximum values.

## Basic Example

```html
<me-dual-range min="0" max="100" value="30,70"> </me-dual-range>
```

## Interactive Demo

<me-dual-range 
  id="demo-basic" 
  min="0" 
  max="100" 
  value="30,70"
  label="Basic dual range">
</me-dual-range>

<me-dual-range 
  id="demo-steps" 
  min="0" 
  max="50" 
  value="10,40"
  step="5"
  label="Dual range with steps">
</me-dual-range>

<me-dual-range 
  id="demo-disabled" 
  min="0" 
  max="100" 
  value="25,75"
  disabled
  label="Disabled dual range">
</me-dual-range>

## Properties

| Property     | Type      | Default   | Description                     |
| ------------ | --------- | --------- | ------------------------------- |
| `min`        | `number`  | `0`       | Minimum range value             |
| `max`        | `number`  | `100`     | Maximum range value             |
| `value`      | `string`  | `'30,70'` | Current values (min,max)        |
| `step`       | `number`  | `1`       | Increment/decrement for values  |
| `disabled`   | `boolean` | `false`   | Disables interaction            |
| `name`       | `string`  | `''`      | Name for forms                  |
| `label`      | `string`  | `''`      | Visible label for the range     |
| `showValues` | `boolean` | `true`    | Shows the current values        |
| `separator`  | `string`  | `' - '`   | Separator string between values |

## Events

| Event    | Description                          |
| -------- | ------------------------------------ |
| `input`  | Fires when values change (real-time) |
| `change` | Fires when changes are confirmed     |
| `focus`  | Fires when the component gains focus |
| `blur`   | Fires when the component loses focus |

## Usage Examples

### Price Range

```html
<me-dual-range
  min="100"
  max="1000"
  value="250,750"
  step="50"
  label="Price range ($)"
>
</me-dual-range>
```

### Age Range

```html
<me-dual-range min="18" max="65" value="25,45" label="Age range">
</me-dual-range>
```

### Time Range

```html
<me-dual-range min="0" max="24" value="9,17" step="0.5" label="Work hours">
</me-dual-range>
```

## Form Integration

### Filters Form

```html
<form id="filters-form">
  <h3>Search Filters</h3>

  <me-dual-range
    name="priceRange"
    min="0"
    max="5000"
    value="500,2500"
    step="100"
    label="Price range ($)"
  >
  </me-dual-range>

  <me-dual-range
    name="sizeRange"
    min="10"
    max="500"
    value="50,200"
    label="Size (m²)"
  >
  </me-dual-range>

  <me-dual-range
    name="distanceRange"
    min="0"
    max="100"
    value="0,25"
    step="5"
    label="Distance (km)"
  >
  </me-dual-range>

  <button type="submit" variant="primary">Apply Filters</button>
</form>
```

```javascript
const form = document.getElementById("filters-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    console.log("Filters applied:", data);
    alert("Filters applied successfully!");
  });
}
```

## Playground Demo

<me-playground-form id="dual-range-playground" schema-name="dual-range" title="Search Filters" description="Price and size ranges.">
  <div style="margin-bottom: 1.5rem;">
    <me-dual-range 
      name="priceRange"
      min="0" 
      max="5000" 
      value="500,2500"
      step="100"
      label="Price range ($)">
    </me-dual-range>
  </div>
  
  <div style="margin-bottom: 1.5rem;">
    <me-dual-range 
      name="sizeRange"
      min="10" 
      max="500" 
      value="50,200"
      label="Size (m²)">
    </me-dual-range>
  </div>
  
  <div style="margin-bottom: 1.5rem;">
    <me-dual-range 
      name="distanceRange"
      min="0" 
      max="100" 
      value="0,25"
      step="5"
      label="Distance (km)">
    </me-dual-range>
  </div>
</me-playground-form>

## CSS Customization

### CSS Variables

```css
me-dual-range {
  --me-dual-range-height: 6px;
  --me-dual-range-bg: #e5e7eb;
  --me-dual-range-fill: #3b82f6;
  --me-dual-range-thumb: #ffffff;
  --me-dual-range-thumb-border: #3b82f6;
  --me-dual-range-thumb-size: 20px;
  --me-dual-range-focus-color: #2563eb;
  --me-dual-range-disabled-bg: #f3f4f6;
  --me-dual-range-disabled-thumb: #d1d5db;
}
```

### Customization Examples

<style>
  .custom-dual-range {
    --me-dual-range-fill: #10b981;
    --me-dual-range-thumb-border: #10b981;
    --me-dual-range-focus-color: #059669;
  }
  
  .large-dual-range {
    --me-dual-range-height: 8px;
    --me-dual-range-thumb-size: 24px;
  }
  
  .dark-theme-dual-range {
    --me-dual-range-bg: #374151;
    --me-dual-range-fill: #8b5cf6;
    --me-dual-range-thumb-border: #8b5cf6;
    --me-dual-range-focus-color: #7c3aed;
  }
</style>

<div class="custom-dual-range" style="margin-bottom: 1rem;">
  <me-dual-range 
    min="0" 
    max="100" 
    value="25,75"
    label="Custom dual range (green)">
  </me-dual-range>
</div>

<div class="large-dual-range" style="margin-bottom: 1rem;">
  <me-dual-range 
    min="0" 
    max="100" 
    value="40,60"
    label="Large dual range">
  </me-dual-range>
</div>

<div class="dark-theme-dual-range">
  <me-dual-range 
    min="0" 
    max="100" 
    value="20,80"
    label="Dark theme dual range (purple)">
  </me-dual-range>
</div>

<h3>Colors</h3>
<me-dual-range label="Success" color="success" min="0" max="100" value="20,80"></me-dual-range>
<me-dual-range label="Warning" color="warning" min="0" max="100" value="30,70"></me-dual-range>
<me-dual-range label="Danger" color="danger" min="0" max="100" value="40,60"></me-dual-range>

## Accessibility

The MelserDualRange component includes:

- **Keyboard navigation**: Arrow keys to adjust values
- **Screen reader support**: Announces values and ranges
- **Visible focus**: Clear focus indicator
- **High contrast**: Compatible with high contrast mode

## Best Practices

1. **Always include a label** to describe the purpose.
2. **Use appropriate steps** for the data type.
3. **Show current values** for better UX.
4. **Validate that min is not greater than max**.
5. **Use logical ranges** for your application.
6. **Consider the context** of the selected range.

## Troubleshooting

### Range does not respond to events

```javascript
// Verify the component is imported
import "melser-ui/components/me-dual-range.js";

// Verify it is not disabled
console.log(dualRange.disabled); // Should be false
```

### Values crossover

```javascript
// The component should prevent values from crossing over
// If it occurs, check value format
dualRange.value = "30,70"; // Correct format: "min,max"

// Avoid values like:
dualRange.value = "70,30"; // Incorrect: max > min
```

### Value not submitted in form

```html
<!-- Make sure to include the name attribute -->
<me-dual-range name="priceRange" min="0" max="1000" value="250,750">
</me-dual-range>

// Retrieve value in form const formData = new FormData(form); const priceRange
= formData.get('priceRange'); // "250,750" // Process values const [minPrice,
maxPrice] = priceRange.split(',').map(Number);
```

### Accessibility issues

```html
<!-- For complex ranges, use aria-label -->
<me-dual-range
  aria-label="Price range minimum and maximum"
  min="0"
  max="5000"
  value="1000,3000"
>
</me-dual-range>
```

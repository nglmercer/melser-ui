---
title: MelserNumberInput
---

# MelserNumberInput

A numeric input component with increment/decrement controls, range validation, and formatting.

## Basic Example

```html
<me-number-input label="Quantity" placeholder="Enter a number">
</me-number-input>
```

## Interactive Demo

<me-number-input 
  id="demo-basic" 
  label="Basic Number" 
  placeholder="0"
  value="0">
</me-number-input>

<me-number-input 
  id="demo-range" 
  label="With Range (1-100)" 
  placeholder="50"
  min="1"
  max="100"
  value="50">
</me-number-input>

<me-number-input 
  id="demo-steps" 
  label="With Steps (0.5)" 
  placeholder="0"
  min="0"
  max="10"
  step="0.5"
  value="2.5">
</me-number-input>

<me-number-input 
  id="demo-decimals" 
  label="Decimal (max 2)" 
  placeholder="0.00"
  step="0.01"
  min="0"
  max="2.00">
</me-number-input>

<me-number-input 
  id="demo-disabled" 
  label="Disabled" 
  value="100"
  disabled>
</me-number-input>

<me-number-input 
  id="demo-negative" 
  label="Negative Numbers" 
  min="-50"
  max="50"
  step="5"
  value="-10">
</me-number-input>

## Properties

| Property         | Type      | Default     | Description              |
| ---------------- | --------- | ----------- | ------------------------ |
| `min`            | `number`  | `undefined` | Minimum value allowed    |
| `max`            | `number`  | `undefined` | Maximum value allowed    |
| `step`           | `number`  | `1`         | Increment/decrement step |
| `precision`      | `number`  | `undefined` | Decimals to display      |
| `show-controls`  | `boolean` | `true`      | Shows + and - buttons    |
| `format-on-blur` | `boolean` | `false`     | Formats on focus loss    |
| `locale`         | `string`  | `'en-US'`   | Locale for formatting    |
| `label`          | `string`  | `''`        | Visible field label      |
| `placeholder`    | `string`  | `''`        | Placeholder text         |
| `value`          | `number`  | `0`         | Numeric field value      |
| `disabled`       | `boolean` | `false`     | Disables interaction     |
| `readonly`       | `boolean` | `false`     | Read-only                |
| `required`       | `boolean` | `false`     | Required field in forms  |

## Events

| Event       | Description                    |
| ----------- | ------------------------------ |
| `input`     | Fires when value changes       |
| `change`    | Fires when change is confirmed |
| `step-up`   | Fires when incrementing        |
| `step-down` | Fires when decrementing        |
| `focus`     | Fires when focus is gained     |
| `blur`      | Fires when focus is lost       |
| `invalid`   | Fires with invalid value       |

## Usage Examples

### Input with Specific Range

```html
<me-number-input
  label="Age (years)"
  min="18"
  max="100"
  placeholder="25"
  hint="Only people over 18"
>
</me-number-input>
```

### Input with Custom Steps

```html
<me-number-input
  label="Percentage (%)"
  min="0"
  max="100"
  step="5"
  value="25"
  show-controls
  format-on-blur
>
</me-number-input>
```

### Precise Decimal Input

```html
<me-number-input
  label="Price (€)"
  min="0"
  step="0.01"
  precision="2"
  placeholder="0.00"
  locale="es-ES"
  hint="Precision up to 2 decimals"
>
</me-number-input>
```

### Cart Quantity Input

```html
<me-number-input
  label="Quantity"
  min="1"
  max="99"
  step="1"
  value="1"
  show-controls
  class="cart-quantity"
>
</me-number-input>
```

## Form Integration

### Product Form

```html
<form id="product-form">
  <me-number-input
    label="Price (€) *"
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
    label="Available Stock *"
    name="stock"
    min="0"
    max="1000"
    required
    value="0"
  >
  </me-number-input>

  <me-number-input
    label="Discount (%)"
    name="discount"
    min="0"
    max="50"
    step="5"
    value="0"
  >
  </me-number-input>

  <button type="submit" variant="primary">Save Product</button>
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
    alert("Product saved successfully!");
  });
}
```

## Form Demo

<me-playground-form id="number-input-playground" schema-name="number-input" title="Product Calculator" description="Price calculator with real-time validation.">
  <div style="margin-bottom: 1rem;">
    <me-number-input 
      label="Age *"
      name="age"
      min="18"
      max="100"
      required
      placeholder="25">
    </me-number-input>
  </div>
  
  <div style="margin-bottom: 1rem;">
    <me-number-input 
      label="Price (€) *"
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
      label="Quantity"
      name="quantity"
      min="1"
      max="50"
      value="1">
    </me-number-input>
  </div>
  
  <div style="margin-bottom: 1rem;">
    <me-number-input 
      label="Discount (%)"
      name="discount"
      min="0"
      max="50"
      step="5"
      value="0">
    </me-number-input>
  </div>
</me-playground-form>

## Customization with CSS

### CSS Variables

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

### Customization Examples

<style>
  .custom-number {
    --me-number-controls-bg: #dbeafe;
    --me-number-controls-hover-bg: #bfdbfe;
    --me-number-controls-border: #3b82f6;
  }
  
  .compact-number {
    --me-number-input-width: 80px;
    --me-number-input-height: 32px;
    --me-number-controls-width: 24px;
  }
  
  .dark-number {
    --me-number-controls-bg: #374151;
    --me-number-controls-hover-bg: #4b5563;
    --me-number-controls-border: #6b7280;
    --me-number-input-bg: #1f2937;
    --me-number-input-color: #f9fafb;
  }
</style>

<div class="custom-number" style="margin-bottom: 1rem;">
  <me-number-input 
    label="Custom Input"
    value="50">
  </me-number-input>
</div>

<div class="compact-number" style="margin-bottom: 1rem;">
  <me-number-input 
    label="Compact Input"
    min="0"
    max="10"
    value="5">
  </me-number-input>
</div>

<div class="dark-number">
  <me-number-input 
    label="Dark Theme"
    value="42">
  </me-number-input>
</div>

<h3>Colors</h3>
<div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
  <me-number-input label="Success" color="success" value="100"></me-number-input>
  <me-number-input label="Warning" color="warning" value="50"></me-number-input>
  <me-number-input label="Danger" color="danger" value="0"></me-number-input>
</div>

## Advanced Features

### Automatic Formatting

```javascript
const numberInput = document.querySelector("me-number-input");
if (numberInput) {
  numberInput.formatOnBlur = true;
  numberInput.locale = "en-US";

  numberInput.addEventListener("blur", (e) => {
    // Automatically formats on blur
    console.log("Formatted value:", e.target.value);
  });
}
```

### Custom Validation

```javascript
const numberInput = document.querySelector("me-number-input");
if (numberInput) {
  numberInput.addEventListener("invalid", (e) => {
    const value = parseFloat(e.target.value);
    const min = parseFloat(e.target.min);
    const max = parseFloat(e.target.max);

    if (isNaN(value)) {
      console.log("⚠️ Value is not a number");
    } else if (value < min) {
      console.log(`⚠️ Value must be greater than or equal to ${min}`);
    } else if (value > max) {
      console.log(`⚠️ Value must be less than or equal to ${max}`);
    }
  });
}
```

### Keyboard Controls

```html
<me-number-input
  label="Keyboard Navigation"
  placeholder="Use up/down arrows"
  min="0"
  max="100"
  step="1"
></me-number-input>
```

**Available controls:**

- ↑ (Arrow Up): Increments value
- ↓ (Arrow Down): Decrements value
- Page Up: Increments by 10
- Page Down: Decrements by 10
- Home: Goes to min
- End: Goes to max

## Accessibility

The MelserNumberInput component includes:

- **Accessible Controls**: + and - buttons with appropriate aria-labels
- **Keyboard Navigation**: Arrows and Page Up/Down work
- **Semantic Validation**: Errors announced by screen readers
- **Focus Management**: Clear visual indicator
- **Values Announced**: Value changes announced automatically

## Best Practices

1. **Set appropriate ranges** (min/max) for your use case
2. **Use logical steps** for navigation (step)
3. **Include visual controls** for better UX
4. **Format numbers** according to locale
5. **Validate in real-time** but non-intrusively
6. **Provide feedback** for invalid values
7. **Consider precision** for calculations

## Troubleshooting

### Controls not appearing

```html
<!-- Check that show-controls is enabled -->
<me-number-input show-controls label="With controls"></me-number-input>
```

### Value not updating

```javascript
// Check that value is numeric
numberInput.value = 42; // Correct
// numberInput.value = "42"; // Also works
```

### Range validation not working

```html
<!-- Ensure attributes are set -->
<me-number-input min="0" max="100" step="1" required></me-number-input>
```

### Accessibility issues

```html
<!-- Add descriptive labels -->
<me-number-input
  aria-label="Product quantity (min 1, max 99)"
  min="1"
  max="99"
></me-number-input>
```

### Focus not visible

```css
/* Customize focus indicator */
me-number-input:focus-within {
  box-shadow: 0 0 0 2px #3b82f6;
  border-color: #3b82f6;
}
```

### Issues with decimal numbers

```javascript
// Configure appropriate precision
numberInput.step = 0.01;
numberInput.precision = 2;
numberInput.formatOnBlur = true;
```

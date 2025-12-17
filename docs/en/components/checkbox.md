---
title: MelserCheckbox
---

# MelserCheckbox

A highly customizable, accessible binary selection component (checkbox) consistent with the Melser design system.

## Key Features

- 🎨 **3 Levels of Customization:** Predefined variants, CSS variables, and Shadow Parts.
- 📏 **Adaptable Sizes:** Native support for `small`, `medium`, and `large`.
- ♿ **Accessibility First:** Native input hidden to maintain keyboard navigation and screen reader support.
- ✨ **Animations:** Smooth state and focus transitions.

## Basic Example

```html
<me-checkbox label="I accept the terms and conditions"></me-checkbox>
```

## Interactive Demo

<div style="display: flex; flex-direction: column; gap: 1rem;">
<me-checkbox id="demo-basic" label="Basic Checkbox"></me-checkbox>
<me-checkbox id="demo-checked" label="Checked by default" checked></me-checkbox>
<me-checkbox id="demo-disabled" label="Disabled Checkbox" disabled></me-checkbox>
<me-checkbox id="demo-error" label="With validation error" required errorMessage="You must check this box"></me-checkbox>
</div>

<h3>Colors</h3>
<div style="display: flex; gap: 1rem; flex-wrap: wrap;">
  <me-checkbox label="Primary" color="primary" checked></me-checkbox>
  <me-checkbox label="Success" color="success" checked></me-checkbox>
  <me-checkbox label="Warning" color="warning" checked></me-checkbox>
  <me-checkbox label="Danger" color="danger" checked></me-checkbox>
</div>

## Component API

### Properties

| Property   | Type                             | Default      | Description                                         |
| ---------- | -------------------------------- | ------------ | --------------------------------------------------- |
| `checked`  | `boolean`                        | `false`      | Current state of the checkbox. Synced with `value`. |
| `value`    | `boolean`                        | `false`      | Alias for `checked` (inherited from BaseInput).     |
| `label`    | `string`                         | `''`         | Text displayed next to the checkbox.                |
| `disabled` | `boolean`                        | `false`      | Disables interaction and reduces opacity.           |
| `required` | `boolean`                        | `false`      | Marks the field as mandatory for forms.             |
| `size`     | `'small' \| 'medium' \| 'large'` | `'medium'`   | **NEW:** Controls the size of the control and text. |
| `variant`  | `'outlined' \| 'card'`           | `'outlined'` | **NEW:** Changes the visual style of the container. |
| `name`     | `string`                         | `''`         | Identifier for form submission.                     |

### Shadow Parts (For Advanced CSS)

Use `::part(name)` to style internal elements without variables.

| Part            | Description                              |
| --------------- | ---------------------------------------- |
| `wrapper`       | Main container of the component.         |
| `container`     | The `label` wrapping the input and text. |
| `control`       | The visual square (the "fake" checkbox). |
| `icon`          | The SVG check inside the control.        |
| `label`         | The text element of the label.           |
| `error-message` | The error message container.             |

### Events

| Event       | Detail (`e.detail`)            | Description                                   |
| ----------- | ------------------------------ | --------------------------------------------- |
| `ui:change` | `{ name, value, isValid ... }` | Unified Melser system event. Fires on change. |
| `change`    | `Event`                        | Standard native event.                        |

---

## Customization Guide

### 1. Using Sizes

You don't need CSS to change the size, use the `size` property.

```html
<me-checkbox size="small" label="Small"></me-checkbox>

<me-checkbox size="medium" label="Normal"></me-checkbox>

<me-checkbox size="large" label="Large"></me-checkbox>
```

### 2. Using Variants

The component includes alternative styles "out of the box".

**Card Variant:** Turns the checkbox into a selectable card.

```html
<me-checkbox
  variant="card"
  label="Premium Option (Includes everything)"
  name="plan"
>
</me-checkbox>
```

### 3. Customization via CSS (Variables)

The component inherits global colors, but you can override them locally using `base-input-*` variables.

```css
/* In your global stylesheet or parent component */
.my-custom-checkbox {
  /* Background color when checked */
  --base-input-control-bg-checked: #ff4081;
  /* Inactive border color */
  --base-input-control-border-color: #b0bec5;
  /* Border radius (make it round) */
  --base-input-control-radius: 50%;
}
```

```html
<me-checkbox
  class="my-custom-checkbox"
  label="Round and Pink Checkbox"
  checked
></me-checkbox>
```

### 4. Surgical Customization (Shadow Parts)

For changes that variables don't cover, use `::part`.

```css
/* Example: Make label bold and italic */
me-checkbox::part(label) {
  font-weight: 800;
  font-style: italic;
  color: #333;
}

/* Example: Change check icon color only in this state */
me-checkbox[checked]::part(icon) {
  fill: #fff; /* Ensure contrast */
}

/* Example: Move text to the left of the box (reverse) */
me-checkbox::part(container) {
  flex-direction: row-reverse;
  justify-content: flex-end;
}
```

---

## Form Integration

The component emits events and validates its internal state.

```html
<me-playground-form
  id="checkbox-playground"
  schema-name="checkbox"
  title="Registration"
  description="Terms and conditions validation."
>
  <me-checkbox name="terms" label="I accept the terms *" required>
  </me-checkbox>
</me-playground-form>
```

## Troubleshooting

**Style not applied when printing (Print styles):**
Browsers sometimes remove `background-color` when printing.

```css
@media print {
  me-checkbox::part(control) {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
```

**Checkbox not aligned with text in long paragraphs:**
By default, the checkbox is vertically centered (`align-items: center`). If you have multi-line text and want the checkbox at the top:

```css
me-checkbox::part(container) {
  align-items: flex-start; /* Align top */
}
me-checkbox::part(control) {
  margin-top: 2px; /* Small visual adjustment */
}
```

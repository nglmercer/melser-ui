---
title: MelserColorPicker
---

# MelserColorPicker

**MelserColorPicker** is an input component designed for hexadecimal color selection. It combines a native visual color picker (`input type="color"`) with a text field for manual HEX code entry.

## Basic Example

```html
<me-color-picker label="Background Color" value="#3b82f6"> </me-color-picker>
```

## Interactive Demo

<me-color-picker 
  id="demo-basic" 
  label="Basic Picker" 
  value="#3b82f6">
</me-color-picker>

<me-color-picker 
  id="demo-sizesm" 
  label="Small" 
  value="#3b82f6"
  size="small">
</me-color-picker>

<me-color-picker 
  id="demo-size-lg" 
  label="Large" 
  value="#3b82f6"
  size="large">
</me-color-picker>

<me-color-picker 
  id="demo-disabled" 
  label="Disabled" 
  value="#ef4444"
  disabled>
</me-color-picker>

<h3>Colors (States)</h3>
<div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
  <me-color-picker label="Success" color="success" value="#10b981"></me-color-picker>
  <me-color-picker label="Warning" color="warning" value="#f59e0b"></me-color-picker>
  <me-color-picker label="Danger" color="danger" value="#ef4444"></me-color-picker>
</div>

## Properties

| Property       | Type                                              | Default      | Description                                 |
| :------------- | :------------------------------------------------ | :----------- | :------------------------------------------ |
| `value`        | `string`                                          | `'#000000'`  | Color value in HEX format (e.g. `#FF0000`). |
| `label`        | `string`                                          | `''`         | Visible field label.                        |
| `name`         | `string`                                          | `''`         | Identifier for forms.                       |
| `variant`      | `'outlined' \| 'filled' \| 'standard'`            | `'outlined'` | Input visual style.                         |
| `size`         | `'small' \| 'medium' \| 'large'`                  | `'medium'`   | Component size.                             |
| `color`        | `'primary' \| 'success' \| 'warning' \| 'danger'` | `'primary'`  | Color scheme of the state.                  |
| `required`     | `boolean`                                         | `false`      | Marks the field as required.                |
| `disabled`     | `boolean`                                         | `false`      | Disables interaction.                       |
| `errorMessage` | `string`                                          | `''`         | Error message to display.                   |

## Events

| Event       | Description                                                            |
| :---------- | :--------------------------------------------------------------------- |
| `ui:change` | Fires when user changes color (visual or text) and value is valid HEX. |
| `input`     | Fires on every text change.                                            |
| `change`    | Fires when confirming the change.                                      |

## Usage Examples

### Design Variants

```html
<div style="display: flex; gap: 1rem;">
  <me-color-picker
    label="Outlined"
    variant="outlined"
    value="#7c3aed"
  ></me-color-picker>
  <me-color-picker
    label="Filled"
    variant="filled"
    value="#db2777"
  ></me-color-picker>
  <me-color-picker
    label="Standard"
    variant="standard"
    value="#059669"
  ></me-color-picker>
</div>
```

### Listening to Changes in JS

```javascript
const picker = document.querySelector("me-color-picker");

picker.addEventListener("ui:change", (e) => {
  const { value, isValid } = e.detail;
  console.log("New color selected:", value);
  document.body.style.setProperty("--main-bg-color", value);
});
```

## Form Integration

### Customization Form

```html
<form id="theme-form">
  <me-color-picker
    label="Primary Color *"
    name="primary"
    required
    value="#3b82f6"
    error-message="You must select a primary color"
  ></me-color-picker>

  <me-color-picker
    label="Secondary Color"
    name="secondary"
    value="#10b981"
  ></me-color-picker>

  <button type="submit">Save Theme</button>
</form>
```

```javascript
document.getElementById("theme-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  console.log(Object.fromEntries(formData));
});
```

## Form Demo

<me-playground-form id="color-playground" schema-name="color-picker" title="Theme Customization" description="Select your interface colors.">
  <div style="margin-bottom: 1.5rem;">
    <me-color-picker 
      label="Primary Color *"
      name="primaryColor"
      required
      value="#3b82f6">
    </me-color-picker>
  </div>
  
  <div style="margin-bottom: 1.5rem;">
    <me-color-picker 
      label="Background Color"
      name="backgroundColor"
      value="#ffffff">
    </me-color-picker>
  </div>
</me-playground-form>

## Customization with CSS

### CSS Variables

```css
me-color-picker {
  /* General */
  --me-font-family: "Roboto", sans-serif;

  /* Colors */
  --me-primary: #3b82f6;
  --me-error: #ef4444;
  --me-text: #1f2937;
  --me-label-color: #374151;
  --me-border: #d1d5db;
  --me-bg: #ffffff;

  /* Dimensions */
  --me-radius: 0.5rem;
}
```

## Accessibility

- **Dual Sync**: Text input and color picker stay synchronized for keyboard and mouse users.
- **Labels**: Always includes an associated label.
- **Visual Validation**: Errors are clearly shown and announced via ARIA.

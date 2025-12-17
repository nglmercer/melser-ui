---
title: Components Overview
---

# Components Overview

Melser UI includes a wide range of modern and accessible web components. All components are built with Lit and follow web development best practices.

## List of Available Components

### Forms and Data Entry

#### Text Input

- **[MelserTextInput](./text-input)** - Text field with validation and states
- **[MelserTextarea](./textarea)** - Multi-line text area
- **[MelserPasswordInput](./password-input)** - Password field with visibility toggle
- **[MelserNumberInput](./number-input)** - Numeric field with increment controls

#### Selectors

- **[MelserSelect](./select)** - Simple dropdown selector
- **[MelserMultiSelect](./multi-select)** - Multiple selector with search
- **[MelserCombobox](./combobox)** - Combo box with autocomplete
- **[MelserCheckbox](./checkbox)** - Checkbox
- **[MelserRadioGroup](./radio-group)** - Radio button group

#### Specialized Input

- **[MelserFileUpload](./file-upload)** - File upload with drag & drop
- **[MelserDatePicker](./date-picker)** - Date picker
- **[MelserTimePicker](./time-picker)** - Time picker
- **[MelserColorPicker](./color-picker)** - Color picker
- **[MelserRating](./rating)** - Star rating
- **[MelserOtpInput](./otp-input)** - OTP code input
- **[MelserTagsInput](./tags-input)** - Tags input

#### Range Controls

- **[MelserRange](./range)** - Range slider
- **[MelserDualRange](./dual-range)** - Slider with two values (min-max)

#### Special Controls

- **[MelserSwitch](./switch)** - Toggle switch

#### Data Display

- **[DataTable](./data-table)** - Advanced data table with pagination and sorting

## Component Usage Example

All components follow the same usage pattern:

```html
<!-- Basic component -->
<me-checkbox label="Simple option"></me-checkbox>

<!-- With properties -->
<base-input
  label="Username"
  placeholder="Enter your username"
  required
  minlength="3"
>
</base-input>

<!-- With events -->
<button id="submit-btn" variant="primary" disabled>Save</button>
```

```javascript
// Listen to events
const button = document.getElementById("submit-btn");
button?.addEventListener("click", (event) => {
  console.log("Button clicked:", event);
});
```

## Common Features

### Shared Properties

All components share these properties:

| Property   | Type      | Description             |
| ---------- | --------- | ----------------------- |
| `disabled` | `boolean` | Disables interaction    |
| `required` | `boolean` | Marks as required field |
| `value`    | `string`  | Component value         |
| `name`     | `string`  | Name for forms          |

### Common Events

| Event    | Description                  |
| -------- | ---------------------------- |
| `input`  | Fires when value changes     |
| `change` | Fires on change confirmation |
| `focus`  | Fires on focus               |
| `blur`   | Fires on blur                |

### Visual States

- **Normal** - Default state
- **Hover** - On mouse hover
- **Focus** - On focus (keyboard)
- **Disabled** - Disabled state
- **Error** - Error/validation failure state

## Browser Compatibility

| Browser | Minimum Version |
| ------- | --------------- |
| Chrome  | 88+             |
| Firefox | 89+             |
| Safari  | 14.1+           |
| Edge    | 88+             |

## Interactive Example

Here you can test some components in real-time:

### Form Example

```html
<form id="demo-form">
  <base-input
    label="Email"
    type="email"
    placeholder="you@email.com"
    id="email-input"
    required
  >
  </base-input>

  <me-password-input
    label="Password"
    placeholder="Minimum 8 characters"
    minlength="8"
    id="password-input"
    required
  >
  </me-password-input>

  <me-checkbox label="Remember me" id="remember-checkbox"> </me-checkbox>

  <button variant="primary" type="submit" id="submit-btn">Log In</button>
</form>
```

### Components in Action Demo

<base-input id="demo-name" label="Name" placeholder="Your name here"></base-input>

<me-select id="demo-select" label="Select an option">
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
  <option value="option3">Option 3</option>
</me-select>

<me-rating id="demo-rating" label="Rate this service" max="5"></me-rating>

<button  id="demo-form-btn" variant="outline" type="submit">Test Form</button >

<div id="demo-result" style="margin-top: 1rem; padding: 0.5rem; background: #f5f5f5; border-radius: 4px; display: none;">
  <strong>Form values:</strong>
  <div id="demo-values"></div>
</div>

## Accessibility

All Melser UI components are designed with accessibility in mind:

- Appropriate **ARIA labels**
- Full **keyboard navigation**
- Correct **Focus management**
- **Screen reader** compatibility
- **High contrast** support

## Customization

Components use **CSS Custom Properties** for easy customization:

```css
button {
  --me-primary-color: #3b82f6;
  --me-border-radius: 6px;
  --me-padding: 8px 16px;
}
```

Check the [aliases guide](../guide/aliases) for more configuration details.

## Next Steps

- [Detailed installation](../guide/installation)
- [Customize theme](../guide/aliases)
- [Specific component guides](./checkbox)

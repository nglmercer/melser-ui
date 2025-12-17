---
title: MelserTextInput
---

# MelserTextInput

An advanced and customizable text input component with validation, icons, and full form support.

## Basic Example

```html
<base-input label="Full Name" placeholder="Type your name"> </base-input>
```

## Properties

| Property       | Type      | Default     | Description                                        |
| -------------- | --------- | ----------- | -------------------------------------------------- |
| `type`         | `string`  | `'text'`    | Input type (text, password, email, tel, url, etc.) |
| `label`        | `string`  | `''`        | Visible field label                                |
| `placeholder`  | `string`  | `''`        | Placeholder text                                   |
| `value`        | `string`  | `''`        | Field value                                        |
| `disabled`     | `boolean` | `false`     | Disables interaction                               |
| `readonly`     | `boolean` | `false`     | Read-only                                          |
| `required`     | `boolean` | `false`     | Required field in forms                            |
| `name`         | `string`  | `''`        | Name for forms                                     |
| `minlength`    | `number`  | `undefined` | Minimum length allowed                             |
| `maxlength`    | `number`  | `undefined` | Maximum length allowed                             |
| `pattern`      | `string`  | `''`        | Regular expression for validation                  |
| `autocomplete` | `string`  | `'off'`     | Autocomplete control                               |
| `autofocus`    | `boolean` | `false`     | Automatic focus                                    |
| `error`        | `string`  | `''`        | Custom error message                               |
| `hint`         | `string`  | `''`        | Helper text                                        |
| `size`         | `string`  | `'md'`      | Input size (sm, md, lg)                            |

## Events

| Event     | Description                           |
| --------- | ------------------------------------- |
| `input`   | Fires when value changes (real-time)  |
| `change`  | Fires when change is confirmed (blur) |
| `focus`   | Fires when focus is gained            |
| `blur`    | Fires when focus is lost              |
| `keydown` | Fires when a key is pressed           |
| `keyup`   | Fires when a key is released          |

## Usage Examples

### Input with Email Validation

```html
<base-input
  label="Email Address"
  type="email"
  placeholder="you@email.com"
  required
  pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
  hint="Enter a valid email"
>
</base-input>
```

### Input with Character Counter

```html
<base-input
  label="Bio"
  placeholder="Tell us about yourself..."
  maxlength="200"
  hint="Max 200 characters"
>
</base-input>
```

### Input with Autocomplete

```html
<base-input
  label="Country"
  placeholder="Select a country"
  autocomplete="country"
  datalist="countries"
>
</base-input>

<datalist id="countries">
  <option value="Spain"></option>
  <option value="Mexico"></option>
  <option value="Argentina"></option>
  <option value="Colombia"></option>
  <option value="Peru"></option>
</datalist>
```

### Input with Statuses

```html
<base-input
  label="Username"
  placeholder="3-20 characters"
  minlength="3"
  maxlength="20"
  pattern="[a-zA-Z0-9_]+"
  error="Only letters, numbers and underscores"
>
</base-input>
```

## Form Integration

### Complete Registration Form

```html
<form id="registration-form">
  <base-input
    label="Full Name *"
    name="fullName"
    required
    minlength="2"
    placeholder="John Doe"
  >
  </base-input>

  <base-input
    label="Email Address *"
    type="email"
    name="email"
    required
    placeholder="john@email.com"
  >
  </base-input>

  <base-input
    label="Phone"
    type="tel"
    name="phone"
    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
    placeholder="123-456-7890"
  >
  </base-input>

  <base-input
    label="Website"
    type="url"
    name="website"
    placeholder="https://myweb.com"
  >
  </base-input>

  <button type="submit" variant="primary">Register</button>
</form>
```

```javascript
const form = document.getElementById("registration-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    console.log("Form data:", data);

    // Additional manual validation
    if (!data.fullName || !data.email) {
      alert("Please complete all required fields");
      return;
    }

    alert("Form submitted successfully!");
  });
}
```

## Form Demo

<me-playground-form id="text-input-playground" schema-name="text-input" title="Example Form" description="Interactive example with automatic Zod validation.">
  <div style="margin-bottom: 1rem;">
    <base-input 
      label="Full Name *"
      name="fullName"
      required
      minlength="2"
      placeholder="John Doe">
    </base-input>
  </div>
  
  <div style="margin-bottom: 1rem;">
    <base-input 
      label="Email Address *"
      type="email"
      name="email"
      required
      placeholder="john@email.com">
    </base-input>
  </div>
  
  <div style="margin-bottom: 1rem;">
    <base-input 
      label="Phone"
      type="tel"
      name="phone"
      placeholder="123-456-7890">
    </base-input>
  </div>
  
  <div style="margin-bottom: 1rem;">
    <base-input 
      label="Website"
      type="url"
      name="website"
      placeholder="https://myweb.com">
    </base-input>
  </div>
</me-playground-form>

## Customization with CSS

### CSS Variables

Due to the new Design Tokens system, variables now follow a consistent `base-input-*` pattern.

```css
base-input {
  /* Main Variables */
  --base-input-bg: #ffffff;
  --base-input-bg-hover: #f9fafb;
  --base-input-bg-focus: #ffffff;

  --base-input-text-color: #333333;
  --base-input-text-color-placeholder: #6b7280;

  --base-input-border-color: #cccccc;
  --base-input-border-color-hover: #999999;
  --base-input-border-color-focus: #3b82f6;

  --base-input-padding: 0.75rem;
  --base-input-radius: 4px;
  --base-input-font-size: 1rem;

  --base-input-focus-ring-color: #3b82f6;
  --base-input-focus-ring-width: 2px;
}
```

### Customization Examples

<style>
  .custom-input base-input {
    --base-input-focus-ring-color: #10b981;
    --base-input-border-color-focus: #10b981;
    --base-input-radius: 12px;
    --base-input-bg: #ecfdf5;
  }
  
  .large-input base-input {
    --base-input-padding: 1rem 1.5rem;
    --base-input-font-size: 1.25rem;
  }
  
  .dark-theme-input base-input {
    --base-input-bg: #1f2937;
    --base-input-border-color: #374151;
    --base-input-text-color: #f3f4f6;
    --base-input-text-color-placeholder: #9ca3af;
    --base-input-focus-ring-color: #8b5cf6;
  }
</style>

<div class="custom-input" style="margin-bottom: 1rem;">
  <base-input 
    label="Custom Input (Green)"
    placeholder="Custom styles">
  </base-input>
</div>

<div class="large-input" style="margin-bottom: 1rem;">
  <base-input 
    label="Large Input"
    placeholder="More comfortable to use">
  </base-input>
</div>

<div class="dark-theme-input">
  <base-input 
    label="Dark Theme (Manual)"
    placeholder="Manual style override"
    value="Text in dark theme">
  </base-input>
</div>

<h3>Colors</h3>
<div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1rem;">
  <base-input label="Success Input" color="success" placeholder="Correct" value="Valid value"></base-input>
  <base-input label="Warning Input" color="warning" placeholder="Warning" value="Suspicious value"></base-input>
  <base-input label="Danger Input" color="danger" placeholder="Error" value="Invalid value"></base-input>
</div>

## Accessibility

The MelserTextInput component includes:

- **Associated Labels**: Semantic relationship between label and input
- **Aria-describedby**: For hint and error messages
- **Focus states**: Clear visual indicator
- **Keyboard navigation**: Tab, Enter, Escape
- **Accessible validation**: Error messages announced by screen readers

## Best Practices

1. **Always use labels** to describe the purpose of the field
2. **Include placeholders** for examples or formatting
3. **Validate in real-time** but without being intrusive
4. **Provide helper messages** with `hint`
5. **Use appropriate types** (email, tel, url) for better UX
6. **Handle error states** clearly
7. **Consider autocomplete** for common fields

## Troubleshooting

### Input does not respond to events

```javascript
// Verify component is imported
import "melser-ui/components/base-input.js";

// Verify it's not disabled
console.log(input.disabled); // Should be false
```

### Validation not working

```html
<!-- Ensure correct attributes are used -->
<base-input
  required
  minlength="3"
  maxlength="50"
  pattern="[A-Za-z ]+"
  error="Only letters and spaces"
>
</base-input>
```

### Accessibility issues

```html
<!-- For complex fields, use aria-label -->
<base-input
  aria-label="6-digit verification code"
  maxlength="6"
  pattern="[0-9]{6}"
>
</base-input>
```

### Focus states not visible

```css
/* Customize focus indicator */
base-input:focus-within {
  box-shadow: 0 0 0 2px #3b82f6;
}
```

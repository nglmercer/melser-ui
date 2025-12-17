---
title: MelserPasswordInput
---

# MelserPasswordInput

A password input component with visibility toggle, strength validation, and security meter.

## Basic Example

```html
<me-password-input label="Password" placeholder="Create a secure password">
</me-password-input>
```

## Interactive Demo

<me-password-input 
  id="demo-basic" 
  label="Password" 
  placeholder="Enter your password">
</me-password-input>

<me-password-input 
  id="demo-strength" 
  label="With strength meter" 
  placeholder="Type to test"
  strength-meter
  minlength="8">
</me-password-input>

<me-password-input 
  id="demo-visible" 
  label="Visible by default" 
  placeholder="Visible password"
  show-password
  value="visible123">
</me-password-input>

<me-password-input 
  id="demo-disabled" 
  label="Disabled" 
  placeholder="Non-editable"
  disabled
  value="secret123">
</me-password-input>

<h3>Colors</h3>
<div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
  <me-password-input label="Success" color="success" value="Password123" strength-meter></me-password-input>
  <me-password-input label="Warning" color="warning" value="weak" strength-meter></me-password-input>
  <me-password-input label="Danger" color="danger" value="bad" strength-meter></me-password-input>
</div>

## Properties

| Property          | Type                                              | Default                                       | Description                   |
| :---------------- | :------------------------------------------------ | :-------------------------------------------- | :---------------------------- |
| `show-toggle`     | `boolean`                                         | `true`                                        | Shows/hides visibility button |
| `strength-meter`  | `boolean`                                         | `false`                                       | Shows strength meter          |
| `minlength`       | `number`                                          | `undefined`                                   | Minimum required length       |
| `maxlength`       | `number`                                          | `undefined`                                   | Maximum allowed length        |
| `show-password`   | `boolean`                                         | `false`                                       | Initial visibility state      |
| `strength-levels` | `array`                                           | `['weak', 'medium', 'strong', 'very strong']` | Strength levels               |
| `label`           | `string`                                          | `''`                                          | Visible field label           |
| `placeholder`     | `string`                                          | `''`                                          | Placeholder text              |
| `value`           | `string`                                          | `''`                                          | Field value                   |
| `color`           | `'primary' \| 'success' \| 'warning' \| 'danger'` | `'primary'`                                   | Color scheme of the state.    |
| `disabled`        | `boolean`                                         | `false`                                       | Disables interaction          |
| `required`        | `boolean`                                         | `false`                                       | Required field in forms       |

## Events

| Event               | Description                      |
| :------------------ | :------------------------------- |
| `input`             | Fires when value changes         |
| `change`            | Fires when change is confirmed   |
| `toggle-visibility` | Fires when visibility is toggled |
| `strength-change`   | Fires when strength changes      |
| `focus`             | Fires when focus is gained       |
| `blur`              | Fires when focus is lost         |

## Usage Examples

### Password with Strength Validation

```html
<me-password-input
  label="New Password *"
  placeholder="Minimum 8 characters"
  minlength="8"
  maxlength="50"
  strength-meter
  show-toggle
  required
  hint="Must include uppercase, numbers and symbols"
>
</me-password-input>
```

### Password with Specific Requirements

```html
<me-password-input
  label="Secure Password *"
  required
  minlength="12"
  strength-meter
  placeholder="At least 12 characters"
  pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}"
  error="Password must be at least 12 characters long, including uppercase, numbers and symbols"
>
</me-password-input>
```

## Form Integration

### Registration Form

```html
<form id="register-form">
  <me-password-input
    label="Password *"
    name="password"
    required
    minlength="8"
    strength-meter
    show-toggle
    placeholder="Create a secure password"
  >
  </me-password-input>

  <me-password-input
    label="Confirm Password *"
    name="confirmPassword"
    required
    minlength="8"
    show-toggle
    placeholder="Repeat your password"
  >
  </me-password-input>

  <button type="submit">Register</button>
</form>
```

```javascript
document.getElementById("register-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  // Validate password match here
});
```

## Form Demo

<me-playground-form id="password-playground" schema-name="password-input" title="Change Password" description="Strength and match validation.">
  <div style="margin-bottom: 1rem;">
    <me-password-input 
      label="Current Password *"
      name="currentPassword"
      required
      placeholder="Your current password">
    </me-password-input>
  </div>
  
  <div style="margin-bottom: 1rem;">
    <me-password-input 
      label="New Password *"
      name="confirmPassword"
      required
      minlength="8"
      strength-meter
      show-toggle
      placeholder="New password">
    </me-password-input>
  </div>
</me-playground-form>

## Customization with CSS

### CSS Variables

```css
me-password-input {
  --me-password-toggle-size: 20px;
  --me-password-strength-weak: #ef4444;
  --me-password-strength-medium: #f59e0b;
  --me-password-strength-strong: #10b981;
  --me-password-strength-very-strong: #059669;
  --me-password-meter-height: 4px;
  --me-password-meter-radius: 2px;
}
```

### Customization Examples

<style>
  .custom-password {
    --me-password-strength-weak: #dc2626;
    --me-password-strength-medium: #ea580c;
  }
  
  .minimal-password {
    --me-password-meter-height: 2px;
  }
</style>

<div class="custom-password" style="margin-bottom: 1rem;">
  <me-password-input 
    label="Custom Password"
    placeholder="Custom strength colors"
    strength-meter
    value="StrongPassword123!">
  </me-password-input>
</div>

<div class="minimal-password">
  <me-password-input 
    label="Minimalist Style"
    placeholder="More discreet"
    value="Mini123">
  </me-password-input>
</div>

## Advanced Features

### Custom Strength Validation

```javascript
const passwordInput = document.querySelector("me-password-input");
if (passwordInput) {
  passwordInput.addEventListener("strength-change", (e) => {
    const { strength, score } = e.detail;

    switch (score) {
      case 0:
      case 1:
        console.log("⚠️ Very weak password");
        break;
      case 2:
        console.log("⚠️ Weak password");
        break;
      case 3:
        console.log("✅ Acceptable password");
        break;
      case 4:
        console.log("🔒 Strong password");
        break;
    }
  });
}
```

## Accessibility

- **Accessible Toggle**: Button with appropriate aria-label.
- **Strength Meter**: Announced by screen readers.
- **Semantic Validation**: Accessible error messages.
- **Keyboard Navigation**: Tab and Enter work correctly.

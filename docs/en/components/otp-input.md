---
title: MelserOtpInput
---

# MelserOtpInput

An OTP (One-Time Password) input component for two-factor verification with autocomplete and automatic validation.

## Basic Example

```html
<me-otp-input length="6" label="Verification Code"> </me-otp-input>
```

## Interactive Demo

<me-otp-input 
  id="demo-basic" 
  length="6"
  label="6-digit Code">
</me-otp-input>

<me-otp-input 
  id="demo-numeric" 
  length="4"
  numeric-only
  label="4-digit Numeric Code">
</me-otp-input>

<me-otp-input 
  id="demo-disabled" 
  length="6"
  disabled
  label="Disabled OTP"
  value="123456">
</me-otp-input>

<h3>Colors</h3>
<div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
  <me-otp-input length="4" label="Success" color="success" value="1234"></me-otp-input>
  <me-otp-input length="4" label="Warning" color="warning" value="5678"></me-otp-input>
  <me-otp-input length="4" label="Danger" color="danger" value="9012"></me-otp-input>
</div>

## Properties

| Property        | Type                                              | Default     | Description                |
| :-------------- | :------------------------------------------------ | :---------- | :------------------------- |
| `length`        | `number`                                          | `6`         | Number of code digits      |
| `value`         | `string`                                          | `''`        | Current OTP value          |
| `disabled`      | `boolean`                                         | `false`     | Disables interaction       |
| `readonly`      | `boolean`                                         | `false`     | Read-only                  |
| `name`          | `string`                                          | `''`        | Name for forms             |
| `label`         | `string`                                          | `''`        | Visible component label    |
| `placeholder`   | `string`                                          | `'•'`       | Placeholder character      |
| `numericOnly`   | `boolean`                                         | `false`     | Allows numbers only        |
| `autoFocus`     | `boolean`                                         | `true`      | Automatic focus on load    |
| `caseSensitive` | `boolean`                                         | `false`     | Case sensitive             |
| `allowedChars`  | `string`                                          | `''`        | Allowed characters (regex) |
| `color`         | `'primary' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | Color scheme of the state. |

## Events

| Event      | Description                  |
| :--------- | :--------------------------- |
| `input`    | Fires when value changes     |
| `complete` | Fires when code is completed |
| `paste`    | Fires when pasting content   |
| `focus`    | Fires when focus is gained   |
| `blur`     | Fires when focus is lost     |

## Usage Examples

### SMS Verification Code

```html
<me-otp-input
  length="6"
  numeric-only
  label="SMS Code"
  hint="Enter the 6-digit code sent to your phone"
>
</me-otp-input>
```

### Authenticator App Code

```html
<me-otp-input
  length="6"
  numeric-only
  label="Authenticator Code"
  hint="Use your authentication app"
>
</me-otp-input>
```

### Alphanumeric Code

```html
<me-otp-input
  length="8"
  label="Recovery Code"
  hint="8-character alphanumeric code"
>
</me-otp-input>
```

## Form Integration

### Verification Form

```html
<form id="verification-form">
  <h3>Two-Factor Verification</h3>

  <me-otp-input
    name="otpCode"
    length="6"
    numeric-only
    label="Verification Code"
    hint="We sent a code to your email"
  >
  </me-otp-input>

  <button type="submit">Verify</button>
</form>
```

```javascript
document.getElementById("verification-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  console.log("OTP:", formData.get("otpCode"));
});
```

## Form Demo

<me-playground-form id="otp-playground" schema-name="otp-input" title="2FA Verification" description="Code verification and security.">
  <div style="margin-bottom: 1.5rem;">
    <base-input 
      label="Email"
      type="email"
      value="user@example.com"
      disabled>
    </base-input>
  </div>
  
  <div style="margin-bottom: 1.5rem;">
    <me-otp-input 
      name="otpCode"
      length="6"
      numeric-only
      label="Verification Code"
      hint="We sent a code to your email">
    </me-otp-input>
  </div>
</me-playground-form>

## Customization with CSS

### CSS Variables

```css
me-otp-input {
  --me-otp-input-width: 50px;
  --me-otp-input-height: 50px;
  --me-otp-input-gap: 8px;
  --me-otp-input-font-size: 18px;
  --me-otp-input-border: 2px solid #d1d5db;
  --me-otp-input-border-radius: 8px;
  --me-otp-input-focus-border: #3b82f6;
  --me-otp-input-bg: #ffffff;
  --me-otp-input-disabled-bg: #f9fafb;
  --me-otp-input-disabled-border: #e5e7eb;
}
```

### Customization Examples

<style>
  .custom-otp {
    --me-otp-input-width: 60px;
    --me-otp-input-height: 60px;
    --me-otp-input-font-size: 24px;
    --me-otp-input-border-radius: 12px;
  }
  
  .compact-otp {
    --me-otp-input-width: 40px;
    --me-otp-input-height: 40px;
    --me-otp-input-gap: 4px;
    --me-otp-input-font-size: 16px;
  }
  
  .dark-theme-otp {
    --me-otp-input-bg: #1f2937;
    --me-otp-input-border: #4b5563;
    --me-otp-input-focus-border: #8b5cf6;
    --me-otp-input-font-size: 20px;
    color: #f9fafb;
  }
</style>

<div class="custom-otp" style="margin-bottom: 1rem;">
  <me-otp-input 
    length="6"
    label="Custom OTP (Large)">
  </me-otp-input>
</div>

<div class="compact-otp" style="margin-bottom: 1rem;">
  <me-otp-input 
    length="6"
    label="Compact OTP">
  </me-otp-input>
</div>

<div class="dark-theme-otp">
  <me-otp-input 
    length="6"
    label="Dark Theme OTP (Purple)">
  </me-otp-input>
</div>

## Accessibility

- **Keyboard Navigation**: Tab between fields, arrows, backspace
- **Screen reader support**: Announces position and value
- **Focus visible**: Clear focus indicator
- **Auto-focus**: Jumps to next field automatically
- **High contrast**: Compatible with high contrast mode

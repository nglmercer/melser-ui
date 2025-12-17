---
title: MelserRadioGroup
---

# MelserRadioGroup

An accessible and customizable radio button group component with vertical/horizontal orientation and validation.

## Basic Example

```html
<me-radio-group label="Select an option" name="option">
  <option value="option1" label="Option 1"></option>
  <option value="option2" label="Option 2"></option>
  <option value="option3" label="Option 3"></option>
</me-radio-group>
```

## Interactive Demo

<me-radio-group 
  id="demo-basic" 
  label="Basic Radio" 
  name="demo-basic">

  <option value="option1" label="First Option"></option>
  <option value="option2" label="Second Option"></option>
  <option value="option3" label="Third Option"></option>
</me-radio-group>

<me-radio-group 
  id="demo-selected" 
  label="With initial selection" 
  name="demo-selected"
  value="option2">

  <option value="option1" label="Option A"></option>
  <option value="option2" label="Option B"></option>
  <option value="option3" label="Option C"></option>
</me-radio-group>

<me-radio-group 
  id="demo-disabled" 
  label="With disabled options" 
  name="demo-disabled"
  value="option1">

  <option value="option1" label="Available Option"></option>
  <option value="option2" label="Unavailable Option" disabled></option>
  <option value="option3" label="Another Available Option"></option>
</me-radio-group>

<me-radio-group 
  id="demo-horizontal" 
  label="Horizontal Orientation" 
  name="demo-horizontal"
  orientation="horizontal">

  <option value="yes" label="Yes"></option>
  <option value="no" label="No"></option>
  <option value="maybe" label="Maybe"></option>
</me-radio-group>

<div style="margin: 1rem 0; display: flex; flex-direction: column; gap: 1rem;">
  <h4>Colors</h4>
  <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
    <me-radio-group label="Success" color="success" name="color-success" value="1" orientation="horizontal">
      <option value="1" label="Option 1"></option>
      <option value="2" label="Option 2"></option>
    </me-radio-group>
    <me-radio-group label="Warning" color="warning" name="color-warning" value="1" orientation="horizontal">
      <option value="1" label="Option 1"></option>
      <option value="2" label="Option 2"></option>
    </me-radio-group>
    <me-radio-group label="Danger" color="danger" name="color-danger" value="1" orientation="horizontal">
      <option value="1" label="Option 1"></option>
      <option value="2" label="Option 2"></option>
    </me-radio-group>
  </div>
</div>

<me-radio-group 
  id="demo-required" 
  label="Required Field *" 
  name="demo-required"
  required>

  <option value="yes" label="I accept the terms"></option>
  <option value="no" label="I do not accept the terms"></option>
</me-radio-group>

<me-radio-group 
  id="demo-groups" 
  label="With nested groups" 
  name="demo-groups">

  <fieldset style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
    <legend style="padding: 0 0.5rem; font-weight: bold;">User Type</legend>
    <option value="personal" label="Personal" name="user-type"></option>
    <option value="business" label="Business" name="user-type"></option>
  </fieldset>
  
  <fieldset style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px;">
    <legend style="padding: 0 0.5rem; font-weight: bold;">Experience Level</legend>
    <option value="beginner" label="Beginner" name="experience"></option>
    <option value="intermediate" label="Intermediate" name="experience"></option>
    <option value="advanced" label="Advanced" name="experience"></option>
  </fieldset>
</me-radio-group>

## HTML Structure

The radio group component can be used in two ways:

### Way 1: With child elements

```html
<me-radio-group label="My Selection" name="my-selection">
  <option value="option1" label="First Option"></option>
  <option value="option2" label="Second Option"></option>
  <option value="option3" label="Third Option"></option>
</me-radio-group>
```

### Way 2: With traditional options

```html
<me-radio-group label="Traditional Selection" name="traditional">
  <option value="option1">First Option</option>
  <option value="option2">Second Option</option>
  <option value="option3">Third Option</option>
</me-radio-group>
```

## Group Properties

| Property      | Type             | Default      | Description                             |
| ------------- | ---------------- | ------------ | --------------------------------------- |
| `orientation` | `string`         | `'vertical'` | Orientation (vertical, horizontal)      |
| `name`        | `string`         | `''`         | Name for forms                          |
| `value`       | `string`         | `''`         | Selected value                          |
| `disabled`    | `boolean`        | `false`      | Disables the entire group               |
| `required`    | `boolean`        | `false`      | Required field in forms                 |
| `label`       | `string`         | `''`         | Visible group label                     |
| `options`     | `SelectOption[]` | `[]`         | Array of options (alternative to slots) |

### Type Definition

#### SelectOption

```typescript
interface SelectOption {
  label: string;
  value: string;
  group?: string;
  disabled?: boolean;
  [key: string]: unknown;
}
```

## Individual Radio Properties

| Property   | Type      | Default | Description           |
| ---------- | --------- | ------- | --------------------- |
| `value`    | `string`  | -       | Option value          |
| `label`    | `string`  | `''`    | Label text            |
| `checked`  | `boolean` | `false` | Option selected       |
| `disabled` | `boolean` | `false` | Option disabled       |
| `name`     | `string`  | `''`    | Group name (optional) |

## Events

| Event     | Description                  |
| --------- | ---------------------------- |
| `change`  | Fires when selection changes |
| `focus`   | Fires when focus is gained   |
| `blur`    | Fires when focus is lost     |
| `invalid` | Fires with failed validation |

## Usage Examples

### Horizontal Radio Group

```html
<me-radio-group
  label="Do you agree?"
  name="agreement"
  orientation="horizontal"
  required
>
  <option value="yes" label="Yes"></option>
  <option value="no" label="No"></option>
  <option value="na" label="N/A"></option>
</me-radio-group>
```

### Radio Group with Validation

```html
<me-radio-group
  label="Payment Method *"
  name="paymentMethod"
  required
  error="You must select a payment method"
>
  <option value="credit" label="Credit Card"></option>
  <option value="debit" label="Debit Card"></option>
  <option value="paypal" label="PayPal"></option>
  <option value="transfer" label="Bank Transfer"></option>
</me-radio-group>
```

### Radio Group with Nested Groups

```html
<me-radio-group label="Notification Settings" name="notifications">
  <fieldset
    style="border: 1px solid #d1d5db; padding: 1rem; border-radius: 6px;"
  >
    <legend>Email</legend>
    <option value="email-all" name="email" label="All notifications"></option>
    <option
      value="email-important"
      name="email"
      label="Important only"
    ></option>
    <option value="email-none" name="email" label="None"></option>
  </fieldset>

  <fieldset
    style="border: 1px solid #d1d5db; padding: 1rem; border-radius: 6px; margin-top: 1rem;"
  >
    <legend>SMS</legend>
    <option value="sms-all" name="sms" label="All notifications"></option>
    <option value="sms-important" name="sms" label="Urgent only"></option>
    <option value="sms-none" name="sms" label="None"></option>
  </fieldset>
</me-radio-group>
```

### Radio Group with "Other" Option

```html
<me-radio-group label="How did you hear about us?" name="referral" required>
  <option value="google" label="Google / Search"></option>
  <option value="social" label="Social Media"></option>
  <option value="friend" label="Friend Recommendation"></option>
  <option value="advertisement" label="Advertisement"></option>
  <option value="other" label="Other"></option>
</me-radio-group>
```

## Form Integration

### Profile Settings Form

```html
<form id="profile-form">
  <me-radio-group
    label="Subscription Plan *"
    name="plan"
    required
    orientation="vertical"
  >
    <option value="basic" label="Basic Plan - Free"></option>
    <option value="pro" label="Pro Plan - €9.99/mo"></option>
    <option value="enterprise" label="Enterprise Plan - €29.99/mo"></option>
  </me-radio-group>

  <me-radio-group
    label="Notification Frequency"
    name="frequency"
    orientation="horizontal"
  >
    <option value="immediate" label="Immediate"></option>
    <option value="daily" label="Daily"></option>
    <option value="weekly" label="Weekly"></option>
    <option value="never" label="Never"></option>
  </me-radio-group>

  <me-radio-group label="Theme Preferences" name="theme">
    <option value="light" label="Light"></option>
    <option value="dark" label="Dark"></option>
    <option value="auto" label="Auto (System)"></option>
  </me-radio-group>

  <button type="submit" variant="primary">Save Settings</button>
</form>
```

```javascript
const form = document.getElementById("profile-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    if (!data.plan) {
      alert("Please select a subscription plan");
      return;
    }

    console.log("Profile settings:", data);

    let planDescription = "";
    switch (data.plan) {
      case "basic":
        planDescription = "Basic Plan (Free)";
        break;
      case "pro":
        planDescription = "Pro Plan (€9.99/mo)";
        break;
      case "enterprise":
        planDescription = "Enterprise Plan (€29.99/mo)";
        break;
    }

    alert(`Settings saved successfully!\nPlan: ${planDescription}`);
  });
}
```

## Form Demo

<me-playground-form id="radio-playground" schema-name="radio" title="Satisfaction Survey" description="Single selection questions with validation.">
  <div style="margin-bottom: 1.5rem;">
    <me-radio-group 
      label="Do you like this component? *"
      name="opinion"
      required
      orientation="horizontal">
      <option value="love_it" label="Love it!"></option>
      <option value="like_it" label="Like it"></option>
      <option value="acceptable" label="It's acceptable"></option>
      <option value="dislike_it" label="Don't like it"></option>
    </me-radio-group>
  </div>
  
  <div style="margin-bottom: 1.5rem;">
    <me-radio-group 
      label="Web Components Experience Level"
      name="experience"
      orientation="vertical">
      <option value="beginner" label="🟢 Beginner - First time"></option>
      <option value="intermediate" label="🟡 Intermediate - Some experience"></option>
      <option value="advanced" label="🔴 Advanced - Expert"></option>
    </me-radio-group>
  </div>
  
  <div style="margin-bottom: 1.5rem;">
    <me-radio-group 
      label="Usage Preference"
      name="preference"
      orientation="horizontal">
      <option value="code" label="💻 Code"></option>
      <option value="visual" label="🎨 Visual Interfaces"></option>
      <option value="both" label="⚖️ Both"></option>
    </me-radio-group>
  </div>
</me-playground-form>

<div id="radio-result" style="margin-top: 1rem; padding: 1rem; background: #f3f4f6; border-radius: 6px; display: none;">
  <strong>Survey Results:</strong>
  <div id="radio-details"></div>
</div>

## Customization with CSS

### CSS Variables

```css
me-radio-group {
  --me-radio-size: 20px;
  --me-radio-color: #3b82f6;
  --me-radio-border-color: #d1d5db;
  --me-radio-focus-color: #2563eb;
  --me-radio-disabled-opacity: 0.5;
  --me-radio-label-color: #374151;
  --me-radio-label-font-size: 14px;
  --me-radio-spacing: 8px;
  --me-radio-group-gap: 12px;
}
```

### Customization Examples

<style>
  .custom-radio-group {
    --me-radio-color: #10b981;
    --me-radio-focus-color: #059669;
    --me-radio-border-color: #10b981;
  }
  
  .minimal-radio-group {
    --me-radio-size: 16px;
    --me-radio-spacing: 6px;
    --me-radio-group-gap: 8px;
  }
  
  .dark-radio-group {
    --me-radio-color: #8b5cf6;
    --me-radio-focus-color: #7c3aed;
    --me-radio-border-color: #6b7280;
    --me-radio-label-color: #f9fafb;
    --me-radio-group-bg: #1f2937;
  }
</style>

<div class="custom-radio-group" style="margin-bottom: 1rem;">
  <me-radio-group 
    label="Custom Radio"
    name="custom"
    value="option2">
    <option value="option1" label="Green Option"></option>
    <option value="option2" label="Selected Option"></option>
    <option value="option3" label="Another Option"></option>
  </me-radio-group>
</div>

<div class="minimal-radio-group" style="margin-bottom: 1rem;">
  <me-radio-group 
    label="Minimal Radio"
    name="minimal"
    value="minimal2">
    <option value="minimal1" label="Small"></option>
    <option value="minimal2" label="Compact"></option>
    <option value="minimal3" label="Discrete"></option>
  </me-radio-group>
</div>

<div class="dark-radio-group">
  <me-radio-group 
    label="Dark Theme"
    name="dark"
    value="dark2">
    <option value="dark1" label="Dark Mode"></option>
    <option value="dark2" label="Night Theme"></option>
    <option value="dark3" label="Black Theme"></option>
  </me-radio-group>
</div>

## Advanced Features

### Dynamic Radio Group

```javascript
const radioGroup = document.querySelector("me-radio-group");
if (radioGroup) {
  // Add options dynamically
  function addOption(value, label) {
    const radio = document.createElement("me-radio");
    radio.value = value;
    radio.label = label;
    radioGroup.appendChild(radio);
  }

  // Remove option
  function removeOption(value) {
    const radio = radioGroup.querySelector(`me-radio[value="${value}"]`);
    if (radio) {
      radio.remove();
    }
  }

  // Get all options
  function getOptions() {
    return Array.from(radioGroup.querySelectorAll("me-radio"));
  }
}
```

### Custom Validation

```javascript
const radioGroup = document.querySelector("me-radio-group[required]");
if (radioGroup) {
  radioGroup.addEventListener("invalid", (e) => {
    // Custom validation
    if (!radioGroup.value) {
      console.log("⚠️ You must select an option");
    }
  });

  // Related group validation
  radioGroup.addEventListener("change", (e) => {
    if (e.target.value === "special") {
      // Show additional fields
      showAdditionalFields();
    }
  });
}
```

### Radio Group with Images

```html
<me-radio-group label="Select an icon" name="icon">
  <option value="home" label="🏠 Home"></option>
  <option value="user" label="👤 User"></option>
  <option value="settings" label="⚙️ Settings"></option>
  <option value="help" label="❓ Help"></option>
</me-radio-group>
```

## Accessibility

The MelserRadioGroup component includes:

- **Keyboard Navigation**: Arrows, Tab, Space, Enter
- **Screen Reader Announcements**: Selection and changes announced
- **ARIA groups**: Appropriate role="radiogroup"
- **Focus Management**: Clear visual indicator
- **Disabled States**: Correctly announced

## Best Practices

1. **Always include a label** for the entire group
2. **Use horizontal orientation** for few options (2-3)
3. **Use vertical orientation** for many options
4. **Group related options** logically
5. **Include validation** for required fields
6. **Provide immediate feedback** to the user
7. **Consider option order** by relevance/frequency

## Troubleshooting

### Radio button not responding

```javascript
// Verify group has a name
radioGroup.name = "my-group";

// Verify individual radio has value
radio.value = "my-value";
```

### Validation not working

```html
<!-- Ensure required is on the group -->
<me-radio-group required label="Required field">
  <option value="op1" label="Option 1"></option>
  <option value="op2" label="Option 2"></option>
</me-radio-group>
```

### Orientation not changing

```html
<!-- Verify orientation is configured -->
<me-radio-group orientation="horizontal" label="Horizontal"></me-radio-group>
```

### Focus not visible

```css
/* Customize focus indicator */
me-radio:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
```

### Options not aligning

```css
/* Align radio buttons horizontally */
me-radio-group[orientation="horizontal"] {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

me-radio-group[orientation="horizontal"] option {
  display: flex;
  align-items: center;
}
```

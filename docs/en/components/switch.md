---
title: MelserSwitch
---

# MelserSwitch

A modern and accessible switch/toggle component to activate/deactivate options with smooth animations and clear visual states.

## Basic Example

```html
<me-switch label="Enable notifications" checked> </me-switch>
```

## Interactive Demo

<me-switch
  id="demo-basic"
  label="Basic switch">
</me-switch>

<me-switch
  id="demo-checked"
  label="Switch on by default"
  checked>
</me-switch>

<me-switch
  id="demo-disabled"
  label="Disabled switch"
  disabled
  checked>
</me-switch>

<me-switch
  id="demo-sizes"
  label="Different sizes">
</me-switch>

<div style="margin: 1rem 0; display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
  <me-switch size="sm" label="Small"></me-switch>
  <me-switch size="md" label="Medium"></me-switch>
  <me-switch size="lg" label="Large"></me-switch>
</div>

<me-switch
  id="demo-colors"
  label="Different colors">
</me-switch>

<div style="margin: 1rem 0; display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
  <me-switch color="primary" label="Primary" checked></me-switch>
  <me-switch color="success" label="Success" checked></me-switch>
  <me-switch color="warning" label="Warning" checked></me-switch>
  <me-switch color="danger" label="Danger" checked></me-switch>
</div>

<me-switch
  id="demo-text"
  label="With custom text"
  checked-text="ON"
  unchecked-text="OFF">
</me-switch>

## Properties

| Property         | Type      | Default     | Description                                      |
| :--------------- | :-------- | :---------- | :----------------------------------------------- |
| `checked`        | `boolean` | `false`     | Active/inactive state                            |
| `disabled`       | `boolean` | `false`     | Disables interaction                             |
| `size`           | `string`  | `'md'`      | Switch size (sm, md, lg)                         |
| `color`          | `string`  | `'primary'` | Switch color (primary, success, warning, danger) |
| `checked-text`   | `string`  | `''`        | Text shown when active                           |
| `unchecked-text` | `string`  | `''`        | Text shown when inactive                         |
| `label`          | `string`  | `''`        | Visible label for the switch                     |
| `name`           | `string`  | `''`        | Name for forms                                   |
| `value`          | `string`  | `'on'`      | Value when active                                |
| `required`       | `boolean` | `false`     | Required field in forms                          |
| `loading`        | `boolean` | `false`     | Loading state                                    |

## Events

| Event    | Description                      |
| :------- | :------------------------------- |
| `change` | Fires when state changes         |
| `focus`  | Fires when component gains focus |
| `blur`   | Fires when component loses focus |
| `input`  | Fires during interaction         |

## Usage Examples

### Basic Settings Switch

```html
<me-switch label="Enable dark mode" checked> </me-switch>
```

### Switch with Validation

```html
<me-switch
  label="I accept terms of service *"
  name="acceptTerms"
  required
  error="You must accept terms to continue"
>
</me-switch>
```

### Switch with Loading States

```html
<me-switch label="Sync to cloud" loading disabled> </me-switch>
```

### Switch with Custom Texts

```html
<me-switch
  label="Server Status"
  checked-text="ACTIVE"
  unchecked-text="INACTIVE"
  color="success"
>
</me-switch>
```

## Form Integration

### Profile Settings Form

```html
<form id="settings-form">
  <div
    style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;"
  >
    <h4>🔔 Notification Preferences</h4>

    <me-switch label="Email notifications" name="emailNotifications" checked>
    </me-switch>

    <me-switch label="Push notifications" name="pushNotifications" checked>
    </me-switch>

    <me-switch label="Marketing notifications" name="marketingNotifications">
    </me-switch>
  </div>

  <button type="submit">Save Settings</button>
</form>
```

```javascript
document.getElementById("settings-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  // Process settings
});
```

## Playground Demo

<me-playground-form id="switch-playground" schema-name="switch" title="Settings" description="Configuration example with switches and Zod validation.">
  <div style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
    <h4>⚡ Quick Settings</h4>

<me-switch
    label="Enable premium features"
    name="premium">
</me-switch>

<me-switch
    label="Developer mode"
    name="dev">
</me-switch>

<me-switch
    label="Auto-save"
    name="autosave"
    checked>
</me-switch>

  </div>
  
  <div style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
    <h4>🎮 Game Options</h4>

<me-switch
    label="Sound enabled"
    name="sound"
    checked
    color="success">
</me-switch>

<me-switch
    label="Background music"
    name="music"
    checked
    color="primary">
</me-switch>

<me-switch
    label="Vibration"
    name="vibration"
    color="warning">
</me-switch>

<me-switch
    label="Game notifications"
    name="gameNotifications"
    checked
    color="primary">
</me-switch>

  </div>
</me-playground-form>

## CSS Customization

### CSS Variables

```css
me-switch {
  --me-switch-width: 44px;
  --me-switch-height: 24px;
  --me-switch-thumb-size: 20px;
  --me-switch-bg-off: #e5e7eb;
  --me-switch-bg-on: #3b82f6;
  --me-switch-thumb-bg: #ffffff;
  --me-switch-border-radius: 12px;
  --me-switch-transition: all 0.2s ease;
  --me-switch-focus-ring: 0 0 0 2px rgba(59, 130, 246, 0.5);
}
```

### Custom Sizes

<style>
  .custom-switch-sizes {
    --me-switch-width-sm: 32px;
    --me-switch-height-sm: 18px;
    --me-switch-thumb-size-sm: 14px;

    --me-switch-width-lg: 60px;
    --me-switch-height-lg: 32px;
    --me-switch-thumb-size-lg: 28px;
  }
  
  .dark-theme-switch {
    --me-switch-bg-off: #374151;
    --me-switch-bg-on: #8b5cf6;
    --me-switch-thumb-bg: #f9fafb;
  }
  
  .minimal-switch {
    --me-switch-transition: all 0.1s ease;
    --me-switch-border-radius: 2px;
  }
</style>

<div class="custom-switch-sizes" style="margin-bottom: 1rem;">
  <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
    <me-switch size="sm" label="Small custom"></me-switch>
    <me-switch size="md" label="Medium normal"></me-switch>
    <me-switch size="lg" label="Large custom"></me-switch>
  </div>
</div>

<div class="dark-theme-switch" style="margin-bottom: 1rem;">
  <me-switch
    label="Dark theme switch"
    checked
    color="primary">
  </me-switch>
</div>

<div class="minimal-switch">
  <me-switch
    label="Minimalist switch"
    checked>
  </me-switch>
</div>

## Advanced Features

### Interconnected Switches

```javascript
const switches = document.querySelectorAll("me-switch");
switches.forEach((switchEl) => {
  switchEl.addEventListener("change", (e) => {
    // Handle dependencies between switches
    if (switchEl.name === "premium" && e.target.checked) {
      enablePremiumFeatures();
    }
  });
});
```

### Switch with Async States

```javascript
const asyncSwitch = document.querySelector("me-switch[loading]");
if (asyncSwitch) {
  asyncSwitch.addEventListener("change", async (e) => {
    const isChecked = e.target.checked;
    asyncSwitch.setAttribute("loading", "");
    // Simulate API
    setTimeout(() => asyncSwitch.removeAttribute("loading"), 1000);
  });
}
```

## Accessibility

- **Keyboard navigation**: Tab, Space, Enter work.
- **Screen reader announcements**: State changes announced.
- **ARIA attributes**: role="switch", aria-checked, aria-disabled.
- **Focus management**: Clear visual indicator.
- **Accessible states**: Disabled and loading correctly announced.

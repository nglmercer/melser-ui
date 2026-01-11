---
title: MelserModal
---

# MelserModal

A fully accessible, customizable modal component with ARIA support, keyboard navigation, focus management, and flexible slots for content customization.

## Key Features

- ♿ **Accessibility First:** Full ARIA support, keyboard navigation, and focus trapping.
- 🔒 **Focus Management:** Automatic focus capture and restoration when opening/closing.
- 🎭 **Flexible Slots:** Fully customizable content without predefined styles.
- 🌙 **Backdrop Control:** Configurable backdrop with blur effect.
- ⌨️ **Keyboard Support:** Escape to close, Tab/Shift+Tab to navigate.
- 🎯 **Auto Close:** The `x` attribute to close modal from any element.

## Basic Example

```html
<me-modal id="basic-modal" open>
  <div>
    <h2>Modal Title</h2>
    <p>This is the modal content. You can put any HTML here.</p>
    <button x>×</button>
    <button>Cancel</button>
    <button>Confirm</button>
  </div>
</me-modal>
```

## Interactive Demo

<div style="display: flex; flex-direction: column; gap: 1rem;">
  <button data-modal-open="basic-modal" style="padding: 0.5rem 1rem; cursor: pointer;">Open Basic Modal</button>
  
  <me-modal id="basic-modal" aria-label="Basic Modal Example">
    <div style="padding: 1.5rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
        <h2 style="margin: 0;">Basic Modal</h2>
        <button x aria-label="Close" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; padding: 0.5rem;">×</button>
      </div>
      <p>This is a basic modal with fully customizable content. You can close it by clicking the × button, pressing Escape, or clicking the backdrop.</p>
      <div style="margin-top: 1.5rem; display: flex; gap: 0.5rem; justify-content: flex-end;">
        <button data-modal-close="basic-modal">Cancel</button>
        <button data-modal-close="basic-modal">OK</button>
      </div>
    </div>
  </me-modal>
</div>

### Custom Header

<div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
  <button data-modal-open="modal-custom-header" style="padding: 0.5rem 1rem; cursor: pointer;">Custom Header</button>
</div>

<me-modal id="modal-custom-header" aria-label="Custom Header Modal">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 1.5rem; color: white;">
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <h2 style="margin: 0; font-size: 1.5rem;">Custom Header</h2>
      <button x aria-label="Close" style="background: transparent; border: none; font-size: 1.5rem; cursor: pointer; color: white; padding: 0.5rem;">×</button>
    </div>
    <p style="margin: 0.5rem 0 0 0; opacity: 0.9;">With gradient background</p>
  </div>
  <div style="padding: 1.5rem;">
    <p>This modal has a completely custom header with gradient styling. All content is fully customizable.</p>
  </div>
</me-modal>

### Without Backdrop

<div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
  <button data-modal-open="modal-no-backdrop" style="padding: 0.5rem 1rem; cursor: pointer;">No Backdrop</button>
</div>

<me-modal id="modal-no-backdrop" show-backdrop="false" aria-label="Modal Without Backdrop">
  <div style="background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
      <h2 style="margin: 0;">No Backdrop</h2>
      <button x aria-label="Close" style="background: none; border: none; font-size: 1.5rem; cursor: pointer;">×</button>
    </div>
    <p>This modal has no backdrop overlay. You can only close it with the close button or Escape key.</p>
  </div>
</me-modal>

### Prevent Close on Backdrop Click

<div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
  <button data-modal-open="modal-no-backdrop-click" style="padding: 0.5rem 1rem; cursor: pointer;">No Backdrop Click</button>
</div>

<me-modal id="modal-no-backdrop-click" close-on-backdrop-click="false" aria-label="Modal That Prevents Backdrop Close">
  <div style="padding: 1.5rem;">
    <h2 style="margin-top: 0;">Confirm Action</h2>
    <p>This modal cannot be closed by clicking the backdrop. You must use the buttons or Escape key.</p>
    <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
      <button data-modal-close="modal-no-backdrop-click">Cancel</button>
      <button data-modal-close="modal-no-backdrop-click">Confirm</button>
    </div>
  </div>
</me-modal>

## Component API

### Properties

| Property               | Type                              | Default       | Description                                                    |
| ---------------------- | --------------------------------- | ------------- | -------------------------------------------------------------- |
| `open`                 | `boolean`                         | `false`       | Whether the modal is currently open.                           |
| `closeOnBackdropClick` | `boolean`                         | `true`        | Whether the modal can be closed by clicking the backdrop.     |
| `closeOnEscape`        | `boolean`                         | `true`        | Whether the modal can be closed by pressing Escape key.       |
| `trapFocus`            | `boolean`                         | `true`        | Whether to trap focus within the modal.                       |
| `ariaLabel`            | `string \| null`                  | `null`        | ARIA label for the modal (for screen readers).                |
| `ariaDescribedby`      | `string \| null`                  | `null`        | ARIA describedby element ID.                                  |
| `showBackdrop`         | `boolean`                         | `true`        | Whether to show the backdrop overlay.                         |
| `centered`             | `boolean`                         | `true`        | Whether to center the modal vertically.                       |
| `containerClass`       | `string \| undefined`             | `undefined`   | Custom class for the modal container.                         |

### Special Attribute: `x`

The `x` attribute can be added to any element within the modal to act as a close button:

```html
<button x>×</button>
<span x>Close</span>
<div x role="button" tabindex="0">Close</div>
```

Clicking any element with the `x` attribute will automatically close the modal.

### Shadow Parts (For Advanced CSS)

Use `::part(name)` to style internal elements without variables.

| Part            | Description                              |
| --------------- | ---------------------------------------- |
| `backdrop`      | The backdrop overlay element.            |
| `modal`         | The main modal container.                |

### Events

| Event         | Detail (`e.detail`) | Description                                   |
| ------------- | ------------------- | --------------------------------------------- |
| `open`        | `{ modal }`         | Dispatched when modal opens.                  |
| `close`       | `{ modal }`         | Dispatched when modal closes.                 |
| `before-close`| `{ modal }`         | Dispatched before modal closes (can be prevented). |

### Public Methods

| Method      | Description                    |
| ----------- | ------------------------------ |
| `openModal()`| Open the modal.               |
| `close()`   | Close the modal.              |
| `toggle()`  | Toggle the modal open/closed state. |

## Customization Guide

### 1. Basic Structure

The modal is fully customizable without predefined styles:

```html
<me-modal id="my-modal">
  <!-- Fully customized content -->
  <div style="background: white; padding: 2rem; border-radius: 12px; max-width: 500px;">
    <header style="display: flex; justify-content: space-between; align-items: center;">
      <h2>Custom Title</h2>
      <button x aria-label="Close">×</button>
    </header>
    <main style="margin: 1.5rem 0;">
      <p>Modal content...</p>
    </main>
    <footer style="display: flex; gap: 0.5rem; justify-content: flex-end;">
      <button>Cancel</button>
      <button>Confirm</button>
    </footer>
  </div>
</me-modal>
```

### 2. Customization via CSS (Variables)

Override theme variables for custom styling:

```css
/* In your global stylesheet or parent component */
.my-custom-modal {
  /* Backdrop styling */
  --me-modal-backdrop-bg: rgba(0, 0, 0, 0.7);
  --me-modal-backdrop-blur: 4px;
  
  /* Modal styling */
  --me-modal-bg: #ffffff;
  --me-modal-border-color: #e0e0e0;
  --me-modal-radius: 12px;
  --me-modal-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  
  /* Dimensions */
  --me-modal-width: 600px;
  --me-modal-max-width: 90vw;
  --me-modal-max-height: 85vh;
}
```

```html
<me-modal class="my-custom-modal">
  <div style="padding: 1.5rem;">
    <h2>Custom Styled Modal</h2>
    <p>This modal uses custom CSS variables for the backdrop.</p>
    <button x>×</button>
  </div>
</me-modal>
```

### 3. Surgical Customization (Shadow Parts)

For changes that variables don't cover, use `::part`:

```css
/* Custom backdrop styling */
me-modal::part(backdrop) {
  background: rgba(255, 0, 0, 0.2);
  backdrop-filter: blur(8px);
}

/* Custom modal wrapper */
me-modal::part(modal) {
  max-width: 800px;
}
```

### 4. Using the `x` Attribute

The `x` attribute allows closing the modal from any element:

```html
<me-modal>
  <div style="padding: 1.5rem;">
    <!-- Close button with × -->
    <button x style="float: right; background: none; border: none; font-size: 1.5rem;">×</button>
    
    <h2>Title</h2>
    <p>Content...</p>
    
    <!-- Close button with text -->
    <button x>Close</button>
    
    <!-- Any element can close the modal -->
    <div x role="button" tabindex="0" style="cursor: pointer; padding: 0.5rem; background: #f0f0f0;">
      Click to close
    </div>
  </div>
</me-modal>
```

## Event Handling

Listen to modal events for custom behavior:

```javascript
const modal = document.getElementById('my-modal');

// Listen for open event
modal.addEventListener('open', (e) => {
  console.log('Modal opened', e.detail);
  // Load data, focus elements, etc.
});

// Listen for close event
modal.addEventListener('close', (e) => {
  console.log('Modal closed', e.detail);
  // Clean up, save state, etc.
});

// Prevent close (e.g., unsaved changes)
modal.addEventListener('before-close', (e) => {
  if (hasUnsavedChanges) {
    e.preventDefault(); // Prevent modal from closing
    alert('Please save your changes first!');
  }
});
```

## Accessibility

The modal includes comprehensive accessibility features:

- **ARIA Attributes:** `role="dialog"`, `aria-modal="true"`, `aria-label`, `aria-describedby`
- **Keyboard Navigation:** Escape to close, Tab/Shift+Tab to navigate
- **Focus Management:** Automatic focus capture and restoration
- **Screen Reader Support:** Proper labeling and descriptions
- **Reduced Motion:** Respects `prefers-reduced-motion` preference

### Custom ARIA Labels

```html
<me-modal aria-label="Delete Confirmation" aria-describedby="delete-desc">
  <div style="padding: 1.5rem;">
    <h2>Delete Item</h2>
    <p id="delete-desc">Are you sure you want to delete this item? This action cannot be undone.</p>
    <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
      <button data-modal-close="delete-modal">Cancel</button>
      <button data-modal-close="delete-modal">Delete</button>
    </div>
  </div>
</me-modal>
```

## Troubleshooting

**Modal not closing on backdrop click:**

Check if `closeOnBackdropClick` is set to `false`:

```html
<me-modal close-on-backdrop-click="false">
  <!-- Modal content -->
</me-modal>
```

**Focus not trapped in modal:**

Ensure `trapFocus` is enabled (default is `true`):

```html
<me-modal trap-focus="true">
  <!-- Modal content -->
</me-modal>
```

**Button with `x` attribute not closing modal:**

Make sure the element with the `x` attribute is inside the modal:

```html
<me-modal>
  <div>
    <button x>×</button>  <!-- This will work -->
  </div>
</me-modal>
```

**Modal content too tall for screen:**

Add overflow to your modal container:

```css
.modal-content {
  max-height: 70vh;
  overflow-y: auto;
}
```

**Animation issues on slow devices:**

The modal respects `prefers-reduced-motion`. You can also disable transitions:

```css
me-modal::part(backdrop),
me-modal::part(modal) {
  transition: none !important;
}
```

**Modal not visible on mobile:**

The modal has responsive styles. Ensure viewport meta tag is set:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

## Best Practices

1. **Always provide a title** or `aria-label` for accessibility
2. **Use descriptive ARIA labels** when title doesn't fully explain modal's purpose
3. **Provide clear action buttons** for closing or confirming
4. **Consider the `before-close` event** for unsaved changes warnings
5. **Test keyboard navigation** to ensure all interactive elements are reachable
6. **Keep modals focused** on a single task or action
7. **Use the `x` attribute** for close elements instead of adding manual event listeners
8. **Add `aria-label` to close buttons** with `x` when using symbols like ×

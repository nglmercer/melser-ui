---
title: MelserModal
---

# MelserModal

A fully accessible, customizable modal component with ARIA support, keyboard navigation, focus management, and flexible slots for content customization.

## Key Features

- 🎨 **Multiple Size Variants:** `sm`, `md`, `lg`, `xl`, and `full` screen options.
- ♿ **Accessibility First:** Full ARIA support, keyboard navigation, and focus trapping.
- 🔒 **Focus Management:** Automatic focus capture and restoration when opening/closing.
- 🎭 **Flexible Slots:** Customizable header, title, body, and action buttons.
- 🌙 **Backdrop Control:** Configurable backdrop with blur effect.
- ⌨️ **Keyboard Support:** Escape to close, Tab/Shift+Tab to navigate.

## Basic Example

```html
<me-modal open>
  <span slot="title">Modal Title</span>
  <p>This is the modal content. You can put any HTML here.</p>
  <div slot="actions">
    <button>Cancel</button>
    <button>Confirm</button>
  </div>
</me-modal>
```

## Interactive Demo

<div style="display: flex; flex-direction: column; gap: 1rem;">
  <button data-modal-open="basic-modal" style="padding: 0.5rem 1rem; cursor: pointer;">Open Basic Modal</button>
  
  <me-modal id="basic-modal" aria-label="Basic Modal Example">
    <span slot="title">Basic Modal</span>
    <p>This is a basic modal with default settings. You can close it by clicking the backdrop, pressing Escape, or clicking the X button.</p>
    <div slot="actions">
      <button data-modal-close="basic-modal">Cancel</button>
      <button data-modal-close="basic-modal">OK</button>
    </div>
  </me-modal>
</div>

### Size Variants

<div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
  <button data-modal-open="modal-sm" style="padding: 0.5rem 1rem; cursor: pointer;">Small</button>
  <button data-modal-open="modal-md" style="padding: 0.5rem 1rem; cursor: pointer;">Medium</button>
  <button data-modal-open="modal-lg" style="padding: 0.5rem 1rem; cursor: pointer;">Large</button>
  <button data-modal-open="modal-xl" style="padding: 0.5rem 1rem; cursor: pointer;">Extra Large</button>
  <button data-modal-open="modal-full" style="padding: 0.5rem 1rem; cursor: pointer;">Full Screen</button>
</div>

<me-modal id="modal-sm" size="sm" aria-label="Small Modal">
  <span slot="title">Small Modal</span>
  <p>Size: sm (400px)</p>
  <div slot="actions">
    <button data-modal-close="modal-sm">Close</button>
  </div>
</me-modal>

<me-modal id="modal-md" size="md" aria-label="Medium Modal">
  <span slot="title">Medium Modal</span>
  <p>Size: md (500px)</p>
  <div slot="actions">
    <button data-modal-close="modal-md">Close</button>
  </div>
</me-modal>

<me-modal id="modal-lg" size="lg" aria-label="Large Modal">
  <span slot="title">Large Modal</span>
  <p>Size: lg (700px)</p>
  <div slot="actions">
    <button data-modal-close="modal-lg">Close</button>
  </div>
</me-modal>

<me-modal id="modal-xl" size="xl" aria-label="Extra Large Modal">
  <span slot="title">Extra Large Modal</span>
  <p>Size: xl (900px)</p>
  <div slot="actions">
    <button data-modal-close="modal-xl">Close</button>
  </div>
</me-modal>

<me-modal id="modal-full" size="full" aria-label="Full Screen Modal">
  <span slot="title">Full Screen Modal</span>
  <p>Size: full (95vw)</p>
  <div slot="actions">
    <button data-modal-close="modal-full">Close</button>
  </div>
</me-modal>

### Custom Header

<div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
  <button data-modal-open="modal-custom-header" style="padding: 0.5rem 1rem; cursor: pointer;">Custom Header</button>
</div>

<me-modal id="modal-custom-header" aria-label="Custom Header Modal">
  <div slot="header" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 1.5rem; color: white;">
    <h2 style="margin: 0; font-size: 1.5rem;">Custom Header</h2>
    <p style="margin: 0.5rem 0 0 0; opacity: 0.9;">With gradient background</p>
  </div>
  <p>This modal has a completely custom header with gradient styling.</p>
  <div slot="actions">
    <button data-modal-close="modal-custom-header">Close</button>
  </div>
</me-modal>

### Without Backdrop

<div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
  <button data-modal-open="modal-no-backdrop" style="padding: 0.5rem 1rem; cursor: pointer;">No Backdrop</button>
</div>

<me-modal id="modal-no-backdrop" show-backdrop="false" aria-label="Modal Without Backdrop">
  <span slot="title">No Backdrop</span>
  <p>This modal has no backdrop overlay. You can only close it with the close button or Escape key.</p>
  <div slot="actions">
    <button data-modal-close="modal-no-backdrop">Close</button>
  </div>
</me-modal>

### Prevent Close on Backdrop Click

<div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
  <button data-modal-open="modal-no-backdrop-click" style="padding: 0.5rem 1rem; cursor: pointer;">No Backdrop Click</button>
</div>

<me-modal id="modal-no-backdrop-click" close-on-backdrop-click="false" aria-label="Modal That Prevents Backdrop Close">
  <span slot="title">Confirm Action</span>
  <p>This modal cannot be closed by clicking the backdrop. You must use the buttons or Escape key.</p>
  <div slot="actions">
    <button data-modal-close="modal-no-backdrop-click">Cancel</button>
    <button data-modal-close="modal-no-backdrop-click">Confirm</button>
  </div>
</me-modal>

## Component API

### Properties

| Property               | Type                              | Default       | Description                                                    |
| ---------------------- | --------------------------------- | ------------- | -------------------------------------------------------------- |
| `open`                 | `boolean`                         | `false`       | Whether the modal is currently open.                           |
| `size`                 | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'`    | Modal size variant.                                            |
| `closeOnBackdropClick` | `boolean`                         | `true`        | Whether the modal can be closed by clicking the backdrop.     |
| `closeOnEscape`        | `boolean`                         | `true`        | Whether the modal can be closed by pressing Escape key.       |
| `showCloseButton`      | `boolean`                         | `true`        | Whether to show the close button in the header.               |
| `trapFocus`            | `boolean`                         | `true`        | Whether to trap focus within the modal.                       |
| `ariaLabel`            | `string \| null`                  | `null`        | ARIA label for the modal (for screen readers).                |
| `ariaDescribedby`      | `string \| null`                  | `null`        | ARIA describedby element ID.                                  |
| `showBackdrop`         | `boolean`                         | `true`        | Whether to show the backdrop overlay.                         |
| `centered`             | `boolean`                         | `true`        | Whether to center the modal vertically.                       |
| `containerClass`       | `string \| undefined`             | `undefined`   | Custom class for the modal container.                          |

### Shadow Parts (For Advanced CSS)

Use `::part(name)` to style internal elements without variables.

| Part            | Description                              |
| --------------- | ---------------------------------------- |
| `backdrop`      | The backdrop overlay element.            |
| `modal`         | The main modal container.                |
| `header`        | The header section.                      |
| `title`         | The title element within the header.         |
| `close-button`  | The close button in the header.          |
| `body`          | The main content/body section.           |
| `footer`        | The footer/action buttons section.        |

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

### 1. Size Variants

Choose from five predefined size options:

```html
<!-- Small (400px) -->
<me-modal size="sm">
  <span slot="title">Small Modal</span>
  <p>Content here...</p>
</me-modal>

<!-- Medium (500px) - Default -->
<me-modal size="md">
  <span slot="title">Medium Modal</span>
  <p>Content here...</p>
</me-modal>

<!-- Large (700px) -->
<me-modal size="lg">
  <span slot="title">Large Modal</span>
  <p>Content here...</p>
</me-modal>

<!-- Extra Large (900px) -->
<me-modal size="xl">
  <span slot="title">Extra Large Modal</span>
  <p>Content here...</p>
</me-modal>

<!-- Full Screen (95vw) -->
<me-modal size="full">
  <span slot="title">Full Screen Modal</span>
  <p>Content here...</p>
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
  <span slot="title">Custom Styled Modal</span>
  <p>This modal uses custom CSS variables.</p>
</me-modal>
```

### 3. Surgical Customization (Shadow Parts)

For changes that variables don't cover, use `::part`:

```css
/* Custom header styling */
me-modal::part(header) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-bottom: none;
  padding: 2rem;
}

me-modal::part(title) {
  color: white;
  font-size: 1.75rem;
  font-weight: 700;
}

/* Custom close button */
me-modal::part(close-button) {
  color: white;
  opacity: 0.8;
}

me-modal::part(close-button):hover {
  opacity: 1;
  background: rgba(255, 255, 255, 0.2);
}

/* Custom body styling */
me-modal::part(body) {
  background: #f8f9fa;
  color: #333;
}

/* Custom footer styling */
me-modal::part(footer) {
  background: #f0f0f0;
  border-top: 2px solid #e0e0e0;
}
```

### 4. Using Slots

The modal provides flexible slots for content customization:

```html
<me-modal>
  <!-- Default header with title slot -->
  <span slot="title">Modal Title</span>
  
  <!-- OR completely custom header -->
  <div slot="header">
    <img src="logo.png" alt="Logo" style="height: 32px;">
    <h2>Custom Header</h2>
  </div>
  
  <!-- Default body slot (no slot name needed) -->
  <p>This is the main content.</p>
  
  <!-- Actions footer slot -->
  <div slot="actions">
    <button>Cancel</button>
    <button>Confirm</button>
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
  <span slot="title">Delete Item</span>
  <p id="delete-desc">Are you sure you want to delete this item? This action cannot be undone.</p>
  <div slot="actions">
    <button>Cancel</button>
    <button>Delete</button>
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

**Modal content too tall for screen:**

The modal body has `overflow-y: auto` for scrolling. Adjust the max height:

```css
me-modal::part(body) {
  max-height: 70vh;
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

1. **Always provide a title** using the `title` slot or `aria-label` for accessibility
2. **Use descriptive ARIA labels** when the title doesn't fully explain the modal's purpose
3. **Provide clear action buttons** in the footer slot
4. **Consider the `before-close` event** for unsaved changes warnings
5. **Test keyboard navigation** to ensure all interactive elements are reachable
6. **Keep modals focused** on a single task or action
7. **Use appropriate sizes** - `sm` for confirmations, `md` for forms, `lg` for complex content

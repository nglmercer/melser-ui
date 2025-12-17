---
title: MelserFileUpload
---

# MelserFileUpload

An advanced file upload component with drag & drop, preview, type validation, and upload progress.

## Basic Example

```html
<me-file-upload label="Upload File" accept="image/*,application/pdf">
</me-file-upload>
```

## Interactive Demo

<me-file-upload 
  id="demo-basic" 
  label="Basic File Upload" 
  accept="image/*,application/pdf"
  max-files="3">
</me-file-upload>

<me-file-upload 
  id="demo-dropzone" 
  label="Drag & Drop Zone" 
  drag-drop
  accept="image/*"
  max-size="5MB">
</me-file-upload>

<me-file-upload 
  id="demo-multiple" 
  label="Multiple Files" 
  accept="*/*"
  max-files="10"
  multiple
  show-preview>
</me-file-upload>

<h3>Colors</h3>
<div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
  <me-file-upload label="Success" color="success" accept="image/*"></me-file-upload>
  <me-file-upload label="Warning" color="warning" accept="image/*"></me-file-upload>
  <me-file-upload label="Danger" color="danger" accept="image/*"></me-file-upload>
</div>

## Properties

| Property       | Type                                              | Default     | Description             |
| :------------- | :------------------------------------------------ | :---------- | :---------------------- |
| `accept`       | `string`                                          | `''`        | Accepted file types     |
| `multiple`     | `boolean`                                         | `false`     | Allows multiple files   |
| `max-files`    | `number`                                          | `undefined` | Maximum number of files |
| `max-size`     | `string`                                          | `undefined` | Maximum size per file   |
| `min-size`     | `string`                                          | `undefined` | Minimum size per file   |
| `color`        | `'primary' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | Color scheme            |
| `required`     | `boolean`                                         | `false`     | Required field in forms |
| `disabled`     | `boolean`                                         | `false`     | Disables interaction    |
| `drag-drop`    | `boolean`                                         | `false`     | Enables drag & drop     |
| `show-preview` | `boolean`                                         | `false`     | Shows preview           |
| `crop`         | `boolean`                                         | `false`     | Allows image cropping   |
| `auto-upload`  | `boolean`                                         | `false`     | Uploads automatically   |
| `url`          | `string`                                          | `''`        | URL for file upload     |
| `label`        | `string`                                          | `''`        | Visible component label |
| `name`         | `string`                                          | `''`        | Name for forms          |

## Events

| Event             | Description                   |
| :---------------- | :---------------------------- |
| `change`          | Fires when files are selected |
| `file-added`      | Fires when a file is added    |
| `file-removed`    | Fires when a file is removed  |
| `upload-progress` | Fires during upload           |
| `upload-complete` | Fires when upload completes   |
| `upload-error`    | Fires with upload errors      |

## Usage Examples

### Image Upload with Preview

```html
<me-file-upload
  label="Profile Photo"
  name="profilePhoto"
  accept="image/*"
  max-files="1"
  show-preview
  crop
  required
  hint="JPG, PNG images only. Max 2MB"
>
</me-file-upload>
```

### Upload with Autosave

```html
<me-file-upload
  label="Attach Files"
  name="attachments"
  accept="*/*"
  multiple
  auto-upload
  url="/api/upload"
  show-progress
>
</me-file-upload>
```

### Upload with Custom Validation

```html
<me-file-upload
  label="Certificate"
  name="certificate"
  accept="application/pdf"
  max-size="5MB"
  required
  custom-validation="validateCertificate"
>
</me-file-upload>
```

## Form Integration

```html
<form id="registration-form">
  <me-file-upload
    label="ID Document *"
    name="idDocument"
    accept=".pdf,.jpg,.png"
    max-files="1"
    required
    show-preview
  >
  </me-file-upload>

  <me-file-upload
    label="Portfolio (Drag & Drop)"
    name="portfolio"
    accept="*/*"
    multiple
    max-files="5"
    drag-drop
  >
  </me-file-upload>

  <button type="submit">Submit</button>
</form>
```

```javascript
document.getElementById("registration-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  // Files are available in formData
  console.log("Document:", formData.get("idDocument"));
});
```

## Form Demo

<me-playground-form id="file-upload-playground" schema-name="file-upload" title="File Upload" description="File upload example with validation.">
<div style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
  <h4>📁 File Upload Example</h4>
  
  <me-file-upload 
    label="Select an image"
    name="demoImage"
    accept="image/*"
    max-files="1"
    max-size="3MB"
    show-preview>
  </me-file-upload>
</div>

<div style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
  <h4>📎 Multiple Files (Drag & Drop)</h4>
  
  <me-file-upload 
    label="Drag files here"
    name="demoFiles"
    accept="*/*"
    multiple
    max-files="5"
    max-size="10MB"
    drag-drop
    show-preview>
  </me-file-upload>
</div>
</me-playground-form>

## Customization with CSS

### CSS Variables

```css
me-file-upload {
  --me-upload-border: 2px dashed #d1d5db;
  --me-upload-border-hover: 2px dashed #3b82f6;
  --me-upload-bg: #f9fafb;
  --me-upload-text-color: #6b7280;
  --me-upload-focus-color: #3b82f6;
  --me-upload-error-color: #ef4444;
  --me-upload-preview-bg: #ffffff;
  --me-upload-progress-fill: #3b82f6;
}
```

### Customization Examples

<style>
  .custom-upload {
    --me-upload-border: 2px dashed #10b981;
    --me-upload-bg: #f0fdf4;
  }
</style>

<div class="custom-upload" style="margin-bottom: 1rem;">
  <me-file-upload 
    label="Custom Upload (Green)"
    accept="image/*"
    max-files="1"
    show-preview>
  </me-file-upload>
</div>

## Accessibility

- **Keyboard Navigation**: Tab, Enter, Space work to open the selector.
- **Screen Readers**: Announces states, errors, and selected files.
- **ARIA**: Correct labeling for drop regions and buttons.

---
title: MelserTextarea
---

# MelserTextarea

An advanced text area component with auto-resizing, character counter, and validation.

## Basic Example

```html
<me-textarea label="Comments" placeholder="Write your comments here...">
</me-textarea>
```

## Interactive Demo

<me-textarea 
  id="demo-basic" 
  label="Comments" 
  placeholder="Write something...">
</me-textarea>

<me-textarea 
  id="demo-resizable" 
  label="Resizable Area" 
  placeholder="You can change the size..."
  resizable>
</me-textarea>

<me-textarea 
  id="demo-counter" 
  label="With counter (500 max)" 
  placeholder="Write your message..."
  maxlength="500"
  show-counter>
</me-textarea>

<me-textarea 
  id="demo-fixed" 
  label="Fixed Height" 
  placeholder="This area cannot be resized"
  rows="4"
  resize="none">
</me-textarea>

## Properties

| Property       | Type      | Default     | Description                                         |
| -------------- | --------- | ----------- | --------------------------------------------------- |
| `rows`         | `number`  | `4`         | Number of visible rows                              |
| `cols`         | `number`  | `undefined` | Number of visible columns                           |
| `resize`       | `string`  | `'both'`    | Resize direction (none, horizontal, vertical, both) |
| `resizable`    | `boolean` | `true`      | Allows resizing                                     |
| `maxlength`    | `number`  | `undefined` | Maximum length allowed                              |
| `minlength`    | `number`  | `undefined` | Minimum length allowed                              |
| `show-counter` | `boolean` | `false`     | Shows character counter                             |
| `auto-resize`  | `boolean` | `false`     | Automatic resizing                                  |
| `label`        | `string`  | `''`        | Visible field label                                 |
| `placeholder`  | `string`  | `''`        | Placeholder text                                    |
| `value`        | `string`  | `''`        | Field value                                         |
| `disabled`     | `boolean` | `false`     | Disables interaction                                |
| `readonly`     | `boolean` | `false`     | Read-only                                           |
| `required`     | `boolean` | `false`     | Required field in forms                             |
| `wrap`         | `string`  | `'soft'`    | Line wrapping (soft, hard)                          |

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

### Textarea with Auto-Resize

```html
<me-textarea
  label="Detailed Description"
  placeholder="Describe your product or service..."
  auto-resize
  rows="3"
  maxlength="1000"
  show-counter
  hint="Adjusts automatically to content"
>
</me-textarea>
```

### Textarea with Validation

```html
<me-textarea
  label="Product Review *"
  placeholder="Share your experience..."
  required
  minlength="50"
  maxlength="500"
  show-counter
  hint="Minimum 50 characters, maximum 500"
>
</me-textarea>
```

### Read-Only Textarea

```html
<me-textarea
  label="Terms and Conditions"
  value="These are the terms and conditions..."
  readonly
  rows="6"
>
</me-textarea>
```

### Textarea with Custom Styles

```html
<me-textarea
  label="Private Comment"
  placeholder="Only visible to admins..."
  class="private-comment"
  maxlength="200"
>
</me-textarea>
```

## Form Integration

### Contact Form

```html
<form id="contact-form">
  <me-textarea
    label="Message *"
    name="message"
    required
    minlength="10"
    maxlength="1000"
    show-counter
    placeholder="Write your message here..."
    auto-resize
  >
  </me-textarea>

  <me-textarea
    label="Additional Information"
    name="additionalInfo"
    rows="4"
    placeholder="Any extra information you consider relevant"
  >
  </me-textarea>

  <button type="submit" variant="primary">Send Message</button>
</form>
```

```javascript
const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const message = form.querySelector('[name="message"]')?.value || "";
    const additionalInfo =
      form.querySelector('[name="additionalInfo"]')?.value || "";

    if (message.length < 10) {
      alert("Message must be at least 10 characters long");
      return;
    }

    console.log("Form data:", { message, additionalInfo });
    alert("Message sent successfully!");
  });
}
```

## Form Demo

<me-playground-form id="textarea-playground" schema-name="textarea" title="Contact Form" description="Message and additional comments.">
  <div style="margin-bottom: 1rem;">
    <me-textarea 
      label="Message *"
      name="message"
      required
      minlength="10"
      maxlength="500"
      show-counter
      placeholder="Write your message here..."
      auto-resize>
    </me-textarea>
  </div>
  
  <div style="margin-bottom: 1rem;">
    <me-textarea 
      label="Additional Comments"
      name="additionalInfo"
      rows="4"
      placeholder="Optional extra info...">
    </me-textarea>
  </div>
</me-playground-form>

## Customization with CSS

### CSS Variables

```css
me-textarea {
  --me-textarea-min-height: 100px;
  --me-textarea-padding: 12px;
  --me-textarea-border: 1px solid #d1d5db;
  --me-textarea-border-radius: 6px;
  --me-textarea-focus-border: #3b82f6;
  --me-textarea-resize-handle-size: 8px;
  --me-textarea-counter-color: #6b7280;
  --me-textarea-counter-font-size: 12px;
}
```

### Customization Examples

<style>
  .custom-textarea {
    --me-textarea-focus-border: #10b981;
    --me-textarea-border-radius: 12px;
  }
  
  .compact-textarea {
    --me-textarea-min-height: 80px;
    --me-textarea-padding: 8px;
  }
  
  .fancy-textarea {
    --me-textarea-border: 2px solid #8b5cf6;
    --me-textarea-focus-border: #7c3aed;
    --me-textarea-border-radius: 16px;
  }
</style>

<div class="custom-textarea" style="margin-bottom: 1rem;">
  <me-textarea 
    label="Custom Textarea"
    placeholder="Custom styles">
  </me-textarea>
</div>

<div class="compact-textarea" style="margin-bottom: 1rem;">
  <me-textarea 
    label="Compact Textarea"
    placeholder="Smaller"
    rows="3">
  </me-textarea>
</div>

<div class="fancy-textarea">
  <me-textarea 
    label="Fancy Textarea"
    placeholder="With purple borders"
    value="Looks amazing!">
  </me-textarea>
</div>

<h3>Colors</h3>
<div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1rem;">
  <me-textarea label="Success Textarea" color="success" placeholder="Correct" value="Valid content"></me-textarea>
  <me-textarea label="Warning Textarea" color="warning" placeholder="Warning" value="Content to review"></me-textarea>
  <me-textarea label="Danger Textarea" color="danger" placeholder="Error" value="Invalid content"></me-textarea>
</div>

## Advanced Features

### Dynamic Auto-resize

```javascript
const textarea = document.querySelector("me-textarea[auto-resize]");
if (textarea) {
  textarea.addEventListener("input", (e) => {
    // The component handles auto-resize automatically
    console.log("Height adjusted:", textarea.style.height);
  });
}
```

### Custom Resizing

```html
<!-- Vertical only -->
<me-textarea resize="vertical" label="Height adjustable only">
  <!-- Horizontal only -->
  <me-textarea resize="horizontal" label="Width adjustable only">
    <!-- No resize -->
    <me-textarea resize="none" label="Fixed size"></me-textarea></me-textarea
></me-textarea>
```

## Accessibility

The MelserTextarea component includes:

- **Associated Label**: Semantic relationship between label and textarea
- **Accessible Counter**: Character information for screen readers
- **Keyboard Navigation**: Tab, Enter (new line), Shift+Enter
- **Focus States**: Clear visual indicator
- **Accessible Resizing**: Keyboard handling

## Best Practices

1. **Use auto-resize** for dynamic content
2. **Include counter** when there are character limits
3. **Set minimum rows** appropriate for the content
4. **Provide useful placeholders**
5. **Validate minimum and maximum length**
6. **Consider mobile experience** for large areas
7. **Use resize="none"** for fixed layouts

## Troubleshooting

### Auto-resize not working

```javascript
// Ensure correct attribute is used
textarea.setAttribute("auto-resize", "");

// Or set the property
textarea.autoResize = true;
```

### Resizing not restricted

```html
<!-- To control resizing direction -->
<me-textarea
  resize="vertical"
  style="max-height: 200px; min-height: 100px;"
></me-textarea>
```

### Counter not appearing

```html
<!-- Ensure both attributes are included -->
<me-textarea maxlength="200" show-counter></me-textarea>
```

### Focus issues

```css
/* Improve focus visibility */
me-textarea:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
```

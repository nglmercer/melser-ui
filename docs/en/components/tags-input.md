---
title: MelserTagsInput
---

# MelserTagsInput

A tags input component to add, edit, and remove tags with autocomplete and custom validation.

## Basic Example

```html
<me-tags-input placeholder="Add tags..." label="Tags"> </me-tags-input>
```

## Interactive Demo

<me-tags-input 
  id="demo-basic" 
  placeholder="Type and press Enter"
  label="Basic Tags">
</me-tags-input>

<me-tags-input 
  id="demo-readonly" 
  value="JavaScript, React, Vue"
  readonly
  label="Read-only Tags">
</me-tags-input>

<me-tags-input 
  id="demo-disabled" 
  value="HTML, CSS, JavaScript"
  disabled
  label="Disabled Tags">
</me-tags-input>

<h3>Colors</h3>
<div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
  <me-tags-input label="Success" color="success" value="tag1, tag2"></me-tags-input>
  <me-tags-input label="Warning" color="warning" value="tag3, tag4"></me-tags-input>
  <me-tags-input label="Danger" color="danger" value="tag5, tag6"></me-tags-input>
</div>

## Properties

| Property            | Type                                              | Default        | Description                    |
| :------------------ | :------------------------------------------------ | :------------- | :----------------------------- |
| `value`             | `string`                                          | `''`           | Current tags (comma separated) |
| `placeholder`       | `string`                                          | `'Add tag...'` | Placeholder text               |
| `disabled`          | `boolean`                                         | `false`        | Disables interaction           |
| `readonly`          | `boolean`                                         | `false`        | Read-only                      |
| `name`              | `string`                                          | `''`           | Name for forms                 |
| `label`             | `string`                                          | `''`           | Visible component label        |
| `maxTags`           | `number`                                          | `undefined`    | Maximum number of tags         |
| `minLength`         | `number`                                          | `1`            | Minimum tag length             |
| `maxLength`         | `number`                                          | `50`           | Maximum tag length             |
| `allowDuplicates`   | `boolean`                                         | `false`        | Allow duplicate tags           |
| `delimiter`         | `string`                                          | `','`          | Delimiter for values           |
| `removeOnBackspace` | `boolean`                                         | `true`         | Remove last tag with backspace |
| `color`             | `'primary' \| 'success' \| 'warning' \| 'danger'` | `'primary'`    | Color scheme of the state.     |

## Events

| Event        | Description                     |
| :----------- | :------------------------------ |
| `change`     | Fires when tags change          |
| `tag-add`    | Fires when adding a tag         |
| `tag-remove` | Fires when removing a tag       |
| `input`      | Fires when writing in the input |
| `focus`      | Fires when focus is gained      |
| `blur`       | Fires when focus is lost        |

## Usage Examples

### Skills Input

```html
<me-tags-input
  placeholder="Add your skills..."
  label="Technical Skills"
  max-tags="10"
  min-length="2"
>
</me-tags-input>
```

### Product Categories

```html
<me-tags-input
  placeholder="Product Categories"
  label="Categories"
  max-tags="5"
  allow-duplicates="false"
>
</me-tags-input>
```

### Tags with Validation

```html
<me-tags-input
  placeholder="Tags (minimum 3 characters)"
  label="Tags with validation"
  min-length="3"
  max-length="20"
>
</me-tags-input>
```

## Form Integration

### Article Form

```html
<form id="article-form">
  <h3>Publish Article</h3>

  <me-tags-input
    name="tags"
    placeholder="Article tags..."
    label="Tags"
    max-tags="8"
    min-length="2"
    required
  >
  </me-tags-input>

  <button type="submit">Publish Article</button>
</form>
```

```javascript
document.getElementById("article-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  console.log("Tags:", formData.get("tags"));
});
```

## Form Demo

<me-playground-form id="tags-playground" schema-name="tags-input" title="Publish Article" description="Content tagging and validation.">
  <div style="margin-bottom: 1.5rem;">
    <base-input 
      label="Article Title"
      name="title"
      required>
    </base-input>
  </div>
  
  <div style="margin-bottom: 1.5rem;">
    <me-tags-input 
      name="tags"
      placeholder="Article tags..."
      label="Tags"
      max-tags="8"
      min-length="2">
    </me-tags-input>
  </div>
  
</me-playground-form>

## Customization with CSS

### CSS Variables

```css
me-tags-input {
  --me-tags-input-bg: #ffffff;
  --me-tags-input-border: 1px solid #d1d5db;
  --me-tags-input-border-radius: 8px;
  --me-tags-input-padding: 8px 12px;
  --me-tags-input-font-size: 14px;
  --me-tag-bg: #3b82f6;
  --me-tag-color: #ffffff;
  --me-tag-border-radius: 16px;
  --me-tag-padding: 4px 8px;
  --me-tag-margin: 4px;
  --me-tag-remove-bg: #1e40af;
  --me-tag-remove-hover: #1e3a8a;
  --me-input-placeholder-color: #9ca3af;
  --me-input-focus-border: #3b82f6;
  --me-disabled-bg: #f9fafb;
  --me-disabled-color: #6b7280;
}
```

### Customization Examples

<style>
  .custom-tags {
    --me-tag-bg: #10b981;
    --me-tag-color: #ffffff;
    --me-tag-remove-bg: #059669;
    --me-tag-remove-hover: #047857;
    --me-input-focus-border: #10b981;
  }
  
  .rounded-tags {
    --me-tags-input-border-radius: 20px;
    --me-tag-border-radius: 20px;
    --me-tag-padding: 6px 12px;
  }
  
  .dark-theme-tags {
    --me-tags-input-bg: #1f2937;
    --me-tags-input-border: #4b5563;
    --me-tag-bg: #8b5cf6;
    --me-tag-color: #ffffff;
    --me-input-placeholder-color: #9ca3af;
    --me-input-focus-border: #8b5cf6;
  }
</style>

<div class="custom-tags" style="margin-bottom: 1rem;">
  <me-tags-input 
    placeholder="Custom Tags (Green)"
    label="Custom Tags">
  </me-tags-input>
</div>

<div class="rounded-tags" style="margin-bottom: 1rem;">
  <me-tags-input 
    placeholder="Rounded Tags"
    label="Rounded Tags">
  </me-tags-input>
</div>

<div class="dark-theme-tags">
  <me-tags-input 
    placeholder="Dark Theme Tags (Purple)"
    label="Dark Theme Tags">
  </me-tags-input>
</div>

## Accessibility

The MelserTagsInput component includes:

- **Keyboard Navigation**: Tab to navigate, Enter to add, Backspace to remove
- **Screen reader support**: Announces tags and actions
- **Focus visible**: Clear focus indicator
- **High contrast**: Compatible with high contrast mode
- **ARIA attributes**: Roles and states appropriate

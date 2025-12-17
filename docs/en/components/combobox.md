---
title: MelserCombobox
---

# MelserCombobox

A combo box component with autocomplete, advanced search, dynamic options, and enhanced user experience.

## Basic Example

```html
<me-combobox label="Select a country" placeholder="Type to search...">
  <option value="es">Spain</option>
  <option value="mx">Mexico</option>
  <option value="ar">Argentina</option>
  <option value="co">Colombia</option>
</me-combobox>
```

## Interactive Demo

<me-combobox 
  id="demo-basic" 
  label="Basic Country" 
  placeholder="Type to search...">

  <option value="es">Spain</option>
  <option value="mx">Mexico</option>
  <option value="ar">Argentina</option>
  <option value="co">Colombia</option>
  <option value="pe">Peru</option>
  <option value="cl">Chile</option>
  <option value="uy">Uruguay</option>
  <option value="ec">Ecuador</option>
</me-combobox>

<me-combobox 
  id="demo-async" 
  label="With dynamic data" 
  placeholder="Search a city..."
  async-data
  min-length="2">

  <!-- Options will load dynamically -->
</me-combobox>

<me-combobox 
  id="demo-highlight" 
  label="With highlighting" 
  placeholder="Search frameworks..."
  highlight-matches>

  <option value="react">React</option>
  <option value="vue">Vue.js</option>
  <option value="angular">Angular</option>
  <option value="svelte">Svelte</option>
</me-combobox>

<h3>Colors</h3>
<div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
  <me-combobox label="Success" color="success" value="es" placeholder="Success">
     <option value="es">Spain</option>
  </me-combobox>
  <me-combobox label="Warning" color="warning" value="mx" placeholder="Warning">
     <option value="mx">Mexico</option>
  </me-combobox>
  <me-combobox label="Danger" color="danger" value="ar" placeholder="Danger">
     <option value="ar">Argentina</option>
  </me-combobox>
</div>

## Properties

| Property            | Type                                              | Default     | Description                  |
| :------------------ | :------------------------------------------------ | :---------- | :--------------------------- |
| `min-length`        | `number`                                          | `0`         | Minimum characters to search |
| `max-results`       | `number`                                          | `10`        | Maximum number of results    |
| `async-data`        | `boolean`                                         | `false`     | Loads data asynchronously    |
| `highlight-matches` | `boolean`                                         | `false`     | Highlights matches           |
| `allow-free-text`   | `boolean`                                         | `false`     | Allows selecting free text   |
| `debounce-time`     | `number`                                          | `300`       | Wait time in ms              |
| `placeholder`       | `string`                                          | `''`        | Placeholder text             |
| `label`             | `string`                                          | `''`        | Visible field label          |
| `name`              | `string`                                          | `''`        | Name for forms               |
| `value`             | `string`                                          | `''`        | Selected value               |
| `options`           | `SelectOption[]`                                  | `[]`        | Array of options             |
| `color`             | `'primary' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | Color variant                |
| `disabled`          | `boolean`                                         | `false`     | Disables interaction         |
| `required`          | `boolean`                                         | `false`     | Required field in forms      |

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

## Events

| Event               | Description                            |
| :------------------ | :------------------------------------- |
| `input`             | Fires when typing in the field         |
| `change`            | Fires when selecting an option         |
| `search`            | Fires when starting search             |
| `async-data-loaded` | Fires when asynchronous data is loaded |

## Usage Examples

### Asynchronous Loading

```html
<me-combobox
  label="Search user"
  placeholder="Type name..."
  async-data
  min-length="2"
>
</me-combobox>
```

```javascript
const combobox = document.querySelector("me-combobox[async-data]");
combobox.addEventListener("search", async (e) => {
  const term = e.detail.term;
  if (term.length < 2) return;

  const response = await fetch(`/api/users?q=${term}`);
  const users = await response.json();

  // Hypothetical helper to update options
  updateComboboxOptions(combobox, users);
});
```

### Free Text

Allows the user to enter values that are not in the list.

```html
<me-combobox label="Category" allow-free-text placeholder="Select or create...">
  <option value="tech">Technology</option>
  <option value="science">Science</option>
</me-combobox>
```

## Form Integration

```html
<form id="message-form">
  <me-combobox
    label="Recipient *"
    name="recipient"
    required
    placeholder="Search a user..."
  >
    <option value="id1">User 1</option>
    <option value="id2">User 2</option>
  </me-combobox>

  <button type="submit">Send</button>
</form>
```

## Form Demo

<me-playground-form id="combobox-playground" schema-name="combobox" title="Development Survey" description="Autocomplete and validation example.">
  <div style="margin-bottom: 1rem;">
    <me-combobox 
      label="Programming Language"
      name="language"
      placeholder="Search a language..."
      highlight-matches
      min-length="2"
      max-results="20">
      <option value="javascript">JavaScript</option>
      <option value="typescript">TypeScript</option>
      <option value="python">Python</option>
      <option value="java">Java</option>
    </me-combobox>
  </div>
</me-playground-form>

## Customization with CSS

### CSS Variables

```css
me-combobox {
  --me-combobox-dropdown-bg: #ffffff;
  --me-combobox-option-hover-bg: #f3f4f6;
  --me-combobox-option-selected-bg: #3b82f6;
  --me-combobox-option-selected-color: #ffffff;
  --me-combobox-highlight-bg: #fef3c7;
  --me-combobox-highlight-color: #92400e;
}
```

## Accessibility

- **Keyboard Navigation**: Arrows, Enter, Escape, Tab.
- **ARIA**: Uses `role="combobox"`, `aria-expanded`, `aria-controls`.
- **Screen Readers**: Announces state changes and selected options.

---
title: MelserMultiSelect
---

# MelserMultiSelect

An advanced multi-selection component with chips, search, bulk selection, and filtering options.

## Basic Example

```html
<me-multi-select
  label="Select multiple options"
  placeholder="Choose the options you need"
>
  <option value="javascript">JavaScript</option>
  <option value="typescript">TypeScript</option>
  <option value="react">React</option>
  <option value="vue">Vue.js</option>
  <option value="angular">Angular</option>
</me-multi-select>
```

## Interactive Demo

<me-multi-select 
  id="demo-basic" 
  label="Basic Technologies" 
  placeholder="Select technologies">

  <option value="javascript">JavaScript</option>
  <option value="typescript">TypeScript</option>
  <option value="react">React</option>
  <option value="vue">Vue.js</option>
  <option value="angular">Angular</option>
  <option value="node">Node.js</option>
  <option value="python">Python</option>
</me-multi-select>

<me-multi-select 
  id="demo-selected" 
  label="With initial values" 
  placeholder="Select frameworks"
  value="react,node">

  <option value="javascript">JavaScript</option>
  <option value="typescript">TypeScript</option>
  <option value="react">React</option>
  <option value="vue">Vue.js</option>
  <option value="angular">Angular</option>
</me-multi-select>

<me-multi-select 
  id="demo-search" 
  label="With Search" 
  placeholder="Search a technology..."
  searchable
  max-selections="5">

  <option value="javascript">JavaScript</option>
  <option value="typescript">TypeScript</option>
  <option value="react">React</option>
  <option value="vue">Vue.js</option>
  <option value="angular">Angular</option>
  <option value="node">Node.js</option>
  <option value="python">Python</option>
  <option value="java">Java</option>
  <option value="csharp">C#</option>
  <option value="php">PHP</option>
  <option value="ruby">Ruby</option>
</me-multi-select>

<me-multi-select 
  id="demo-limits" 
  label="With Limits" 
  placeholder="Max 3 items"
  max-selections="3"
  show-counter>

  <option value="frontend">Frontend</option>
  <option value="backend">Backend</option>
  <option value="fullstack">Fullstack</option>
  <option value="mobile">Mobile</option>
  <option value="devops">DevOps</option>
  <option value="uiux">UI/UX</option>
</me-multi-select>

<h3>Colors</h3>
<div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
  <me-multi-select label="Success" color="success" placeholder="Success" value="opt1">
    <option value="opt1">Option 1</option>
  </me-multi-select>
  <me-multi-select label="Warning" color="warning" placeholder="Warning" value="opt2">
    <option value="opt2">Option 2</option>
  </me-multi-select>
  <me-multi-select label="Danger" color="danger" placeholder="Danger" value="opt3">
    <option value="opt3">Option 3</option>
  </me-multi-select>
</div>

## Properties

| Property         | Type                                              | Default     | Description                          |
| :--------------- | :------------------------------------------------ | :---------- | :----------------------------------- |
| `searchable`     | `boolean`                                         | `false`     | Enables search in options            |
| `clearable`      | `boolean`                                         | `false`     | Allows clearing all selections       |
| `disabled`       | `boolean`                                         | `false`     | Disables interaction                 |
| `required`       | `boolean`                                         | `false`     | Required field in forms              |
| `max-selections` | `number`                                          | `undefined` | Maximum number of selections         |
| `min-selections` | `number`                                          | `undefined` | Minimum number of selections         |
| `show-counter`   | `boolean`                                         | `false`     | Shows selection counter              |
| `select-all`     | `boolean`                                         | `false`     | Shows "Select All" option            |
| `placeholder`    | `string`                                          | `''`        | Text when there are no selections    |
| `label`          | `string`                                          | `''`        | Visible field label                  |
| `name`           | `string`                                          | `''`        | Name for forms                       |
| `value`          | `string`                                          | `''`        | Selected values (comma separated)    |
| `options`        | `SelectOption[]`                                  | `[]`        | Options array (alternative to slots) |
| `color`          | `'primary' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | Color scheme of the state.           |

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

| Event          | Description                         |
| :------------- | :---------------------------------- |
| `change`       | Fires when selections change        |
| `search`       | Fires during search                 |
| `select-all`   | Fires when selecting all options    |
| `clear-all`    | Fires when clearing all selections  |
| `max-reached`  | Fires when maximum limit is reached |
| `min-reached`  | Fires when minimum limit is reached |
| `item-added`   | Fires when an item is added         |
| `item-removed` | Fires when an item is removed       |

## Usage Examples

### MultiSelect with Search and Limits

```html
<me-multi-select
  label="Technical Skills *"
  name="skills"
  required
  searchable
  show-counter
  max-selections="5"
  placeholder="Select up to 5 skills"
>
  <option value="javascript">JavaScript</option>
  <option value="typescript">TypeScript</option>
  <option value="react">React</option>
  <option value="vue">Vue.js</option>
  <option value="angular">Angular</option>
</me-multi-select>
```

### MultiSelect with Validation

```html
<me-multi-select
  label="Interests (min 2, max 5)"
  name="interests"
  min-selections="2"
  max-selections="5"
  show-counter
  select-all
  required
  error="Select at least 2 interests"
>
  <option value="sports">Sports</option>
  <option value="music">Music</option>
  <option value="reading">Reading</option>
  <option value="travel">Travel</option>
</me-multi-select>
```

### Grouped MultiSelect

```html
<me-multi-select
  label="Technologies by category"
  searchable
  placeholder="Select technologies"
>
  <optgroup label="Frontend">
    <option value="html">HTML</option>
    <option value="css">CSS</option>
    <option value="javascript">JavaScript</option>
  </optgroup>
  <optgroup label="Backend">
    <option value="node">Node.js</option>
    <option value="python">Python</option>
    <option value="java">Java</option>
  </optgroup>
</me-multi-select>
```

## Form Integration

```html
<form id="profile-form">
  <me-multi-select
    label="Technologies you know *"
    name="technologies"
    required
    searchable
    show-counter
    max-selections="10"
    placeholder="Select technologies"
  >
    <optgroup label="Languages">
      <option value="javascript">JavaScript</option>
      <option value="typescript">TypeScript</option>
    </optgroup>
    <optgroup label="Frameworks">
      <option value="react">React</option>
      <option value="vue">Vue.js</option>
    </optgroup>
  </me-multi-select>

  <me-multi-select label="Languages you speak" name="languages" show-counter>
    <option value="spanish">Spanish (Native)</option>
    <option value="english">English</option>
    <option value="french">French</option>
  </me-multi-select>

  <button type="submit">Save Profile</button>
</form>
```

## Form Demo

<me-playground-form id="multi-select-playground" schema-name="multi-select" title="Skills Selection" description="Select your favorite technologies.">
  <div style="margin-bottom: 1rem;">
    <me-multi-select 
      label="Hobbies (min 2, max 4) *"
      name="hobbies"
      required
      min-selections="2"
      max-selections="4"
      show-counter
      select-all
      placeholder="Select your hobbies">
      <option value="sports">🏃‍♂️ Sports</option>
      <option value="music">🎵 Music</option>
      <option value="reading">📚 Reading</option>
      <option value="travel">✈️ Travel</option>
      <option value="cooking">🍳 Cooking</option>
      <option value="gaming">🎮 Gaming</option>
      <option value="art">🎨 Art</option>
      <option value="photography">📸 Photography</option>
    </me-multi-select>
  </div>
  
  <div style="margin-bottom: 1rem;">
    <me-multi-select 
      label="Favorite Subjects"
      name="subjects"
      searchable
      placeholder="Search subjects..."
      show-counter
      max-selections="6">
      <optgroup label="Sciences">
        <option value="math">📐 Mathematics</option>
        <option value="physics">⚛️ Physics</option>
        <option value="chemistry">🧪 Chemistry</option>
        <option value="biology">🧬 Biology</option>
      </optgroup>
      <optgroup label="Humanities">
        <option value="history">📜 History</option>
        <option value="literature">📖 Literature</option>
        <option value="philosophy">🤔 Philosophy</option>
        <option value="languages">🗣️ Languages</option>
      </optgroup>
    </me-multi-select>
  </div>
</me-playground-form>

## Customization with CSS

### CSS Variables

```css
me-multi-select {
  --me-multi-select-chip-bg: #e5e7eb;
  --me-multi-select-chip-color: #374151;
  --me-multi-select-chip-hover-bg: #d1d5db;
  --me-multi-select-chip-remove-color: #6b7280;
  --me-multi-select-dropdown-bg: #ffffff;
  --me-multi-select-counter-color: #6b7280;
  --me-multi-select-counter-font-size: 12px;
  --me-multi-select-max-indicator-color: #f59e0b;
}
```

### Customization Examples

<style>
  .custom-multi-select {
    --me-multi-select-chip-bg: #dbeafe;
    --me-multi-select-chip-color: #1e40af;
    --me-multi-select-chip-hover-bg: #bfdbfe;
  }
  
  .minimal-multi-select {
    --me-multi-select-chip-bg: transparent;
    --me-multi-select-chip-color: #6b7280;
    --me-multi-select-chip-hover-bg: #f3f4f6;
    --me-multi-select-chip-border: 1px solid #d1d5db;
  }
  
  .dark-multi-select {
    --me-multi-select-chip-bg: #374151;
    --me-multi-select-chip-color: #f9fafb;
    --me-multi-select-chip-hover-bg: #4b5563;
    --me-multi-select-dropdown-bg: #1f2937;
  }
</style>

<div class="custom-multi-select" style="margin-bottom: 1rem;">
  <me-multi-select 
    label="Custom Multi-select"
    value="react,vue"
    placeholder="With blue chips">
    <option value="react">React</option>
    <option value="vue">Vue.js</option>
    <option value="angular">Angular</option>
  </me-multi-select>
</div>

<div class="minimal-multi-select" style="margin-bottom: 1rem;">
  <me-multi-select 
    label="Minimalist Style"
    value="js,ts"
    placeholder="Chips with border">
    <option value="js">JavaScript</option>
    <option value="ts">TypeScript</option>
    <option value="python">Python</option>
  </me-multi-select>
</div>

<div class="dark-multi-select">
  <me-multi-select 
    label="Dark Theme"
    value="dark,night"
    placeholder="For dark interfaces">
    <option value="dark">Dark Mode</option>
    <option value="night">Night Theme</option>
    <option value="black">Black Theme</option>
  </me-multi-select>
</div>

## Accessibility

- **Keyboard Navigation**: Arrows, Enter, Space, Escape
- **Screen Reader Announcements**: Selection changes announced
- **ARIA**: Fully labeled
- **Accessible Chips**: Clear removal controls

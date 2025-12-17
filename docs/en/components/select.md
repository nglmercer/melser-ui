---
title: MelserSelect
---

# MelserSelect

A modern and accessible dropdown selector component with search, groups, and multiple customization options.

## Basic Example

```html
<me-select label="Select an option" placeholder="Choose an option">
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
  <option value="option3">Option 3</option>
</me-select>
```

## Interactive Demo

<me-select 
  id="demo-basic" 
  label="Basic Selector" 
  placeholder="Choose an option">

  <option value="">Select an option</option>
  <option value="es">Spain</option>
  <option value="mx">Mexico</option>
  <option value="ar">Argentina</option>
  <option value="co">Colombia</option>
  <option value="pe">Peru</option>
</me-select>

<me-select 
  id="demo-groups" 
  label="With Groups" 
  placeholder="Select a country">

  <optgroup label="Europe">
    <option value="es">Spain</option>
    <option value="fr">France</option>
    <option value="de">Germany</option>
  </optgroup>
  <optgroup label="America">
    <option value="mx">Mexico</option>
    <option value="ar">Argentina</option>
    <option value="co">Colombia</option>
  </optgroup>
</me-select>

<me-select 
  id="demo-selected" 
  label="With initial value" 
  value="mx"
  placeholder="Predefined country">

  <option value="">Select a country</option>
  <option value="es">Spain</option>
  <option value="mx" selected>Mexico</option>
  <option value="ar">Argentina</option>
</me-select>

<me-select 
  id="demo-disabled" 
  label="Disabled" 
  value="co"
  disabled>

  <option value="">Select an option</option>
  <option value="es">Spain</option>
  <option value="mx">Mexico</option>
  <option value="co" selected>Colombia</option>
</me-select>

<me-select 
  id="demo-search" 
  label="With Search" 
  searchable
  placeholder="Search a country...">

  <option value="es">Spain</option>
  <option value="mx">Mexico</option>
  <option value="ar">Argentina</option>
  <option value="co">Colombia</option>
  <option value="pe">Peru</option>
  <option value="cl">Chile</option>
  <option value="uy">Uruguay</option>
</me-select>

<h3>Colors</h3>
<div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
  <me-select label="Success" color="success" value="1" placeholder="Success">
    <option value="1">Option 1</option>
  </me-select>
  <me-select label="Warning" color="warning" value="1" placeholder="Warning">
    <option value="1">Option 1</option>
  </me-select>
  <me-select label="Danger" color="danger" value="1" placeholder="Danger">
    <option value="1">Option 1</option>
  </me-select>
</div>

## Properties

| Property      | Type             | Default | Description                          |
| ------------- | ---------------- | ------- | ------------------------------------ |
| `searchable`  | `boolean`        | `false` | Enables search in options            |
| `clearable`   | `boolean`        | `false` | Allows clearing the selection        |
| `disabled`    | `boolean`        | `false` | Disables interaction                 |
| `required`    | `boolean`        | `false` | Required field in forms              |
| `multiple`    | `boolean`        | `false` | Allows multiple selections           |
| `placeholder` | `string`         | `''`    | Text when there is no selection      |
| `label`       | `string`         | `''`    | Visible field label                  |
| `name`        | `string`         | `''`    | Name for forms                       |
| `value`       | `string`         | `''`    | Selected value                       |
| `options`     | `SelectOption[]` | `[]`    | Options array (alternative to slots) |

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

| Event    | Description                                    |
| -------- | ---------------------------------------------- |
| `change` | Fires when selection changes                   |
| `search` | Fires during search (searchable only)          |
| `clear`  | Fires when clearing selection (clearable only) |
| `focus`  | Fires when focus is gained                     |
| `blur`   | Fires when focus is lost                       |
| `open`   | Fires when dropdown opens                      |
| `close`  | Fires when dropdown closes                     |

## Usage Examples

### Select with Search

```html
<me-select
  label="Country (with search)"
  searchable
  placeholder="Type to search..."
  clearable
>
  <option value="">All countries</option>
  <option value="es">Spain</option>
  <option value="mx">Mexico</option>
  <option value="ar">Argentina</option>
  <option value="co">Colombia</option>
  <option value="pe">Peru</option>
  <option value="cl">Chile</option>
</me-select>
```

### Select with Validation

```html
<me-select
  label="Document Type *"
  required
  placeholder="Select a type"
  error="You must select a document type"
>
  <option value="">Select a type</option>
  <option value="dni">ID Card</option>
  <option value="passport">Passport</option>
  <option value="license">Driver's License</option>
  <option value="other">Other</option>
</me-select>
```

### Grouped Select

```html
<me-select label="City" placeholder="Select a city">
  <optgroup label="Spain">
    <option value="madrid">Madrid</option>
    <option value="barcelona">Barcelona</option>
    <option value="valencia">Valencia</option>
  </optgroup>
  <optgroup label="Mexico">
    <option value="cdmx">Mexico City</option>
    <option value="guadalajara">Guadalajara</option>
    <option value="monterrey">Monterrey</option>
  </optgroup>
</me-select>
```

### Select with Multiple Selections

```html
<me-select label="Skills" multiple placeholder="Select relevant skills">
  <option value="javascript">JavaScript</option>
  <option value="typescript">TypeScript</option>
  <option value="react">React</option>
  <option value="vue">Vue.js</option>
  <option value="angular">Angular</option>
  <option value="node">Node.js</option>
  <option value="python">Python</option>
</me-select>
```

## Form Integration

### Registration Form

```html
<form id="registration-select-form">
  <me-select
    label="Country of Residence *"
    name="country"
    required
    placeholder="Select your country"
  >
    <optgroup label="Europe">
      <option value="es">Spain</option>
      <option value="fr">France</option>
      <option value="de">Germany</option>
    </optgroup>
    <optgroup label="America">
      <option value="mx">Mexico</option>
      <option value="ar">Argentina</option>
      <option value="co">Colombia</option>
      <option value="pe">Peru</option>
    </optgroup>
  </me-select>

  <me-select label="City" name="city" placeholder="Select a city">
    <!-- Dynamic options based on country -->
  </me-select>

  <me-select label="Account Type" name="accountType" searchable clearable>
    <option value="">Select a type</option>
    <option value="personal">Personal Account</option>
    <option value="business">Business Account</option>
    <option value="student">Student Account</option>
  </me-select>

  <button type="submit" variant="primary">Complete Registration</button>
</form>
```

```javascript
const form = document.getElementById("registration-select-form");
if (form) {
  const countrySelect = form.querySelector('[name="country"]');
  const citySelect = form.querySelector('[name="city"]');

  // Update cities based on country
  if (countrySelect && citySelect) {
    countrySelect.addEventListener("change", (e) => {
      const country = e.target.value;
      updateCities(citySelect, country);
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    if (!data.country) {
      alert("Please select your country");
      return;
    }

    console.log("Form data:", data);
    alert("Registration completed successfully!");
  });
}

function updateCities(citySelect, country) {
  const cities = {
    es: [
      { value: "madrid", label: "Madrid" },
      { value: "barcelona", label: "Barcelona" },
      { value: "valencia", label: "Valencia" },
    ],
    mx: [
      { value: "cdmx", label: "Mexico City" },
      { value: "guadalajara", label: "Guadalajara" },
      { value: "monterrey", label: "Monterrey" },
    ],
  };

  // Clear current options
  citySelect.innerHTML = '<option value="">Select a city</option>';

  // Add new options
  if (cities[country]) {
    cities[country].forEach((city) => {
      const option = document.createElement("option");
      option.value = city.value;
      option.textContent = city.label;
      citySelect.appendChild(option);
    });
  }
}
```

## Form Demo

<me-playground-form id="select-playground" schema-name="select" title="Selection Form" description="Interactive example with validation.">
  <div style="margin-bottom: 1rem;">
    <me-select 
      label="Country *"
      name="country"
      required
      placeholder="Select your country">
      <optgroup label="Europe">
        <option value="es">Spain</option>
        <option value="fr">France</option>
        <option value="de">Germany</option>
      </optgroup>
      <optgroup label="America">
        <option value="mx">Mexico</option>
        <option value="ar">Argentina</option>
        <option value="co">Colombia</option>
        <option value="pe">Peru</option>
      </optgroup>
    </me-select>
  </div>
  
  <div style="margin-bottom: 1rem;">
    <me-select 
      label="City"
      name="city"
      placeholder="Select a city">
      <option value="">Select a country first</option>
    </me-select>
  </div>
  
  <div style="margin-bottom: 1rem;">
    <me-select 
      label="Gender"
      name="gender"
      searchable
      clearable>
      <option value="">Prefer not to say</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="other">Other</option>
    </me-select>
  </div>
</me-playground-form>

## Customization with CSS

### CSS Variables

```css
me-select {
  --me-select-width: 100%;
  --me-select-height: 40px;
  --me-select-padding: 8px 40px 8px 12px;
  --me-select-border: 1px solid #d1d5db;
  --me-select-border-radius: 6px;
  --me-select-focus-border: #3b82f6;
  --me-select-dropdown-bg: #ffffff;
  --me-select-dropdown-border: #d1d5db;
  --me-select-option-hover-bg: #f3f4f6;
  --me-select-option-selected-bg: #3b82f6;
  --me-select-option-selected-color: #ffffff;
}
```

### Customization Examples

<style>
  .custom-select {
    --me-select-focus-border: #10b981;
    --me-select-option-selected-bg: #10b981;
    --me-select-border-radius: 12px;
  }
  
  .compact-select {
    --me-select-height: 32px;
    --me-select-padding: 4px 32px 4px 8px;
  }
  
  .dark-select {
    --me-select-border: 1px solid #374151;
    --me-select-bg: #1f2937;
    --me-select-color: #f9fafb;
    --me-select-focus-border: #8b5cf6;
    --me-select-dropdown-bg: #1f2937;
    --me-select-option-hover-bg: #374151;
  }
</style>

<div class="custom-select" style="margin-bottom: 1rem;">
  <me-select 
    label="Custom Select"
    value="option2">
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
    <option value="option3">Option 3</option>
  </me-select>
</div>

<div class="compact-select" style="margin-bottom: 1rem;">
  <me-select 
    label="Compact Select"
    value="es">
    <option value="es">Spain</option>
    <option value="mx">Mexico</option>
    <option value="ar">Argentina</option>
  </me-select>
</div>

<div class="dark-select">
  <me-select 
    label="Dark Theme"
    value="fr">
    <option value="fr">France</option>
    <option value="de">Germany</option>
    <option value="it">Italy</option>
  </me-select>
</div>

## Advanced Features

### Custom Search

```javascript
const searchableSelect = document.querySelector("me-select[searchable]");
if (searchableSelect) {
  searchableSelect.addEventListener("search", (e) => {
    const searchTerm = e.detail.term;

    // Filter options based on search term
    filterOptions(searchableSelect, searchTerm);
  });
}

function filterOptions(select, term) {
  const options = select.querySelectorAll("option");
  options.forEach((option) => {
    const matches = option.textContent
      .toLowerCase()
      .includes(term.toLowerCase());
    option.style.display = matches ? "block" : "none";
  });
}
```

### Dynamic Options Loading

```javascript
const select = document.querySelector("me-select");
if (select) {
  // Simulate data loading
  loadDynamicOptions(select);
}

async function loadDynamicOptions(select) {
  try {
    // Simulate API call
    const response = await fetch("/api/countries");
    const countries = await response.json();

    // Clear existing options
    select.innerHTML = '<option value="">Select a country</option>';

    // Add new options
    countries.forEach((country) => {
      const option = document.createElement("option");
      option.value = country.code;
      option.textContent = country.name;
      select.appendChild(option);
    });
  } catch (error) {
    console.error("Error loading options:", error);
  }
}
```

## Accessibility

The MelserSelect component includes:

- **Keyboard Navigation**: Arrows, Enter, Escape work
- **Screen Reader Announcements**: Selection changes announced
- **Focus Management**: Clear visual indicator
- **ARIA attributes**: aria-expanded, aria-controls, aria-activedescendant
- **Accessible Groups**: optgroup correctly announced

## Best Practices

1. **Always include placeholder** for cases without selection
2. **Use logical groups** to organize related options
3. **Enable search** when there are many options
4. **Include validation** for required fields
5. **Provide immediate feedback** to the user
6. **Consider the order** of options by relevance
7. **Use clearable** for cases where clearing might be needed

## Troubleshooting

### Search not working

```html
<!-- Ensure searchable is enabled -->
<me-select searchable label="With search"></me-select>
```

### Options not loading dynamically

```javascript
// Verify options are correctly structured
select.innerHTML = `
  <option value="">Select an option</option>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
`;

// Dispatch event to update the component
select.dispatchEvent(new Event("change"));
```

### Validation not working

```html
<!-- Use required along with empty placeholder -->
<me-select required placeholder="Select an option">
  <option value="">Select an option</option>
  <option value="1">Option 1</option>
</me-select>
```

### Accessibility issues

```html
<!-- Add descriptive labels for complex cases -->
<me-select aria-label="Select your country of birth" searchable></me-select>
```

### Focus not visible

```css
/* Customize focus indicator */
me-select:focus-within {
  box-shadow: 0 0 0 2px #3b82f6;
  border-color: #3b82f6;
}
```

### Dropdown doesn't close

```javascript
// Close dropdown programmatically
select.close();

// Or listen for external click events
document.addEventListener("click", (e) => {
  if (!select.contains(e.target)) {
    select.close();
  }
});
```

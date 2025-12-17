# Melser UI 🎨

A modern collection of web components built with [Lit](https://lit.dev/), TypeScript, and modern CSS. Designed to be fast, lightweight, and fully customizable.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/npm/v/melser-ui.svg)
![Downloads](https://img.shields.io/npm/dm/melser-ui.svg)

## ✨ Features

- **⚡ Fast & Lightweight**: Built with Lit for maximum performance.
- **🎨 Modular Design**: Customizable CSS theme with modern CSS variables.
- **🔧 TypeScript**: Full typing for a superior development experience.
- **📱 Responsive**: Designed for all devices and screen sizes.
- **♿ Accessible**: Complies with WCAG accessibility standards.
- **🎯 Zero Dependencies**: Pure components without heavy frameworks.

## 🚀 Installation

```bash
npm install melser-ui
```

## 📦 Usage

### Option 1: Register all components at once

```typescript
import { registerComponents } from "melser-ui";

// Register all components with 'me-' prefix
registerComponents();
```

### Option 2: Register components individually

```typescript
import {
  registerComponent,
  MelserTextInput,
  MelserCheckbox,
  MelserSelect,
} from "melser-ui";

// Register specific components with custom names
registerComponent("me-text-input", MelserTextInput);
registerComponent("me-checkbox", MelserCheckbox);
registerComponent("me-select", MelserSelect);
```

### Option 3: Import specific components

```typescript
// Import only the components you need
import "melser-ui/components/melser-checkbox";
import "melser-ui/components/melser-text-input";
import "melser-ui/components/melser-select";
```

### Usage in HTML

```html
<!-- Checkbox -->
<me-checkbox label="I accept the terms" checked></me-checkbox>

<!-- Text Input -->
<me-text-input label="Name" placeholder="Enter your name"></me-text-input>

<!-- Radio Group -->
<me-radio-group
  label="Options"
  options='["Option 1", "Option 2", "Option 3"]'
></me-radio-group>

<!-- Select -->
<me-select label="City" options='["Lima", "Arequipa", "Trujillo"]'></me-select>
```

## 🎨 Customization

Components use CSS variables for easy customization:

```css
:root {
  --me-primary-color: #007bff;
  --me-secondary-color: #6c757d;
  --me-border-radius: 8px;
  --me-font-family: "Arial", sans-serif;
}
```

## 📚 Documentation

Visit our full documentation at https://nglmercer.github.io/melser-ui/ or run locally:

```bash
npm run dev:docs
```

## 🧪 Development

### Project Setup

```bash
# Clone the repository
git clone https://github.com/nglmercer/melser-ui.git
cd melser-ui

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test

# Build for production
npm run build
```

### Available Scripts

- `npm run dev` - Starts development server
- `npm run build` - Builds components for production
- `npm run dev:docs` - Starts documentation server
- `npm run build:docs` - Builds documentation
- `npm run preview:docs` - Previews built documentation

## 📋 Available Components

### Form Controls

- ✅ [`<me-checkbox>`](src/components/melser-checkbox.ts) - Checkbox with label
- ✅ [`<me-text-input>`](src/components/base-input.ts) - Text Input
- ✅ [`<me-number-input>`](src/components/melser-number-input.ts) - Numeric Input
- ✅ [`<me-password-input>`](src/components/melser-password-input.ts) - Password Input
- ✅ [`<me-textarea>`](src/components/melser-textarea.ts) - Text Area
- ✅ [`<me-select>`](src/components/melser-select.ts) - Dropdown Selector
- ✅ [`<me-multi-select>`](src/components/melser-multi-select.ts) - Multi-Select
- ✅ [`<me-radio-group>`](src/components/melser-radio-group.ts) - Radio Button Group
- ✅ [`<me-switch>`](src/components/melser-switch.ts) - Toggle Switch
- ✅ [`<me-range>`](src/components/melser-range.ts) - Range Slider
- ✅ [`<me-dual-range>`](src/components/melser-dual-range.ts) - Dual Range Slider

### Advanced Inputs

- ✅ [`<me-combobox>`](src/components/melser-combobox.ts) - Combobox with Autocomplete
- ✅ [`<me-tags-input>`](src/components/melser-tags-input.ts) - Tags Input
- ✅ [`<me-otp-input>`](src/components/melser-otp-input.ts) - OTP Code Input
- ✅ [`<me-date-picker>`](src/components/melser-date-picker.ts) - Date Picker
- ✅ [`<me-time-picker>`](src/components/melser-time-picker.ts) - Time Picker
- ✅ [`<me-color-picker>`](src/components/melser-color-picker.ts) - Color Picker
- ✅ [`<me-file-upload>`](src/components/melser-file-upload.ts) - File Upload
- ✅ [`<me-rating>`](src/components/melser-rating.ts) - Rating System

### Forms

- ✅ [`<me-example-form>`](src/components/melser-example-form.ts) - Example Form
- ✅ [`<me-playground-form>`](src/components/melser-playground-form.ts) - Interactive Playground
- ✅ [`<me-schema-form>`](src/components/melser-schema-form.ts) - Schema-based Form

## 🔧 API

### Common Props

All form components share these properties:

```typescript
interface BaseProps {
  label?: string; // Field label
  placeholder?: string; // Placeholder text
  required?: boolean; // If required
  disabled?: boolean; // If disabled
  readonly?: boolean; // Read-only
  value?: any; // Field value
  name?: string; // Field name
  id?: string; // Element ID
  class?: string; // CSS classes
  style?: string; // Inline styles
}
```

### Common Events

```typescript
// All components emit these events
@event('change') onChange: (event: CustomEvent) => void
@event('input') onInput: (event: CustomEvent) => void
@event('focus') onFocus: (event: CustomEvent) => void
@event('blur') onBlur: (event: CustomEvent) => void
```

## 🎯 Examples

### Complete Form

```html
<form id="myForm">
  <me-text-input
    label="Full Name"
    name="fullname"
    required
    placeholder="John Doe"
  >
  </me-text-input>

  <base-input
    label="Email"
    name="email"
    required
    placeholder="john@example.com"
  >
  </base-input>

  <me-select
    label="Country"
    name="country"
    options='["Peru", "Chile", "Argentina", "Colombia"]'
  >
  </me-select>

  <me-checkbox label="I accept terms and conditions" name="terms" required>
  </me-checkbox>

  <me-radio-group
    label="Gender"
    name="gender"
    options='["Male", "Female", "Other"]'
  >
  </me-radio-group>

  <button type="submit">Submit</button>
</form>
```

### With TypeScript

```typescript
import { MelserCheckbox } from "melser-ui/components/melser-checkbox";

const checkbox = document.querySelector("me-checkbox") as MelserCheckbox;
checkbox.addEventListener("change", (e) => {
  console.log("Checkbox changed:", e.detail.checked);
});
```

## 🌟 Themes

The system includes a base theme that can be customized:

```css
/* Dark Theme */
[data-theme="dark"] {
  --me-background: #1a1a1a;
  --me-surface: #2d2d2d;
  --me-text: #ffffff;
  --me-text-secondary: #b0b0b0;
}

/* Custom Theme */
[data-theme="custom"] {
  --me-primary: #ff6b6b;
  --me-secondary: #4ecdc4;
  --me-border-radius: 12px;
}
```

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the project
2. Create a branch for your feature (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👤 Author

- **nglmercer** - [GitHub](https://github.com/nglmercer)

## 🙏 Acknowledgements

- [Lit](https://lit.dev/) - For the excellent web component framework
- [Vite](https://vitejs.dev/) - For the fast bundler and dev server
- [TypeScript](https://www.typescriptlang.org/) - For static typing

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

**⭐ If this project was useful to you, consider giving it a star on GitHub!**

---
title: Installation
---

# Installation

This guide covers all ways to install and configure Melser UI in your project.

## Prerequisites

- Node.js 16+
- A modern project supporting ES modules
- Browser with Custom Elements and Shadow DOM support

## Installation Methods

### NPM

```bash
# Install the full library
npm install melser-ui

# Or install individual components
npm install melser-ui components
```

### Yarn

```bash
yarn add melser-ui
```

### CDN

You can also use Melser UI directly from a CDN:

```html
<!-- Use ESM.sh -->
<script type="module">
  import "https://esm.sh/melser-ui";
</script>

<!-- Or use Skypack -->
<script type="module">
  import "https://cdn.skypack.dev/melser-ui";
</script>
```

## Project Configuration

### Vite

If you use Vite, ensure your `vite.config.ts` is correctly configured:

```typescript
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    target: "es2019", // Required for Custom Elements
  },
  optimizeDeps: {
    include: ["melser-ui"],
  },
});
```

### Webpack

For Webpack 5:

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
```

## Importing Components

### Full Import

```typescript
// Import all components
import "melser-ui";

// Or import types
import type { MelserComponent } from "melser-ui/types";
```

### Individual Import

```typescript
// Import specific components
import "melser-ui/components/me-checkbox.js";
import "melser-ui/components/base-input.js";

// This is more efficient if you only use a few components
```

### Bundled Import

```typescript
// Bundle imports for better tree-shaking
import {
  MelserCheckbox,
  MelserTextInput,
  MelserButton,
} from "melser-ui/components";

// Register manually if necessary
import { registerComponents } from "melser-ui/utils/registration";

registerComponents({
  "me-checkbox": MelserCheckbox,
  "base-input": MelserTextInput,
});
```

## TypeScript Configuration

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "moduleResolution": "bundler",
    "types": ["vite/client"]
  }
}
```

### Type Declaration

```typescript
// src/global.d.ts
declare namespace JSX {
  interface IntrinsicElements {
    "me-checkbox": HTMLElement; // Prefer 'HTMLElement' or specific interfaces over 'any'
    "base-input": HTMLElement;
    // Add other components here.
    // Types exist for all components; avoid 'any' as it defeats the purpose of TypeScript.
  }
}
```

> **Note**: While `any` might seem convenient, Melser UI exports strong types for all its components and utilities (e.g., `InputData`, `TableColumn`). It is considered bad practice to use `any`. Always use the exported types for better type safety and autocompletion.

## Complete Project Example

### package.json

```json
{
  "name": "my-melser-project",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "melser-ui": "^1.0.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "typescript": "^5.0.0"
  }
}
```

### index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My App with Melser UI</title>
  </head>
  <body>
    <div id="app">
      <me-checkbox id="accept" label="I accept the terms"></me-checkbox>
      <button id="submit" variant="primary">Submit</button>
    </div>

    <script type="module">
      import "melser-ui";

      const submitBtn = document.getElementById("submit");
      const checkbox = document.getElementById("accept");

      submitBtn?.addEventListener("click", () => {
        if (checkbox?.checked) {
          alert("Form submitted!");
        } else {
          alert("Please accept the terms");
        }
      });
    </script>
  </body>
</html>
```

## Troubleshooting

### Error: "Custom element with name '...' has already been used"

```javascript
// Ensure you don't register the same component multiple times
// Import components only once in your application
```

### Components not rendering

```javascript
// Verify components are imported correctly
import "melser-ui/components/me-checkbox.js";

// And that the custom element is available
console.log(customElements.get("me-checkbox")); // Should exist
```

### Styles not applying

```css
/* Ensure base styles are included */
@import "melser-ui/styles/theme.css";

/* Or import specific styles */
@import "melser-ui/styles/components/checkbox.css";
```

## Verification

To verify everything is working:

```javascript
// In browser console
console.log("Melser UI loaded:", !!window.customElements.get("me-checkbox"));
```

If everything is correct, you should see `true` in the console.

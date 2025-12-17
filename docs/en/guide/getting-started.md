---
title: Getting Started
---

# Getting Started

Melser UI is a collection of modern web components built with Lit. This guide will help you get started quickly.

## Installation

```bash
npm install melser-ui
```

## Basic Usage

### Import Components

You can import individual components or the entire library:

```typescript
// Import specific component
import "melser-ui/components/me-checkbox.js";

// Import entire library
import "melser-ui";
```

### Use in HTML

Once imported, you can use the components directly in your HTML:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Melser UI Example</title>
  </head>
  <body>
    <h1>Melser UI Example</h1>

    <!-- Use checkbox component -->
    <me-checkbox label="I accept the terms" checked> </me-checkbox>

    <!-- Use text input component -->
    <base-input label="Name" placeholder="Enter your name"> </base-input>
  </body>
</html>
```

## Compatibility Verification

### Valid HTML Tags

Components use prefixed tag names to avoid conflicts:

- ✅ `me-checkbox` - Valid
- ✅ `base-input` - Valid
- ✅ `me-color-picker` - Valid
- ❌ `checkbox` - Might conflict

### TypeScript and Imports

```typescript
// Correct typing
import type { MelserCheckbox, MelserTextInput } from "melser-ui/types";

// Usage with typing
const checkbox = document.querySelector("me-checkbox") as MelserCheckbox;
const input = document.querySelector("base-input") as MelserTextInput;
```

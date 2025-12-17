---
title: Using @/ Aliases
---

# Using @/ Aliases for Imports/Exports

This page demonstrates how to use `@/` aliases configured in Vite to avoid issues with relative paths.

## Alias Configuration

The project is configured with the following aliases:

```typescript
// vite.config.ts
resolve: {
  alias: {
    '@/': './src/',
    '@/components': './src/components/',
    '@/core': './src/core/',
    '@/styles': './src/styles/',
    '@/types': './src/types/',
    '@/utils': './src/utils/'
  }
}
```

## Import/Export Examples with Aliases

### Correct Imports ✅

```typescript
// ✅ Using @/ alias - Recommended
import { BaseInput } from "@/core/base-input";
import { registerComponents } from "@/utils/registration";
import type { MelserComponent } from "@/types";

// ✅ Specific component imports
import { MelserCheckbox } from "@/components/me-checkbox";
import { MelserTextInput } from "@/components/base-input";
import { MelserButton } from "@/components/button ";

// ✅ Style imports
import "@/styles/theme.css";
import "@/components/me-checkbox.css";
```

### Relative Paths (Avoid) ❌

```typescript
// ❌ Relative paths - Can cause issues
import { BaseInput } from "../core/base-input";
import { registerComponents } from "../../utils/registration";
import type { MelserComponent } from "../types";

// ❌ Deeply nested paths
import { MelserCheckbox } from "../../../src/components/me-checkbox";
```

## Component Usage Example

### File: `src/components/me-form.ts`

```typescript
// ✅ Alias imports
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { BaseInput } from "@/core/base-input";
import { registerComponents } from "@/utils/registration";
import type { MelserFormData } from "@/types";

// ✅ Import other components
import "@/components/base-input";
import "@/components/me-checkbox";
import "@/components/button ";

@customElement("me-form")
export class MelserForm extends LitElement {
  // ✅ Use types with alias
  private formData: MelserFormData = {};

  // ✅ Use base class methods with alias
  private handleInput(event: Event) {
    const target = event.target as BaseInput;
    this.formData[target.name] = target.value;
  }

  render() {
    return html`
      <form @submit=${this.handleSubmit}>
        <base-input
          name="email"
          label="Email"
          @input=${this.handleInput}
          required
        >
        </base-input>

        <me-checkbox
          name="terms"
          label="I accept the terms"
          @change=${this.handleInput}
          required
        >
        </me-checkbox>

        <button type="submit" variant="primary">Submit</button>
      </form>
    `;
  }

  private async handleSubmit(event: Event) {
    event.preventDefault();

    // ✅ Use utility with alias
    const isValid = await this.validateForm();

    if (isValid) {
      // ✅ Emit custom event
      this.dispatchEvent(
        new CustomEvent("form-submit", {
          detail: this.formData,
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  private async validateForm(): Promise<boolean> {
    // ✅ Validation logic
    return Object.keys(this.formData).length > 0;
  }

  static styles = css`
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      max-width: 400px;
    }
  `;
}
```

## Utils Usage Example

### File: `src/utils/helpers.ts`

```typescript
// ✅ Exports with alias
export interface HelperConfig {
  validateEmail(email: string): boolean;
  formatPhone(phone: string): string;
  sanitizeInput(input: string): string;
}

// ✅ Helper functions
export const helpers: HelperConfig = {
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  formatPhone(phone: string): string {
    // Remove non-numeric characters
    const cleaned = phone.replace(/\D/g, "");

    // Apply format (XXX) XXX-XXXX
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }

    return phone;
  },

  sanitizeInput(input: string): string {
    return input.trim().replace(/[<>]/g, "");
  },
};
```

## Advantages of Using @/ Aliases

1. **Cleaner paths**: `@/components/me-checkbox` vs `../../../src/components/me-checkbox`
2. **Fewer errors**: No need to count directory levels
3. **Easier refactoring**: If you move files, you only change the config
4. **Better IntelliSense**: IDEs can resolve aliases better
5. **Consistency**: All imports use the same pattern

## TypeScript Configuration

To make TypeScript recognize aliases, you need to update `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/core/*": ["./src/core/*"],
      "@/styles/*": ["./src/styles/*"],
      "@/types/*": ["./src/types/*"],
      "@/utils/*": ["./src/utils/*"]
    }
  }
}
```

## Best Practices

1. ✅ **Always use aliases** for project imports
2. ✅ **Use absolute paths** for external libraries (e.g., `lit`, `vite`)
3. ❌ **Avoid relative paths** like `../` or `./`
4. ✅ **Group imports** by type (components, utils, types)
5. ✅ **Use specific imports** instead of `import *`

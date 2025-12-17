# Theming & Design Tokens

Melser UI uses a powerful "Design-as-Data" token system that allows for type-safe, dynamic styling across the entire library. This system is built on a three-tier taxonomy (Primitives, Semantic, Component) and supports automatic Dark Mode switching.

## Overview

- **Design Tokens**: Defined in `src/theme/tokens.ts`, these represent the source of truth for all colors, spacing, typography, etc.
- **Accessors (`Var`)**: A type-safe utility to access valid CSS variables in your Lit components (e.g., `Var.color.primary`).
- **Theme Switching**: A runtime API (`setTheme`) to toggle between Light and Dark modes instantly.

## Usage

### 1. Using Tokens in Components

Instead of hardcoding colors, use the `Var` object exported from the library. This ensures your component automatically adapts to theme changes.

```typescript
import { css, LitElement } from "lit";
import { Var } from "melser-ui"; // or relative path

export class MyComponent extends LitElement {
  static styles = css`
    :host {
      background-color: ${Var.color.bg.default};
      color: ${Var.color.text.primary};
      padding: ${Var.spacing.padding.input.default};
      border: 1px solid ${Var.color.border.default};
    }
  `;
}
```

### 2. Component-Specific Variables

For maximum flexibility, `BaseInput` and other core components generate their own CSS variables that map back to global tokens. This allows you to override a specific component's style without breaking the global theme.

```css
/* Override only base-input's background locally */
base-input {
  --base-input-bg: red;
}
```

### 3. Switching Themes via API

You can switch the global theme dynamically using `setTheme`:

```typescript
import { setTheme } from "melser-ui";

// Switch to Dark Mode
setTheme("dark");

// Switch to Light Mode
setTheme("light");
```

This works by injecting the correct CSS Variable values for the selected scheme into the document root.

## Architecture

The system is defined in `src/theme/tokens.ts`:

- **Tier 1 (Palette)**: Raw hex codes (e.g., `palette.blue.500`).
- **Tier 2 (Semantic)**: Meaningful names mapping to palettes (e.g., `color.primary` -> `palette.blue.700`).
- **Tier 3 (Component)**: Specific component overrides (e.g., `input.bg`).

When `setTheme('dark')` is called, the system remaps the Semantic Tier to use dark-appropriate palette colors, updating the entire UI instantly.

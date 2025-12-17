# Dynamic Forms with Zod

Melser UI includes capabilities to automatically generate forms from Zod schema definitions. This is extremely useful for creating administrative interfaces, editable data tables, and rapid prototypes where the data schema defines the UI.

## `me-schema-form` Component

We have created an example component called `me-schema-form` located at `src/components/melser-schema-form.ts`. This component accepts a Zod object and renders the corresponding inputs.

### Features

- **Automatic Generation**: Creates inputs based on the Zod type (`ZodString`, `ZodNumber`, `ZodBoolean`, `ZodEnum`, `ZodDate`).
- **Integrated Validation**: Uses the same `ZodFormController` as the rest of the library to validate in real-time.
- **Public API**: Methods to set and clear data programmatically.

### Usage Example

```typescript
import { html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { z } from "zod";
import "./components/melser-schema-form";

const userSchema = z.object({
  fullName: z.string().min(2, "Name too short"),
  email: z.string().email(),
  age: z.number().min(18).max(100),
  role: z.enum(["Admin", "Editor", "Viewer"]),
  isActive: z.boolean(),
  startDate: z.date(), // Or z.string() if you use strings for dates
});

@customElement("my-dynamic-feature")
class MyDynamicFeature extends LitElement {
  @state() formData = {};

  handleEdit(user) {
    // Load data into the form
    const form = this.shadowRoot.querySelector("me-schema-form");
    form.setData(user);
  }

  handleClear() {
    const form = this.shadowRoot.querySelector("me-schema-form");
    form.clearData();
  }

  handleSubmit(e) {
    console.log("Valid data submitted:", e.detail.data);
  }

  render() {
    return html`
      <div>
        <h2>Edit User</h2>
        <button
          @click="${() =>
            this.handleEdit({
              fullName: "John Doe",
              email: "john@example.com",
              age: 30,
              role: "Admin",
              isActive: true,
            })}"
        >
          Load Example
        </button>

        <button @click="${this.handleClear}">Clear</button>

        <me-schema-form
          .schema="${userSchema}"
          @submit="${this.handleSubmit}"
        ></me-schema-form>
      </div>
    `;
  }
}
```

## Component API

### Properties

| Property      | Type          | Description                                               |
| ------------- | ------------- | --------------------------------------------------------- |
| `schema`      | `z.ZodObject` | The Zod schema that defines the form.                     |
| `defaultData` | `Object`      | Initial data for the form.                                |
| `showSubmit`  | `Boolean`     | Shows or hides the native submit button. Default: `true`. |
| `submitLabel` | `String`      | Submit button text. Default: 'Submit'.                    |

### Methods

You can access these methods by getting the element reference (`querySelector('me-schema-form')`).

- **`setData(data: Record<string, unknown>): void`**
  Updates form values and validates against the schema. Useful for "Editing" a table record.
- **`clearData(): void`**
  Resets the form to an empty state (or schema defaults).
- **`submit(): Record<string, unknown> | null`**
  Executes validation manually. If successful, triggers the `submit` event and returns data. If fails, shows errors in UI and returns `null`.

## Type Mapping

The component automatically maps Zod types to Melser UI components:

- `z.string()` -> `<base-input type="text">` (or `password` if field name includes "password")
- `z.number()` -> `<me-number-input>`
- `z.boolean()` -> `<me-switch>`
- `z.enum([...])` -> `<me-select>`
- `z.date()` -> `<me-date-picker>`

For more advanced customizations (like `textarea`, `range`, `file-upload`), it is recommended to extend the `MelserSchemaForm` component and override the `renderField` method.

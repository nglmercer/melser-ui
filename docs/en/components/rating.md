---
title: MelserRating
---

# MelserRating

A star rating component based on SVG, with support for decimal precision (half points, exact decimals), validation, and full CSS customization.

## Basic Example

```html
<me-rating label="Rate this service" max="5"> </me-rating>
```

## Interactive Demo

<me-rating
  id="demo-basic"
  label="Standard Rating"
  max="5">
</me-rating>

<me-rating
  id="demo-precision"
  label="With Half Points"
  max="5"
  precision="0.5">
</me-rating>

<me-rating
  id="demo-exact"
  label="Exact Precision"
  max="10"
  value="7.3"
  precision="0.1">
</me-rating>

<me-rating
  id="demo-disabled"
  label="Disabled"
  max="5"
  value="3.5"
  disabled>
</me-rating>

## Properties

| Property    | Type      | Default | Description                                      |
| :---------- | :-------- | :------ | :----------------------------------------------- |
| `value`     | `number`  | `0`     | Current numeric rating value.                    |
| `max`       | `number`  | `5`     | Total number of stars to show.                   |
| `min`       | `number`  | `0`     | Minimum allowed value.                           |
| `precision` | `number`  | `1`     | Selection granularity (1, 0.5, 0.1, etc.).       |
| `label`     | `string`  | `''`    | Visible field label.                             |
| `disabled`  | `boolean` | `false` | Disables interaction.                            |
| `readonly`  | `boolean` | `false` | Read-only mode (useful for displaying averages). |
| `required`  | `boolean` | `false` | Marks field as required in forms.                |

## Events

| Event    | Description                                             |
| :------- | :------------------------------------------------------ |
| `change` | Fires when user clicks and confirms a rating.           |
| `input`  | Fires during interaction (optional, depending on base). |

## Usage Examples

### Half Point Rating

To allow selecting values like 3.5 or 4.5, set the `precision` property to `0.5`.

```html
<me-rating
  label="Service Quality"
  name="serviceQuality"
  max="5"
  precision="0.5"
>
</me-rating>
```

### 1 to 10 Scale with Decimal Precision

For scientific cases or exact averages (e.g. 8.7), use finer precision.

```html
<me-rating label="Exact Score" max="10" precision="0.1" value="8.7">
</me-rating>
```

## Customization with CSS

### Available Variables

| Variable              | Default                     | Description                           |
| :-------------------- | :-------------------------- | :------------------------------------ |
| `--star-size`         | `1.5rem`                    | Size (width and height) of each star. |
| `--star-color-filled` | `#fbbf24`                   | Color of active star (yellow/gold).   |
| `--star-color-empty`  | `var(--me-border, #e5e7eb)` | Background color of inactive star.    |

### Style Examples

```css
/* Custom class for large green stars */
.rating-success {
  --star-size: 2.5rem;
  --star-color-filled: #10b981; /* Emerald Green */
  --star-color-empty: #d1fae5;
}

/* Class for dark theme */
.rating-dark {
  --star-color-filled: #8b5cf6; /* Violet */
  --star-color-empty: #374151; /* Dark Gray */
}
```

```html
<me-rating class="rating-success" label="Success"></me-rating>
<me-rating class="rating-dark" label="Dark Theme"></me-rating>
```

## Form Integration

```html
<me-playground-form
  id="rating-playground"
  schema-name="rating"
  title="Feedback Survey"
  description="Service valuation."
>
  <div style="margin-bottom: 1rem;">
    <me-rating
      label="General Experience"
      name="rating"
      required
      max="5"
      precision="0.5"
    >
    </me-rating>
  </div>
</me-playground-form>
```

## Accessibility

- Supports basic navigation.
- Uses scalable SVGs that don't depend on external fonts.
- Click area is the full star container, improving usability on touch devices.

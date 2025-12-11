---
title: MelserRating
---

# MelserRating

Un componente de calificación con estrellas basado en SVG, con soporte para precisión decimal (medios puntos, decimales exactos), validación y personalización completa vía CSS.

## Ejemplo Básico

```html
<me-rating label="Califica este servicio" max="5"> </me-rating>
```

## Demo Interactivo

<me-rating
  id="demo-basic"
  label="Calificación estándar"
  max="5">
</me-rating>

<me-rating
  id="demo-precision"
  label="Con medios puntos"
  max="5"
  precision="0.5">
</me-rating>

<me-rating
  id="demo-exact"
  label="Precisión exacta"
  max="10"
  value="7.3"
  precision="0.1">
</me-rating>

<me-rating
  id="demo-disabled"
  label="Deshabilitado"
  max="5"
  value="3.5"
  disabled>
</me-rating>

## Propiedades

| Propiedad   | Tipo      | Valor por Defecto | Descripción                                       |
| :---------- | :-------- | :---------------- | :------------------------------------------------ |
| `value`     | `number`  | `0`               | Valor numérico actual de la calificación.         |
| `max`       | `number`  | `5`               | Número total de estrellas a mostrar.              |
| `min`       | `number`  | `0`               | Valor mínimo permitido.                           |
| `precision` | `number`  | `1`               | Granularidad de la selección (1, 0.5, 0.1, etc.). |
| `label`     | `string`  | `''`              | Etiqueta visible del campo.                       |
| `disabled`  | `boolean` | `false`           | Deshabilita la interacción.                       |
| `readonly`  | `boolean` | `false`           | Modo solo lectura (útil para mostrar promedios).  |
| `required`  | `boolean` | `false`           | Marca el campo como requerido en formularios.     |

## Eventos

| Evento   | Descripción                                                           |
| :------- | :-------------------------------------------------------------------- |
| `change` | Se dispara cuando el usuario hace clic y confirma una calificación.   |
| `input`  | Se dispara durante la interacción (opcional, dependiendo de la base). |

## Ejemplos de Uso

### Calificación con Medios Puntos

Para permitir seleccionar valores como 3.5 o 4.5, establece la propiedad `precision` en `0.5`.

```html
<me-rating
  label="Calidad del servicio"
  name="serviceQuality"
  max="5"
  precision="0.5"
>
</me-rating>
```

### Escala de 1 a 10 con Precisión Decimal

Para casos científicos o promedios exactos (ej. 8.7), usa una precisión más fina.

```html
<me-rating label="Puntuación Exacta" max="10" precision="0.1" value="8.7">
</me-rating>
```

## Personalización con CSS

### Variables Disponibles

| Variable              | Valor por Defecto           | Descripción                                    |
| :-------------------- | :-------------------------- | :--------------------------------------------- |
| `--star-size`         | `1.5rem`                    | Tamaño (ancho y alto) de cada estrella.        |
| `--star-color-filled` | `#fbbf24`                   | Color de la estrella activa (amarillo/dorado). |
| `--star-color-empty`  | `var(--me-border, #e5e7eb)` | Color de fondo de la estrella inactiva.        |

### Ejemplos de Estilos

```css
/* Clase personalizada para estrellas verdes y grandes */
.rating-success {
  --star-size: 2.5rem;
  --star-color-filled: #10b981; /* Verde Emerald */
  --star-color-empty: #d1fae5;
}

/* Clase para tema oscuro */
.rating-dark {
  --star-color-filled: #8b5cf6; /* Violeta */
  --star-color-empty: #374151; /* Gris oscuro */
}
```

```html
<me-rating class="rating-success" label="Éxito"></me-rating>
<me-rating class="rating-dark" label="Tema Oscuro"></me-rating>
```

## Integración con Formularios

```html
<me-playground-form
  id="rating-playground"
  schema-name="rating"
  title="Encuesta de Feedback"
  description="Valoración del servicio."
>
  <div style="margin-bottom: 1rem;">
    <me-rating
      label="Experiencia General"
      name="rating"
      required
      max="5"
      precision="0.5"
    >
    </me-rating>
  </div>
</me-playground-form>
```

## Accesibilidad

- Soporta navegación básica.
- Utiliza SVGs escalables que no dependen de fuentes externas.
- El área de clic es el contenedor de la estrella completa, mejorando la usabilidad en dispositivos táctiles.

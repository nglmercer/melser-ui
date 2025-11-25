Aqui tienes la documentación actualizada en formato Markdown para reflejar exactamente la implementación del componente `MelserRating` que acabamos de crear (usando `precision`, SVGs, y variables CSS en lugar de props de estilo).

-----

## title: MelserRating

# MelserRating

Un componente de calificación con estrellas basado en SVG, con soporte para precisión decimal (medios puntos, decimales exactos), validación y personalización completa vía CSS.

## Ejemplo Básico

```html
<melser-rating 
  label="Califica este servicio" 
  max="5">
</melser-rating>
```

## Demo Interactivo

<melser-rating
label="Calificación estándar"
max="5">
</melser-rating>

<melser-rating
label="Con medios puntos"
max="5"
precision="0.5">
</melser-rating>

<melser-rating
label="Precisión exacta"
max="10"
value="7.3"
precision="0.1">
</melser-rating>

<melser-rating
label="Deshabilitado"
max="5"
value="3.5"
disabled>
</melser-rating>

<div style="margin: 1rem 0; display: flex; gap: 1rem; align-items: center;">
<melser-rating style="--star-size: 1rem;" label="Pequeño">
</melser-rating>
<melser-rating style="--star-size: 2rem;" label="Grande">
</melser-rating>
</div>

## Propiedades

| Propiedad | Tipo | Valor por Defecto | Descripción |
|-----------|------|-------------------|-------------|
| `value` | `number` | `0` | Valor numérico actual de la calificación. |
| `max` | `number` | `5` | Número total de estrellas a mostrar. |
| `min` | `number` | `0` | Valor mínimo permitido. |
| `precision` | `number` | `1` | Granularidad de la selección (1, 0.5, 0.1, etc.). |
| `label` | `string` | `''` | Etiqueta visible del campo. |
| `disabled` | `boolean` | `false` | Deshabilita la interacción. |
| `readonly` | `boolean` | `false` | Modo solo lectura (útil para mostrar promedios). |
| `required` | `boolean` | `false` | Marca el campo como requerido en formularios. |

## Eventos

El componente hereda la funcionalidad de `MelserBaseInput`.

| Evento | Descripción |
|--------|-------------|
| `change` | Se dispara cuando el usuario hace clic y confirma una calificación. |
| `input` | Se dispara durante la interacción (opcional, dependiendo de la base). |

## Ejemplos de Uso

### Calificación con Medios Puntos

Para permitir seleccionar valores como 3.5 o 4.5, establece la propiedad `precision` en `0.5`.

```html
<melser-rating 
  label="Calidad del servicio"
  name="serviceQuality"
  max="5"
  precision="0.5">
</melser-rating>
```

### Escala de 1 a 10 con Precisión Decimal

Para casos científicos o promedios exactos (ej. 8.7), usa una precisión más fina.

```html
<melser-rating 
  label="Puntuación Exacta"
  max="10"
  precision="0.1"
  value="8.7">
</melser-rating>
```

## Personalización con CSS

El componente ya no usa props para estilos (`size`, `color`), sino que aprovecha Variables CSS nativas para mayor flexibilidad.

### Variables Disponibles

| Variable | Valor por Defecto | Descripción |
|----------|-------------------|-------------|
| `--star-size` | `1.5rem` | Tamaño (ancho y alto) de cada estrella. |
| `--star-color-filled` | `#fbbf24` | Color de la estrella activa (amarillo/dorado). |
| `--star-color-empty` | `var(--melser-border, #e5e7eb)` | Color de fondo de la estrella inactiva. |

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
<melser-rating class="rating-success" label="Éxito"></melser-rating>
<melser-rating class="rating-dark" label="Tema Oscuro"></melser-rating>
```

## Integración con Formularios

El componente funciona nativamente dentro de formularios gracias a `MelserBaseInput`.

```html
<form id="feedback-form">
  <melser-rating 
    label="Experiencia General" 
    name="rating" 
    required 
    max="5"
    precision="0.5">
  </melser-rating>
  
  <button type="submit">Enviar</button>
</form>

<script>
  const form = document.getElementById('feedback-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    console.log("Rating:", formData.get('rating')); // Devuelve el número (ej: "4.5")
  });
</script>
```

## Accesibilidad

  * Soporta navegación básica.
  * Utiliza SVGs escalables que no dependen de fuentes externas.
  * El área de clic es el contenedor de la estrella completa, mejorando la usabilidad en dispositivos táctiles.

## Troubleshooting

### No puedo seleccionar decimales (ej. 4.5)

Verifica que la propiedad `precision` esté configurada correctamente. Por defecto es `1` (enteros).

```html
<melser-rating max="5"></melser-rating>

<melser-rating max="5" precision="0.5"></melser-rating>
```

### El tamaño no cambia con `width` o `height` en el host

Debes usar la variable CSS `--star-size`.

```css
/* Correcto */
melser-rating {
  --star-size: 30px;
}
```

### El valor reportado tiene muchos decimales (ej. 4.1000002)

El componente maneja internamente el redondeo visual, pero el valor crudo puede tener imperfecciones de punto flotante. El componente incluye una corrección interna (`toFixed(2)`), pero si persiste, puedes redondearlo al recibir el evento:

```javascript
element.addEventListener('change', (e) => {
  const cleanValue = parseFloat(e.target.value.toFixed(1));
});
```
---
Checkbox component
---

# MelserCheckbox

Un componente de selección binaria (checkbox) altamente personalizable, accesible y consistente con el sistema de diseño Melser.

## Características Clave

- 🎨 **3 Niveles de Personalización:** Variantes predefinidas, variables CSS y Shadow Parts.
- 📏 **Tamaños Adaptables:** Soporte nativo para `small`, `medium` y `large`.
- ♿ **Accesibilidad Primero:** Input nativo oculto para mantener navegación por teclado y soporte de lectores de pantalla.
- ✨ **Animaciones:** Transiciones suaves de estado y foco.

## Ejemplo Básico

```html
<me-checkbox label="Acepto los términos y condiciones"></me-checkbox>
```

## Demo Interactivo

<div style="display: flex; flex-direction: column; gap: 1rem;">
<me-checkbox id="demo-basic" label="Checkbox básico"></me-checkbox>
<me-checkbox id="demo-checked" label="Checkbox marcado por defecto" checked></me-checkbox>
<me-checkbox id="demo-disabled" label="Checkbox deshabilitado" disabled></me-checkbox>
<me-checkbox id="demo-error" label="Con error de validación" required errorMessage="Debes marcar esta casilla"></me-checkbox>
</div>

## API del Componente

### Propiedades

| Propiedad  | Tipo                             | Default      | Descripción                                           |
| ---------- | -------------------------------- | ------------ | ----------------------------------------------------- |
| `checked`  | `boolean`                        | `false`      | Estado actual del checkbox. Sincronizado con `value`. |
| `value`    | `boolean`                        | `false`      | Alias para `checked` (heredado de BaseInput).         |
| `label`    | `string`                         | `''`         | Texto mostrado junto al checkbox.                     |
| `disabled` | `boolean`                        | `false`      | Deshabilita la interacción y reduce la opacidad.      |
| `required` | `boolean`                        | `false`      | Marca el campo como obligatorio para formularios.     |
| `size`     | `'small' \| 'medium' \| 'large'` | `'medium'`   | **NUEVO:** Controla el tamaño del control y texto.    |
| `variant`  | `'outlined' \| 'card'`           | `'outlined'` | **NUEVO:** Cambia el estilo visual del contenedor.    |
| `name`     | `string`                         | `''`         | Identificador para el envío de formularios.           |

### Shadow Parts (Para CSS Avanzado)

Utiliza `::part(nombre)` para estilizar elementos internos sin variables.

| Part            | Descripción                                  |
| --------------- | -------------------------------------------- |
| `wrapper`       | Contenedor principal del componente.         |
| `container`     | El `label` que envuelve al input y el texto. |
| `control`       | El cuadrado visual (el "falso" checkbox).    |
| `icon`          | El SVG del check dentro del control.         |
| `label`         | El elemento de texto de la etiqueta.         |
| `error-message` | El contenedor del mensaje de error.          |

### Eventos

| Evento      | Detalle (`e.detail`)           | Descripción                                                 |
| ----------- | ------------------------------ | ----------------------------------------------------------- |
| `ui:change` | `{ name, value, isValid ... }` | Evento unificado del sistema Melser. Se dispara al cambiar. |
| `change`    | `Event`                        | Evento nativo estándar.                                     |

---

## Guía de Personalización

### 1. Usando Tamaños (Sizes)

No necesitas CSS para cambiar el tamaño, usa la propiedad `size`.

```html
<me-checkbox size="small" label="Pequeño"></me-checkbox>

<me-checkbox size="medium" label="Normal"></me-checkbox>

<me-checkbox size="large" label="Grande"></me-checkbox>
```

### 2. Usando Variantes (Variants)

El componente incluye estilos alternativos "out of the box".

**Variante Card:** Convierte el checkbox en una tarjeta seleccionable.

```html
<me-checkbox variant="card" label="Opción Premium (Incluye todo)" name="plan">
</me-checkbox>
```

### 3. Personalización vía CSS (Variables)

El componente hereda los colores globales, pero puedes sobreescribirlos localmente usando variables `base-input-*`.

```css
/* En tu hoja de estilos global o componente padre */
.mi-checkbox-custom {
  /* Color de fondo cuando está activo */
  --base-input-control-bg-checked: #ff4081;
  /* Color del borde inactivo */
  --base-input-control-border-color: #b0bec5;
  /* Radio del borde (hacerlo redondo) */
  --base-input-control-radius: 50%;
}
```

```html
<me-checkbox
  class="mi-checkbox-custom"
  label="Checkbox Redondo y Rosa"
  checked
></me-checkbox>
```

### 4\. Personalización Quirúrgica (Shadow Parts)

Para cambios que las variables no cubren, usa `::part`.

```css
/* Ejemplo: Hacer que el label esté en negrita y cursiva */
me-checkbox::part(label) {
  font-weight: 800;
  font-style: italic;
  color: #333;
}

/* Ejemplo: Cambiar el icono del check por otro color solo en este estado */
me-checkbox[checked]::part(icon) {
  fill: #fff; /* Asegurar contraste */
}

/* Ejemplo: Mover el texto a la izquierda del cuadro (reverse) */
me-checkbox::part(container) {
  flex-direction: row-reverse;
  justify-content: flex-end;
}
```

---

## Integración con Formularios

El componente emite eventos y valida su estado interno.

```html
<me-playground-form
  id="checkbox-playground"
  schema-name="checkbox"
  title="Registro"
  description="Validación de términos y condiciones."
>
  <me-checkbox name="terms" label="Acepto los términos *" required>
  </me-checkbox>
</me-playground-form>
```

## Solución de Problemas

**El estilo no se aplica al imprimir (Print styles):**
Los navegadores a veces eliminan los `background-color` al imprimir.

```css
@media print {
  me-checkbox::part(control) {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
```

**El checkbox no se alinea con el texto en párrafos largos:**
Por defecto, el checkbox está centrado verticalmente (`align-items: center`). Si tienes texto de varias líneas y quieres el checkbox arriba:

```css
me-checkbox::part(container) {
  align-items: flex-start; /* Alinea arriba */
}
me-checkbox::part(control) {
  margin-top: 2px; /* Pequeño ajuste visual */
}
```

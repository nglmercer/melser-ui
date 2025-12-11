---
ColorPicker component
---

# MelserColorPicker

**MelserColorPicker** es un componente de entrada diseñado para la selección de colores hexadecimales. Combina un selector de color visual nativo (`input type="color"`) con un campo de texto para la entrada manual de códigos HEX.

Hereda todas las funcionalidades base de `MelserBaseInput` (validación requerida, etiquetas, variantes de diseño).

### Ejemplo Básico

```html
<melser-color-picker label="Color de Fondo" value="#3b82f6">
</melser-color-picker>
```

---

## Propiedades (API)

### Específicas del Componente

| Propiedad | Tipo     | Valor por Defecto | Descripción                                        |
| :-------- | :------- | :---------------- | :------------------------------------------------- |
| `value`   | `string` | `'#000000'`       | El valor del color en formato HEX (ej: `#FF0000`). |

### Heredadas de MelserBaseInput

| Propiedad / Atributo | Tipo                                   | Default         | Descripción                      |
| :------------------- | :------------------------------------- | :-------------- | :------------------------------- |
| `label`              | `string`                               | `''`            | Etiqueta visible del campo.      |
| `name`               | `string`                               | `''`            | Identificador para formularios.  |
| `variant`            | `'outlined' \| 'filled' \| 'standard'` | `'outlined'`    | Estilo visual del input.         |
| `size`               | `'small' \| 'medium' \| 'large'`       | `'medium'`      | Tamaño del componente.           |
| `required`           | `boolean`                              | `false`         | Marca el campo como obligatorio. |
| `disabled`           | `boolean`                              | `false`         | Deshabilita la interacción.      |
| `errorMessage`       | `string`                               | `''`            | Mensaje de error a mostrar.      |
| `input-id`           | `string`                               | _auto-generado_ | ID para el input interno.        |

---

## Eventos

| Evento      | Detalle (`e.detail`) | Descripción                                                                                |
| :---------- | :------------------- | :----------------------------------------------------------------------------------------- |
| `ui:change` | `InputData<string>`  | Se dispara cuando el usuario cambia el color (visual o texto) y el valor es un HEX válido. |

### Estructura de `InputData`

```typescript
{
  name: string; // Nombre del componente
  value: string; // Valor HEX actual (ej: "#FF0000")
  isValid: boolean; // Si cumple con la validación 'required'
  componentType: string; // 'melser-color-picker'
  dataType: string; // 'string'
}
```

---

## Ejemplos de Uso

### 1. Variantes de Diseño

El componente soporta los estilos definidos en la clase base.

```html
<melser-color-picker
  label="Outlined"
  variant="outlined"
  value="#7c3aed"
></melser-color-picker>

<melser-color-picker
  label="Filled"
  variant="filled"
  value="#db2777"
></melser-color-picker>

<melser-color-picker
  label="Standard"
  variant="standard"
  value="#059669"
></melser-color-picker>
```

### 2. Tamaños

Controla el tamaño del padding y la tipografía.

```html
<melser-color-picker label="Pequeño" size="small"></melser-color-picker>
<melser-color-picker label="Normal" size="medium"></melser-color-picker>
<melser-color-picker label="Grande" size="large"></melser-color-picker>
```

### 3. Validación y Errores

El componente valida automáticamente que el texto ingresado sea un HEX válido de 6 dígitos. Si el input es `required` y está vacío, `isValid` será falso en el evento.

```html
<melser-color-picker
  label="Color Obligatorio"
  required
  error-message="Este campo es requerido"
  value=""
>
</melser-color-picker>
```

### 4. Capturar el cambio de valor (JavaScript)

```javascript
const picker = document.querySelector("melser-color-picker");

picker.addEventListener("ui:change", (e) => {
  const { value, isValid } = e.detail;
  console.log("Nuevo color:", value);
  console.log("Es válido:", isValid);

  // Ejemplo: cambiar el fondo del body
  if (isValid) {
    document.body.style.backgroundColor = value;
  }
});
```

## Demo Interactivo

<melser-color-picker 
  id="demo-basic" 
  label="Selector básico" 
  value="#3b82f6">
</melser-color-picker>

<melser-color-picker 
  id="demo-sizesm" 
  label="small_size" 
  value="#3b82f6"
  size="small">
</melser-color-picker>

<melser-color-picker 
  id="demo-size-lg" 
  label="large_size" 
  value="#3b82f6"
  size="large">
</melser-color-picker>

<melser-color-picker 
  id="demo-disabled" 
  label="Deshabilitado" 
  value="#ef4444"
  disabled>
</melser-color-picker>

## Demo del Formulario

<melser-playground-form id="color-playground" title="Personalización de Tema" description="Selecciona los colores de tu interfaz.">
  <div style="margin-bottom: 1.5rem;">
    <melser-color-picker 
      label="Color Principal *"
      name="primaryColor"
      required
      value="#3b82f6">
    </melser-color-picker>
  </div>
  
  <div style="margin-bottom: 1.5rem;">
    <melser-color-picker 
      label="Color de Fondo"
      name="backgroundColor"
      value="#ffffff">
    </melser-color-picker>
  </div>
</melser-playground-form>

---

## Estilizado (CSS Variables)

Puedes personalizar la apariencia utilizando las siguientes variables CSS heredadas:

```css
melser-color-picker {
  /* Generales */
  --melser-font-family: "Roboto", sans-serif;
  --melser-spacing: 1.5rem; /* Margen inferior */

  /* Colores */
  --melser-primary: #3b82f6; /* Color de foco */
  --melser-error: #ef4444; /* Color de error */
  --melser-text: #1f2937; /* Color del texto */
  --melser-label-color: #374151;
  --melser-border: #d1d5db; /* Color del borde */
  --melser-bg: #ffffff; /* Fondo del input */
  --melser-surface: #f3f4f6; /* Fondo para variante 'filled' */

  /* Dimensiones */
  --melser-radius: 0.5rem; /* Radio de borde */
}
```

---

## Notas de Comportamiento

- **Entrada de Texto:** El campo de texto acepta valores hexadecimales. Si el usuario olvida escribir el `#`, el componente lo agrega automáticamente.
- **Sincronización:** El selector visual (`input type="color"`) y el campo de texto se mantienen sincronizados. Si escribes un HEX válido, el selector de color se actualiza.
- **Validación HEX:** El componente solo acepta formato hexadecimal de 6 dígitos (ej: `#AABBCC`). El regex interno es `/^#[0-9A-F]{6}$/i`.

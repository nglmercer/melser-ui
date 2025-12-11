---
title: MelserColorPicker
---

# MelserColorPicker

**MelserColorPicker** es un componente de entrada diseñado para la selección de colores hexadecimales. Combina un selector de color visual nativo (`input type="color"`) con un campo de texto para la entrada manual de códigos HEX.

## Ejemplo Básico

```html
<me-color-picker label="Color de Fondo" value="#3b82f6"> </me-color-picker>
```

## Demo Interactivo

<me-color-picker 
  id="demo-basic" 
  label="Selector básico" 
  value="#3b82f6">
</me-color-picker>

<me-color-picker 
  id="demo-sizesm" 
  label="Pequeño" 
  value="#3b82f6"
  size="small">
</me-color-picker>

<me-color-picker 
  id="demo-size-lg" 
  label="Grande" 
  value="#3b82f6"
  size="large">
</me-color-picker>

<me-color-picker 
  id="demo-disabled" 
  label="Deshabilitado" 
  value="#ef4444"
  disabled>
</me-color-picker>

<h3>Colores (Estados)</h3>
<div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
  <me-color-picker label="Success" color="success" value="#10b981"></me-color-picker>
  <me-color-picker label="Warning" color="warning" value="#f59e0b"></me-color-picker>
  <me-color-picker label="Danger" color="danger" value="#ef4444"></me-color-picker>
</div>

## Propiedades

| Propiedad      | Tipo                                              | Valor por Defecto | Descripción                                        |
| :------------- | :------------------------------------------------ | :---------------- | :------------------------------------------------- |
| `value`        | `string`                                          | `'#000000'`       | El valor del color en formato HEX (ej: `#FF0000`). |
| `label`        | `string`                                          | `''`              | Etiqueta visible del campo.                        |
| `name`         | `string`                                          | `''`              | Identificador para formularios.                    |
| `variant`      | `'outlined' \| 'filled' \| 'standard'`            | `'outlined'`      | Estilo visual del input.                           |
| `size`         | `'small' \| 'medium' \| 'large'`                  | `'medium'`        | Tamaño del componente.                             |
| `color`        | `'primary' \| 'success' \| 'warning' \| 'danger'` | `'primary'`       | Esquema de color del estado.                       |
| `required`     | `boolean`                                         | `false`           | Marca el campo como obligatorio.                   |
| `disabled`     | `boolean`                                         | `false`           | Deshabilita la interacción.                        |
| `errorMessage` | `string`                                          | `''`              | Mensaje de error a mostrar.                        |

## Eventos

| Evento      | Descripción                                                                                |
| :---------- | :----------------------------------------------------------------------------------------- |
| `ui:change` | Se dispara cuando el usuario cambia el color (visual o texto) y el valor es un HEX válido. |
| `input`     | Se dispara en cada cambio de texto.                                                        |
| `change`    | Se dispara al confirmar el cambio.                                                         |

## Ejemplos de Uso

### Variantes de Diseño

```html
<div style="display: flex; gap: 1rem;">
  <me-color-picker
    label="Outlined"
    variant="outlined"
    value="#7c3aed"
  ></me-color-picker>
  <me-color-picker
    label="Filled"
    variant="filled"
    value="#db2777"
  ></me-color-picker>
  <me-color-picker
    label="Standard"
    variant="standard"
    value="#059669"
  ></me-color-picker>
</div>
```

### Escuchar Cambios en JS

```javascript
const picker = document.querySelector("me-color-picker");

picker.addEventListener("ui:change", (e) => {
  const { value, isValid } = e.detail;
  console.log("Nuevo color seleccionado:", value);
  document.body.style.setProperty("--main-bg-color", value);
});
```

## Integración con Formularios

### Formulario de Personalización

```html
<form id="theme-form">
  <me-color-picker
    label="Color Principal *"
    name="primary"
    required
    value="#3b82f6"
    error-message="Debes seleccionar un color principal"
  ></me-color-picker>

  <me-color-picker
    label="Color Secundario"
    name="secondary"
    value="#10b981"
  ></me-color-picker>

  <button type="submit">Guardar Tema</button>
</form>
```

```javascript
document.getElementById("theme-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  console.log(Object.fromEntries(formData));
});
```

## Demo del Formulario

<me-playground-form id="color-playground" schema-name="color-picker" title="Personalización de Tema" description="Selecciona los colores de tu interfaz.">
  <div style="margin-bottom: 1.5rem;">
    <me-color-picker 
      label="Color Principal *"
      name="primaryColor"
      required
      value="#3b82f6">
    </me-color-picker>
  </div>
  
  <div style="margin-bottom: 1.5rem;">
    <me-color-picker 
      label="Color de Fondo"
      name="backgroundColor"
      value="#ffffff">
    </me-color-picker>
  </div>
</me-playground-form>

## Personalización con CSS

### Variables CSS

```css
me-color-picker {
  /* Generales */
  --me-font-family: "Roboto", sans-serif;

  /* Colores */
  --me-primary: #3b82f6;
  --me-error: #ef4444;
  --me-text: #1f2937;
  --me-label-color: #374151;
  --me-border: #d1d5db;
  --me-bg: #ffffff;

  /* Dimensiones */
  --me-radius: 0.5rem;
}
```

## Accesibilidad

- **Sincronización dual**: El input de texto y el selector de color se mantienen sincronizados para usuarios de teclado y ratón.
- **Labels**: Siempre incluye un label asociado.
- **Validación visual**: Los errores se muestran claramente y se anuncian via ARIA.

---
title: MelserPasswordInput
---

# MelserPasswordInput

Un componente de entrada de contraseña con toggle de visibilidad, validación de fortaleza y medidor de seguridad.

## Ejemplo Básico

```html
<me-password-input label="Contraseña" placeholder="Crea una contraseña segura">
</me-password-input>
```

## Demo Interactivo

<me-password-input 
  id="demo-basic" 
  label="Contraseña" 
  placeholder="Ingresa tu contraseña">
</me-password-input>

<me-password-input 
  id="demo-strength" 
  label="Con medidor de fortaleza" 
  placeholder="Escribe para probar"
  strength-meter
  minlength="8">
</me-password-input>

<me-password-input 
  id="demo-visible" 
  label="Visible por defecto" 
  placeholder="Contraseña visible"
  show-password
  value="visible123">
</me-password-input>

<me-password-input 
  id="demo-disabled" 
  label="Deshabilitado" 
  placeholder="No editable"
  disabled
  value="secret123">
</me-password-input>

<h3>Colores</h3>
<div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
  <me-password-input label="Success" color="success" value="Password123" strength-meter></me-password-input>
  <me-password-input label="Warning" color="warning" value="weak" strength-meter></me-password-input>
  <me-password-input label="Danger" color="danger" value="bad" strength-meter></me-password-input>
</div>

## Propiedades

| Propiedad         | Tipo                                              | Valor por Defecto                            | Descripción                         |
| :---------------- | :------------------------------------------------ | :------------------------------------------- | :---------------------------------- |
| `show-toggle`     | `boolean`                                         | `true`                                       | Muestra/oculta botón de visibilidad |
| `strength-meter`  | `boolean`                                         | `false`                                      | Muestra medidor de fortaleza        |
| `minlength`       | `number`                                          | `undefined`                                  | Longitud mínima requerida           |
| `maxlength`       | `number`                                          | `undefined`                                  | Longitud máxima permitida           |
| `show-password`   | `boolean`                                         | `false`                                      | Estado inicial de visibilidad       |
| `strength-levels` | `array`                                           | `['débil', 'media', 'fuerte', 'muy fuerte']` | Niveles de fortaleza                |
| `label`           | `string`                                          | `''`                                         | Etiqueta visible del campo          |
| `placeholder`     | `string`                                          | `''`                                         | Texto de marcador de posición       |
| `value`           | `string`                                          | `''`                                         | Valor del campo                     |
| `color`           | `'primary' \| 'success' \| 'warning' \| 'danger'` | `'primary'`                                  | Esquema de color del estado.        |
| `disabled`        | `boolean`                                         | `false`                                      | Deshabilita la interacción          |
| `required`        | `boolean`                                         | `false`                                      | Campo requerido en formularios      |

## Eventos

| Evento              | Descripción                          |
| :------------------ | :----------------------------------- |
| `input`             | Se dispara al cambiar el valor       |
| `change`            | Se dispara al confirmar el cambio    |
| `toggle-visibility` | Se dispara al cambiar la visibilidad |
| `strength-change`   | Se dispara al cambiar la fortaleza   |
| `focus`             | Se dispara al obtener el foco        |
| `blur`              | Se dispara al perder el foco         |

## Ejemplos de Uso

### Contraseña con Validación de Fortaleza

```html
<me-password-input
  label="Nueva contraseña *"
  placeholder="Mínimo 8 caracteres"
  minlength="8"
  maxlength="50"
  strength-meter
  show-toggle
  required
  hint="Debe incluir mayúsculas, números y símbolos"
>
</me-password-input>
```

### Contraseña con Requisitos Específicos

```html
<me-password-input
  label="Contraseña segura *"
  required
  minlength="12"
  strength-meter
  placeholder="Al menos 12 caracteres"
  pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}"
  error="La contraseña debe tener al menos 12 caracteres, incluyendo mayúsculas, números y símbolos"
>
</me-password-input>
```

## Integración con Formularios

### Formulario de Registro

```html
<form id="register-form">
  <me-password-input
    label="Contraseña *"
    name="password"
    required
    minlength="8"
    strength-meter
    show-toggle
    placeholder="Crea una contraseña segura"
  >
  </me-password-input>

  <me-password-input
    label="Confirmar contraseña *"
    name="confirmPassword"
    required
    minlength="8"
    show-toggle
    placeholder="Repite tu contraseña"
  >
  </me-password-input>

  <button type="submit">Registrarse</button>
</form>
```

```javascript
document.getElementById("register-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  // Validar coincidencia de contraseñas aquí
});
```

## Demo del Formulario

<me-playground-form id="password-playground" schema-name="password-input" title="Cambio de Contraseña" description="Validación de fortaleza y coincidencia.">
  <div style="margin-bottom: 1rem;">
    <me-password-input 
      label="Contraseña actual *"
      name="currentPassword"
      required
      placeholder="Tu contraseña actual">
    </me-password-input>
  </div>
  
  <div style="margin-bottom: 1rem;">
    <me-password-input 
      label="Nueva contraseña *"
      name="confirmPassword"
      required
      minlength="8"
      strength-meter
      show-toggle
      placeholder="Nueva contraseña">
    </me-password-input>
  </div>
</me-playground-form>

## Personalización con CSS

### Variables CSS

```css
me-password-input {
  --me-password-toggle-size: 20px;
  --me-password-strength-weak: #ef4444;
  --me-password-strength-medium: #f59e0b;
  --me-password-strength-strong: #10b981;
  --me-password-strength-very-strong: #059669;
  --me-password-meter-height: 4px;
  --me-password-meter-radius: 2px;
}
```

### Ejemplos de Personalización

<style>
  .custom-password {
    --me-password-strength-weak: #dc2626;
    --me-password-strength-medium: #ea580c;
  }
  
  .minimal-password {
    --me-password-meter-height: 2px;
  }
</style>

<div class="custom-password" style="margin-bottom: 1rem;">
  <me-password-input 
    label="Contraseña personalizada"
    placeholder="Colores de fortaleza personalizados"
    strength-meter
    value="ContraseñaFuerte123!">
  </me-password-input>
</div>

<div class="minimal-password">
  <me-password-input 
    label="Estilo minimalista"
    placeholder="Más discreto"
    value="Mini123">
  </me-password-input>
</div>

## Características Avanzadas

### Validación de Fortaleza Personalizada

```javascript
const passwordInput = document.querySelector("me-password-input");
if (passwordInput) {
  passwordInput.addEventListener("strength-change", (e) => {
    const { strength, score } = e.detail;

    switch (score) {
      case 0:
      case 1:
        console.log("⚠️ Contraseña muy débil");
        break;
      case 2:
        console.log("⚠️ Contraseña débil");
        break;
      case 3:
        console.log("✅ Contraseña aceptable");
        break;
      case 4:
        console.log("🔒 Contraseña fuerte");
        break;
    }
  });
}
```

## Accesibilidad

- **Toggle accesible**: Botón con aria-label apropiado.
- **Medidor de fortaleza**: Anunciado por screen readers.
- **Validación semántica**: Mensajes de error accesibles.
- **Navegación por teclado**: Tab y Enter funcionan correctamente.

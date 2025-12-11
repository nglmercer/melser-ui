---
title: MelserPasswordInput
---

# MelserPasswordInput

Un componente de entrada de contraseña con toggle de visibilidad, validación de fortaleza y medidor de seguridad.

## Ejemplo Básico

```html
<melser-password-input
  label="Contraseña"
  placeholder="Crea una contraseña segura"
>
</melser-password-input>
```

## Propiedades

| Propiedad         | Tipo      | Valor por Defecto                            | Descripción                         |
| ----------------- | --------- | -------------------------------------------- | ----------------------------------- |
| `show-toggle`     | `boolean` | `true`                                       | Muestra/oculta botón de visibilidad |
| `strength-meter`  | `boolean` | `false`                                      | Muestra medidor de fortaleza        |
| `minlength`       | `number`  | `undefined`                                  | Longitud mínima requerida           |
| `maxlength`       | `number`  | `undefined`                                  | Longitud máxima permitida           |
| `show-password`   | `boolean` | `false`                                      | Estado inicial de visibilidad       |
| `strength-levels` | `array`   | `['débil', 'media', 'fuerte', 'muy fuerte']` | Niveles de fortaleza                |
| `label`           | `string`  | `''`                                         | Etiqueta visible del campo          |
| `placeholder`     | `string`  | `''`                                         | Texto de marcador de posición       |
| `value`           | `string`  | `''`                                         | Valor del campo                     |
| `disabled`        | `boolean` | `false`                                      | Deshabilita la interacción          |
| `required`        | `boolean` | `false`                                      | Campo requerido en formularios      |

## Eventos

| Evento              | Descripción                          |
| ------------------- | ------------------------------------ |
| `input`             | Se dispara al cambiar el valor       |
| `change`            | Se dispara al confirmar el cambio    |
| `toggle-visibility` | Se dispara al cambiar la visibilidad |
| `strength-change`   | Se dispara al cambiar la fortaleza   |
| `focus`             | Se dispara al obtener el foco        |
| `blur`              | Se dispara al perder el foco         |

## Ejemplos de Uso

### Contraseña con Validación de Fortaleza

```html
<melser-password-input
  label="Nueva contraseña *"
  placeholder="Mínimo 8 caracteres"
  minlength="8"
  maxlength="50"
  strength-meter
  show-toggle
  required
  hint="Debe incluir mayúsculas, números y símbolos"
>
</melser-password-input>
```

### Formulario de Registro

```html
<form id="register-form">
  <melser-password-input
    label="Contraseña *"
    name="password"
    required
    minlength="8"
    strength-meter
    show-toggle
    placeholder="Crea una contraseña segura"
  >
  </melser-password-input>

  <melser-password-input
    label="Confirmar contraseña *"
    name="confirmPassword"
    required
    minlength="8"
    show-toggle
    placeholder="Repite tu contraseña"
  >
  </melser-password-input>

  <button type="submit" variant="primary">Registrarse</button>
</form>
```

```javascript
const form = document.getElementById("register-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const password = form.querySelector('[name="password"]')?.value || "";
    const confirmPassword =
      form.querySelector('[name="confirmPassword"]')?.value || "";

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    if (password.length < 8) {
      alert("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    alert("¡Registro exitoso!");
  });
}
```

### Contraseña con Requisitos Específicos

```html
<melser-password-input
  label="Contraseña segura *"
  required
  minlength="12"
  strength-meter
  placeholder="Al menos 12 caracteres, mayúsculas, números y símbolos"
  pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}"
  error="La contraseña debe tener al menos 12 caracteres, incluyendo mayúsculas, números y símbolos"
>
</melser-password-input>
```

## Integración con Formularios

### Formulario de Inicio de Sesión

<melser-playground-form id="password-playground" title="Cambio de Contraseña" description="Validación de fortaleza y coincidencia.">
  <div style="margin-bottom: 1rem;">
    <melser-password-input 
      label="Contraseña actual *"
      name="currentPassword"
      required
      placeholder="Tu contraseña actual">
    </melser-password-input>
  </div>
  
  <div style="margin-bottom: 1rem;">
    <melser-password-input 
      label="Nueva contraseña *"
      name="newPassword"
      required
      minlength="8"
      strength-meter
      show-toggle
      placeholder="Nueva contraseña">
    </melser-password-input>
  </div>
  
  <div style="margin-bottom: 1rem;">
    <melser-password-input 
      label="Confirmar nueva contraseña *"
      name="confirmPassword"
      required
      minlength="8"
      show-toggle
      placeholder="Repite la nueva contraseña">
    </melser-password-input>
  </div>
</melser-playground-form>

## Personalización con CSS

### Variables CSS

```css
melser-password-input {
  --melser-password-toggle-size: 20px;
  --melser-password-strength-weak: #ef4444;
  --melser-password-strength-medium: #f59e0b;
  --melser-password-strength-strong: #10b981;
  --melser-password-strength-very-strong: #059669;
  --melser-password-meter-height: 4px;
  --melser-password-meter-radius: 2px;
}
```

### Ejemplos de Personalización

<style>
  .custom-password {
    --melser-password-strength-weak: #dc2626;
    --melser-password-strength-medium: #ea580c;
    --melser-password-strength-strong: #16a34a;
    --melser-password-strength-very-strong: #15803d;
  }
  
  .dark-password {
    --melser-password-toggle-color: #9ca3af;
    --melser-password-toggle-hover-color: #d1d5db;
  }
  
  .minimal-password {
    --melser-password-toggle-size: 16px;
    --melser-password-meter-height: 2px;
  }
</style>

<div class="custom-password" style="margin-bottom: 1rem;">
  <melser-password-input 
    label="Contraseña personalizada"
    placeholder="Colores de fortaleza personalizados"
    strength-meter
    value="ContraseñaFuerte123!">
  </melser-password-input>
</div>

<div class="dark-password" style="margin-bottom: 1rem;">
  <melser-password-input 
    label="Tema oscuro"
    placeholder="Para interfaces oscuras"
    value="DarkMode123">
  </melser-password-input>
</div>

<div class="minimal-password">
  <melser-password-input 
    label="Estilo minimalista"
    placeholder="Más discreto"
    value="Mini123">
  </melser-password-input>
</div>

## Características Avanzadas

### Validación de Fortaleza Personalizada

```javascript
const passwordInput = document.querySelector("melser-password-input");
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

### Requisitos Específicos

```html
<melser-password-input
  label="Contraseña corporativa"
  strength-meter
  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$"
  hint="Debe incluir: mayúsculas, minúsculas, números, símbolos, mínimo 12 caracteres"
  strength-levels="['Muy Débil', 'Débil', 'Aceptable', 'Fuerte', 'Excelente']"
></melser-password-input>
```

## Accesibilidad

El componente MelserPasswordInput incluye:

- **Toggle accesible**: Botón con aria-label apropiado
- **Medidor de fortaleza**: Anunciado por screen readers
- **Validación semántica**: Mensajes de error accesibles
- **Navegación por teclado**: Tab y Enter funcionan correctamente
- **Estados de focus**: Indicador visual claro

## Mejores Prácticas

1. **Usa medidores de fortaleza** para guiar al usuario
2. **Establece requisitos mínimos** claros
3. **Proporciona feedback visual** inmediato
4. **Incluye toggle de visibilidad** por defecto
5. **Valida en tiempo real** pero no intrusivo
6. **Permite copiar contraseña** cuando sea apropiado
7. **Considera requisitos de seguridad** específicos

## Troubleshooting

### Medidor de fortaleza no funciona

```javascript
// Asegúrate de que el atributo esté presente
passwordInput.setAttribute("strength-meter", "");

// O verificar la propiedad
console.log(passwordInput.strengthMeter); // Debe ser true
```

### Toggle de visibilidad no aparece

```html
<!-- Verifica que show-toggle esté habilitado -->
<melser-password-input
  show-toggle
  label="Contraseña con toggle"
></melser-password-input>
```

### Validación de fortaleza no coincide

```javascript
// Personalizar los criterios de fortaleza
passwordInput.strengthLevels = [
  "Muy Débil",
  "Débil",
  "Media",
  "Fuerte",
  "Perfecta",
];
```

### Problemas con screen readers

```html
<!-- Agregar aria-label para mayor claridad -->
<melser-password-input
  aria-label="Campo de contraseña con medidor de fortaleza"
  strength-meter
></melser-password-input>
```

### Focus no visible

```css
/* Personalizar el indicador de foco */
melser-password-input:focus-within {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  border-color: #3b82f6;
}
```

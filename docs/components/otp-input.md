---
title: MelserOtpInput
---

# MelserOtpInput

Un componente de entrada de código OTP (One-Time Password) para verificación de dos factores con autocompletado y validación automática.

## Ejemplo Básico

```html
<me-otp-input length="6" label="Código de verificación"> </me-otp-input>
```

## Demo Interactivo

<me-otp-input 
  id="demo-basic" 
  length="6"
  label="Código de 6 dígitos">
</me-otp-input>

<me-otp-input 
  id="demo-numeric" 
  length="4"
  numeric-only
  label="Código numérico de 4 dígitos">
</me-otp-input>

<me-otp-input 
  id="demo-disabled" 
  length="6"
  disabled
  label="OTP deshabilitado"
  value="123456">
</me-otp-input>

<h3>Colores</h3>
<div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
  <me-otp-input length="4" label="Success" color="success" value="1234"></me-otp-input>
  <me-otp-input length="4" label="Warning" color="warning" value="5678"></me-otp-input>
  <me-otp-input length="4" label="Danger" color="danger" value="9012"></me-otp-input>
</div>

## Propiedades

| Propiedad       | Tipo                                              | Valor por Defecto | Descripción                     |
| :-------------- | :------------------------------------------------ | :---------------- | :------------------------------ |
| `length`        | `number`                                          | `6`               | Número de dígitos del código    |
| `value`         | `string`                                          | `''`              | Valor actual del OTP            |
| `disabled`      | `boolean`                                         | `false`           | Deshabilita la interacción      |
| `readonly`      | `boolean`                                         | `false`           | Solo lectura                    |
| `name`          | `string`                                          | `''`              | Nombre para formularios         |
| `label`         | `string`                                          | `''`              | Etiqueta visible del componente |
| `placeholder`   | `string`                                          | `'•'`             | Carácter de marcador            |
| `numericOnly`   | `boolean`                                         | `false`           | Solo permite números            |
| `autoFocus`     | `boolean`                                         | `true`            | Enfoque automático al cargar    |
| `caseSensitive` | `boolean`                                         | `false`           | Distingue mayúsculas/minúsculas |
| `allowedChars`  | `string`                                          | `''`              | Caracteres permitidos (regex)   |
| `color`         | `'primary' \| 'success' \| 'warning' \| 'danger'` | `'primary'`       | Esquema de color del estado.    |

## Eventos

| Evento     | Descripción                             |
| :--------- | :-------------------------------------- |
| `input`    | Se dispara al cambiar el valor          |
| `complete` | Se dispara cuando se completa el código |
| `paste`    | Se dispara al pegar contenido           |
| `focus`    | Se dispara al obtener el foco           |
| `blur`     | Se dispara al perder el foco            |

## Ejemplos de Uso

### Código de Verificación SMS

```html
<me-otp-input
  length="6"
  numeric-only
  label="Código SMS"
  hint="Ingresa el código de 6 dígitos enviado a tu teléfono"
>
</me-otp-input>
```

### Código de Aplicación Authenticator

```html
<me-otp-input
  length="6"
  numeric-only
  label="Código de authenticator"
  hint="Usa tu aplicación de autenticación"
>
</me-otp-input>
```

### Código Alfanumérico

```html
<me-otp-input
  length="8"
  label="Código de recuperación"
  hint="Código alfanumérico de 8 caracteres"
>
</me-otp-input>
```

## Integración con Formularios

### Formulario de Verificación

```html
<form id="verification-form">
  <h3>Verificación de Dos Factores</h3>

  <me-otp-input
    name="otpCode"
    length="6"
    numeric-only
    label="Código de verificación"
    hint="Hemos enviado un código a tu correo"
  >
  </me-otp-input>

  <button type="submit">Verificar</button>
</form>
```

```javascript
document.getElementById("verification-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  console.log("OTP:", formData.get("otpCode"));
});
```

## Demo del Formulario

<me-playground-form id="otp-playground" schema-name="otp-input" title="Verificación 2FA" description="Verificación de código y seguridad.">
  <div style="margin-bottom: 1.5rem;">
    <base-input 
      label="Correo electrónico"
      type="email"
      value="usuario@ejemplo.com"
      disabled>
    </base-input>
  </div>
  
  <div style="margin-bottom: 1.5rem;">
    <me-otp-input 
      name="otpCode"
      length="6"
      numeric-only
      label="Código de verificación"
      hint="Hemos enviado un código a tu correo">
    </me-otp-input>
  </div>
</me-playground-form>

## Personalización con CSS

### Variables CSS

```css
me-otp-input {
  --me-otp-input-width: 50px;
  --me-otp-input-height: 50px;
  --me-otp-input-gap: 8px;
  --me-otp-input-font-size: 18px;
  --me-otp-input-border: 2px solid #d1d5db;
  --me-otp-input-border-radius: 8px;
  --me-otp-input-focus-border: #3b82f6;
  --me-otp-input-bg: #ffffff;
  --me-otp-input-disabled-bg: #f9fafb;
  --me-otp-input-disabled-border: #e5e7eb;
}
```

### Ejemplos de Personalización

<style>
  .custom-otp {
    --me-otp-input-width: 60px;
    --me-otp-input-height: 60px;
    --me-otp-input-font-size: 24px;
    --me-otp-input-border-radius: 12px;
  }
  
  .compact-otp {
    --me-otp-input-width: 40px;
    --me-otp-input-height: 40px;
    --me-otp-input-gap: 4px;
    --me-otp-input-font-size: 16px;
  }
  
  .dark-theme-otp {
    --me-otp-input-bg: #1f2937;
    --me-otp-input-border: #4b5563;
    --me-otp-input-focus-border: #8b5cf6;
    --me-otp-input-font-size: 20px;
    color: #f9fafb;
  }
</style>

<div class="custom-otp" style="margin-bottom: 1rem;">
  <me-otp-input 
    length="6"
    label="OTP personalizado (grande)">
  </me-otp-input>
</div>

<div class="compact-otp" style="margin-bottom: 1rem;">
  <me-otp-input 
    length="6"
    label="OTP compacto">
  </me-otp-input>
</div>

<div class="dark-theme-otp">
  <me-otp-input 
    length="6"
    label="OTP tema oscuro (púrpura)">
  </me-otp-input>
</div>

## Accesibilidad

- **Navegación por teclado**: Tab entre campos, flechas, backspace
- **Screen reader support**: Anuncia posición y valor
- **Focus visible**: Indicador claro de foco
- **Auto-enfoque**: Salta al siguiente campo automáticamente
- **High contrast**: Compatible con modo de alto contraste

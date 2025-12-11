---
Checkbox component
---
# MelserCheckbox

Un componente de selección binaria (checkbox) altamente personalizable, accesible y consistente con el sistema de diseño Melser.

## Características Clave

  * 🎨 **3 Niveles de Personalización:** Variantes predefinidas, variables CSS y Shadow Parts.
  * 📏 **Tamaños Adaptables:** Soporte nativo para `small`, `medium` y `large`.
  * ♿ **Accesibilidad Primero:** Input nativo oculto para mantener navegación por teclado y soporte de lectores de pantalla.
  * ✨ **Animaciones:** Transiciones suaves de estado y foco.

## Ejemplo Básico

```html
<melser-checkbox label="Acepto los términos y condiciones"></melser-checkbox>
```

## Demo Interactivo

<div style="display: flex; flex-direction: column; gap: 1rem;">
<melser-checkbox id="demo-basic" label="Checkbox básico"></melser-checkbox>
<melser-checkbox id="demo-checked" label="Checkbox marcado por defecto" checked></melser-checkbox>
<melser-checkbox id="demo-disabled" label="Checkbox deshabilitado" disabled></melser-checkbox>
<melser-checkbox id="demo-error" label="Con error de validación" required errorMessage="Debes marcar esta casilla"></melser-checkbox>
</div>

## API del Componente

### Propiedades

| Propiedad | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `checked` | `boolean` | `false` | Estado actual del checkbox. Sincronizado con `value`. |
| `value` | `boolean` | `false` | Alias para `checked` (heredado de BaseInput). |
| `label` | `string` | `''` | Texto mostrado junto al checkbox. |
| `disabled`| `boolean` | `false` | Deshabilita la interacción y reduce la opacidad. |
| `required`| `boolean` | `false` | Marca el campo como obligatorio para formularios. |
| `size`    | `'small' \| 'medium' \| 'large'` | `'medium'` | **NUEVO:** Controla el tamaño del control y texto. |
| `variant` | `'outlined' \| 'card'` | `'outlined'` | **NUEVO:** Cambia el estilo visual del contenedor. |
| `name`    | `string` | `''` | Identificador para el envío de formularios. |

### Shadow Parts (Para CSS Avanzado)

Utiliza `::part(nombre)` para estilizar elementos internos sin variables.

| Part | Descripción |
|------|-------------|
| `wrapper` | Contenedor principal del componente. |
| `container` | El `label` que envuelve al input y el texto. |
| `control` | El cuadrado visual (el "falso" checkbox). |
| `icon` | El SVG del check dentro del control. |
| `label` | El elemento de texto de la etiqueta. |
| `error-message` | El contenedor del mensaje de error. |

### Eventos

| Evento | Detalle (`e.detail`) | Descripción |
|--------|----------------------|-------------|
| `ui:change` | `{ name, value, isValid ... }` | Evento unificado del sistema Melser. Se dispara al cambiar. |
| `change` | `Event` | Evento nativo estándar. |

-----

## Guía de Personalización

### 1. Usando Tamaños (Sizes)

No necesitas CSS para cambiar el tamaño, usa la propiedad `size`.

```html
<melser-checkbox size="small" label="Pequeño"></melser-checkbox>

<melser-checkbox size="medium" label="Normal"></melser-checkbox>

<melser-checkbox size="large" label="Grande"></melser-checkbox>
```

### 2. Usando Variantes (Variants)

El componente incluye estilos alternativos "out of the box".

**Variante Card:** Convierte el checkbox en una tarjeta seleccionable.

```html
<melser-checkbox 
  variant="card" 
  label="Opción Premium (Incluye todo)" 
  name="plan">
</melser-checkbox>
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
<melser-checkbox class="mi-checkbox-custom" label="Checkbox Redondo y Rosa" checked></melser-checkbox>
```

### 4\. Personalización Quirúrgica (Shadow Parts)

Para cambios que las variables no cubren, usa `::part`.

```css
/* Ejemplo: Hacer que el label esté en negrita y cursiva */
melser-checkbox::part(label) {
  font-weight: 800;
  font-style: italic;
  color: #333;
}

/* Ejemplo: Cambiar el icono del check por otro color solo en este estado */
melser-checkbox[checked]::part(icon) {
  fill: #fff; /* Asegurar contraste */
}

/* Ejemplo: Mover el texto a la izquierda del cuadro (reverse) */
melser-checkbox::part(container) {
  flex-direction: row-reverse;
  justify-content: flex-end;
}
```

-----

## Integración con Formularios

El componente emite eventos y valida su estado interno.

```html
<form id="registro-form">
  
  <melser-checkbox 
    name="terms" 
    label="Acepto los términos *" 
    required 
    error-message="Es obligatorio aceptar los términos">
  </melser-checkbox>

  <button type="submit">Registrar</button>
</form>

<script>
  const form = document.getElementById('registro-form');
  const termsChk = form.querySelector('melser-checkbox[name="terms"]');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Método 1: Usar la API del componente
    if (!termsChk.checkValidity()) {
      alert(termsChk.errorMessage);
      return;
    }

    // Método 2: Obtener datos limpios
    console.log('Datos:', termsChk.getData()); 
    // Output: { name: 'terms', value: true, isValid: true, ... }
  });
</script>
```

## Solución de Problemas

**El estilo no se aplica al imprimir (Print styles):**
Los navegadores a veces eliminan los `background-color` al imprimir.

```css
@media print {
  melser-checkbox::part(control) {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
```

**El checkbox no se alinea con el texto en párrafos largos:**
Por defecto, el checkbox está centrado verticalmente (`align-items: center`). Si tienes texto de varias líneas y quieres el checkbox arriba:

```css
melser-checkbox::part(container) {
  align-items: flex-start; /* Alinea arriba */
}
melser-checkbox::part(control) {
  margin-top: 2px; /* Pequeño ajuste visual */
}
```
---
title: MelserModal
---

# MelserModal

Un componente de modal completamente accesible y personalizable con soporte ARIA, navegación por teclado, gestión de foco y slots flexibles para la personalización del contenido.

## Características Clave

- 🎨 **Múltiples Variantes de Tamaño:** `sm`, `md`, `lg`, `xl` y pantalla completa.
- ♿ **Accesibilidad Primero:** Soporte completo de ARIA, navegación por teclado y captura de foco.
- 🔒 **Gestión de Foco:** Captura y restauración automática del foco al abrir/cerrar.
- 🎭 **Slots Flexibles:** Cabecera, título, cuerpo y botones de acción personalizables.
- 🌙 **Control de Fondo:** Fondo oscurecido configurable con efecto de desenfoque.
- ⌨️ **Soporte de Teclado:** Escape para cerrar, Tab/Shift+Tab para navegar.

## Ejemplo Básico

```html
<me-modal open>
  <span slot="title">Título del Modal</span>
  <p>Este es el contenido del modal. Puedes poner cualquier HTML aquí.</p>
  <div slot="actions">
    <button>Cancelar</button>
    <button>Confirmar</button>
  </div>
</me-modal>
```

## Demo Interactivo

<div style="display: flex; flex-direction: column; gap: 1rem;">
  <button data-modal-open="basic-modal-es" class="btn">Abrir Modal Básico</button>
  
  <me-modal id="basic-modal-es" aria-label="Ejemplo de Modal Básico">
    <span slot="title">Modal Básico</span>
    <p>Este es un modal con configuración predeterminada. Puedes cerrarlo haciendo clic en el fondo, presionando Escape o haciendo clic en el botón X.</p>
    <div slot="actions">
      <button data-modal-close="basic-modal-es">Cancelar</button>
      <button data-modal-close="basic-modal-es">OK</button>
    </div>
  </me-modal>
</div>

### Variantes de Tamaño

<div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
  <button data-modal-open="modal-sm-es" class="btn">Pequeño</button>
  <button data-modal-open="modal-md-es" class="btn">Mediano</button>
  <button data-modal-open="modal-lg-es" class="btn">Grande</button>
  <button data-modal-open="modal-xl-es" class="btn">Extra Grande</button>
  <button data-modal-open="modal-full-es" class="btn">Pantalla Completa</button>
</div>

<me-modal id="modal-sm-es" size="sm" aria-label="Modal Pequeño">
  <span slot="title">Modal Pequeño</span>
  <p>Tamaño: sm (400px)</p>
  <div slot="actions">
    <button data-modal-close="modal-sm-es">Cerrar</button>
  </div>
</me-modal>

<me-modal id="modal-md-es" size="md" aria-label="Modal Mediano">
  <span slot="title">Modal Mediano</span>
  <p>Tamaño: md (500px)</p>
  <div slot="actions">
    <button data-modal-close="modal-md-es">Cerrar</button>
  </div>
</me-modal>

<me-modal id="modal-lg-es" size="lg" aria-label="Modal Grande">
  <span slot="title">Modal Grande</span>
  <p>Tamaño: lg (700px)</p>
  <div slot="actions">
    <button data-modal-close="modal-lg-es">Cerrar</button>
  </div>
</me-modal>

<me-modal id="modal-xl-es" size="xl" aria-label="Modal Extra Grande">
  <span slot="title">Modal Extra Grande</span>
  <p>Tamaño: xl (900px)</p>
  <div slot="actions">
    <button data-modal-close="modal-xl-es">Cerrar</button>
  </div>
</me-modal>

<me-modal id="modal-full-es" size="full" aria-label="Modal Pantalla Completa">
  <span slot="title">Modal Pantalla Completa</span>
  <p>Tamaño: full (95vw)</p>
  <div slot="actions">
    <button data-modal-close="modal-full-es">Cerrar</button>
  </div>
</me-modal>

### Cabecera Personalizada

<div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
  <button data-modal-open="modal-custom-header-es" class="btn">Cabecera Personalizada</button>
</div>

<me-modal id="modal-custom-header-es" aria-label="Modal con Cabecera Personalizada">
  <div slot="header" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 1.5rem; color: white;">
    <h2 style="margin: 0; font-size: 1.5rem;">Cabecera Personalizada</h2>
    <p style="margin: 0.5rem 0 0 0; opacity: 0.9;">Con fondo degradado</p>
  </div>
  <p>Este modal tiene una cabecera completamente personalizada con estilo degradado.</p>
  <div slot="actions">
    <button data-modal-close="modal-custom-header-es">Cerrar</button>
  </div>
</me-modal>

### Sin Fondo

<div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
  <button data-modal-open="modal-no-backdrop-es" class="btn">Sin Fondo</button>
</div>

<me-modal id="modal-no-backdrop-es" show-backdrop="false" aria-label="Modal Sin Fondo">
  <span slot="title">Sin Fondo</span>
  <p>Este modal no tiene superposición de fondo. Solo puedes cerrarlo con el botón de cerrar o la tecla Escape.</p>
  <div slot="actions">
    <button data-modal-close="modal-no-backdrop-es">Cerrar</button>
  </div>
</me-modal>

### Evitar Cerrar al Hacer Clic en el Fondo

<div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
  <button data-modal-open="modal-no-backdrop-click-es" class="btn">Sin Clic en Fondo</button>
</div>

<me-modal id="modal-no-backdrop-click-es" close-on-backdrop-click="false" aria-label="Modal que Evita Cerrar con Clic en Fondo" data-modal-close="modal-no-backdrop-click-es">
  <span slot="title">Confirmar Acción</span>
  <p>Este modal no se puede cerrar haciendo clic en el fondo. Debes usar los botones o la tecla Escape.</p>
  <div slot="actions">
    <button data-modal-close="modal-no-backdrop-click-es">Cancelar</button>
    <button data-modal-close="modal-no-backdrop-click-es">Confirmar</button>
  </div>
</me-modal>

## API del Componente

### Propiedades

| Propiedad              | Tipo                              | Default       | Descripción                                                  |
| ---------------------- | --------------------------------- | ------------- | ------------------------------------------------------------ |
| `open`                 | `boolean`                         | `false`       | Si el modal está actualmente abierto.                        |
| `size`                 | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'`    | Variante de tamaño del modal.                                |
| `closeOnBackdropClick` | `boolean`                         | `true`        | Si el modal se puede cerrar haciendo clic en el fondo.      |
| `closeOnEscape`        | `boolean`                         | `true`        | Si el modal se puede cerrar presionando la tecla Escape.    |
| `showCloseButton`      | `boolean`                         | `true`        | Si mostrar el botón de cerrar en la cabecera.               |
| `trapFocus`            | `boolean`                         | `true`        | Si capturar el foco dentro del modal.                       |
| `ariaLabel`            | `string \| null`                  | `null`        | Etiqueta ARIA para el modal (para lectores de pantalla).    |
| `ariaDescribedby`      | `string \| null`                  | `null`        | ID del elemento descrito por ARIA.                          |
| `showBackdrop`         | `boolean`                         | `true`        | Si mostrar la superposición de fondo.                       |
| `centered`             | `boolean`                         | `true`        | Si centrar el modal verticalmente.                          |
| `containerClass`       | `string \| undefined`             | `undefined`   | Clase personalizada para el contenedor del modal.           |

### Shadow Parts (Para CSS Avanzado)

Utiliza `::part(nombre)` para estilizar elementos internos sin variables.

| Part            | Descripción                              |
| --------------- | ---------------------------------------- |
| `backdrop`      | El elemento de superposición de fondo.   |
| `modal`         | El contenedor principal del modal.       |
| `header`        | La sección de cabecera.                 |
| `title`         | El elemento de título dentro de la cabecera. |
| `close-button`  | El botón de cerrar en la cabecera.      |
| `body`          | La sección de contenido/cuerpo principal. |
| `footer`        | La sección de pie de página/botones de acción.        |

### Eventos

| Evento         | Detalle (`e.detail`) | Descripción                                   |
| ------------- | ------------------- | --------------------------------------------- |
| `open`        | `{ modal }`         | Se despacha cuando el modal se abre.          |
| `close`       | `{ modal }`         | Se despacha cuando el modal se cierra.        |
| `before-close`| `{ modal }`         | Se despacha antes de cerrar (puede prevenirse). |

### Métodos Públicos

| Método      | Descripción                    |
| ----------- | ------------------------------ |
| `openModal()`| Abre el modal.               |
| `close()`   | Cierra el modal.              |
| `toggle()`  | Alterna el estado abierto/cerrado del modal. |

## Guía de Personalización

### 1. Variantes de Tamaño

Elige entre cinco opciones de tamaño predefinidas:

```html
<!-- Pequeño (400px) -->
<me-modal size="sm">
  <span slot="title">Modal Pequeño</span>
  <p>Contenido aquí...</p>
</me-modal>

<!-- Mediano (500px) - Predeterminado -->
<me-modal size="md">
  <span slot="title">Modal Mediano</span>
  <p>Contenido aquí...</p>
</me-modal>

<!-- Grande (700px) -->
<me-modal size="lg">
  <span slot="title">Modal Grande</span>
  <p>Contenido aquí...</p>
</me-modal>

<!-- Extra Grande (900px) -->
<me-modal size="xl">
  <span slot="title">Modal Extra Grande</span>
  <p>Contenido aquí...</p>
</me-modal>

<!-- Pantalla Completa (95vw) -->
<me-modal size="full">
  <span slot="title">Modal Pantalla Completa</span>
  <p>Contenido aquí...</p>
</me-modal>
```

### 2. Personalización vía CSS (Variables)

Sobrescribe las variables del tema para un estilo personalizado:

```css
/* En tu hoja de estilos global o componente padre */
.mi-modal-custom {
  /* Estilo del fondo */
  --me-modal-backdrop-bg: rgba(0, 0, 0, 0.7);
  --me-modal-backdrop-blur: 4px;
  
  /* Estilo del modal */
  --me-modal-bg: #ffffff;
  --me-modal-border-color: #e0e0e0;
  --me-modal-radius: 12px;
  --me-modal-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  
  /* Dimensiones */
  --me-modal-width: 600px;
  --me-modal-max-width: 90vw;
  --me-modal-max-height: 85vh;
}
```

```html
<me-modal class="mi-modal-custom">
  <span slot="title">Modal con Estilo Personalizado</span>
  <p>Este modal usa variables CSS personalizadas.</p>
</me-modal>
```

### 3. Personalización Quirúrgica (Shadow Parts)

Para cambios que las variables no cubren, usa `::part`:

```css
/* Estilo de cabecera personalizado */
me-modal::part(header) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-bottom: none;
  padding: 2rem;
}

me-modal::part(title) {
  color: white;
  font-size: 1.75rem;
  font-weight: 700;
}

/* Botón de cerrar personalizado */
me-modal::part(close-button) {
  color: white;
  opacity: 0.8;
}

me-modal::part(close-button):hover {
  opacity: 1;
  background: rgba(255, 255, 255, 0.2);
}

/* Estilo de cuerpo personalizado */
me-modal::part(body) {
  background: #f8f9fa;
  color: #333;
}

/* Estilo de pie de página personalizado */
me-modal::part(footer) {
  background: #f0f0f0;
  border-top: 2px solid #e0e0e0;
}
```

### 4. Usando Slots

El modal proporciona slots flexibles para la personalización del contenido:

```html
<me-modal>
  <!-- Cabecera predeterminada con slot de título -->
  <span slot="title">Título del Modal</span>
  
  <!-- O cabecera completamente personalizada -->
  <div slot="header">
    <img src="logo.png" alt="Logo" style="height: 32px;">
    <h2>Cabecera Personalizada</h2>
  </div>
  
  <!-- Slot de cuerpo predeterminado (no se necesita nombre de slot) -->
  <p>Este es el contenido principal.</p>
  
  <!-- Slot de acciones/pie de página -->
  <div slot="actions">
    <button>Cancelar</button>
    <button>Confirmar</button>
  </div>
</me-modal>
```

## Manejo de Eventos

Escucha los eventos del modal para un comportamiento personalizado:

```javascript
const modal = document.getElementById('mi-modal');

// Escuchar evento de apertura
modal.addEventListener('open', (e) => {
  console.log('Modal abierto', e.detail);
  // Cargar datos, enfocar elementos, etc.
});

// Escuchar evento de cierre
modal.addEventListener('close', (e) => {
  console.log('Modal cerrado', e.detail);
  // Limpiar, guardar estado, etc.
});

// Prevenir cierre (por ejemplo, cambios sin guardar)
modal.addEventListener('before-close', (e) => {
  if (tieneCambiosSinGuardar) {
    e.preventDefault(); // Prevenir que el modal se cierre
    alert('¡Por favor guarda tus cambios primero!');
  }
});
```

## Accesibilidad

El modal incluye características completas de accesibilidad:

- **Atributos ARIA:** `role="dialog"`, `aria-modal="true"`, `aria-label`, `aria-describedby`
- **Navegación por Teclado:** Escape para cerrar, Tab/Shift+Tab para navegar
- **Gestión de Foco:** Captura y restauración automática del foco
- **Soporte de Lectores de Pantalla:** Etiquetado y descripciones apropiadas
- **Movimiento Reducido:** Respeta la preferencia `prefers-reduced-motion`

### Etiquetas ARIA Personalizadas

```html
<me-modal aria-label="Confirmación de Eliminación" aria-describedby="eliminar-desc">
  <span slot="title">Eliminar Elemento</span>
  <p id="eliminar-desc">¿Estás seguro de que quieres eliminar este elemento? Esta acción no se puede deshacer.</p>
  <div slot="actions">
    <button>Cancelar</button>
    <button>Eliminar</button>
  </div>
</me-modal>
```

## Solución de Problemas

**El modal no se cierra al hacer clic en el fondo:**

Verifica si `closeOnBackdropClick` está configurado en `false`:

```html
<me-modal close-on-backdrop-click="false">
  <!-- Contenido del modal -->
</me-modal>
```

**El foco no se captura en el modal:**

Asegúrate de que `trapFocus` esté habilitado (el valor predeterminado es `true`):

```html
<me-modal trap-focus="true">
  <!-- Contenido del modal -->
</me-modal>
```

**El contenido del modal es demasiado alto para la pantalla:**

El cuerpo del modal tiene `overflow-y: auto` para desplazamiento. Ajusta la altura máxima:

```css
me-modal::part(body) {
  max-height: 70vh;
}
```

**Problemas de animación en dispositivos lentos:**

El modal respeta `prefers-reduced-motion`. También puedes deshabilitar las transiciones:

```css
me-modal::part(backdrop),
me-modal::part(modal) {
  transition: none !important;
}
```

**El modal no es visible en móviles:**

El modal tiene estilos responsivos. Asegúrate de que la meta tag de viewport esté configurada:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

## Mejores Prácticas

1. **Siempre proporciona un título** usando el slot `title` o `aria-label` para accesibilidad
2. **Usa etiquetas ARIA descriptivas** cuando el título no explica completamente el propósito del modal
3. **Proporciona botones de acción claros** en el slot de pie de página
4. **Considera el evento `before-close`** para advertencias de cambios sin guardar
5. **Prueba la navegación por teclado** para asegurar que todos los elementos interactivos sean accesibles
6. **Mantén los modales enfocados** en una sola tarea o acción
7. **Usa tamaños apropiados** - `sm` para confirmaciones, `md` para formularios, `lg` para contenido complejo

---
title: MelserModal
---

# MelserModal

Un componente de modal completamente accesible y personalizable con soporte ARIA, navegación por teclado, gestión de foco y slots flexibles para la personalización del contenido.

## Características Clave

- ♿ **Accesibilidad Primero:** Soporte completo de ARIA, navegación por teclado y captura de foco.
- 🔒 **Gestión de Foco:** Captura y restauración automática del foco al abrir/cerrar.
- 🎭 **Slots Flexibles:** Contenido totalmente personalizable sin estilos predefinidos.
- 🌙 **Control de Fondo:** Fondo oscurecido configurable con efecto de desenfoque.
- ⌨️ **Soporte de Teclado:** Escape para cerrar, Tab/Shift+Tab para navegar.
- 🎯 **Cierre Automático:** Atributo `x` para cerrar el modal desde cualquier elemento.

## Ejemplo Básico

```html
<me-modal id="basic-modal" open>
  <div>
    <h2>Título del Modal</h2>
    <p>Este es el contenido del modal. Puedes poner cualquier HTML aquí.</p>
    <button x>×</button>
    <button>Cancelar</button>
    <button>Confirmar</button>
  </div>
</me-modal>
```

## Demo Interactiva

<div style="display: flex; flex-direction: column; gap: 1rem;">
  <button data-modal-open="basic-modal-es" class="btn">Abrir Modal Básico</button>
  
  <me-modal id="basic-modal-es" aria-label="Ejemplo de Modal Básico">
    <div style="padding: 1.5rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
        <h2 style="margin: 0;">Modal Básico</h2>
        <button x aria-label="Cerrar" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; padding: 0.5rem;">×</button>
      </div>
      <p>Este es un modal con contenido totalmente personalizable. Puedes cerrarlo haciendo clic en el botón ×, presionando Escape o haciendo clic en el fondo.</p>
      <div style="margin-top: 1.5rem; display: flex; gap: 0.5rem; justify-content: flex-end;">
        <button data-modal-close="basic-modal-es">Cancelar</button>
        <button data-modal-close="basic-modal-es">OK</button>
      </div>
    </div>
  </me-modal>
</div>

### Modal con Cabecera Personalizada

<div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
  <button data-modal-open="modal-custom-header-es" class="btn">Cabecera Personalizada</button>
</div>

<me-modal id="modal-custom-header-es" aria-label="Modal con Cabecera Personalizada">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 1.5rem; color: white;">
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <h2 style="margin: 0; font-size: 1.5rem;">Cabecera Personalizada</h2>
      <button x aria-label="Cerrar" style="background: transparent; border: none; font-size: 1.5rem; cursor: pointer; color: white; padding: 0.5rem;">×</button>
    </div>
    <p style="margin: 0.5rem 0 0 0; opacity: 0.9;">Con fondo degradado</p>
  </div>
  <div style="padding: 1.5rem;">
    <p>Este modal tiene una cabecera completamente personalizada con estilo degradado. Todo el contenido es customizable.</p>
  </div>
</me-modal>

### Modal Sin Fondo

<div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
  <button data-modal-open="modal-no-backdrop-es" class="btn">Sin Fondo</button>
</div>

<me-modal id="modal-no-backdrop-es" BackdropHidden="true" aria-label="Modal Sin Fondo">
  <div style="background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
      <h2 style="margin: 0;">Sin Fondo</h2>
      <button x aria-label="Cerrar" style="background: none; border: none; font-size: 1.5rem; cursor: pointer;">×</button>
    </div>
    <p>Este modal no tiene superposición de fondo. Solo puedes cerrarlo con el botón de cerrar o la tecla Escape.</p>
  </div>
</me-modal>

### Modal con Control Manual de Cierre

<div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
  <button data-modal-open="modal-manual-close-es" class="btn">Cierre Manual</button>
</div>

<me-modal id="modal-manual-close-es" ManualClose="true" BackdropHidden="true" class="card" aria-label="Modal con Cierre Manual">
  <div>
    <h2 x style="margin-top: 0;">Test Modal</h2>
    <p>Este modal tiene `ManualClose="true"` y `BackdropHidden="true"`. Solo se puede cerrar con el botón, la tecla Escape o elementos con el atributo `x`.</p>
    <button type="button" data-modal-close="modal-manual-close-es" class="btn">Cerrar</button>
  </div>
</me-modal>

### Evitar Cerrar al Hacer Clic en el Fondo

<div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
  <button data-modal-open="modal-no-backdrop-click-es" class="btn">Sin Clic en Fondo</button>
</div>

<me-modal id="modal-no-backdrop-click-es" ManualClose="true" aria-label="Modal que Evita Cerrar con Clic en Fondo">
  <div style="padding: 1.5rem;">
    <h2 style="margin-top: 0;">Confirmar Acción</h2>
    <p>Este modal no se puede cerrar haciendo clic en el fondo. Debes usar los botones o la tecla Escape.</p>
    <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
      <button data-modal-close="modal-no-backdrop-click-es">Cancelar</button>
      <button data-modal-close="modal-no-backdrop-click-es">Confirmar</button>
    </div>
  </div>
</me-modal>

## API del Componente

### Propiedades

| Propiedad              | Tipo                              | Default       | Descripción                                                  |
| ---------------------- | --------------------------------- | ------------- | ------------------------------------------------------------ |
| `open`                 | `boolean`                         | `false`       | Si el modal está actualmente abierto.                        |
| `ManualClose` | `boolean`                         | `false`       | Si el modal SOLO se puede cerrar manualmente (no se cierra al hacer clic en el fondo).       |
| `closeOnEscape`        | `boolean`                         | `true`        | Si el modal se puede cerrar presionando la tecla Escape.    |
| `trapFocus`            | `boolean`                         | `true`        | Si capturar el foco dentro del modal.                       |
| `ariaLabel`            | `string \| null`                  | `null`        | Etiqueta ARIA para el modal (para lectores de pantalla).    |
| `ariaDescribedby`      | `string \| null`                  | `null`        | ID del elemento descrito por ARIA.                          |
| `BackdropHidden`         | `boolean`                         | `false`        | Si ocultar la superposición de fondo.                       |
| `centered`             | `boolean`                         | `true`        | Si centrar el modal verticalmente.                          |
| `containerClass`       | `string \| undefined`             | `undefined`   | Clase personalizada para el contenedor del modal.           |

### Atributo Especial: `x`

El atributo `x` se puede agregar a cualquier elemento dentro del modal para que actúe como botón de cerrar:

```html
<button x>×</button>
<span x>Cerrar</span>
<div x role="button" tabindex="0">Cerrar</div>
```

Al hacer clic en cualquier elemento con el atributo `x`, el modal se cerrará automáticamente.

### Shadow Parts (Para CSS Avanzado)

Utiliza `::part(nombre)` para estilizar elementos internos sin variables.

| Part            | Descripción                              |
| --------------- | ---------------------------------------- |
| `backdrop`      | El elemento de superposición de fondo.   |
| `modal`         | El contenedor principal del modal.       |

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

### 1. Estructura Básica

El modal es completamente personalizable sin estilos predefinidos:

```html
<me-modal id="mi-modal">
  <!-- Contenido totalmente personalizado -->
  <div style="background: white; padding: 2rem; border-radius: 12px; max-width: 500px;">
    <header style="display: flex; justify-content: space-between; align-items: center;">
      <h2>Título Personalizado</h2>
      <button x aria-label="Cerrar">×</button>
    </header>
    <main style="margin: 1.5rem 0;">
      <p>Contenido del modal...</p>
    </main>
    <footer style="display: flex; gap: 0.5rem; justify-content: flex-end;">
      <button>Cancelar</button>
      <button>Confirmar</button>
    </footer>
  </div>
</me-modal>
```

### 2. Personalización via CSS (Variables)

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
  <div style="padding: 1.5rem;">
    <h2>Modal con Estilo Personalizado</h2>
    <p>Este modal usa variables CSS personalizadas para el fondo.</p>
    <button x>×</button>
  </div>
</me-modal>
```

### 3. Personalización Quirúrgica (Shadow Parts)

Para cambios que las variables no cubren, usa `::part`:

```css
/* Estilo de fondo personalizado */
me-modal::part(backdrop) {
  background: rgba(255, 0, 0, 0.2);
  backdrop-filter: blur(8px);
}

/* Estilo del modal wrapper */
me-modal::part(modal) {
  max-width: 800px;
}
```

### 4. Uso del Atributo `x`

El atributo `x` permite cerrar el modal desde cualquier elemento:

```html
<me-modal>
  <div style="padding: 1.5rem;">
    <!-- Botón de cerrar con × -->
    <button x style="float: right; background: none; border: none; font-size: 1.5rem;">×</button>
    
    <h2>Título</h2>
    <p>Contenido...</p>
    
    <!-- Botón de cerrar con texto -->
    <button x>Cerrar</button>
    
    <!-- Cualquier elemento puede cerrar el modal -->
    <div x role="button" tabindex="0" style="cursor: pointer; padding: 0.5rem; background: #f0f0f0;">
      Haz clic para cerrar
    </div>
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
  <div style="padding: 1.5rem;">
    <h2>Eliminar Elemento</h2>
    <p id="eliminar-desc">¿Estás seguro de que quieres eliminar este elemento? Esta acción no se puede deshacer.</p>
    <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
      <button data-modal-close="eliminar-modal">Cancelar</button>
      <button data-modal-close="eliminar-modal">Eliminar</button>
    </div>
  </div>
</me-modal>
```

## Solución de Problemas

**El modal no se cierra al hacer clic en el fondo:**

Verifica si `ManualClose` está configurado en `true`:

```html
<me-modal ManualClose="true">
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

**El botón con atributo `x` no cierra el modal:**

Asegúrate de que el elemento con el atributo `x` esté dentro del modal:

```html
<me-modal>
  <div>
    <button x>×</button>  <!-- Esto funcionará -->
  </div>
</me-modal>
```

**El contenido del modal es demasiado alto para la pantalla:**

Agrega overflow al contenedor de tu modal:

```css
.modal-content {
  max-height: 70vh;
  overflow-y: auto;
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

1. **Siempre proporciona un título** o `aria-label` para accesibilidad
2. **Usa etiquetas ARIA descriptivas** cuando el título no explica completamente el propósito del modal
3. **Proporciona botones de acción claros** para cerrar o confirmar
4. **Considera el evento `before-close`** para advertencias de cambios sin guardar
5. **Prueba la navegación por teclado** para asegurar que todos los elementos interactivos sean accesibles
6. **Mantén los modales enfocados** en una sola tarea o acción
7. **Usa el atributo `x`** para elementos de cerrar en lugar de agregar event listeners manuales
8. **Agrega `aria-label` a los botones de cerrar** con `x` cuando usen símbolos como ×

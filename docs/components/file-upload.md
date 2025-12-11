---
title: MelserFileUpload
---

# MelserFileUpload

Un componente de subida de archivos avanzado con drag & drop, vista previa, validación de tipos y progreso de carga.

## Ejemplo Básico

```html
<me-file-upload label="Subir archivo" accept="image/*,application/pdf">
</me-file-upload>
```

## Demo Interactivo

<me-file-upload 
  id="demo-basic" 
  label="Subida básica de archivos" 
  accept="image/*,application/pdf"
  max-files="3">
</me-file-upload>

<me-file-upload 
  id="demo-dropzone" 
  label="Drag & Drop Zone" 
  drag-drop
  accept="image/*"
  max-size="5MB">
</me-file-upload>

<me-file-upload 
  id="demo-multiple" 
  label="Múltiples archivos" 
  accept="*/*"
  max-files="10"
  multiple
  show-preview>
</me-file-upload>

<h3>Colores</h3>
<div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
  <me-file-upload label="Success" color="success" accept="image/*"></me-file-upload>
  <me-file-upload label="Warning" color="warning" accept="image/*"></me-file-upload>
  <me-file-upload label="Danger" color="danger" accept="image/*"></me-file-upload>
</div>

## Propiedades

| Propiedad      | Tipo                                              | Valor por Defecto | Descripción                     |
| :------------- | :------------------------------------------------ | :---------------- | :------------------------------ |
| `accept`       | `string`                                          | `''`              | Tipos de archivo aceptados      |
| `multiple`     | `boolean`                                         | `false`           | Permite múltiples archivos      |
| `max-files`    | `number`                                          | `undefined`       | Máximo número de archivos       |
| `max-size`     | `string`                                          | `undefined`       | Tamaño máximo por archivo       |
| `min-size`     | `string`                                          | `undefined`       | Tamaño mínimo por archivo       |
| `color`        | `'primary' \| 'success' \| 'warning' \| 'danger'` | `'primary'`       | Esquema de color                |
| `required`     | `boolean`                                         | `false`           | Campo requerido en formularios  |
| `disabled`     | `boolean`                                         | `false`           | Deshabilita la interacción      |
| `drag-drop`    | `boolean`                                         | `false`           | Habilita drag & drop            |
| `show-preview` | `boolean`                                         | `false`           | Muestra vista previa            |
| `crop`         | `boolean`                                         | `false`           | Permite recorte de imágenes     |
| `auto-upload`  | `boolean`                                         | `false`           | Sube automáticamente            |
| `url`          | `string`                                          | `''`              | URL para subir archivos         |
| `label`        | `string`                                          | `''`              | Etiqueta visible del componente |
| `name`         | `string`                                          | `''`              | Nombre para formularios         |

## Eventos

| Evento            | Descripción                        |
| :---------------- | :--------------------------------- |
| `change`          | Se dispara al seleccionar archivos |
| `file-added`      | Se dispara al agregar un archivo   |
| `file-removed`    | Se dispara al remover un archivo   |
| `upload-progress` | Se dispara durante la subida       |
| `upload-complete` | Se dispara al completar subida     |
| `upload-error`    | Se dispara con errores de subida   |

## Ejemplos de Uso

### Upload de Imágenes con Vista Previa

```html
<me-file-upload
  label="Foto de perfil"
  name="profilePhoto"
  accept="image/*"
  max-files="1"
  show-preview
  crop
  required
  hint="Solo imágenes JPG, PNG. Máximo 2MB"
>
</me-file-upload>
```

### Upload con Autoguardado

```html
<me-file-upload
  label="Adjuntar archivos"
  name="attachments"
  accept="*/*"
  multiple
  auto-upload
  url="/api/upload"
  show-progress
>
</me-file-upload>
```

### Upload con Validación Personalizada

```html
<me-file-upload
  label="Certificado"
  name="certificate"
  accept="application/pdf"
  max-size="5MB"
  required
  custom-validation="validateCertificate"
>
</me-file-upload>
```

## Integración con Formularios

```html
<form id="registration-form">
  <me-file-upload
    label="DNI o Cédula *"
    name="idDocument"
    accept=".pdf,.jpg,.png"
    max-files="1"
    required
    show-preview
  >
  </me-file-upload>

  <me-file-upload
    label="Portfolio (Drag & Drop)"
    name="portfolio"
    accept="*/*"
    multiple
    max-files="5"
    drag-drop
  >
  </me-file-upload>

  <button type="submit">Enviar</button>
</form>
```

```javascript
document.getElementById("registration-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  // Los archivos están disponibles en formData
  console.log("Documento:", formData.get("idDocument"));
});
```

## Demo del Formulario

<me-playground-form id="file-upload-playground" schema-name="file-upload" title="Subida de Archivos" description="Ejemplo de subida de archivos con validación.">
<div style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
  <h4>📁 Ejemplo de Subida de Archivos</h4>
  
  <me-file-upload 
    label="Selecciona una imagen"
    name="demoImage"
    accept="image/*"
    max-files="1"
    max-size="3MB"
    show-preview>
  </me-file-upload>
</div>

<div style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
  <h4>📎 Múltiples Archivos (Drag & Drop)</h4>
  
  <me-file-upload 
    label="Arrastra archivos aquí"
    name="demoFiles"
    accept="*/*"
    multiple
    max-files="5"
    max-size="10MB"
    drag-drop
    show-preview>
  </me-file-upload>
</div>
</me-playground-form>

## Personalización con CSS

### Variables CSS

```css
me-file-upload {
  --me-upload-border: 2px dashed #d1d5db;
  --me-upload-border-hover: 2px dashed #3b82f6;
  --me-upload-bg: #f9fafb;
  --me-upload-text-color: #6b7280;
  --me-upload-focus-color: #3b82f6;
  --me-upload-error-color: #ef4444;
  --me-upload-preview-bg: #ffffff;
  --me-upload-progress-fill: #3b82f6;
}
```

### Ejemplos de Personalización

<style>
  .custom-upload {
    --me-upload-border: 2px dashed #10b981;
    --me-upload-bg: #f0fdf4;
  }
</style>

<div class="custom-upload" style="margin-bottom: 1rem;">
  <me-file-upload 
    label="Upload personalizado (verde)"
    accept="image/*"
    max-files="1"
    show-preview>
  </me-file-upload>
</div>

## Accesibilidad

- **Navegación por teclado**: Tab, Enter, Space funcionan para abrir el selector.
- **Screen Readers**: Anuncia estados, errores y archivos seleccionados.
- **ARIA**: Etiquetado correcto para regiones de drop y botones.

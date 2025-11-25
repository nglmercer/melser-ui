---
title: MelserFileUpload
---

# MelserFileUpload

Un componente de subida de archivos avanzado con drag & drop, vista previa, validación de tipos y progreso de carga.

## Ejemplo Básico

```html
<melser-file-upload 
  label="Subir archivo" 
  accept="image/*,application/pdf">
</melser-file-upload>
```

## Demo Interactivo

<melser-file-upload 
  id="demo-basic" 
  label="Subida básica de archivos" 
  accept="image/*,application/pdf"
  max-files="3">
</melser-file-upload>

<melser-file-upload 
  id="demo-dropzone" 
  label="Drag & Drop Zone" 
  drag-drop
  accept="image/*"
  max-size="5MB">
</melser-file-upload>

<melser-file-upload 
  id="demo-avatar" 
  label="Foto de perfil" 
  accept="image/*"
  max-files="1"
  show-preview
  crop>
</melser-file-upload>

<melser-file-upload 
  id="demo-documents" 
  label="Documentos" 
  accept=".pdf,.doc,.docx"
  max-files="5"
  max-size="10MB">
</melser-file-upload>

<melser-file-upload 
  id="demo-multiple" 
  label="Múltiples archivos" 
  accept="*/*"
  max-files="10"
  multiple
  show-preview>
</melser-file-upload>


## Propiedades

| Propiedad | Tipo | Valor por Defecto | Descripción |
|-----------|------|-------------------|-------------|
| `accept` | `string` | `''` | Tipos de archivo aceptados |
| `multiple` | `boolean` | `false` | Permite múltiples archivos |
| `max-files` | `number` | `undefined` | Máximo número de archivos |
| `max-size` | `string` | `undefined` | Tamaño máximo por archivo |
| `min-size` | `string` | `undefined` | Tamaño mínimo por archivo |
| `required` | `boolean` | `false` | Campo requerido en formularios |
| `disabled` | `boolean` | `false` | Deshabilita la interacción |
| `drag-drop` | `boolean` | `false` | Habilita drag & drop |
| `show-preview` | `boolean` | `false` | Muestra vista previa |
| `crop` | `boolean` | `false` | Permite recorte de imágenes |
| `auto-upload` | `boolean` | `false` | Sube automáticamente |
| `url` | `string` | `''` | URL para subir archivos |
| `label` | `string` | `''` | Etiqueta visible del componente |
| `name` | `string` | `''` | Nombre para formularios |

## Eventos

| Evento | Descripción |
|--------|-------------|
| `change` | Se dispara al seleccionar archivos |
| `file-added` | Se dispara al agregar un archivo |
| `file-removed` | Se dispara al remover un archivo |
| `drag-over` | Se dispara durante drag sobre la zona |
| `drop` | Se dispara al soltar archivos |
| `validation-error` | Se dispara con errores de validación |
| `upload-progress` | Se dispara durante la subida |
| `upload-complete` | Se dispara al completar subida |
| `upload-error` | Se dispara con errores de subida |

## Ejemplos de Uso

### Upload de Imágenes con Vista Previa

```html
<melser-file-upload 
  label="Foto de perfil"
  name="profilePhoto"
  accept="image/*"
  max-files="1"
  show-preview
  crop
  required
  hint="Solo imágenes JPG, PNG. Máximo 2MB">
</melser-file-upload>
```

### Upload de Documentos

```html
<melser-file-upload 
  label="Documentos de identificación"
  name="documents"
  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
  multiple
  max-files="5"
  max-size="10MB"
  drag-drop>
</melser-file-upload>
```

### Upload con Autoguardado

```html
<melser-file-upload 
  label="Adjuntar archivos"
  name="attachments"
  accept="*/*"
  multiple
  auto-upload
  url="/api/upload"
  show-progress>
</melser-file-upload>
```

### Upload con Validación Personalizada

```html
<melser-file-upload 
  label="Certificado de estudios"
  name="certificate"
  accept="application/pdf,image/*"
  max-files="1"
  max-size="5MB"
  required
  custom-validation="validateCertificate">
</melser-file-upload>
```

## Integración con Formularios

### Formulario de Registro con Documentos

```html
<form id="registration-form">
  <div style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
    <h4>📸 Documentos Requeridos</h4>
    
    <melser-file-upload 
      label="DNI o Cédula *"
      name="idDocument"
      accept=".pdf,.jpg,.jpeg,.png"
      max-files="1"
      max-size="5MB"
      required
      show-preview
      id="form-id">
    </melser-file-upload>
  </div>
  
  <div style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
    <h4>📄 Documentos Opcionales</h4>
    
    <melser-file-upload 
      label="Certificado de estudios"
      name="educationCert"
      accept=".pdf"
      max-files="1"
      max-size="3MB"
      show-preview
      id="form-education">
    </melser-file-upload>
    
    <melser-file-upload 
      label="Foto de perfil"
      name="profilePhoto"
      accept="image/*"
      max-files="1"
      max-size="2MB"
      show-preview
      crop
      id="form-photo">
    </melser-file-upload>
    
    <melser-file-upload 
      label="Portfolio (múltiples archivos)"
      name="portfolio"
      accept="*/*"
      multiple
      max-files="10"
      max-size="50MB"
      drag-drop
      show-preview
      id="form-portfolio">
    </melser-file-upload>
  </div>
  
  <button  type="submit" variant="primary">
    Completar Registro
  </button >
</form>
```

```javascript
const form = document.getElementById('registration-form');
if (form) {
  const uploads = form.querySelectorAll('melser-file-upload');
  
  // Manejar eventos de validación
  uploads.forEach(upload => {
    upload.addEventListener('validation-error', (e) => {
      console.error('Error de validación:', e.detail.error);
      alert(`Error: ${e.detail.error.message}`);
    });
    
    upload.addEventListener('file-added', (e) => {
      console.log('Archivo agregado:', e.detail.file.name);
    });
  });
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    
    // Verificar archivos requeridos
    const idDocument = form.querySelector('[name="idDocument"]')?.files[0];
    if (!idDocument) {
      alert('Por favor adjunta tu documento de identificación');
      return;
    }
    
    try {
      // Simular validación
      console.log('Validando documentos...');
      
      // Subir archivos si auto-upload está habilitado
      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(`Preparando subida: ${key} - ${value.name}`);
        }
      }
      
      alert('¡Registro completado exitosamente!');
      
    } catch (error) {
      console.error('Error en el registro:', error);
      alert('Error al procesar el registro. Inténtalo de nuevo.');
    }
  });
}
```

## Demo del Formulario

<form id="file-upload-form">
  <div style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
    <h4>📁 Ejemplo de Subida de Archivos</h4>
    
  <melser-file-upload 
    label="Selecciona una imagen"
    name="demoImage"
    accept="image/*"
    max-files="1"
    max-size="3MB"
    show-preview
    id="form-image">
  </melser-file-upload>
  </div>
  
  <div style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
    <h4>📎 Múltiples Archivos (Drag & Drop)</h4>
    
  <melser-file-upload 
    label="Arrastra archivos aquí"
    name="demoFiles"
    accept="*/*"
    multiple
    max-files="5"
    max-size="10MB"
    drag-drop
    show-preview
    id="form-files">
  </melser-file-upload>
  </div>
  
  <button  type="submit" variant="primary" id="form-submit">
    Procesar Archivos
  </button >
</form>

<div id="upload-result" style="margin-top: 1rem; padding: 1rem; background: #f3f4f6; border-radius: 6px; display: none;">
  <strong>Archivos Procesados:</strong>
  <div id="upload-details"></div>
</div>


## Personalización con CSS

### Variables CSS

```css
melser-file-upload {
  --melser-upload-border: 2px dashed #d1d5db;
  --melser-upload-border-hover: 2px dashed #3b82f6;
  --melser-upload-border-active: 2px solid #3b82f6;
  --melser-upload-bg: #f9fafb;
  --melser-upload-bg-hover: #f3f4f6;
  --melser-upload-text-color: #6b7280;
  --melser-upload-focus-color: #3b82f6;
  --melser-upload-error-color: #ef4444;
  --melser-upload-preview-bg: #ffffff;
  --melser-upload-preview-border: 1px solid #e5e7eb;
  --melser-upload-progress-bg: #e5e7eb;
  --melser-upload-progress-fill: #3b82f6;
}
```

### Ejemplos de Personalización

<style>
  .custom-upload {
    --melser-upload-border: 2px dashed #10b981;
    --melser-upload-border-hover: 2px solid #10b981;
    --melser-upload-bg: #f0fdf4;
    --melser-upload-bg-hover: #dcfce7;
  }
  
  .minimal-upload {
    --melser-upload-border: 1px solid #d1d5db;
    --melser-upload-text-color: #9ca3af;
    --melser-upload-bg: #ffffff;
  }
  
  .dark-upload {
    --melser-upload-border: 2px dashed #374151;
    --melser-upload-border-hover: 2px solid #8b5cf6;
    --melser-upload-bg: #1f2937;
    --melser-upload-bg-hover: #374151;
    --melser-upload-text-color: #d1d5db;
    --melser-upload-preview-bg: #111827;
  }
</style>

<div class="custom-upload" style="margin-bottom: 1rem;">
  <melser-file-upload 
    label="Upload personalizado (verde)"
    accept="image/*"
    max-files="1"
    show-preview>
  </melser-file-upload>
</div>

<div class="minimal-upload" style="margin-bottom: 1rem;">
  <melser-file-upload 
    label="Upload minimalista"
    accept=".pdf,.doc,.docx"
    max-files="1">
  </melser-file-upload>
</div>

<div class="dark-upload">
  <melser-file-upload 
    label="Upload tema oscuro"
    accept="*/*"
    multiple
    drag-drop>
  </melser-file-upload>
</div>

## Características Avanzadas

### Validación Personalizada

```javascript
const upload = document.querySelector('melser-file-upload');
if (upload) {
  upload.addEventListener('file-added', (e) => {
    const file = e.detail.file;
    
    // Validar tipo de archivo personalizado
    if (!isValidFileType(file)) {
      upload.dispatchEvent(new CustomEvent('validation-error', {
        detail: { error: { message: 'Tipo de archivo no válido' } }
      }));
      return;
    }
    
    // Validar contenido
    if (!isValidFileContent(file)) {
      upload.dispatchEvent(new CustomEvent('validation-error', {
        detail: { error: { message: 'El archivo parece estar corrupto' } }
      }));
    }
  });
}

function isValidFileType(file) {
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  return allowedTypes.includes(file.type);
}

function isValidFileContent(file) {
  // Aquí podrías implementar validaciones más complejas
  return file.size > 0;
}
```

### Subida Automática con Progreso

```javascript
const autoUpload = document.querySelector('melser-file-upload[auto-upload]');
if (autoUpload) {
  autoUpload.addEventListener('file-added', async (e) => {
    const file = e.detail.file;
    
    try {
      // Mostrar progreso
      autoUpload.setAttribute('uploading', '');
      
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('Error en la subida');
      }
      
      const result = await response.json();
      
      // Disparar evento de completado
      autoUpload.dispatchEvent(new CustomEvent('upload-complete', {
        detail: { file, response: result }
      }));
      
    } catch (error) {
      // Disparar evento de error
      autoUpload.dispatchEvent(new CustomEvent('upload-error', {
        detail: { file, error }
      }));
    } finally {
      autoUpload.removeAttribute('uploading');
    }
  });
}
```

### Previsualización de Imágenes con Crop

```javascript
const cropUpload = document.querySelector('melser-file-upload[crop]');
if (cropUpload) {
  cropUpload.addEventListener('file-added', (e) => {
    const file = e.detail.file;
    
    if (file.type.startsWith('image/')) {
      showImageCropper(file);
    }
  });
}

function showImageCropper(file) {
  // Implementar modal de recorte
  const modal = createCropModal(file);
  document.body.appendChild(modal);
  
  // Después del recorte
  modal.addEventListener('crop-complete', (e) => {
    const croppedBlob = e.detail.blob;
    // Usar la imagen recortada
    console.log('Imagen recortada:', croppedBlob);
  });
}
```

## Accesibilidad

El componente MelserFileUpload incluye:

- **Navegación por teclado**: Tab, Enter, Space funcionan
- **Anuncios de screen readers**: Estados y errores anunciados
- **ARIA labels**: Completamente etiquetado para accesibilidad
- **Focus management**: Indicador visual claro
- **Estados de error**: Anunciados apropiadamente

## Mejores Prácticas

1. **Especifica tipos aceptados** claramente con `accept`
2. **Establece límites razonables** de tamaño y cantidad
3. **Proporciona feedback visual** durante las operaciones
4. **Maneja errores graciosamente** con mensajes claros
5. **Incluye vista previa** para mejor experiencia de usuario
6. **Usa drag & drop** cuando sea apropiado
7. **Considera validaciones** del lado cliente y servidor

## Troubleshooting

### Archivos no se seleccionan

```javascript
// Verificar que el componente esté importado
import 'melser-ui/components/melser-file-upload.js';

// Verificar que no esté deshabilitado
console.log(upload.disabled); // Debe ser false
```

### Drag & drop no funciona

```html
<!-- Asegurar que drag-drop esté habilitado -->
<melser-file-upload 
  drag-drop
  label="Con drag & drop">
```

### Vista previa no aparece

```html
<!-- Verificar que show-preview esté habilitado -->
<melser-file-upload 
  show-preview
  label="Con vista previa">
```

### Validación no funciona

```html
<!-- Configurar límites apropiados -->
<melser-file-upload 
  max-size="5MB"
  accept="image/*"
  max-files="3">
```

### Subida automática falla

```javascript
// Verificar URL de subida
upload.url = '/api/upload';

// Manejar errores de subida
upload.addEventListener('upload-error', (e) => {
  console.error('Error de subida:', e.detail.error);
});
```

### Focus no visible

```css
/* Personalizar indicador de foco */
melser-file-upload:focus-within {
  box-shadow: 0 0 0 2px #3b82f6;
  border-color: #3b82f6;
}
```

### Problemas de memoria con vista previa

```javascript
// Limpiar previews cuando sea necesario
upload.clearPreviews();

// O configurar límite de previews
upload.maxPreviews = 10;
```

### Archivos muy grandes

```html
<!-- Configurar tamaño máximo apropiado -->
<melser-file-upload 
  max-size="10MB"
  hint="El tamaño máximo permitido es 10MB">
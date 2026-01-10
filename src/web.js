// Importar estilos globales
import './styles/theme.css';

import './index';
import './components/melser-playground-form'; // New Playground Component
import './components/table'; // New Table Component
import './components/melser-table-playground'; // New Table Playground Component
import './components/modal/modal'; // New Modal Component
import { setTheme } from './index';
if (typeof window !== 'undefined') {
  const htmlElement = document.documentElement;

  const applyTheme = (theme) => {
    if (htmlElement.getAttribute('data-theme') !== theme) {
      htmlElement.setAttribute('data-theme', theme);
      setTheme(theme);
    }
  };

  const getCurrentTheme = () => {
    if (htmlElement.classList.contains('dark')) return 'dark';
    if (htmlElement.classList.contains('light')) return 'light';

    return 'light';
  };
  const observer = new MutationObserver((mutations) => {
    const shouldUpdate = mutations.some(m => m.type === 'attributes' && m.attributeName === 'class');
    if (shouldUpdate) {
      applyTheme(getCurrentTheme());
    }
  });

  observer.observe(htmlElement, { attributes: true, attributeFilter: ['class'] });
  const init = () => applyTheme(getCurrentTheme());

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ()=>{
      init();
      initTable();
      initModals();
    });
  } else {
    init();
    initTable();
    initModals();
  }
  const setupGlobalFormHandler = () => {
    // Crear contenedor para resultados si no existe
    let resultsContainer = document.getElementById('form-results-container');
    if (!resultsContainer) {
      resultsContainer = document.createElement('div');
      resultsContainer.id = 'form-results-container';
      resultsContainer.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        width: 320px;
        max-height: 80vh;
        overflow-y: auto;
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        padding: 0;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        z-index: 10000;
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        font-size: 14px;
        display: none;
        transition: opacity 0.2s ease-in-out;
      `;

      // Añadir título y botón de cierre
      resultsContainer.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; border-bottom: 1px solid #e2e8f0; background: #f8fafc; border-radius: 12px 12px 0 0;">
          <strong style="color: #0f172a; margin: 0; display:flex; align-items:center; gap:8px;">
            <span>📋</span> Debug Form
          </strong>
          <button onclick="this.closest('#form-results-container').style.display='none'" style="
            background: transparent;
            border: none;
            font-size: 20px;
            cursor: pointer;
            color: #64748b;
            padding: 4px;
            border-radius: 4px;
            line-height: 1;
            display: flex; align-items: center; justify-content: center;
          ">×</button>
        </div>
        <div id="form-results-content" style="padding: 16px; display: flex; flex-direction: column; gap: 12px;"></div>
      `;

      document.body.appendChild(resultsContainer);
    }

    // Función para mostrar resultados
    const showFormResults = (formData, formId) => {
      const resultsContainer = document.getElementById('form-results-container');
      const resultsContent = document.getElementById('form-results-content');

      if (!resultsContainer || !resultsContent) return;

      let resultHTML = `
        <div style="border: 1px solid #bfdbfe; background: #eff6ff; border-radius: 8px; overflow: hidden; animation: slideIn 0.3s ease;">
          <div style="background: #dbeafe; padding: 8px 12px; font-weight: 600; color: #1e40af; font-size: 12px; display: flex; justify-content: space-between;">
            <span>ID: ${formId}</span>
            <span style="font-weight: normal; opacity: 0.8;">${new Date().toLocaleTimeString()}</span>
          </div>
          <div style="padding: 12px;">
      `;

      if (formData && Object.keys(formData).length > 0) {
        for (const [key, value] of Object.entries(formData)) {
          // Detectar si es un array para mostrarlo mejor
          const displayValue = Array.isArray(value)
            ? `[${value.join(', ')}]`
            : String(value);

          resultHTML += `
            <div style="margin-bottom: 6px; display: grid; grid-template-columns: 1fr 2fr; gap: 8px; border-bottom: 1px dashed #e2e8f0; padding-bottom: 4px;">
              <strong style="color: #475569; overflow: hidden; text-overflow: ellipsis;">${key}:</strong> 
              <span style="color: #0f172a; word-break: break-word; font-family: monospace;">${displayValue}</span>
            </div>
          `;
        }
      } else {
        resultHTML += '<div style="color: #94a3b8; font-style: italic; text-align: center;">Formulario vacío</div>';
      }

      resultHTML += '</div></div>';

      // Añadir resultados al principio
      resultsContent.innerHTML = resultHTML + resultsContent.innerHTML;
      resultsContainer.style.display = 'block';

      // Limpieza automática (opcional, eliminada para permitir debug tranquilo, o aumentar tiempo)
      // setTimeout(() => { ... }, 15000); 
    };

    // --- MEJORA 1: Handler del Submit ---
    document.addEventListener('submit', (event) => {
      const form = event.target;
      if (form.tagName !== 'FORM') return;

      // Importante: Prevenir el envío real
      event.preventDefault();

      const formData = new FormData(form);
      const formDataObj = {};

      // 1. Procesar FormData estándar
      for (const [key, value] of formData.entries()) {
        if (Object.prototype.hasOwnProperty.call(formDataObj, key)) {
          // Si ya existe, asegurar que sea array
          if (!Array.isArray(formDataObj[key])) {
            formDataObj[key] = [formDataObj[key]];
          }
          formDataObj[key].push(value);
        } else {
          formDataObj[key] = value;
        }
      }

      // 2. AÑADIDO: Capturar el valor del botón Submit que disparó el evento (Submitter)
      // Esto arregla el problema de <button name="action" value="save"> vs "cancel"
      if (event.submitter && event.submitter.name) {
        formDataObj[event.submitter.name] = event.submitter.value;
      }

      // 3. Procesar checkboxes/radios no marcados (Lógica original mejorada)
      const uncheckedInputs = form.querySelectorAll('input[type="checkbox"]:not(:checked), input[type="radio"]:not(:checked)');
      uncheckedInputs.forEach(input => {
        if (input.name && !formDataObj.hasOwnProperty(input.name)) {
          // Solo asignar si no existe ya (para radios, si uno está marcado, no sobreescribir con null)
          // Para checkboxes, false. Para radios, null.
          if (input.type === 'checkbox') {
            formDataObj[input.name] = false;
          } else if (input.type === 'radio') {
            // Solo poner null si ningún radio con ese nombre fue seleccionado
            const siblings = form.querySelectorAll(`input[type="radio"][name="${input.name}"]:checked`);
            if (siblings.length === 0) formDataObj[input.name] = null;
          }
        }
      });

      // 4. Procesar Web Components (Melser UI)
      // Nota: Si usas ShadowDOM, querySelector no entra al shadow, pero sí encuentra el host element.
      const melserComponents = form.querySelectorAll('*'); // Iterar todo para filtrar por propiedad o tag
      melserComponents.forEach(component => {
        const tagName = component.tagName.toLowerCase();

        // Detectar componentes Melser (por prefijo de tag)
        if (tagName.startsWith('me-')) {
          // Intentar obtener nombre y valor
          // Prioridad: atributo name > propiedad name > id
          const name = component.getAttribute('name') || component.name || component.id;

          // Prioridad valor: propiedad value > atributo value > checked
          let value = component.value;

          // Manejo especial para checkboxes/switches de web components si usan 'checked' en lugar de value
          if (value === undefined && 'checked' in component) {
            value = component.checked;
          }

          if (name) {
            // Si el componente ya reportó su valor vía ElementInternals (FormData estándar),
            // esto podría duplicar. Verificamos si ya está en formDataObj.
            // Si Melser components NO usan ElementInternals, esto es necesario.
            // Si es un array (multiselect), manejarlo:
            if (Array.isArray(value)) {
              formDataObj[name] = value;
            } else if (value !== undefined && value !== null && value !== '') {
              formDataObj[name] = value;
            }
          }
        }
      });

      showFormResults(formDataObj, form.id || 'Formulario');

      console.groupCollapsed('🚀 Formulario Enviado');
      console.log('Target:', form);
      console.log('Submitter:', event.submitter);
      console.log('Data:', formDataObj);
      console.groupEnd();
    });

    // --- MEJORA 2: Click Delegation usando requestSubmit ---
    document.addEventListener('click', (event) => {
      const target = event.target;

      // Verificar si clicamos en un botón submit o input submit
      // Usamos .closest para manejar clicks en iconos dentro del botón <button><span>Icon</span></button>
      const submitBtn = target.closest('button[type="submit"], input[type="submit"]');

      if (submitBtn) {
        const form = submitBtn.form || submitBtn.closest('form');

        // Caso especial: Botón fuera del formulario referenciando por ID (atributo form="id")
        // O botón dentro del formulario.

        if (form) {
          // No hacemos preventDefault aquí. Dejamos que el evento click fluya.
          // El navegador disparará el evento 'submit' automáticamente.
          // EXCEPCIÓN: Si el botón está fuera del formulario y el navegador no lo soporta bien,
          // o si necesitamos forzar validación programática.

          // Pero tu código original intentaba forzar el submit manualmente.
          // Si necesitas forzarlo (por ejemplo, si preventDefault fue llamado antes erróneamente),
          // usa requestSubmit que incluye al submitter.

          // Si es un componente Custom Button que no dispara submit nativo:
          if (submitBtn.tagName.includes('-')) {
            event.preventDefault(); // Prevenir doble submit si acaso
            form.requestSubmit(submitBtn);
          }
        }
      }
    });
  };

  // Inicializar
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupGlobalFormHandler);
  } else {
    setupGlobalFormHandler();
  }
  function initTable(){
    setTimeout(()=>{
      tableInit()
    },3000)
  }
  function tableInit(){
    const table = document.getElementById('demo-table');
    console.log(table);
    if (!table)return
    table.addEventListener('row-action', (event) => {
      console.log(event.detail);
    });
    table.columns = [
    { key: 'id', label: 'ID', type: 'number' },
    { key: 'name', label: 'Name', type: 'avatar' },
    { key: 'email', label: 'Email', type: 'string' },
    { key: 'status', label: 'Status', type: 'string' },
    { key: 'progress', label: 'Progress', type: 'number' },
    { key: 'salary', label: 'Salary', type: 'number' },
    { key: 'tags', label: 'Tags', type: 'badge' },
    { key: 'actions', label: 'Actions', type: 'actions' }
    ];

    table.data = [
    {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    status: 'active',
    progress: 75,
    salary: 75000,
    tags: ['developer', 'frontend']
    },
    {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'inactive',
    progress: 45,
    salary: 68000,
    tags: ['designer', 'ui/ux']
    },
    {
    id: 3,
    name: 'Michael Johnson',
    email: 'michael@example.com',
    status: 'active',
    progress: 90,
    salary: 82000,
    tags: ['manager', 'agile']
    },
    {
    id: 4,
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    status: 'inactive',
    progress: 30,
    salary: 61000,
    tags: ['marketing', 'seo']
    }
    ];

    table.config = {
    pagination: true,
    pageSize: 5,
    selection: true,
    density: 'Normal',
    expandable: false
    };
  }
  
  function initModals() {
    // Use event delegation for modal open buttons
    document.addEventListener('click', (event) => {
      const target = event.target;
      const openButton = target.closest('[data-modal-open]');
      if (openButton) {
        console.log('openButton', openButton);
        const modalId = openButton.getAttribute('data-modal-open');
        const modal = document.getElementById(modalId);
        if (modal && typeof (modal).openModal === 'function') {
          console.log('modal', modal);
          (modal).openModal();
        }
      }
      
      // Handle modal close buttons
      const closeButton = target.closest('[data-modal-close]');
      console.log('closeButton', closeButton);
      if (closeButton) {
        const modalId = closeButton.getAttribute('data-modal-close');
        const modal = document.getElementById(modalId);
        if (modal && typeof (modal).close === 'function') {
          console.log('modal', modal);
          (modal).close();
        }
      }
    });
  }
}

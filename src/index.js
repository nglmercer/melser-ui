// Archivo de entrada principal para la documentación
// Este archivo registra todos los componentes de Melser UI

import { registerComponents } from './utils/registration.js';

// Importar todos los componentes
import './components/melser-checkbox.js';
import './components/melser-text-input.js';
import './components/melser-textarea.js';
import './components/melser-password-input.js';
import './components/melser-number-input.js';
import './components/melser-select.js';
import './components/melser-multi-select.js';
import './components/melser-combobox.js';
import './components/melser-checkbox.js';
import './components/melser-radio-group.js';
import './components/melser-file-upload.js';
import './components/melser-date-picker.js';
import './components/melser-time-picker.js';
import './components/melser-color-picker.js';
import './components/melser-rating.js';
import './components/melser-otp-input.js';
import './components/melser-tags-input.js';
import './components/melser-range.js';
import './components/melser-dual-range.js';
import './components/melser-switch.js';

// Importar componentes de playground
import './components/melser-playground.js';
import './components/melser-demo.js';

// Importar estilos
import './styles/theme.css';

// Exportar utilidades principales
export * from './types/index.js';
export * from './utils/registration.js';

//console.log('show import log');

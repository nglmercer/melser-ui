import { html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { MelserBaseInput, InputVar } from '../core/Base';
import { Var } from '../theme/tokens';
import { classMap } from 'lit/directives/class-map.js';
import type { MelserDataType } from '../types/index';

@customElement('me-otp-input')
export class MelserOtpInput extends MelserBaseInput<string> {
  @property({ type: Number }) length = 6;
  @property({ type: String }) value = '';

  // Novedad: Fuerza mayúsculas automáticamente
  @property({ type: Boolean }) uppercase = true;

  // Novedad: Patrón permitido (Por defecto: Letras A-Z y Números 0-9)
  @property({ type: String }) allowedChars = '^[a-zA-Z0-9]*$';

  @state() private _selectionStart: number | null = 0;
  @state() private _selectionEnd: number | null = 0;
  @state() private _isFocused = false;

  @query('.ghost-input') protected inputElement!: HTMLInputElement;


  readonly dataType: MelserDataType = 'string';

  handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    let val = input.value;

    // Limpieza Standard
    const regex = new RegExp(this.allowedChars);
    if (!regex.test(val)) {
      // Remover caracteres inválidos
      val = val.replace(new RegExp(`[^${this.allowedChars.slice(1, -1)}]`, 'g'), '');
    }
    if (this.uppercase) val = val.toUpperCase();

    // Cortar al length máximo
    val = val.slice(0, this.length);

    // Actualizar el input nativo si cambiamos algo (limpieza)
    if (input.value !== val) {
      const cursor = input.selectionStart;
      input.value = val;
      if (cursor !== null) input.setSelectionRange(cursor, cursor);
    }

    this.value = val;
    this._selectionStart = input.selectionStart;
    this._selectionEnd = input.selectionEnd; // Importante actualizar el End también
    this.dispatchChange();
  }

  handleSelection(e: Event) {
    const input = e.target as HTMLInputElement;
    this._selectionStart = input.selectionStart;
    this._selectionEnd = input.selectionEnd;
  }

  handleFocus() {
    this._isFocused = true;
    // Sincronizar al recibir foco (por tabulación, etc)
    if (this.inputElement) {
      this._selectionStart = this.inputElement.selectionStart;
      this._selectionEnd = this.inputElement.selectionEnd;
    }
  }
  handleDoubleClick(e: MouseEvent) {
    // Evitar que el click previo interfiera
    e.stopPropagation();
    e.preventDefault();

    // 2. CORRECCIÓN: Select All Robusto
    this.inputElement.select();

    // Forzamos la actualización del estado inmediatamente
    this._selectionStart = 0;
    this._selectionEnd = this.length;
  }
  handleBlur() {
    this._isFocused = false;
    // Opcional: Limpiar selección visual al perder foco
    // this._selectionStart = null;
    // this._selectionEnd = null;
  }

  handleSlotClick(index: number, e: MouseEvent) {
    // 3. CORRECCIÓN: Detener propagación y chequeo de foco
    e.preventDefault(); // Evita comportamientos nativos raros del div
    e.stopPropagation(); // Evita que suba al contenedor padre

    // Solo hacer focus si NO lo tiene ya. Esto evita el conflicto de reinicio.
    if (document.activeElement !== this.inputElement) {
      this.inputElement.focus();
    }

    // Calcular posición
    const targetPos = Math.min(index, this.value.length);

    // 4. CORRECCIÓN: Establecer cursor sin seleccionar rango (caret)
    // Si usas (targetPos, targetPos + 1) seleccionas el caracter. 
    // Si usas (targetPos, targetPos) pones el cursor ANTES del caracter.
    // Para UX de OTP "reemplazo", seleccionar el caracter (tu lógica original) está bien,
    // PERO debemos asegurarnos de que esto actualice el estado.

    this.inputElement.setSelectionRange(targetPos, targetPos + 1);

    // Actualizar estado manual para reflejo instantáneo en UI
    this._selectionStart = targetPos;
    this._selectionEnd = targetPos + 1;
  }
  render() {
    const slots = Array.from({ length: this.length });

    // Lógica para determinar si estamos en "Select All" o selección de rango
    const isRangeSelection = (this._selectionEnd || 0) - (this._selectionStart || 0) > 1;

    return html`
      <div class="input-wrapper">
        <div class="otp-container">
          <input
            class="ghost-input"
            .value="${this.value}" 
            @input="${this.handleInput}"
            @focus="${this.handleFocus}"
            @blur="${this.handleBlur}"
            @select="${this.handleSelection}"
            spellcheck="false"
            autocomplete="one-time-code"
          />

          <div class="slots-layer" aria-hidden="true">
            ${slots.map((_, i) => {
      const char = this.value[i] || '';

      // Lógica visual simplificada
      const start = this._selectionStart || 0;
      const end = this._selectionEnd || 0;

      // ¿Es parte de una selección múltiple?
      const isInsideSelection = this._isFocused && i >= start && i < end;

      // ¿Es el cursor único (caret) o selección simple de un caracter?
      // Tu lógica usa selección de 1 caracter como cursor, así que:
      const isSelectedChar = this._isFocused && i === start && (end - start) <= 1;

      // Clases
      const classes = {
        'slot': true,
        'filled': !!char,
        // Borde activo: Si es el caracter seleccionado O es parte de una selección mayor
        'active': isSelectedChar || isInsideSelection,
        // Fondo de selección: Solo si es una selección de rango (Select All)
        'selected': isInsideSelection && isRangeSelection
      };

      return html`
                <div 
                  class=${classMap(classes)} 
                  @mousedown="${(e: MouseEvent) => this.handleSlotClick(i, e)}"
                  @dblclick="${this.handleDoubleClick}" 
                >
                  ${char}
                  ${(isSelectedChar && !isRangeSelection) ? html`<div class="fake-caret"></div>` : ''}
                </div>
              `;
    })}
          </div>
        </div>
      </div>
    `;
  }

  static styles = [
    MelserBaseInput.styles,
    css`
      :host {
        /* Dimensiones */
        --otp-slot-size: 3rem;
        --otp-gap: 0.5rem;
      }

      .otp-container {
        position: relative;
        width: fit-content;
        height: var(--otp-slot-size);
        display: flex;
      }

      .ghost-input {
        position: absolute;
        top: 0; left: 0; width: 100%; height: 100%;
        opacity: 0;
        z-index: 20;
        
        pointer-events: none; 
        
        cursor: default;
        font-size: 1px; 
        color: transparent;
        background: transparent;
        caret-color: transparent;
        border: none;
        outline: none;
      }
      
      .ghost-input::selection { background: transparent; }

      .slots-layer {
        display: flex;
        gap: var(--otp-gap);
        position: relative;
        z-index: 10;
        pointer-events: none;
      }

      .slot {
        width: var(--otp-slot-size);
        height: var(--otp-slot-size);
        display: flex;
        align-items: center;
        justify-content: center;
        
        /* Aplicando las variables de tema */
        background: ${InputVar.bg};
        border: 1px solid ${InputVar['border-color']};
        color: ${InputVar['text-color']};
        border-radius: ${InputVar.radius};
        
        font-size: 1.5rem;
        font-weight: ${Var.font.weight.bold};
        position: relative;
        transition: border-color 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease;
        pointer-events: auto;
      }

      .slot.filled {
        background:${InputVar['bg-hover']};
      }

      .slot.active {
        border-color: ${InputVar['focus-ring-color']};
        box-shadow: ${InputVar['focus-shadow']};
        z-index: 1; /* Para que la sombra pise a los vecinos si el gap es pequeño */
      }

      .fake-caret {
        position: absolute;
        width: 2px;
        height: 50%; /* 50% de la altura del slot se ve elegante */
        background-color: ${InputVar['focus-ring-color']};
        animation: blink 1s step-end infinite;
        pointer-events: none;
      }

      @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }

      /* Estilo de error opcional */
      :host([invalid]) .slot {
        border-color: ${InputVar['error-color']};
        color: ${InputVar['error-color']};
      }
    `
  ];
}
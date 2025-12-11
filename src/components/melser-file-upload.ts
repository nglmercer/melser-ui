import { html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { MelserBaseInput, InputVar } from '../core/melser-base-input';
import { Var } from '../theme/tokens';
import type { MelserDataType } from '../types/index';

@customElement('melser-file-upload')
export class MelserFileUpload extends MelserBaseInput<File | null> {
  @property({ type: String }) accept = '';
  @state() fileName = '';
  @state() isDragging = false;
  @query('input') inputElement!: HTMLInputElement;

  // We store the File object, but for getData we might want to return the file or null
  // Note: File objects are not directly serializable to JSON
  value: File | null = null;
  readonly dataType: MelserDataType = 'object';

  handleChange(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFile(input.files[0]);
    } else {
      this.value = null;
      this.fileName = '';
      this.dispatchChange();
    }
  }

  handleFile(file: File) {
    this.value = file;
    this.fileName = file.name;
    this.dispatchChange();
  }

  handleDragOver(e: DragEvent) {
    e.preventDefault();
    this.isDragging = true;
  }

  handleDragLeave(e: DragEvent) {
    e.preventDefault();
    this.isDragging = false;
  }

  handleDrop(e: DragEvent) {
    e.preventDefault();
    this.isDragging = false;

    if (e.dataTransfer && e.dataTransfer.files.length > 0) {
      this.handleFile(e.dataTransfer.files[0]);
      // Update hidden input manually if needed, though usually we just use internal state
    }
  }

  render() {
    return html`
      <div class="input-wrapper">
        ${this.label ? html`<label>${this.label}</label>` : ''}
        
        <div 
          class="drop-zone ${this.isDragging ? 'dragging' : ''} ${this.fileName ? 'has-file' : ''}"
          @dragover="${this.handleDragOver}"
          @dragleave="${this.handleDragLeave}"
          @drop="${this.handleDrop}"
          @click="${() => this.shadowRoot?.querySelector('input')?.click()}"
        >
          <input
            type="file"
            .accept="${this.accept}"
            ?disabled="${this.disabled}"
            ?required="${this.required}"
            @change="${this.handleChange}"
            part="input"
            style="display: none;"
          />
          
          <div class="content">
            ${this.fileName
        ? html`
                <span class="icon">📄</span>
                <span class="filename">${this.fileName}</span>
                <span class="change-text">(Click to change)</span>
              `
        : html`
                <span class="icon">📁</span>
                <span class="placeholder">Click or drag file here</span>
                ${this.accept ? html`<span class="meta">${this.accept}</span>` : ''}
              `
      }
          </div>
        </div>
        
        <div class="error" part="error">${this.errorMessage}</div>
      </div>
    `;
  }

  static styles = [
    MelserBaseInput.styles,
    // Since this component is quite unique, we keep most custom styles 
    // but map them to our tokens where possible.
    css`
      .drop-zone {
        border: 2px dashed ${InputVar['border-color']};
        border-radius: ${InputVar.radius};
        padding: 2rem;
        text-align: center;
        cursor: pointer;
        transition: all 0.2s;
        background-color: ${InputVar.bg};
        color: ${InputVar['text-color']};
      }

      .drop-zone:hover, .drop-zone.dragging {
        border-color: ${Var.color.primary};
        background-color: ${Var.color.primaryLighter}; /* Assuming lighter exists or using Var.color.bg.default */
      }

      /* Fallback if primaryLighter isn't defined in the strict Map, we can use surface variant */
      .drop-zone:hover, .drop-zone.dragging {
          background-color: ${Var.color.surface.variant};
      }

      .drop-zone.has-file {
        border-style: solid;
        border-color: ${Var.color.primary};
        background-color: ${Var.color.bg.default};
      }

      .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        pointer-events: none;
      }

      .icon {
        font-size: 2rem;
      }

      .filename {
        font-weight: 600;
        word-break: break-all;
      }

      .meta, .change-text {
        font-size: 0.8rem;
        opacity: 0.7;
      }
    `
  ];
}

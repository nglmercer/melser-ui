import { html, css } from 'lit';
import { customElement, property, state,query } from 'lit/decorators.js';
import { MelserBaseInput } from '../core/melser-base-input';
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
        css`
      .drop-zone {
        border: 2px dashed var(--melser-border);
        border-radius: var(--melser-radius);
        padding: 2rem;
        text-align: center;
        cursor: pointer;
        transition: all 0.2s;
        background-color: var(--melser-input-bg);
        color: var(--melser-text);
      }

      .drop-zone:hover, .drop-zone.dragging {
        border-color: var(--melser-primary);
        background-color: hsla(var(--melser-primary-h), var(--melser-primary-s), var(--melser-primary-l), 0.05);
      }

      .drop-zone.has-file {
        border-style: solid;
        border-color: var(--melser-success, #2e7d32);
        background-color: hsla(122, 39%, 49%, 0.05);
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

import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { MelserBaseInput } from '../core/melser-base-input';
import type { MelserDataType } from '../types/index';

@customElement('melser-tags-input')
export class MelserTagsInput extends MelserBaseInput<string[]> {
    @property({ type: Array }) value: string[] = [];
    @state() inputValue = '';

    readonly dataType: MelserDataType = 'array';

    handleInput(e: Event) {
        const input = e.target as HTMLInputElement;
        this.inputValue = input.value;
    }

    handleKeyDown(e: KeyboardEvent) {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            this.addTag();
        } else if (e.key === 'Backspace' && !this.inputValue && this.value.length > 0) {
            this.removeTag(this.value.length - 1);
        }
    }

    addTag() {
        const tag = this.inputValue.trim();
        if (tag && !this.value.includes(tag)) {
            this.value = [...this.value, tag];
            this.inputValue = '';
            this.dispatchChange();
        } else if (tag && this.value.includes(tag)) {
            this.inputValue = ''; // Clear duplicate input
        }
    }

    removeTag(index: number) {
        this.value = this.value.filter((_, i) => i !== index);
        this.dispatchChange();
    }

    checkValidity(): boolean {
        if (this.required && this.value.length === 0) {
            return false;
        }
        return true;
    }

    render() {
        return html`
      <div class="input-wrapper">
        ${this.label ? html`<label>${this.label}</label>` : ''}
        
        <div class="tags-container" @click="${() => this.shadowRoot?.querySelector('input')?.focus()}">
          ${this.value ? this.value.map((tag, index) => html`
            <span class="tag">
              ${tag}
              <button type="button" class="remove-btn" @click="${(e: Event) => { e.stopPropagation(); this.removeTag(index); }}">×</button>
            </span>
          `) : ''}
          
          <input
            type="text"
            .value="${this.inputValue}"
            ?disabled="${this.disabled}"
            placeholder="${this.value && this.value.length === 0 ? 'Type and press Enter...' : ''}"
            @input="${this.handleInput}"
            @keydown="${this.handleKeyDown}"
            @blur="${this.addTag}"
            part="input"
          />
        </div>
        
        <div class="error" part="error">${this.errorMessage}</div>
      </div>
    `;
    }

    static styles = [
        MelserBaseInput.styles,
        css`
      .tags-container {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        padding: 0.5rem;
        border: 1px solid var(--melser-border);
        border-radius: var(--melser-radius);
        background-color: var(--melser-input-bg);
        min-height: 42px;
        box-sizing: border-box;
        cursor: text;
        transition: border-color 0.2s, box-shadow 0.2s;
      }

      .tags-container:focus-within {
        border-color: var(--melser-primary);
        box-shadow: 0 0 0 2px hsla(var(--melser-primary-h), var(--melser-primary-s), var(--melser-primary-l), 0.2);
      }

      input {
        flex: 1;
        min-width: 120px;
        border: none !important;
        padding: 0.25rem !important;
        margin: 0 !important;
        outline: none !important;
        box-shadow: none !important;
        background: transparent !important;
        font-size: 1rem;
        color: var(--melser-text);
      }

      .tag {
        display: inline-flex;
        align-items: center;
        background-color: hsla(var(--melser-primary-h), var(--melser-primary-s), var(--melser-primary-l), 0.1);
        color: var(--melser-primary);
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-size: 0.9rem;
      }

      .remove-btn {
        background: none;
        border: none;
        color: currentColor;
        margin-left: 0.25rem;
        cursor: pointer;
        font-size: 1.1em;
        padding: 0 0.25rem;
        line-height: 1;
        opacity: 0.7;
      }

      .remove-btn:hover {
        opacity: 1;
      }
    `
    ];
}

import { html, css } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { BaseInput } from '../core/Base';
import { Var } from '../theme/tokens';
import type { MelserDataType, SelectOption } from '../types/index';

// interface InternalOption extends SelectOption {
//   group?: string;
// }

@customElement('me-multi-select')
export class MelserMultiSelect extends BaseInput<string[]> {
  @property({ 
    type: Array,
    converter: {
      fromAttribute: (value: string | null) => {
        if (!value) return [];
        // Try parsing as JSON first (for [ "a", "b" ])
        try {
          const parsed = JSON.parse(value);
          if (Array.isArray(parsed)) return parsed;
        } catch {
          // If not JSON, treat as comma-separated string
        }
        return value.split(',').map(v => v.trim()).filter(Boolean);
      },
      toAttribute: (value: string[]) => {
        if (!value || value.length === 0) return null;
        return value.join(',');
      }
    }
  }) 
  value: string[] = [];
  @property({ type: Array }) options: SelectOption[] = [];
  @query('input') inputElement!: HTMLInputElement;

  readonly dataType: MelserDataType = 'array';

  handleChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    const selectedOptions = Array.from(select.selectedOptions).map(opt => opt.value)||[];
    this.value = selectedOptions;
    this.dispatchChange();
  }

  checkValidity(): boolean {
    if (this.required && (this.value?.length === 0)) {
      return false;
    }
    return true;
  }

  @state() private _renderedOptions: SelectOption[] = [];

  override firstUpdated() {
    this.syncOptions();
  }

  private syncOptions() {
    if (this.options && this.options.length > 0) {
      this._renderedOptions = [...this.options];
      return;
    }

    const newOptions: SelectOption[] = [];
    const children = Array.from(this.children);
    const initialSelectedValues: string[] = [];

    children.forEach(child => {
      // Handle <optgroup>
      if (child.tagName.toLowerCase() === 'optgroup') {
        const groupLabel = (child as HTMLOptGroupElement).label;
        const groupOptions = Array.from(child.querySelectorAll('option'));

        groupOptions.forEach(opt => {
          newOptions.push({
            label: opt.textContent || '',
            value: opt.value,
            group: groupLabel,
            disabled: opt.disabled
          });
          
          if (opt.hasAttribute('selected')) {
            initialSelectedValues.push(opt.value);
          }
        });
      }
      // Handle direct <option>
      else if (child.tagName.toLowerCase() === 'option') {
        const opt = child as HTMLOptionElement;
        newOptions.push({
          label: opt.textContent || '',
          value: opt.value,
          disabled: opt.disabled
        });
        
        if (opt.hasAttribute('selected')) {
          initialSelectedValues.push(opt.value);
        }
      }
    });

    this._renderedOptions = newOptions;

    // Only set initial value from attributes if no value is currently present
    if (initialSelectedValues.length > 0 && this.value?.length === 0) {
      this.value = initialSelectedValues;
    }
  }

  render() {
    return html`
      <div class="input-wrapper">
        ${this.label ? html`<label for="${this.inputId}">${this.label}</label>` : ''}
        <slot style="display: none;" @slotchange="${this.syncOptions}"></slot>
        <select
          id="${this.inputId}"
          multiple
          ?disabled="${this.disabled}"
          ?required="${this.required}"
          @change="${this.handleChange}"
          part="select"
        >
          ${this._renderOptionsWithGroups()}
        </select>
        <div class="error" part="error">${this.errorMessage}</div>
        <div class="help-text">Hold Ctrl/Cmd to select multiple</div>
      </div>
    `;
  }

  private _renderOptionsWithGroups() {
    const hasGroups = this._renderedOptions.some(o => o.group);

    if (!hasGroups) {
      return this._renderedOptions.map(opt => html`
        <option 
          value="${opt.value}" 
          ?selected="${this.value?.includes(opt.value)}"
          ?disabled="${opt.disabled}"
        >
          ${opt.label}
        </option>
      `);
    }

    const groups: Record<string, SelectOption[]> = {};
    const orphans: SelectOption[] = [];

    this._renderedOptions.forEach(opt => {
      if (opt.group) {
        if (!groups[opt.group]) groups[opt.group] = [];
        groups[opt.group].push(opt);
      } else {
        orphans.push(opt);
      }
    });

    return html`
      ${orphans.map(opt => html`
        <option 
          value="${opt.value}" 
          ?selected="${this.value?.includes(opt.value)}"
          ?disabled="${opt.disabled}"
        >
          ${opt.label}
        </option>
      `)}
      ${Object.entries(groups).map(([groupName, opts]) => html`
        <optgroup label="${groupName}">
          ${opts.map(opt => html`
            <option 
              value="${opt.value}" 
              ?selected="${this.value?.includes(opt.value)}"
              ?disabled="${opt.disabled}"
            >
              ${opt.label}
            </option>
          `)}
        </optgroup>
      `)}
    `;
  }

  static styles = [
    BaseInput.styles,
    css`
      select[multiple] {
        height: auto;
        min-height: 100px;
        background-image: none;
        padding: 0.5rem;
      }
      .help-text {
        font-size: ${Var.font.size.small};
        color: ${Var.color.text.secondary};
        margin-top: -0.25rem;
      }
    `
  ];
}

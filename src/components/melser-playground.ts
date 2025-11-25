import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('melser-playground')
export class MelserPlayground extends LitElement {
  static styles = css`
    :host {
      display: block;
      margin: 1.5rem 0;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      overflow: hidden;
      background: white;
    }

    .playground-header {
      background: #f9fafb;
      border-bottom: 1px solid #e5e7eb;
      padding: 0.75rem 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .playground-title {
      font-weight: 600;
      color: #374151;
      margin: 0;
      font-size: 0.875rem;
    }

    .playground-tabs {
      display: flex;
      gap: 0.5rem;
    }

    .tab-button {
      padding: 0.25rem 0.75rem;
      border: 1px solid #d1d5db;
      background: white;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.75rem;
      transition: all 0.2s;
    }

    .tab-button:hover {
      background: #f3f4f6;
    }

    .tab-button.active {
      background: #3b82f6;
      color: white;
      border-color: #3b82f6;
    }

    .playground-content {
      padding: 1.5rem;
    }

    .demo-area {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      min-height: 100px;
    }

    .code-section {
      border-top: 1px solid #e5e7eb;
      background: #f9fafb;
    }

    .code-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 1rem;
      border-bottom: 1px solid #e5e7eb;
    }

    .code-title {
      font-size: 0.875rem;
      font-weight: 500;
      color: #6b7280;
    }

    .copy-button {
      padding: 0.25rem 0.75rem;
      background: #374151;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.75rem;
      transition: background 0.2s;
    }

    .copy-button:hover {
      background: #1f2937;
    }

    .copy-button.copied {
      background: #10b981;
    }

    .code-content {
      padding: 1rem;
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      font-size: 0.875rem;
      line-height: 1.5;
      overflow-x: auto;
      background: white;
      color: #374151;
    }

    .code-content pre {
      margin: 0;
      white-space: pre-wrap;
    }

    .hidden {
      display: none;
    }
  `;

  @property({ type: String })
  title = 'Demo Interactiva';

  @property({ type: Array })
  examples: Array<{
    name: string;
    code: string;
    demo: string;
  }> = [];

  @property({ type: Number })
  activeExample = 0;

  private copyCode(code: string) {
    navigator.clipboard.writeText(code).then(() => {
      const button = this.shadowRoot?.querySelector('.copy-button') as HTMLButtonElement;
      if (button) {
        button.textContent = '¡Copiado!';
        button.classList.add('copied');
        setTimeout(() => {
          button.textContent = 'Copiar';
          button.classList.remove('copied');
        }, 2000);
      }
    });
  }

  private setActiveExample(index: number) {
    this.activeExample = index;
  }

  private renderDemo() {
    if (this.examples.length === 0) return html`<div>No hay ejemplos disponibles</div>`;
    
    const currentExample = this.examples[this.activeExample];
    return html`${currentExample.demo}`;
  }

  private renderCode() {
    if (this.examples.length === 0) return html`<div>No hay código disponible</div>`;
    
    const currentExample = this.examples[this.activeExample];
    return html`<pre><code>${currentExample.code}</code></pre>`;
  }

  private showCode = false;

  private toggleCode() {
    this.showCode = !this.showCode;
    this.requestUpdate();
  }

  render() {
    return html`
      <div class="playground">
        <div class="playground-header">
          <h3 class="playground-title">${this.title}</h3>
          ${this.examples.length > 1 ? html`
            <div class="playground-tabs">
              ${this.examples.map((example, index) => html`
                <button 
                  class="tab-button ${index === this.activeExample ? 'active' : ''}"
                  @click=${() => this.setActiveExample(index)}
                >
                  ${example.name}
                </button>
              `)}
            </div>
          ` : ''}
        </div>
        
        <div class="playground-content">
          <div class="demo-area">
            ${this.renderDemo()}
          </div>
        </div>

        <div class="code-section">
          <div class="code-header">
            <span class="code-title">Código</span>
            <div style="display: flex; gap: 0.5rem;">
              <button class="copy-button" @click=${() => this.copyCode(this.examples[this.activeExample]?.code || '')}>
                Copiar
              </button>
            </div>
          </div>
          <div class="code-content">
            ${this.renderCode()}
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'melser-playground': MelserPlayground;
  }
}

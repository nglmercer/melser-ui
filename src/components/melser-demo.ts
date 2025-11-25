import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('melser-demo')
export class MelserDemo extends LitElement {
  static styles = css`
    :host {
      display: block;
      margin: 1.5rem 0;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      overflow: hidden;
      background: white;
    }

    .demo-header {
      background: #f9fafb;
      border-bottom: 1px solid #e5e7eb;
      padding: 0.75rem 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .demo-title {
      font-weight: 600;
      color: #374151;
      margin: 0;
      font-size: 0.875rem;
    }

    .demo-content {
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
  `;

  @property({ type: String })
  title = 'Demo';

  @property({ type: String })
  code = '';

  @property({ type: Boolean })
  showCode = true;

  private copyCode() {
    navigator.clipboard.writeText(this.code).then(() => {
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

  render() {
    return html`
      <div class="demo">
        <div class="demo-header">
          <h3 class="demo-title">${this.title}</h3>
        </div>
        
        <div class="demo-content">
          <div class="demo-area">
            <slot></slot>
          </div>
        </div>

        ${this.showCode && this.code ? html`
          <div class="code-section">
            <div class="code-header">
              <span class="code-title">Código</span>
              <button class="copy-button" @click=${this.copyCode}>
                Copiar
              </button>
            </div>
            <div class="code-content">
              <pre><code>${this.code}</code></pre>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'melser-demo': MelserDemo;
  }
}

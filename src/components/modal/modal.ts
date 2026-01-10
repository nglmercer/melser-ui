import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { query } from 'lit/decorators.js';
import './modal-base';
import './modal-content';

@customElement('me-modal')
export class MelserModal extends LitElement {
  // Properties
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String, reflect: true }) size: 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'md';
  @property({ type: Boolean, reflect: true }) closeOnBackdropClick = true;
  @property({ type: Boolean, reflect: true }) closeOnEscape = true;
  @property({ type: Boolean, reflect: true }) showCloseButton = true;
  @property({ type: Boolean, reflect: true }) trapFocus = true;
  @property({ type: Boolean, reflect: true }) showBackdrop = true;
  @property({ type: Boolean, reflect: true }) centered = true;
  @property({ type: String, reflect: false }) ariaLabel: string | null = null;
  @property({ type: String, reflect: false }) ariaDescribedby: string | null = null;
  @property({ type: String, reflect: false }) containerClass?: string;

  // Query elements
  @query('.backdrop') private _backdropElement?: HTMLElement;
  @query('.modal-wrapper') private _modalWrapper?: HTMLElement;

  // State for focus management
  @state() private _previousActiveElement: HTMLElement | null = null;
  @state() private _focusableElements: HTMLElement[] = [];
  @state() private _firstFocusableElement: HTMLElement | null = null;
  @state() private _lastFocusableElement: HTMLElement | null = null;

  // Update callback
  willUpdate(changedProperties: Map<string, any>) {
    if (changedProperties.has('open')) {
      if (this.open) {
        this._handleOpen();
      } else {
        this._handleClose();
      }
    }
  }

  private _handleOpen() {
    // Store the currently focused element
    this._previousActiveElement = document.activeElement as HTMLElement;

    // Dispatch open event
    this.dispatchEvent(new CustomEvent('open', {
      bubbles: true,
      composed: true,
      detail: { modal: this }
    }));

    // Set up focus trap after render
    requestAnimationFrame(() => {
      this._setupFocusTrap();
    });
  }

  private _handleClose() {
    // Dispatch close event
    this.dispatchEvent(new CustomEvent('close', {
      bubbles: true,
      composed: true,
      detail: { modal: this }
    }));

    // Restore focus to previously focused element
    if (this._previousActiveElement) {
      requestAnimationFrame(() => {
        this._previousActiveElement?.focus();
      });
    }

    this._previousActiveElement = null;
  }

  private _handleBeforeClose(e: CustomEvent) {
    const beforeCloseEvent = new CustomEvent('before-close', {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail: { modal: this }
    });

    this.dispatchEvent(beforeCloseEvent);

    if (beforeCloseEvent.defaultPrevented) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  private _setupFocusTrap() {
    if (!this.trapFocus || !this._modalWrapper) return;

    // Get all focusable elements within the modal
    const focusableSelectors = [
      'button:not([disabled])',
      '[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ].join(', ');

    this._focusableElements = Array.from(
      this._modalWrapper.querySelectorAll<HTMLElement>(focusableSelectors)
    );

    if (this._focusableElements.length === 0) return;

    this._firstFocusableElement = this._focusableElements[0];
    this._lastFocusableElement = this._focusableElements[this._focusableElements.length - 1];

    // Focus first element
    this._firstFocusableElement.focus();

    // Add keyboard listener for focus trap
    this.addEventListener('keydown', this._handleFocusTrapKeydown);
  }

  private _removeFocusTrap() {
    this.removeEventListener('keydown', this._handleFocusTrapKeydown);
    this._focusableElements = [];
    this._firstFocusableElement = null;
    this._lastFocusableElement = null;
  }

  private _handleFocusTrapKeydown = (e: KeyboardEvent) => {
    if (!this.trapFocus || !this.open) return;

    if (e.key === 'Tab') {
      if (e.shiftKey) {
        // Shift+Tab - focus last element
        if (document.activeElement === this._firstFocusableElement) {
          e.preventDefault();
          this._lastFocusableElement?.focus();
        }
      } else {
        // Tab - focus first element
        if (document.activeElement === this._lastFocusableElement) {
          e.preventDefault();
          this._firstFocusableElement?.focus();
        }
      }
    }
  }

  private _handleKeyDown = (e: KeyboardEvent) => {
    if (!this.open) return;

    // Handle Escape key
    if (e.key === 'Escape' && this.closeOnEscape) {
      e.preventDefault();
      this.close();
    }
  }

  // Public methods
  public openModal() {
    this.open = true;
  }

  public close() {
    const beforeCloseEvent = new CustomEvent('before-close', {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail: { modal: this }
    });

    this.dispatchEvent(beforeCloseEvent);

    if (!beforeCloseEvent.defaultPrevented) {
      this.open = false;
    }
  }

  public toggle() {
    if (this.open) {
      this.close();
    } else {
      this.openModal();
    }
  }

  // Lifecycle
  disconnectedCallback() {
    super.disconnectedCallback();
    this._removeFocusTrap();
    window.removeEventListener('keydown', this._handleKeyDown);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('keydown', this._handleKeyDown);
  }

  render() {
    const containerClasses = ['modal-container'];
    if (this.containerClass) {
      containerClasses.push(this.containerClass);
    }

    return html`
      <div class="${containerClasses.join(' ')}">
        <modal-base 
          .open="${this.open}" 
          .closeOnBackdropClick="${this.closeOnBackdropClick}"
          .showBackdrop="${this.showBackdrop}"
          .centered="${this.centered}"
          .ariaLabel="${this.ariaLabel}"
          .ariaDescribedby="${this.ariaDescribedby}"
          @close="${this._handleClose}"
        >
          <modal-content 
            .size="${this.size}" 
            .showCloseButton="${this.showCloseButton}"
            @close="${this.close}"
          >
            <slot name="header">
              <h2 slot="title"><slot name="title">Default Title</slot></h2>
            </slot>
            <slot></slot>
            <div slot="actions"><slot name="actions"></slot></div>
          </modal-content>
        </modal-base>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
    .modal-container {
      display: contents;
    }
  `;
}

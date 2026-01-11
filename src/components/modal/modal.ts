import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { query } from 'lit/decorators.js';
import './modal-base';

@customElement('me-modal')
export class MelserModal extends LitElement {
  // Properties
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: Boolean, reflect: true }) ManualClose: boolean | string = false;
  @property({ type: Boolean, reflect: true }) closeOnEscape: boolean | string = true;
  @property({ type: Boolean, reflect: true }) trapFocus: boolean | string = true;
  @property({ type: Boolean, reflect: true }) BackdropHidden: boolean | string = false;
  @property({ type: Boolean, reflect: true }) centered: boolean | string = true;
  @property({ type: String, reflect: false }) ariaLabel: string | null = null;
  @property({ type: String, reflect: false }) ariaDescribedby: string | null = null;
  @property({ type: String, reflect: false }) containerClass?: string;

  // Query elements
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
      this._setupCloseButtons();
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

  private _setupCloseButtons() {
    // Find all elements with 'x' attribute within the modal
    if (!this._modalWrapper) return;

    const closeButtons = this._modalWrapper.querySelectorAll<HTMLElement>('[x]');

    // Remove existing listeners (cleanup)
    closeButtons.forEach(btn => {
      // Clone and replace to remove old listeners
      const newBtn = btn.cloneNode(true) as HTMLElement;
      btn.parentNode?.replaceChild(newBtn, btn);
    });

    // Add new listeners to the fresh elements
    const freshCloseButtons = this._modalWrapper.querySelectorAll<HTMLElement>('[x]');
    freshCloseButtons.forEach(btn => {
      btn.addEventListener('click', () => this.close());
    });
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
      // _handleClose will be called by willUpdate when open changes
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
    requestAnimationFrame(() => {
      console.log({
        BackdropHidden: this.BackdropHidden,
        trapFocus: this.trapFocus,
        closeOnEscape: this.closeOnEscape,
        ManualClose: this.ManualClose,
        centered: this.centered
      });
    });
  }

  render() {

    return html`
      <modal-base
        .open="${this.open}"
        .ManualClose="${this.ManualClose}"
        .BackdropHidden="${this.BackdropHidden}"
        .centered="${this.centered}"
        .ariaLabel="${this.ariaLabel}"
        .ariaDescribedby="${this.ariaDescribedby}"
        @close="${() => this.close()}"
      >
        <slot></slot>
      </modal-base>
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

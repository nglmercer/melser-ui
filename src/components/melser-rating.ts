import { html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { MelserBaseInput, InputVar } from '../core/base-input';
import type { MelserDataType } from '../types/index';

// Simple star SVG path
const STAR_PATH = "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z";

@customElement('me-rating')
export class MelserRating extends MelserBaseInput<number> {
    @property({ type: Number }) value = 0;
    @property({ type: Number }) max = 5;
    @property({ type: Number }) min = 0;
    @property({ type: Boolean }) readonly = false;

    /** * Granularity of selection. 
     * 1 = integers only (1, 2, 3)
     * 0.5 = half stars (1.5, 2.5)
     * 0.1 = precise (4.1, 4.2)
     */
    @property({ type: Number }) precision = 1;

    @state() private _hoverValue: number | null = null;

    readonly dataType: MelserDataType = 'number';
    @query('.rating-container') ratingContainer!: HTMLElement;

    get inputElement(): HTMLInputElement | null {
        // We don't have a real input, but we can return null or shim it interactions if needed.
        // For focus delegation we override focus().
        return null;
    }

    override focus(options?: FocusOptions) {
        this.ratingContainer?.focus(options);
    }

    private _handleKeyDown(e: KeyboardEvent) {
        if (this.disabled) return;

        let newValue = this.value;
        const step = this.precision;

        switch (e.key) {
            case 'ArrowRight':
            case 'ArrowUp':
                newValue = Math.min(this.max, this.value + step);
                e.preventDefault();
                break;
            case 'ArrowLeft':
            case 'ArrowDown':
                newValue = Math.max(this.min, this.value - step);
                e.preventDefault();
                break;
            case 'Home':
                newValue = this.min;
                e.preventDefault();
                break;
            case 'End':
                newValue = this.max;
                e.preventDefault();
                break;
            default:
                return;
        }

        // Fix floating point errors
        newValue = parseFloat(newValue.toFixed(2));
        
        if (newValue !== this.value) {
            this.value = newValue;
            this.dispatchChange();
        }
    }

    /**
     * Calculates the width percentage for the "filled" version of a specific star.
     */
    private _calculateFillWidth(starIndex: number, currentDisplayValue: number): number {
        // Example: If value is 4.5
        // Star 4 (index 4): (4.5 - 3) * 100 = 150% -> clamped to 100%
        // Star 5 (index 5): (4.5 - 4) * 100 = 50%
        const fill = Math.max(0, Math.min(100, (currentDisplayValue - (starIndex - 1)) * 100));
        return parseFloat(fill.toFixed(1));
    }

    private _handleMouseMove(e: MouseEvent, index: number) {
        if (this.disabled || this.readonly) return;

        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const width = rect.width;

        // Calculate raw value based on mouse position within the star
        // e.g., Hovering 50% of 4th star = 3 + 0.5 = 3.5
        const percent = Math.min(1, Math.max(0, x / width));
        const rawValue = (index - 1) + percent;

        // Ensure precision is safe
        const safePrecision = Math.max(0.01, this.precision);

        // Snap to precision
        let snappedValue = Math.ceil(rawValue / safePrecision) * safePrecision;

        // Ensure bounds
        snappedValue = Math.min(this.max, Math.max(this.min, snappedValue));

        // Fix JS floating point errors (e.g. 4.100000002)
        this._hoverValue = parseFloat(snappedValue.toFixed(2));
    }

    private _handleMouseLeave() {
        if (this.disabled || this.readonly) return;
        this._hoverValue = null;
    }

    private _handleClick() {
        if (this.disabled || this.readonly || this._hoverValue === null) return;
        this.value = this._hoverValue;
        this.dispatchChange();
    }

    render() {
        // What value to show? (Hover takes precedence over actual value)
        const displayValue = this._hoverValue !== null ? this._hoverValue : (Number(this.value) || 0);

        return html`
            <div class="input-wrapper">
                ${this.label ? html`<label id="rating-label">${this.label}</label>` : ''}

                <div
                    class="rating-container"
                    @mouseleave="${this._handleMouseLeave}"
                    @keydown="${this._handleKeyDown}"
                    tabindex="${(this.disabled || this.readonly) ? -1 : 0}"
                    role="slider"
                    aria-valuemin="${this.min}"
                    aria-valuemax="${this.max}"
                    aria-valuenow="${displayValue}"
                    aria-disabled="${this.disabled}"
                    aria-readonly="${this.readonly}"
                    aria-labelledby="rating-label"
                >
                    ${Array.from({ length: this.max }, (_, i) => i + 1).map(i => html`
                        <div
                            class="star-box"
                            @mousemove="${(e: MouseEvent) => this._handleMouseMove(e, i)}"
                            @click="${this._handleClick}"
                        >
                            <svg class="star-svg empty" viewBox="0 0 24 24">
                                <path d="${STAR_PATH}"/>
                            </svg>

                            <div class="star-mask" style="width: ${this._calculateFillWidth(i, displayValue)}%">
                                <svg class="star-svg filled" viewBox="0 0 24 24">
                                    <path d="${STAR_PATH}"/>
                                </svg>
                            </div>
                        </div>
                    `)}
                </div>

                <div class="error" part="error">${this.errorMessage}</div>
            </div>
        `;
    }

    static styles = [
        MelserBaseInput.styles,
        css`
            :host {
                --star-size: 1.5rem;
                --star-color-empty: ${InputVar['border-color']};
                --star-color-filled: #fbbf24;
            }

            .rating-container {
                display: flex;
                gap: 0.25rem;
                align-items: center;
                outline: none;
                border-radius: ${InputVar.radius};
                user-select: none; /* Prevent text selection during rapid clicking */
            }

            .rating-container:focus-visible {
                outline: ${InputVar['focus-ring-width']} solid ${InputVar['focus-ring-color']};
                outline-offset: 2px;
            }

            .star-box {
                position: relative;
                width: var(--star-size);
                height: var(--star-size);
                cursor: pointer;
                /* Removes highlighting on mobile tap */
                -webkit-tap-highlight-color: transparent;
                flex-shrink: 0;
            }

            .star-svg {
                width: 100%;
                height: 100%;
                display: block;
            }

            .empty {
                fill: var(--star-color-empty);
            }

            .star-mask {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                overflow: hidden; /* This cuts the star */
                pointer-events: none; /* Let mouse clicks pass through to .star-box */
                transition: width 0.1s linear;
                will-change: width; /* Optimization for animation */
            }

            .filled {
                fill: var(--star-color-filled);
                /* Important: Force svg to be full size inside the mask */
                width: var(--star-size);
                height: var(--star-size);
            }

            /* Hover Animation for the whole star box */
            .star-box:hover {
                transform: scale(1.1);
                transition: transform 0.1s;
            }

            /* Disabled/Readonly State */
            :host([disabled]) .rating-container {
                opacity: 0.6;
                pointer-events: none;
            }

            :host([disabled]) .star-box {
                cursor: not-allowed;
            }

            :host([readonly]) .rating-container {
                opacity: 1; /* Readonly is visible but not interactive */
                pointer-events: none;
            }

            :host([readonly]) .star-box {
                cursor: default;
            }
        `
    ];
}
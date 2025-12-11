import { LitElement } from 'lit';

type Constructor<T = {}> = new (...args: any[]) => T;

export const DynamicStyleMixin = <T extends Constructor<LitElement>>(superClass: T) => {
    return class extends superClass {
        /**
         * Dynamically appends a stylesheet to the component instance.
         * Uses constructable stylesheets for performance.
         */
        addDynamicStyles(cssText: string) {
            if (!('adoptedStyleSheets' in (this as any).shadowRoot)) {
                // Fallback for older environments if needed, though Lit usually handles this.
                // For strictly standard compliance with Constructable Stylesheets:
                return;
            }

            const sheet = new CSSStyleSheet();
            sheet.replaceSync(cssText);

            const shadow = (this as any).shadowRoot;
            if (shadow) {
                shadow.adoptedStyleSheets = [...shadow.adoptedStyleSheets, sheet];
            }
        }
    };
};

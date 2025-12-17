import { LitElement } from 'lit';

type Constructor<T = {}> = new (...args: any[]) => T;

export declare class DynamicStyleMixinInterface {
    addDynamicStyles(cssText: string): void;
}

export const DynamicStyleMixin = <T extends Constructor<LitElement>>(superClass: T) => {
    class DynamicStyleClass extends superClass {
        /**
         * Dynamically appends a stylesheet to the component instance.
         * Uses constructable stylesheets for performance.
         */
        addDynamicStyles(cssText: string) {
            const shadow = this.shadowRoot;
            if (!shadow || !('adoptedStyleSheets' in shadow)) {
                // Fallback for older environments if needed, though Lit usually handles this.
                // For strictly standard compliance with Constructable Stylesheets:
                return;
            }

            const sheet = new CSSStyleSheet();
            sheet.replaceSync(cssText);

            if (shadow) {
                shadow.adoptedStyleSheets = [...shadow.adoptedStyleSheets, sheet];
            }
        }
    }
    return DynamicStyleClass as T & Constructor<DynamicStyleMixinInterface>;
};

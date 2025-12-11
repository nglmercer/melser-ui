import type { ReactiveController, ReactiveControllerHost } from 'lit';
import { z } from 'zod';

export type FormErrors<T> = Partial<Record<keyof T, string>>;

export class ZodFormController<T extends z.ZodSchema> implements ReactiveController {
    host: ReactiveControllerHost;
    schema: T;

    // The current form data
    data: z.infer<T>;

    // Validation errors map
    errors: FormErrors<z.infer<T>> = {};

    // Is the form valid? (Updated on validation)
    isValid: boolean = true;

    constructor(host: ReactiveControllerHost, schema: T, initialData: z.infer<T>) {
        this.host = host;
        this.schema = schema;
        this.data = initialData;
        host.addController(this);
    }

    hostConnected() {
        // Optional: Validate on mount? Usually not.
    }

    hostDisconnected() {
        // Cleanup if necessary
    }

    /**
     * Update a field value and optionally validate it immediately.
     */
    setValue<K extends keyof z.infer<T>>(key: K, value: z.infer<T>[K], shouldValidate = false) {
        this.data[key] = value;

        if (shouldValidate) {
            this.validateField(key);
        }

        this.host.requestUpdate();
    }

    /**
     * Generic handler for input events.
     * Usage: @input=${(e) => this.form.handleChange('email', e)}
     */
    handleChange(key: keyof z.infer<T>, event: Event) {
        const target = event.target as HTMLInputElement;
        let value: any = target.value;

        // Auto-convert numbers if the default input type is number
        // or you can check the schema type (advanced)
        if (target.type === 'number') {
            value = target.value === '' ? undefined : Number(target.value);
        } else if (target.type === 'checkbox') {
            value = target.checked;
        }

        this.setValue(key, value, true); // Validate on change by default? Or wait for blur?
    }

    /**
     * Validate a single field against the schema.
     */
    validateField(key: keyof z.infer<T>) {
        // Create a partial schema for just this key to validate it in isolation
        // Ideally, we validate the whole object and extract the error for this key
        // so that refinements (cross-field) work, but for simple fields:

        const result = this.schema.safeParse(this.data);

        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;
            // @ts-ignore
            this.errors[key] = fieldErrors[key as string]?.[0] || undefined;
        } else {
            // If success, current field is valid (though others might not be)
            // But we need to be careful not to clear errors for other fields if we only care about this one.
            // A simple approach: Validate ALL, but only touch the error for THIS key?
            // Or just clear this key's error.
            delete this.errors[key];
        }
        this.host.requestUpdate();
    }

    /**
     * Validate the entire form.
     * Returns true if valid.
     */
    validate(): boolean {
        const result = this.schema.safeParse(this.data);

        if (!result.success) {
            const formatted = result.error.flatten().fieldErrors;
            // Convert array of strings to single string per field
            const newErrors: any = {};
            for (const key in formatted) {
                if (formatted[key]) {
                    newErrors[key] = formatted[key]![0];
                }
            }
            this.errors = newErrors;
            this.isValid = false;
        } else {
            this.errors = {};
            this.isValid = true;
            // Update data with the parsed/transformed data from Zod
            this.data = result.data;
        }

        this.host.requestUpdate();
        return this.isValid;
    }

    /**
     * Helper to get invalid/valid state for UI classes
     */
    hasError(key: keyof z.infer<T>): boolean {
        return !!this.errors[key];
    }

    getError(key: keyof z.infer<T>): string | undefined {
        return this.errors[key];
    }
}

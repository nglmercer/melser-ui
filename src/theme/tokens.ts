import { createTokenAccessors, flattenTokens } from './token-utils';

export const tokens = {
    // Tier 1: Core Palette
    palette: {
        neutral: {
            0: '#ffffff',
            50: '#f9fafb',
            100: '#f5f5f5',
            200: '#e5e7eb',
            300: '#d1d5db',
            400: '#9ca3af',
            500: '#6b7280',
            600: '#4b5563',
            700: '#374151',
            800: '#1f2937',
            900: '#111827',
        },
        blue: {
            50: '#eff6ff',
            100: '#dbeafe',
            500: '#3B82F6',
            600: '#2563EB',
            700: '#005fcc', // Melser Primary?
        },
        red: {
            600: '#d32f2f', // Error
        }
    },

    // Tier 2: Semantic / System (Defaulting to Light)
    color: {
        primary: { $value: '{palette.blue.700}' },
        primaryLighter: { $value: '{palette.blue.50}' },
        error: { $value: '{palette.red.600}' },

        bg: {
            default: { $value: '{palette.neutral.0}' },
            hover: { $value: '{palette.neutral.50}' },
            disabled: { $value: '{palette.neutral.100}' },
        },

        surface: {
            primary: { $value: '{palette.neutral.0}' },
            variant: { $value: '{palette.neutral.100}' },
        },

        text: {
            primary: { $value: '#333333' },
            secondary: { $value: '#6b7280' },
            disabled: { $value: '#9ca3af' },
            placeholder: { $value: '#6b7280' },
            inverse: { $value: '{palette.neutral.0}' },
        },

        border: {
            default: { $value: '#cccccc' },
            hover: { $value: '#999999' },
            focus: { $value: '{color.primary}' },
            error: { $value: '{color.error}' },
            disabled: { $value: '{palette.neutral.200}' },
        },

        focusRing: { $value: '{color.primary}' },
    },

    spacing: {
        gap: {
            default: { $value: '0.75rem' },
            small: { $value: '0.5rem' },
            large: { $value: '1rem' },
        },
        padding: {
            input: {
                default: { $value: '0.75rem' },
                small: { $value: '0.4rem 0.5rem' },
                medium: { $value: '0.75rem' },
                large: { $value: '1rem 1.2rem' },
            }
        }
    },

    radius: {
        default: { $value: '4px' },
        pill: { $value: '9999px' },
    },

    font: {
        family: { $value: 'sans-serif' },
        weight: {
            regular: { $value: '400' },
            medium: { $value: '500' },
            bold: { $value: '600' },
        },
        size: {
            default: { $value: '1rem' },
            small: { $value: '0.85rem' },
            large: { $value: '1.25rem' },
            label: { $value: '0.9em' },
            error: { $value: '0.85em' },
        }
    },

    // Tier 3: Component Specific (Optional, or can be composed in component)
    input: {
        bg: { $value: '{color.bg.default}' },
        border: { $value: '{color.border.default}' },
        radius: { $value: '{radius.default}' },
    }
};

// Define explicit overrides for Dark Mode
export const schemes = {
    light: tokens, // Default
    dark: {
        ...tokens,
        color: {
            ...tokens.color,
            bg: {
                default: { $value: '{palette.neutral.900}' },
                hover: { $value: '{palette.neutral.800}' },
                disabled: { $value: '{palette.neutral.800}' },
            },
            surface: {
                primary: { $value: '{palette.neutral.900}' },
                variant: { $value: '{palette.neutral.800}' },
            },
            text: {
                primary: { $value: '{palette.neutral.50}' },
                secondary: { $value: '{palette.neutral.400}' },
                disabled: { $value: '{palette.neutral.600}' },
                placeholder: { $value: '{palette.neutral.500}' },
                inverse: { $value: '{palette.neutral.900}' },
            },
            border: {
                default: { $value: '{palette.neutral.700}' },
                hover: { $value: '{palette.neutral.500}' },
                focus: { $value: '{color.primary}' }, // Keep primary
                error: { $value: '{color.error}' },
                disabled: { $value: '{palette.neutral.700}' },
            }
        }
    }
};

// Export the generated Accessor Object
export const Var = createTokenAccessors(tokens, 'melser');
export const flattenedTokens = flattenTokens(tokens, 'melser');

// Automatically inject tokens into the document root
import { ThemeManager } from './theme-manager';
if (typeof window !== 'undefined') {
    ThemeManager.setVariables(flattenedTokens);
}

// Allow switching themes at runtime
export function setTheme(mode: 'light' | 'dark') {
    const scheme = schemes[mode];
    if (scheme) {
        const flattened = flattenTokens(scheme, 'melser');
        ThemeManager.setVariables(flattened);
    } else {
        console.warn(`[Melser UI] Theme '${mode}' not found.`);
    }
}

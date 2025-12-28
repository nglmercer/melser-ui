/**
 * SvgIconRegistry - Central registry for SVG icons
 * Allows registration and reuse of SVG icons across components
 */

import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export type IconName = string;
export type IconRenderer = (props?: Record<string, string | number | boolean>) => ReturnType<typeof unsafeHTML>;

interface RegistryEntry {
  svg: string;
}

export class SvgIconRegistry {
  private static instance: SvgIconRegistry;
  private icons: Map<IconName, RegistryEntry> = new Map();

  private constructor() {}

  static getInstance(): SvgIconRegistry {
    if (!this.instance) {
      this.instance = new SvgIconRegistry();
    }
    return this.instance;
  }

  /**
   * Register an SVG icon
   * @param name - Unique identifier for the icon
   * @param svg - Raw SVG string (without <svg> wrapper or with it)
   */
  register(name: IconName, svg: string): void {
    // Clean and normalize SVG - ensure it has proper attributes
    const normalizedSvg = this.normalizeSvg(svg);
    this.icons.set(name, { svg: normalizedSvg });
  }

  /**
   * Register multiple icons at once
   */
  registerBatch(icons: Record<IconName, string>): void {
    Object.entries(icons).forEach(([name, svg]) => {
      this.register(name, svg);
    });
  }

  /**
   * Get an SVG icon by name
   */
  get(name: IconName): RegistryEntry | undefined {
    return this.icons.get(name);
  }

  /**
   * Check if an icon is registered
   */
  has(name: IconName): boolean {
    return this.icons.has(name);
  }

  /**
   * Get all registered icon names
   */
  getIconNames(): IconName[] {
    return Array.from(this.icons.keys());
  }

  /**
   * Remove an icon from registry
   */
  unregister(name: IconName): boolean {
    return this.icons.delete(name);
  }

  /**
   * Clear all icons from registry
   */
  clear(): void {
    this.icons.clear();
  }

  /**
   * Render an icon with custom properties
   * @param name - Icon name
   * @param props - Additional SVG attributes
   */
  render(name: IconName, props?: Record<string, string | number | boolean>) {
    const entry = this.icons.get(name);
    
    if (!entry) {
      // Return a placeholder if icon not found
      return unsafeHTML(this.createPlaceholder(name, props));
    }

    // Apply custom properties to the SVG
    const modifiedSvg = this.applyProps(entry.svg, props);
    return unsafeHTML(modifiedSvg);
  }

  /**
   * Normalize SVG string to ensure consistent format
   */
  private normalizeSvg(svg: string): string {
    // Remove surrounding whitespace
    let normalized = svg.trim();

    // Check if SVG tag already exists
    if (!normalized.startsWith('<svg')) {
      // Wrap content in SVG tag if not present
      normalized = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${normalized}</svg>`;
    }

    // Ensure SVG has required attributes
    if (!normalized.includes('viewBox')) {
      normalized = normalized.replace('<svg', '<svg viewBox="0 0 24 24"');
    }

    return normalized;
  }

  /**
   * Apply custom properties to SVG
   */
  private applyProps(svg: string, props?: Record<string, string | number | boolean>): string {
    if (!props) return svg;

    let modified = svg;

    Object.entries(props).forEach(([key, value]) => {
      // Skip style and class attributes - they should be handled via CSS
      if (key === 'style' || key === 'class') return;

      // Convert camelCase to kebab-case for attributes
      const attrName = key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
      const attrValue = String(value);

      // Check if attribute already exists
      const attrRegex = new RegExp(`\\s${attrName}=["']([^"']*)["']`);
      const existingMatch = modified.match(attrRegex);

      if (existingMatch) {
        // Update existing attribute
        modified = modified.replace(attrRegex, ` ${attrName}="${attrValue}"`);
      } else {
        // Add new attribute after <svg tag
        modified = modified.replace('<svg', `<svg ${attrName}="${attrValue}"`);
      }
    });

    return modified;
  }

  /**
   * Create a placeholder for missing icons
   */
  private createPlaceholder(_name: string, props?: Record<string, string | number | boolean>): string {
    const size = props?.size || '24';
    return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="2" y="2" width="20" height="20" rx="2" />
      <text x="12" y="14" text-anchor="middle" font-size="8" fill="currentColor" stroke="none">?</text>
    </svg>`;
  }
}

// Export singleton instance
export const svgIconRegistry = SvgIconRegistry.getInstance();

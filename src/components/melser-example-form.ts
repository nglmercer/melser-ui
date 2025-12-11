import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { z } from 'zod';
import { Var } from '../theme/tokens';
import './melser-playground-form'; // Import the playground
// Import components used in the example
import './base-input';
import './melser-number-input';
import './melser-checkbox';

// Define Schema
const userSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  age: z.number().min(18, "You must be at least 18 years old").max(100, "Age limit is 100"),
  email: z.string().email("Invalid email address"),
  terms: z.boolean().refine(val => val === true, "You must accept the terms"),
});

const initialData = {
  username: '',
  age: 0,
  email: '',
  terms: false
};

@customElement('melser-example-form')
export class MelserExampleForm extends LitElement {

  render() {
    return html`
      <div class="wrapper">
        <melser-playground-form 
            .schema=${userSchema} 
            .defaultData=${initialData}
            title="Registration Form Example"
            description="This example uses the <melser-playground-form> wrapper to automatically handle Zod validation and state."
        >
            <!-- Declarative Inputs -->
            <base-input 
                name="username" 
                label="Username" 
                placeholder="Enter username" 
                required
            ></base-input>
            
            <melser-number-input 
                name="age" 
                label="Age" 
                placeholder="18"
                min="18" 
                max="100"
                required
            ></melser-number-input>
            
            <base-input 
                name="email" 
                label="Email" 
                type="email" 
                placeholder="john@example.com"
                required
            ></base-input>

            <melser-checkbox 
                name="terms" 
                label="I accept the terms and conditions"
            ></melser-checkbox>

            <!-- Optional: We can add an explicit submit button here if we want custom styling, 
                 or rely on the playground's 'Validate & Submit' button -->
            <div style="margin-top: 1rem; text-align: right;">
                <button type="submit" style="
                    background: ${Var.color.primary}; 
                    color: white; 
                    padding: 8px 16px; 
                    border: none; 
                    border-radius: 6px; 
                    cursor: pointer;"
                >
                    Custom Submit
                </button>
            </div>

        </melser-playground-form>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      font-family: ${Var.font.family};
    }
    .wrapper {
        max-width: 900px; /* Wider to accommodate side-by-side debug view */
        margin: 2rem auto;
    }
  `;
}

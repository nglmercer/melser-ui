import { LitElement, html, css } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { z } from 'zod';
import { ZodFormController } from '../utils/form-controller';

// Import component classes directly
import { MelserTextInput } from './base-input';
import { MelserNumberInput } from './melser-number-input';
import { MelserCheckbox } from './melser-checkbox';

// Define Schema
const userSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  age: z.number().min(18, "You must be at least 18 years old").max(100, "Age limit is 100"),
  email: z.string().email("Invalid email address"),
  terms: z.boolean().refine(val => val === true, "You must accept the terms"),
});

@customElement('melser-example-form')
export class MelserExampleForm extends LitElement {
  @query('#form-container') formContainer!: HTMLElement;

  // Initialize controller
  private form = new ZodFormController(this, userSchema, {
    username: '',
    age: 0,
    email: '',
    terms: false
  });

  // Store references to created specific inputs
  private inputs: Record<string, HTMLElement> = {};

  protected firstUpdated() {
    this.buildForm();
  }

  protected updated() {
    this.syncFormState();
  }

  buildForm() {
    if (!this.formContainer) return;
    this.formContainer.innerHTML = ''; // Clear container

    // --- 1. Username (MelserTextInput) ---
    // "Creating the element using the class directly"
    const usernameInput = new MelserTextInput();
    usernameInput.name = 'username';
    usernameInput.label = 'Username';
    usernameInput.required = true;
    usernameInput.placeholder = 'Enter your username';
    usernameInput.value = this.form.data.username;
    // Listen to custom event 'ui:change' from MelserBaseInput
    usernameInput.addEventListener('ui:change', (e: any) => {
      this.form.setValue('username', e.detail.value, true);
    });

    this.formContainer.appendChild(usernameInput);
    this.inputs['username'] = usernameInput;

    // --- 2. Age (MelserNumberInput) ---
    const ageInput = new MelserNumberInput();
    ageInput.name = 'age';
    ageInput.label = 'Age';
    ageInput.required = true;
    ageInput.value = this.form.data.age;
    ageInput.min = 18;
    ageInput.max = 100;
    ageInput.step = 1;

    ageInput.addEventListener('ui:change', (e: any) => {
      this.form.setValue('age', e.detail.value, true);
    });

    this.formContainer.appendChild(ageInput);
    this.inputs['age'] = ageInput;

    // --- 3. Email (MelserTextInput) ---
    const emailInput = new MelserTextInput();
    emailInput.name = 'email';
    emailInput.label = 'Email Address';
    emailInput.required = true;
    emailInput.type = 'email';
    emailInput.placeholder = 'john@example.com';
    emailInput.value = this.form.data.email;
    emailInput.addEventListener('ui:change', (e: any) => {
      this.form.setValue('email', e.detail.value, true);
    });

    this.formContainer.appendChild(emailInput);
    this.inputs['email'] = emailInput;

    // --- 4. Terms (MelserCheckbox) ---
    const termsInput = new MelserCheckbox();
    termsInput.name = 'terms';
    termsInput.label = 'I accept the terms and conditions';
    // Checkboxes usually use 'checked' or 'value' depending on implementation.
    // Looking at MelserCheckbox: @property({ type: Boolean }) value = false; 
    termsInput.value = this.form.data.terms;

    termsInput.addEventListener('ui:change', (e: any) => {
      this.form.setValue('terms', e.detail.value, true);
    });

    this.formContainer.appendChild(termsInput);
    this.inputs['terms'] = termsInput;


    // --- 5. Submit Button (Native) ---
    const submitContainer = document.createElement('div');
    submitContainer.style.marginTop = '1.5rem';

    const submitBtn = document.createElement('button');
    submitBtn.textContent = 'Submit Registration';
    submitBtn.className = 'submit-btn';
    submitBtn.onclick = (e) => this.handleSubmit(e);

    // Initial disabled state check (optional, but good UX)
    // Note: We might want valid logic to update this button's disabled state
    this.inputs['submit'] = submitBtn;

    submitContainer.appendChild(submitBtn);
    this.formContainer.appendChild(submitContainer);
  }

  /**
   * Syncs validation errors and external changes back to the imperative DOM elements.
   */
  syncFormState() {
    // Username
    const usernameInput = this.inputs['username'] as MelserTextInput;
    if (usernameInput) {
      usernameInput.errorMessage = this.form.getError('username') || '';
    }

    // Age
    const ageInput = this.inputs['age'] as MelserNumberInput;
    if (ageInput) {
      ageInput.errorMessage = this.form.getError('age') || '';
    }

    // Email
    const emailInput = this.inputs['email'] as MelserTextInput;
    if (emailInput) {
      emailInput.errorMessage = this.form.getError('email') || '';
    }

    // Terms
    const termsInput = this.inputs['terms'] as MelserCheckbox;
    if (termsInput) {
      termsInput.errorMessage = this.form.getError('terms') || '';
    }
  }

  handleSubmit(e: Event) {
    e.preventDefault();
    const isValid = this.form.validate();

    // Trigger updates to show errors
    this.requestUpdate();
    // requestUpdate calls updated() which calls syncFormState()

    if (isValid) {
      alert(`Form Submitted Successfully!\n${JSON.stringify(this.form.data, null, 2)}`);
    } else {
      console.log('Validation Errors:', this.form.errors);
    }
  }

  render() {
    return html`
            <div class="example-form-wrapper">
                <div class="header">
                    <h2>Programmatic Form Construction</h2>
                    <p class="subtitle">
                        This form creates elements using <code>new MelserComponent()</code> 
                        and appends them to the DOM manually.
                    </p>
                </div>
                
                <div id="form-container" class="form-container">
                    <!-- Elements injected by buildForm() -->
                </div>
            </div>
        `;
  }

  static styles = css`
    :host {
      display: block;
      font-family: 'Inter', system-ui, sans-serif;
    }

    .example-form-wrapper {
      max-width: 480px;
      margin: 2rem auto;
      padding: 2.5rem;
      border-radius: 16px;
      background: #ffffff;
      box-shadow: 
        0 4px 6px -1px rgba(0, 0, 0, 0.05),
        0 10px 15px -3px rgba(0, 0, 0, 0.05),
        0 0 0 1px rgba(0,0,0,0.05);
    }
    
    .header {
        margin-bottom: 2rem;
        text-align: center;
    }

    h2 { 
        margin: 0 0 0.5rem 0; 
        color: #111827; 
        font-size: 1.5rem;
        font-weight: 700;
        letter-spacing: -0.025em;
    }
    
    .subtitle { 
        margin: 0;
        color: #6b7280; 
        font-size: 0.875rem;
        line-height: 1.5;
    }

    code {
        background: #f3f4f6;
        padding: 0.2rem 0.4rem;
        border-radius: 4px;
        font-size: 0.8em;
        font-family: monospace;
    }

    .form-container {
      display: flex;
      flex-direction: column;
      /* gap handled by component margin-bottom usually, but we can enforce it */
      gap: 0.5rem; 
    }

    .submit-btn {
        width: 100%;
        padding: 0.75rem 1.5rem;
        background-color: #2563eb; /* Primary Blue */
        color: white;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.2s ease;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }
    
    .submit-btn:hover {
        background-color: #1d4ed8;
        transform: translateY(-1px);
        box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);
    }

    .submit-btn:active {
        transform: translateY(0);
    }
  `;
}

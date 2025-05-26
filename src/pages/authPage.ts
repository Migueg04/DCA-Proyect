export class AuthPage extends HTMLElement {
  private mode: 'login' | 'register' = 'login';

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.attachEvents();

    this.addEventListener('change-view', (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail === 'register') {
        this.switchMode('register');
      } else if (customEvent.detail === 'login') {
        this.switchMode('login');
      }
    });
  }

  switchMode(mode: 'login' | 'register') {
    this.mode = mode;
    this.render();
    this.attachEvents();
  }

  attachEvents() {
    this.shadowRoot?.querySelector('#login-tab')?.addEventListener('click', () => this.switchMode('login'));
    this.shadowRoot?.querySelector('#register-tab')?.addEventListener('click', () => this.switchMode('register'));
  }

  render() {
    this.shadowRoot!.innerHTML = `
      <style>
        .tabs { display: flex; gap: 10px; margin-bottom: 10px; }
        .tabs button { padding: 8px 16px; }

        
      </style>
      <div class="form-container">
        ${this.mode === 'login' ? '<login-form></login-form>' : '<register-form></register-form>'}
      </div>
    `;
  }
}
export default AuthPage
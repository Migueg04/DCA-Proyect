import { NavigateActions, UserActions } from "../../Flux/Actions";

class LogOutBtn extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    console.log("✅ LogOutBtn conectado"); // ← Confirmación en consola
    this.render();
    this.shadowRoot?.querySelector('button')?.addEventListener('click', this.handleLogout.bind(this));
  }

  disconnectedCallback() {
    this.shadowRoot?.querySelector('button')?.removeEventListener('click', this.handleLogout.bind(this));
  }

  handleLogout() {
    UserActions.logoutUser();
    NavigateActions.navigate('/auth');
  }

  render() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <style>
          button {
            padding: 8px 16px;
            font-size: 14px;
            background-color: #e74c3c;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s;
          }

          button:hover {
            background-color: #c0392b;
          }

          /* Borde para debug visual */
          :host {
            display: block;
            border: 2px dashed green;
          }
        </style>
        <button>Cerrar sesión</button>
      `;
    }
  }
}

export default LogOutBtn;
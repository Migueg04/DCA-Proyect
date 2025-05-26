import { UserActions } from "../../Flux/Actions";

function generateId() {
  return crypto.randomUUID();
}

export class RegisterForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.shadowRoot?.querySelector('form')?.addEventListener('submit', this.handleSubmit.bind(this));
    this.shadowRoot?.querySelector('#go-to-login')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.dispatchEvent(new CustomEvent('change-view', {
        detail: 'login',
        bubbles: true,
        composed: true
      }));
    });
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    const newUser = {
      id: generateId(),
      email: (form.querySelector('#email') as HTMLInputElement).value,
      name: (form.querySelector('#name') as HTMLInputElement).value,
      username: (form.querySelector('#username') as HTMLInputElement).value,
      bio: '',
      age: '',
      friends: '0',
      profileimg: '',
      bgimg: ''
    };

    UserActions.addUser(newUser);
    UserActions.setCurrentUser(newUser);
  }

  render() {
    this.shadowRoot!.innerHTML = `
      <style>
        form { display: flex; flex-direction: column; gap: 8px; }
      </style>
      <form>
        <input id="name" type="text" placeholder="Nombre" required />
        <input id="username" type="text" placeholder="Nombre de usuario" required />
        <input id="email" type="email" placeholder="Correo" required />
        <button type="submit">Registrarse</button>
        <p>¿Ya tienes cuenta? <a href="#" id="go-to-login">Inicia sesión</a></p>
      </form>
    `;
  }
}
export default RegisterForm

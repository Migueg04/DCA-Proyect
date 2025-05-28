import { UserActions } from "../../Flux/Actions";

export class LoginForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.shadowRoot?.querySelector('form')?.addEventListener('submit', this.handleSubmit.bind(this));
    this.shadowRoot?.querySelector('#go-to-register')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.dispatchEvent(new CustomEvent('change-view', {
        detail: 'register',
        bubbles: true,
        composed: true
      }));
    });
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const email = (form.querySelector('#email') as HTMLInputElement).value;
    const password = (form.querySelector('#password') as HTMLInputElement).value;
    UserActions.loginUser(email, password);
  }
  
  render() {
    this.shadowRoot!.innerHTML = `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :host {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: 
            linear-gradient(180deg,rgba(235, 59, 132, 0.6) 0%, rgba(16, 6, 43, 0.8) 80%),
            url('https://i.postimg.cc/6QSzRvFf/image-43.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-attachment: fixed;
          
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .login-container {
          border-radius: 20px;
          padding: 40px;
          width: 100%;
          max-width: 400px;
        }

        .login-title {
          color: white;
          font-size: 32px;
          font-weight: 600;
          margin-bottom: 30px;
          text-align: center;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        label {
          color: white;
          font-size: 14px;
          font-weight: 500;
        }

        input {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          padding: 10px 15px;
          color: white;
          font-size: 16px;
          outline: none;
          transition: all 0.3s ease;
        }

        input::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }

        input:focus {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.4);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .forgot-password {
          color: rgba(255, 255, 255, 0.7);
          font-size: 12px;
          text-decoration: none;
          align-self: flex-end;
          margin-top: -10px;
          transition: color 0.3s ease;
        }

        .forgot-password:hover {
          color: white;
        }

        .login-button {
          background: white;
          color: #667eea;
          border: none;
          border-radius: 12px;
          padding: 15px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 10px;
        }

        .login-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
          background: rgba(255, 255, 255, 0.95);
        }

        .login-button:active {
          transform: translateY(0);
        }

        .signup-link {
          color: rgba(255, 255, 255, 0.8);
          font-size: 14px;
          text-align: center;
          margin-top: 20px;
        }

        .signup-link a {
          color: white;
          text-decoration: none;
          font-weight: 600;
        }

        .signup-link a:hover {
          text-decoration: underline;
        }

        @media (max-width: 480px) {
          .login-container {
            margin: 20px;
            padding: 30px 25px;
          }
          
          .login-title {
            font-size: 28px;
          }
        }
      </style>
      
      <div class="login-container">
        <h1 class="login-title">Login</h1>
        <form>
          <div class="input-group">
            <label for="email">Email id</label>
            <input id="email" type="email" placeholder="example@gmail.com" required />
          </div>
          
          <div class="input-group">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Must have at least 8 characters" required />
          </div>
          
          <a href="#" class="forgot-password">Forgot password?</a>
          
          <button type="submit" class="login-button">Login</button>
        </form>
        
        <div class="signup-link">
            Don't have an account? <a href="#" id="go-to-register">Sign up</a>
        </div>
      </div>
    `;
  }
}

export default LoginForm;
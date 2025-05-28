import { UserActions, NavigateActions } from "../../Flux/Actions";

  function generateId() {
    return crypto.randomUUID();
  }

  function calculateAge(birthdate: string): string {
    const today = new Date();
    const birth = new Date(birthdate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age.toString();
  }

  function isValidPassword(password: string): boolean {
    const minLength = 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^A-Za-z0-9]/.test(password);
    return password.length >= minLength && hasUpper && hasLower && hasNumber && hasSymbol;
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

    const password = (form.querySelector('#password') as HTMLInputElement).value;
    const confirmPassword = (form.querySelector('#confirm-password') as HTMLInputElement).value;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!isValidPassword(password)) {
      alert("Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol.");
      return;
    }

    const birthdate = (form.querySelector('#birthdate') as HTMLInputElement).value;
    const calculatedAge = calculateAge(birthdate);

    const newUser = {
      id: generateId(),
      email: (form.querySelector('#email') as HTMLInputElement).value,
      name: (form.querySelector('#name') as HTMLInputElement).value,
      username: (form.querySelector('#username') as HTMLInputElement).value,
      password: password,
      birthdate: birthdate,
      bio: '',
      age: calculatedAge,
      friends: '0',
      profileimg: '',
      bgimg: ''
    };

    try {
      UserActions.addUser(newUser);
      UserActions.setCurrentUser(newUser);
      NavigateActions.navigate('/');
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed. Please try again.');
    }
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

        .register-container {
          border-radius: 20px;
          padding: 40px;
          width: 100%;
          max-width: 400px;
          
        }

        .register-title {
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

        input[type="text"],
        input[type="email"],
        input[type="date"],
        input[type="password"] {
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          padding: 10px 15px;
          color: white;
          font-size: 16px;
          outline: none;
          transition: all 0.3s ease;
          appearance: none;
        }

        input::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }

        input:focus {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.4);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .birthdate-section {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .birthdate-label {
          color: white;
          font-size: 14px;
          font-weight: 500;
        }

        .next-button {
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

        .next-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
          background: rgba(255, 255, 255, 0.95);
        }

        .next-button:active {
          transform: translateY(0);
        }

        .login-link {
          color: rgba(255, 255, 255, 0.8);
          font-size: 14px;
          text-align: center;
          margin-top: 20px;
        }

        .login-link a {
          color: white;
          text-decoration: none;
          font-weight: 600;
          cursor: pointer;
        }

        .login-link a:hover {
          text-decoration: underline;
        }

        @media (max-width: 480px) {
          .register-container {
            margin: 20px;
            padding: 30px 25px;
          }
          
          .register-title {
            font-size: 28px;
          }
        }
      </style>
      
      <div class="register-container">
        <h1 class="register-title">Sign Up</h1>
        <form>
            <input id="name" type="text" placeholder="Name" required />
            <input id="username" type="text" placeholder="Username" required />
            <input id="email" type="email" placeholder="Email" required />
            <input id="password" type="password" placeholder="Password" required />
            <input id="confirm-password" type="password" placeholder="Confirm your Password" required />
          
            <div class="birthdate-section">
                <label class="birthdate-label" for="birthdate">Birthdate</label>
                <input id="birthdate" type="date" required />
            </div>
          
          
          <button type="submit" class="next-button">Next</button>
        </form>
        
        <div class="login-link">
          Already have an account? <a href="#" id="go-to-login">Log in</a>
        </div>
      </div>
    `;
  }
}

export default RegisterForm;
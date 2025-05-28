import Sidebar from './Sidebar';

class Editprofile extends HTMLElement{
    
constructor(){
    super();
    this.attachShadow({mode: 'open'});
    this.render();
    }

render(){
if(!this.shadowRoot) return;
this.shadowRoot.innerHTML = `
                .profile-input {
                    margin: 10px 0;
                }
                .save-button {
                    background-color: #ffcc00;
                    border: none;
                    padding: 10px 15px;
                    border-radius: 5px;
                    cursor: pointer;
                }
                h1 {
                    font-size: 24px;
                }
            </style>
        <div class= "profile-container">
        <side-bar></side-bar>
        <div class= "profile-edit">
        <h1>Edit Profile</h1>
        <form id="profileForm">
        <input type="text" id="name" placeholder="Name" required />
        </div>
        <div class="profile-input">
        <label for="gmail">Gmail</label>
        <input type="email" id="gmail" placeholder="Gmail" required />
        </div>
        <div class="profile-input">
        <label for="username">Username</label>
        <input type="text" id="username" placeholder="Username" required />
        </div>
        <div class="profile-input">
        <label for="Description">Description</label>
        <input type="text" id="Description" placeholder="Description" required />
        </div>
        <button type="submit" id="saveChanges" class="save-button">Save Changes</button>
        </form>
        </div>
        </div> `;
    }
    connectedCallback(){
        this.shadowRoot?.querySelector('#profileForm')?.addEventListener('submit', this.handleSaveButtonClick.bind(this));
    }
    disconnectedCallback() {
        this.shadowRoot?.querySelector('#profileForm')?.removeEventListener('submit', this.handleSaveButtonClick.bind(this));
    }
    handleSaveButtonClick(event: Event) {
        event.preventDefault();

    const nameInput = this.shadowRoot?.getElementById('name') as HTMLInputElement | null;
    const gmailInput = this.shadowRoot?.getElementById('gmail') as HTMLInputElement | null;
    const usernameInput = this.shadowRoot?.getElementById('username') as HTMLInputElement | null;
    const DescriptionInput = this.shadowRoot?.getElementById('Description') as HTMLInputElement | null;

    if (!nameInput || !gmailInput || !usernameInput || !DescriptionInput) {
            alert('Faltan campos del formulario');
            return;}
    const userData = {
            name: nameInput.value,
            gmail: gmailInput.value,
            username: usernameInput.value,
            Description: DescriptionInput.value };

     // Uncomment and implement this function to save user data
        // saveUser ToLocal(userData);
    alert('Profile updated successfully!');
        }
}
customElements.define('profile-edit', Editprofile);
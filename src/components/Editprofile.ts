import { ProfileActions } from "../Flux/ActionProfile";
import { store } from "../Flux/Store";

class SettingsProfileContainer extends HTMLElement {
constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.handleSubmit = this.handleSubmit.bind(this);
}

connectedCallback() {
    this.render();
    store.subscribe(() => this.render());
}

disconnectedCallback() {
    store.unsubscribe(() => this.render());
}

handleSubmit(event: Event) {
    event.preventDefault();
    const form = this.shadowRoot?.querySelector("form")!;
    const formData = new FormData(form);

    const updatedProfile = {
    id: formData.get("id") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    name: formData.get("name") as string,
    username: formData.get("username") as string,
    bio: formData.get("bio") as string,
    age: formData.get("age") as string,
    friends: formData.get("friends") as string,
    profileimg: formData.get("profileimg") as string,
    bgimg: formData.get("bgimg") as string,
    };

    ProfileActions.updateProfile(updatedProfile);
}

render() {
    if (!this.shadowRoot) return;

    const profile = store.getCurrentUser();

    this.shadowRoot.innerHTML = `
    <style>
        @media (max-width: 768px) {
        .menu {
            flex-direction: column;
        }
        }
        .profile-container {
        display: flex;
        }
        .profile-edit {
        padding: 16px;
        }
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
        input, textarea {
        width: 100%;
        padding: 8px;
        margin-top: 4px;
        border: 1px solid #ccc;
        border-radius: 4px;
        }
    </style>
    <div class="profile-container">
        <side-bar></side-bar>
        <div class="profile-edit">
        <h1>Edit Profile</h1>
        <form id="profileForm">
            <div class="profile-input">
            <label>ID</label>
            <input name="id" type="text" value="${profile?.id || ''}" required />
            </div>
            <div class="profile-input">
            <label>Email</label>
            <input name="email" type="email" value="${profile?.email || ''}" required />
            </div>
            <div class="profile-input">
            <label>Password</label>
            <input name="password" type="password" value="${profile?.password || ''}" required />
            </div>
            <div class="profile-input">
            <label>Name</label>
            <input name="name" type="text" value="${profile?.name || ''}" required />
            </div>
            <div class="profile-input">
            <label>Username</label>
            <input name="username" type="text" value="${profile?.username || ''}" required />
            </div>
            <div class="profile-input">
            <label>Bio</label>
            <textarea name="bio">${profile?.bio || ''}</textarea>
            </div>
            <div class="profile-input">
            <label>Age</label>
            <input name="age" type="text" value="${profile?.age || ''}" />
            </div>
            <div class="profile-input">
            <label>Friends</label>
            <input name="friends" type="text" value="${profile?.friends || ''}" />
            </div>
            <div class="profile-input">
            <label>Profile Image URL</label>
            <input name="profileimg" type="text" value="${profile?.profileimg || ''}" />
            </div>
            <div class="profile-input">
            <label>Background Image URL</label>
            <input name="bgimg" type="text" value="${profile?.bgimg || ''}" />
            </div>
            <button type="submit" class="save-button">Save Changes</button>
        </form>
        </div>
    </div>
    `;

    this.shadowRoot.querySelector("form")?.addEventListener("submit", this.handleSubmit);
}
}

customElements.define("settings-profile-container", SettingsProfileContainer);

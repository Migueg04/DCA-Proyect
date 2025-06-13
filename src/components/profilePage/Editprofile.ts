import { store } from "../../Flux/Store";
import { NavigateActions } from "../../Flux/Actions";
import { updateUserProfile } from "../../services/Userservice";

class SettingsProfileContainer extends HTMLElement {
  profile: any;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.handleStoreUpdate = this.handleStoreUpdate.bind(this);
  }

  connectedCallback() {
    this.profile = store.getCurrentUser();
    this.render();
    store.subscribe(this.handleStoreUpdate);
  }

  disconnectedCallback() {
    store.unsubscribe(this.handleStoreUpdate);
  }

  handleStoreUpdate() {
    this.profile = store.getCurrentUser();
    this.render();
  }

  async handleSubmit(event: Event) {
    event.preventDefault();
    const form = this.shadowRoot?.querySelector("form")!;
    const formData = new FormData(form);

    const updates = {
      name: formData.get("name") as string,
      username: formData.get("username") as string,
      bio: formData.get("bio") as string,
    };

    try {
      await updateUserProfile(this.profile.id, updates);
      alert("Perfil actualizado exitosamente");

      NavigateActions.navigate("/profile");
    } catch (err) {
      console.error("Error actualizando perfil:", err);
    }
  }

  async handleImageUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        try {
          await updateUserProfile(this.profile.id, { profileimg: base64 });
          alert("Foto de perfil actualizada");
        } catch (error) {
          console.error("Error al subir imagen:", error);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  render() {
    if (!this.shadowRoot) return;
    if (!this.profile) {
      this.shadowRoot.innerHTML = `<p>No user data available.</p>`;
      return;
    }

    const { name = "", username = "", bio = "", profileimg = "" } = this.profile;

    this.shadowRoot.innerHTML = `
      <style>
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: 'Segoe UI', sans-serif;
    background: #1a1a1a;
  }

  .container {
    display: flex;
    min-height: 100vh;
    background: linear-gradient(180deg, rgba(235, 59, 132, 0.6) 0%, rgba(16, 6, 43, 0.8) 80%);
    color: white;
  }

  .card {
    flex: 1;
    margin: 2rem auto;
    background: linear-gradient(to bottom, rgba(255,255,255,0.05), rgba(255,255,255,0.1));
    border-radius: 1.5rem;
    padding-bottom: 2rem;
    max-width: 900px;
    width: 95%;
    backdrop-filter: blur(10px);
  }

  .header {
    position: relative;
    border-radius: 1.5rem 1.5rem 0 0;
    overflow: hidden;
  }

  .bgimg {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

   .profile-pic-wrapper {
          position: absolute;
          top: 110px;
          left: 30px;
        }

        .profile-img {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: 4px solid #fff;
          object-fit: cover;
        }
  .edit-icon {
    position: absolute;
    bottom: 5px;
    right: -10px;
    background: gold;
    border-radius: 50%;
    font-size: 0.9rem;
    padding: 0.4rem;
    cursor: pointer;
    border: 2px solid #fff;
  }

  h2 {
    margin-top: 2rem;
    margin-left: 180px;
    font-size: 2rem;
    color: white;
  }

  .form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem 2rem;
    padding: 2rem;
  }

  .form label {
    display: block;
    margin-bottom: 0.3rem;
    font-weight: 600;
  }

  .form input {
    padding: 0.7rem;
    font-size: 1rem;
    border-radius: 0.5rem;
    border: none;
    background: #eee;
    color: #333;
    width: 100%;
  }

  .form .full-width {
    grid-column: span 2;
  }

  button {
    background: gold;
    color: #333;
    font-weight: bold;
    padding: 0.6rem 1.5rem;
    border: none;
    border-radius: 1.5rem;
    cursor: pointer;
    grid-column: span 2;
    justify-self: start;
  }

  @media (max-width: 768px) {
    .form {
      grid-template-columns: 1fr;
    }

    h2 {
      margin-left: 1rem;
      margin-top: 7rem;
    }

    .profile-pic-wrapper {
      top: 100px;
      left: 1rem;
    }
  }
</style>

<div class="container">
  <div class="card">
    <div class="header">
      <img class="bgimg" src="https://vaquita.com.py/img2/blog/Portada%20-%20Entrada%20gamer@2x.jpg" />
      <div class="profile-pic-wrapper">
        <img class="profile-img" src="your-profile.png" alt="Profile" />
        <label class="edit-icon">
          ✏️
          <input type="file" accept="image/*" hidden />
        </label>
      </div>
      <h2>Edit Profile</h2>
    </div>

    <form class="form">
      <div>
        <label>Name</label>
        <input name="name"  />
      </div>

      <div>
        <label>Username</label>
        <input name="username" />
      </div>

      <div>
        <label>Description</label>
        <input name="description" placeholder="Describe yourself..." />
      </div>

      <button type="submit">Save Changes</button>
    </form>
  </div>
</div>
  `;

    this.shadowRoot.querySelector("form")?.addEventListener("submit", this.handleSubmit);
    this.shadowRoot.querySelector('input[type="file"]')?.addEventListener("change", this.handleImageUpload);
  }
}

customElements.define("edit-profile", SettingsProfileContainer);
export default SettingsProfileContainer;

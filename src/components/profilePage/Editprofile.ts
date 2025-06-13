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
    background: linear-gradient(to bottom, #eb3b84, #10062b);
    color: white;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
  }

  .container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    width: 100%;
    min-height: 100vh;
  }

  .card {
    background: linear-gradient(145deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05));
    border-radius: 2rem;
    width: 100%;
    max-width: 850px;
    min-height: 600px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .header {
    position: relative;
    width: 100%;
    height: 200px;
    min-height: 180px;
    flex-shrink: 0;
  }

  .bgimg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .profile-pic-wrapper {
    position: absolute;
    bottom: -50px;
    left: 2rem;
  }

  .profile-img {
    width: 110px;
    height: 110px;
    border-radius: 50%;
    border: 4px solid #fff;
    object-fit: cover;
    background-color: #ccc;
  }

  .edit-icon {
    position: absolute;
    bottom: 0;
    right: 0;
    transform: translate(25%, 25%);
    background: gold;
    border-radius: 50%;
    padding: 0.4rem;
    font-size: 0.9rem;
    border: 2px solid white;
    cursor: pointer;
  }

  .content {
    padding: 6rem 2rem 2.5rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  h2 {
    margin-top: 0;
    margin-bottom: 2rem;
    font-size: 1.6rem;
    color: white;
  }

  .form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    width: 100%;
  }

  .form label {
    font-weight: 600;
    font-size: 0.95rem;
    margin-bottom: 0.3rem;
    display: block;
    color: white;
  }

  .form input {
    padding: 0.8rem;
    font-size: 1rem;
    border-radius: 0.8rem;
    border: none;
    background: #eee;
    color: #333;
    width: 100%;
  }

  .form button {
    grid-column: span 2;
    margin-top: 1rem;
    background: gold;
    color: #333;
    font-weight: bold;
    padding: 1rem;
    border: none;
    border-radius: 2rem;
    cursor: pointer;
    font-size: 1rem;
    text-align: center;
  }

  @media (max-width: 640px) {
    .form {
      grid-template-columns: 1fr !important;
    }

    .card {
      max-width: 100%;
      border-radius: 1rem;
      min-height: auto;
    }

    .profile-img {
      width: 80px;
      height: 80px;
    }

    .profile-pic-wrapper {
      bottom: -40px;
      left: 1.2rem;
    }

    .content {
      padding-top: 5.5rem;
      padding-left: 1.5rem;
      padding-right: 1.5rem;
    }

    .form button {
      grid-column: span 1;
    }
  }
</style>

</head>
<body>
  <div class="container">
    <div class="card">
      <div class="header">
        <img class="bgimg" src="https://vaquita.com.py/img2/blog/Portada%20-%20Entrada%20gamer@2x.jpg" />
        <div class="profile-pic-wrapper">
          <img class="profile-img" id="profileImage" src="https://i.pinimg.com/736x/e0/5a/19/e05a1996300035d853b03f8af6ce0c4a.jpg" alt="Profile" />
          <label class="edit-icon">
            ✏️
            <input type="file" id="fileInput" accept="image/*" hidden />
          </label>
        </div>
      </div>

      <div class="content">
        <h2>Edit Profile</h2>
        <form class="form">
          <div>
            <label for="name">Name</label>
            <input name="name" id="name" placeholder="Your name" />
          </div>

          <div>
            <label for="username">Username</label>
            <input name="username" id="username" placeholder="Your username" />
          </div>

          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  </div>


  `;

    this.shadowRoot.querySelector("form")?.addEventListener("submit", this.handleSubmit);
    this.shadowRoot.querySelector('input[type="file"]')?.addEventListener("change", this.handleImageUpload);
  }
}

customElements.define("edit-profile", SettingsProfileContainer);
export default SettingsProfileContainer;

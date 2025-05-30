import Navigate from "../utils/Navigate";
import Sidebar from "./Sidebar";
import { State, store } from "../Flux/Store";

class EditProfile extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.shadowRoot
      ?.querySelector("form")
      ?.addEventListener("submit", this.handleSubmit.bind(this));
    this.shadowRoot
      ?.querySelector("#cancel-btn")
      ?.addEventListener("click", this.handleCancel.bind(this));
  }

  handleCancel(e: Event) {
    e.preventDefault();
    Navigate("/profile");
    // Forzar actualización de ruta
    window.dispatchEvent(new PopStateEvent("popstate"));
  }

  handleSubmit(e: Event) {
    e.preventDefault();
    const nameInput = this.shadowRoot?.querySelector<HTMLInputElement>("#name");
    const emailInput = this.shadowRoot?.querySelector<HTMLInputElement>(
      "#email"
    );
    const usernameInput = this.shadowRoot?.querySelector<HTMLInputElement>(
      "#username"
    );
    const bioInput = this.shadowRoot?.querySelector<HTMLTextAreaElement>("#bio");

    if (
      !nameInput?.value ||
      !emailInput?.value ||
      !usernameInput?.value ||
      !bioInput?.value
    ) {
      alert("Faltan campos del formulario");
      return;
    }

    // Aquí iría tu lógica de guardado...

    alert("¡Perfil actualizado con éxito!");
    Navigate("/profile");
    window.dispatchEvent(new PopStateEvent("popstate"));
  }

  render() {
    if (!this.shadowRoot) return;
    const { currentUser } = store.getState() as State;

    const name = currentUser?.name || "";
    const email = currentUser?.email || "";
    const username = currentUser?.username || "";
    const bio = currentUser?.bio || "";

    this.shadowRoot.innerHTML = `
      <style>
        /* <-- Tu CSS quedará exactamente igual -->
        .page-container { display: flex; height: 100vh; }
        side-bar { margin-right: 2rem; }
        .form-container {
          flex: 1;
          max-width: 600px;
          margin: auto;
          padding: 2rem;
          box-sizing: border-box;
        }
        h2 { margin-bottom: 1.5rem; font-family: sans-serif; }
        form { display: flex; flex-direction: column; gap: 1rem; }
        label { font-weight: bold; font-family: sans-serif; }
        input, textarea {
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-family: sans-serif;
        }
        .buttons {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }
        #cancel-btn {
          background-color: #f87171;
          color: white;
          border: none;
          padding: 0.6rem 1.2rem;
          border-radius: 4px;
          cursor: pointer;
        }
        #submit-btn {
          background-color: #34d399;
          color: white;
          border: none;
          padding: 0.6rem 1.2rem;
          border-radius: 4px;
          cursor: pointer;
        }
      </style>
      <div class="page-container">
        <side-bar></side-bar>
        <div class="form-container">
          <h2>Edit Profile</h2>
          <form>
            <label for="name">Name</label>
            <input type="text" id="name" value="${name}" required />

            <label for="email">Email</label>
            <input type="email" id="email" value="${email}" required />

            <label for="username">Username</label>
            <input type="text" id="username" value="${username}" required />

            <label for="bio">Bio</label>
            <textarea id="bio" rows="4" required>${bio}</textarea>

            <div class="buttons">
              <button type="button" id="cancel-btn">Cancel</button>
              <button type="submit" id="submit-btn">Save</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }
}

customElements.define("profile-edit", EditProfile);
export default EditProfile;

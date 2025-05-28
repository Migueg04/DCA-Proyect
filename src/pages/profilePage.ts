import { State, store } from "../Flux/Store";

class ProfilePage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    // Suscribirse a cambios en el store
    store.subscribe(this.handleStateChange.bind(this));
  }

  handleStateChange(state: State) {
    this.render();
    console.log(state);
  }

  render() {
    if (!this.shadowRoot) return;

    const state = store.getState();
    const currentUser = state.currentUser;

    // Valores por defecto si no hay usuario
    const defaultBgImg = "https://global.unitednations.entermediadb.net/assets/mediadb/services/module/asset/downloads/preset/Libraries/Graphics+Library/27-05-2022-Videogames-climate-05.jpg/image1440x560cropped.jpg";
    const defaultProfileImg = "https://i.pinimg.com/736x/e0/5a/19/e05a1996300035d853b03f8af6ce0c4a.jpg";

    // Obtener datos del usuario actual o usar valores por defecto
    const bgimg = currentUser?.bgimg || defaultBgImg;
    const profileimg = currentUser?.profileimg || defaultProfileImg;
    const name = currentUser?.name || "Usuario";
    const username = currentUser?.username || "username";
    const bio = currentUser?.bio || "Welcome to my profile! 🎮";
    const age = currentUser?.age || "N/A";
    const friends = currentUser?.friends || "0";

    this.shadowRoot.innerHTML = `
      <style>
        .container {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      </style>
      <div class="container">
        <profilecard-component
          bgimg="${bgimg}"
          profileimg="${profileimg}"
          name="${name}"
          username="${username}"
          bio="${bio}"
          age="${age}"
          friends="${friends}"
        ></profilecard-component>
      </div>
    `;
  }
}

export default ProfilePage;
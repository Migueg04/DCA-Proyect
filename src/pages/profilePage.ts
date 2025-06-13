import { State, store } from "../Flux/Store";

class ProfilePage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    store.subscribe(this.handleStateChange.bind(this));
  }

  handleStateChange(state: State) {
    this.render();
    console.log(state);
  }

  render( ) {
    if (!this.shadowRoot) return;

    const state = store.getState();
    const currentUser = state.currentUser;

    const defaultBgImg = "https://global.unitednations.entermediadb.net/assets/mediadb/services/module/asset/downloads/preset/Libraries/Graphics+Library/27-05-2022-Videogames-climate-05.jpg/image1440x560cropped.jpg";
    const defaultProfileImg = "https://i.pinimg.com/736x/e0/5a/19/e05a1996300035d853b03f8af6ce0c4a.jpg";

    const bgimg = currentUser?.bgimg || defaultBgImg;
    const profileimg = currentUser?.profileimg || defaultProfileImg;
    const name = currentUser?.name || "Usuario";
    const username = currentUser?.username || "username";
    const bio = currentUser?.bio || "Welcome to my profile! 🎮";
    const age = currentUser?.age || "N/A";
    const friends = currentUser?.friends || "3";

    this.shadowRoot.innerHTML = `
      <style>
        .container {
          margin-right: 100px; 
          width: calc(100% - 100px);
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      </style>
      <right-bar></right-bar>
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

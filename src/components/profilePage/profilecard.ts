import "../Editprofilebotton";
import "../Sidebar";

import { State, store } from "../../Flux/Store";

export enum ProfileCardAttribute {
  bgimg       = "bgimg",
  profileimg  = "profileimg",
  name        = "name",
  username    = "username",
  bio         = "bio",
  age         = "age",
  friends     = "friends",
}

class ProfileCard extends HTMLElement {
  bgimg?: string;
  profileimg?: string;
  name?: string;
  username?: string;
  bio?: string;
  age?: string;
  friends?: string;

  static get observedAttributes() {
    return Object.values(ProfileCardAttribute);
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  attributeChangedCallback(
    prop: ProfileCardAttribute,
    _: string | null,
    newVal: string | null
  ) {
    if (newVal !== null) {
      (this as any)[prop] = newVal;
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    if (!this.shadowRoot) return;

    // Tomar datos del store si no vinieron por atributo
    const { currentUser } = store.getState() as State;
    this.bgimg      ||= currentUser?.bgimg      ?? "";
    this.profileimg ||= currentUser?.profileimg ?? "";
    this.name       ||= currentUser?.name       ?? "";
    this.username   ||= currentUser?.username   ?? "";
    this.bio        ||= currentUser?.bio        ?? "";
    this.age        ||= currentUser?.age        ?? "";
    this.friends    ||= currentUser?.friends    ?? "";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          /* Ya no ocupa 100% altura ni pinta fondo */
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          box-sizing: border-box;
          overflow: hidden;
        }

        .container {
          width: 960px;
          border-radius: 16px;
          font-family: 'Segoe UI', sans-serif;
          background-color: rgba(255, 255, 255, 0.6);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
          overflow: hidden;
          position: relative;
          height: 80%;
        }

        .header {
          position: relative;
          height: 30vh;
          background: url(${this.bgimg}) center/cover no-repeat;
        }

        .profile-img {
          position: absolute;
          bottom: -20%;
          left: 5%;
          width: 19%;
          aspect-ratio: 1/1;
          border-radius: 50%;
          border: 0.5vw solid #ffffff;
          overflow: hidden;
          box-shadow: 0 0 10px rgba(0,0,0,0.3);
          background-color: white;
        }

        .profile-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Posicionamiento inalterado de tu custom button */
        edit-profile-button {
          position: absolute;
          bottom: -8%;
          right: 5%;
        }

        .body {
          padding: 80px 32px 32px;
        }
        .name {
          font-size: 30px;
          font-weight: bold;
          color: #1e1e1e;
          font-family: "Nunito", sans-serif;
        }
        .username {
          color: #666;
          margin-bottom: 1%;
          font-size: 17px;
          font-family: "Nunito", sans-serif;
        }
        .age {
          color: #666;
          font-size: 16px;
          margin-bottom: 3%;
        }
        .bio {
          font-size: 17px;
          color: #333;
          line-height: 1.4;
          margin-bottom: 10%;
          font-family: "Nunito", sans-serif;
        }
        .footer {
          display: flex;
          justify-content: space-between;
          font-size: 1rem;
          font-weight: 500;
          color: #444;
        }

        @media (max-width: 480px) {
          .container { width:100%; border-radius:8px; margin-bottom:30%; height:auto; }
          .header   { height:25vh; }
          .profile-img { width:30%; bottom:-12%; left:4%; border-width:3px; }
          edit-profile-button { bottom:-6%; right:4%; }
          .body { padding:50px 16px 16px; }
          .name { font-size:20px; }
          .username, .bio, .age { font-size:14px; }
          .footer { flex-direction:column; gap:0.5rem; font-size:0.85rem; }
        }
      </style>

      <div class="container">
        <div class="header">
          <div class="profile-img">
            <img src="${this.profileimg}" alt="Profile Picture" />
          </div>
          <edit-profile-button></edit-profile-button>
        </div>
        <div class="body">
          <div class="name">${this.name}</div>
          <div class="username">@${this.username}</div>
          <div class="age">${this.age ? this.age + " years old" : ""}</div>
          <div class="bio">${this.bio}</div>
          <div class="footer">
            <span>Friends: ${this.friends}</span>
            <log-out-btn></log-out-btn>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("profilecard-component", ProfileCard);
export default ProfileCard;

import "../profilePage/Editprofile";
import { NavigateActions, UserActions } from "../../Flux/Actions";
import { store } from "../../Flux/Store";
import { getUserById } from "../../services/Userservice";


export enum ProfileCardAttribute {
  bgimg = 'bgimg',
  profileimg = 'profileimg',
  name = 'name',
  username = 'username',
  bio = 'bio',
  age = 'age',
  friends = 'friends',
}

class ProfileCard extends HTMLElement {
  bgimg?: string;
  profileimg?: string;
  name?: string;
  username?: string;
  bio?: string;
  age?: string;
  friends?: string;
  isUserInfoFetched: boolean = false;

  static get observedAttributes() {
    return Object.values(ProfileCardAttribute);
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  attributeChangedCallback(prop: ProfileCardAttribute, _: string | null, newVal: string | null) {
    if (newVal !== null) {
      this[prop] = newVal;
      this.render();
    }
  }

connectedCallback() {
    store.subscribe(this.handleStoreChange.bind(this));
    this.handleStoreChange();
    this.getUserInfo();
    console.log(" Store change detected");
    this.render();

}
disconnectedCallback() {
store.unsubscribe(this.handleStoreChange.bind(this));
}

async getUserInfo() {

    if (this.isUserInfoFetched) return;
    const currentUser = store.getState().currentUser;
    if (currentUser) {
        const userInfo = await getUserById(currentUser.id);
        if (userInfo) {
            if (JSON.stringify(currentUser) !== JSON.stringify(userInfo)) {
                UserActions.setCurrentUser(userInfo);
            }
        }
    }
}
handleStoreChange() {
  const state = store.getState();
  const user = state.currentUser;

  if (user) {
    this.setAttribute("bgimg", user.bgimg || "");
    this.setAttribute("profileimg", user.profileimg || "");
    this.setAttribute("name", user.name || "");
    this.setAttribute("username", user.username || "");
    this.setAttribute("bio", user.bio || "");
    this.setAttribute("age", user.age || "");
    this.setAttribute("friends", user.friends || "");
  }
}



  render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
        <style>
        :host {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            backgorund-color: #ffffff;
            overflow: hidden;
        }

        .container {
            width: 960px;
            border-radius: 16px;
            font-family: 'Segoe UI', sans-serif;
            color: white;
            background-color: rgba(255, 255, 255, 0.6);
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
            height: 80%;
            position: relative;
        }

        .header {
            position: relative;
            height: 30vh;
            background-size: cover;
            background-position: center;
        }

        .profile-img {
            position: absolute;
            bottom: -20%;
            left: 5%;
            width: 19%;
            aspect-ratio: 1 / 1;
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

        .edit-button {
            position: absolute;
            bottom: -8%;
            right: 5%;
            background-color: #fde047;
            color: #1e1e1e;
            border: none;
            padding: 0.6rem 1.2rem;
            font-weight: bold;
            border-radius: 9999px;
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
            font-size: 0.95rem;
        }

        .body {
            padding: 80px 32px 32px 32px;
        }

        .name {
            font-size: 30px;
            font-weight: bold;
            color: #1e1e1e;
            font-family: "Nunito", sans-serif;

        }

        .username {
            color: #ffffff;
            margin-bottom: 0.75rem;
            font-size: 17px;
            margin-bottom: 1%;
            font-family: "Nunito", sans-serif;
        }

        .age {
            color: #666;
            font-size: 16px;
            margin-bottom: 3%;
        }

        .bio {
            font-size: 17px;
            margin-bottom: 10%;
            color: #333;
            line-height: 1.4;
            font-family: "Nunito", sans-serif;
        }

        .footer {
            display: flex;
            justify-content: space-between;
            font-size: 1rem;
            font-weight: 500;
            color: #444444;
        }

        @media (max-width: 480px) {
            .container {
                width: 100%;
                height: auto;
                border-radius: 8px;
                margin-bottom: 30%;
            }

            .header {
                height: 25vh;
            }

            .profile-img {
                width: 30%;
                bottom: -12%;
                left: 4%;
                border-width: 3px;
            }

            .edit-button {
                padding: 0.4rem 0.8rem;
                font-size: 0.75rem;
                bottom: -6%;
                right: 4%;
            }

            .body {
                padding: 50px 16px 16px 16px;
            }

            .name {
                font-size: 20px;
            }

            .username,
            .bio,
            .age {
                font-size: 14px;
            }

            .footer {
                flex-direction: column;
                gap: 0.5rem;
                font-size: 0.85rem;
            }
        }

        </style>

        <div class="container">
            <div class="header" style="background-image: url(${this.bgimg})">
                <div class="profile-img">
                    <img src="${this.profileimg}" alt="Profile Picture" />
                </div>
                <button class="edit-button" id="editBtn">⚙Edit profile</button>
            </div>
            <div class="body">
                <div class="name">${this.name ?? ''}</div>
                <div class="username">@${this.username ?? ''}</div>
                <div class="age">${this.age ? `${this.age} years old` : ''}</div>
                <div class="bio">${this.bio ?? ''}</div>
                <div class="footer">
                    <span>Friends: ${this.friends ?? ''}</span>
                    <log-out-btn></log-out-btn>
                </div>
            </div>
        </div>
    `;
this.shadowRoot?.querySelector("#editBtn")?.addEventListener("click", () => {
NavigateActions.navigate('/Editprofile');
});

}
}

export default ProfileCard;
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
    this.render();
  }

  render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
        <style>
        :host {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 90%;
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
        </style>

        <div class="container">
            <div class="header" style="background-image: url(${this.bgimg})">
                <div class="profile-img">
                    <img src="${this.profileimg}" alt="Profile Picture" />
                </div>
                <button class="edit-button">⚙Edit profile</button>
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
  }
}

export default ProfileCard;
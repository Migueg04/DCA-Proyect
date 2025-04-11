export enum SidebarAttribute {
    logo = 'logo',
    home = 'home',
    bookmark = 'bookmark',
    add = 'add',
  }
  
  class Sidebar extends HTMLElement {
    logo?: string;
    home?: string;
    bookmark?: string;
    add?: string;
    profileimg?: string;
  
    static get observedAttributes() {
      return ['logo', 'home', 'bookmark', 'add', 'profileimg'];
    }
  
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    attributeChangedCallback(prop: SidebarAttribute, _: string | null, newVal: string | null) {
      if (newVal !== null) {
        this[prop] = newVal;
      }
      this.render();
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
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          background-color: #ec4899;
          width: 64px;
          height: 100vh;
          padding: 1rem 0;
          box-sizing: border-box;
          font-family: sans-serif;
          border-radius: 20px;
          position: fixed;
          left: 0;
          top: 0;
        }

        .icons {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .top-icons {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
          width: 100%;
        }

        .top-icons a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 40px;
          cursor: pointer;
        }

        .top-icons img {
          width: 24px;
          height: 24px;
        }

        .profile {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid white;
          margin-bottom: 0.5rem;
        }

        .profile img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @media (max-width: 600px) {
          :host {
            flex-direction: row;
            width: 100%;
            height: auto;
            border-radius: 0;
            padding: 0.5rem;
            top: auto;
            bottom: 0;
          }

          .top-icons {
            flex-direction: row;
            gap: 0.4rem;
          }

          .top-icons a {
            width: 40px;
          }

          .profile {
            width: 36px;
            height: 36px;
            margin-bottom: 0;
          }
        }
      </style>
  <div class="icons">
        <div class="top-icons">
          <a class="icon-link" data-target="logo"><img src="${this.logo}" alt="Logo Icon" class="icon" /></a>
          <a class="icon-link" data-target="home"><img src="${this.home}" alt="Home Icon" class="icon" /></a>
          <a class="icon-link" data-target="add"><img src="${this.add}" alt="Add Icon" class="icon" /></a>
          <a class="icon-link" data-target="bookmark"><img src="${this.bookmark}" alt="Bookmark Icon" class="icon" /></a>
        </div>
      </div>

      <div class="profile">
        <img src="${this.profileimg ?? ''}" alt="Profile" />
      </div>
    `;
  const iconLinks = this.shadowRoot.querySelectorAll('.icon-link');
  iconLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      window.open('about:blank', '_blank');
    });
  });
}
}
  
  customElements.define('side-bar', Sidebar);
  export default Sidebar;
  
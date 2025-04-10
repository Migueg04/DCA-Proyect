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

      .top-icons {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.4 rem; 
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

        .profile {
          width: 36px;
          height: 36px;
          margin-bottom: 0;
        }
      }
    </style>


    <div class="icons">
        <a href=""><img src="${this.home}" alt="Home Icon" class="icon" />
        <a href=""><img src="${this.add}" alt="Add Icon" class="icon" />
        <a href=""><img src="${this.bookmark}" alt="Bookmark Icon" class="icon" />
    </div>

    <div class="profile">
      <img src="${this.profileimg ?? ''}" alt="Profile" />
    </div>
  `;
}
  }
  
  customElements.define('side-bar', Sidebar);
  export default Sidebar;
  
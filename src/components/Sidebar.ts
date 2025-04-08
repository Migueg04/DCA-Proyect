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
        @media (max-width: 600px) {
   :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: #ec4899; /* Rosa fuerte */
    width: 64px;
    height: 100vh;
    padding: 1rem 0;
    box-sizing: border-box;
    font-family: sans-serif;
    border-radius: 20px;
  }

  .top-icons {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  .icon {
    width: 28px;
    height: 28px;
    cursor: pointer;
  }

  .logo {
    width: 32px;
    margin-bottom: 1rem;
  }

  .profile {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid white;
    margin-bottom: 0.25rem;
  }

  .profile img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>

  
        <img src="${this.home}" alt="Home Icon" />
        <img src="${this.add}" alt="Add Icon" />
        <img src="${this.bookmark}" alt="Save Icon" />
        <div class="spacer"></div>
  
        <div class="profile">
          <img src="${this.profileimg ?? ''}" alt="Profile" />
        </div>
      `;
    }
  }
  
  customElements.define('side-bar', Sidebar);
  export default Sidebar;
  
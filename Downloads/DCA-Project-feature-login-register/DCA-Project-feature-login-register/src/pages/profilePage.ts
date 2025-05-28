import { State, store } from '../Flux/Store';
import { UserActions } from '../Flux/Actions';

class ProfilePage extends HTMLElement {
  private editing = false;
  private onStateChange = this.render.bind(this);

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    store.subscribe(this.onStateChange);
    this.render();
  }

  disconnectedCallback(): void {
    store.unsubscribe(this.onStateChange);
  }

  private handleEditClick(): void {
    this.editing = true;
    this.render();
  }

  private handleFormSubmit(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const updates: Partial<State['currentUser']> = {};
    formData.forEach((value, key) => {
      // @ts-ignore
      updates[key] = value;
    });

    const currentUser = store.getState().currentUser;
    if (currentUser) {
      UserActions.updateUserProfile(currentUser.id, updates);
    }

    this.editing = false;
    this.render();
  }

  render(): void {
    if (!this.shadowRoot) return;
    const state = store.getState();
    const user = state.currentUser;

    
    this.shadowRoot.innerHTML = '';

    if (this.editing) {
     
      this.shadowRoot.innerHTML = `
        <style>
          form { display: flex; flex-direction: column; width: 300px; gap: 0.5rem; }
          label { font-weight: bold; color: #fff; }
          input, textarea { padding: 0.5rem; font-size: 1rem; border-radius: 4px; border: 1px solid #ccc; }
          button { padding: 0.5rem; cursor: pointer; background: #EA3B81; color: #fff; border: none; border-radius: 4px; }
        </style>
        <form id="editForm">
          <label>Name:<input type="text" name="name" value="${user?.name ?? ''}" /></label>
          <label>Email:<input type="email" name="email" value="${user?.email ?? ''}" /></label>
          <label>Username:<input type="text" name="username" value="${user?.username ?? ''}" /></label>
          <label>Bio:<textarea name="bio">${user?.bio ?? ''}</textarea></label>
          <label>Background URL:<input type="text" name="bgimg" value="${user?.bgimg ?? ''}" /></label>
          <label>Profile URL:<input type="text" name="profileimg" value="${user?.profileimg ?? ''}" /></label>
          <button type="submit">Guardar</button>
        </form>
      `;

      const formElem = this.shadowRoot.getElementById('editForm');
      formElem?.addEventListener('submit', this.handleFormSubmit.bind(this));

    } else {
     
      const bgimg = user?.bgimg ?? 'https://via.placeholder.com/800x200';
      const profileimg = user?.profileimg ?? 'https://via.placeholder.com/100';
      const name = user?.name ?? 'Usuario';
      const username = user?.username ?? 'username';
      const bio = user?.bio ?? 'This is my bio.';
      const email = user?.email ?? 'user@example.com';

      this.shadowRoot.innerHTML = `
        <style>
          .container { display: flex; flex-direction: column; align-items: center; gap: 1rem; color: #fff; }
          .header { width: 100%; height: 150px; background-image: url('${bgimg}'); background-size: cover; background-position: center; }
          .avatar { width: 100px; height: 100px; border-radius: 50%; background-image: url('${profileimg}'); background-size: cover; background-position: center; margin-top: -50px; border: 3px solid white; }
          .info { text-align: center; }
          button { padding: 0.5rem 1rem; cursor: pointer; background: #EA3B81; color: #fff; border: none; border-radius: 4px; }
        </style>
        <div class="container">
          <div class="header"></div>
          <div class="avatar"></div>
          <div class="info">
            <h2>${name}</h2>
            <p>@${username}</p>
            <p>${bio}</p>
            <p>${email}</p>
          </div>
          <button id="editBtn">Editar Perfil</button>
        </div>
      `;

      const btn = this.shadowRoot.getElementById('editBtn');
      btn?.addEventListener('click', this.handleEditClick.bind(this));
    }
  }
}

customElements.define('profile-page', ProfilePage);
export default ProfilePage;

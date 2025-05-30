import { NavigateActions } from "../../Flux/Actions";
import { State, store } from "../../Flux/Store";

class Root extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    store.subscribe(this.handleRouteChange.bind(this));
  }

  connectedCallback() {
    this.render();
    this.handleRouteChange();
  }

  handleRouteChange(state: State = store.getState()) {
    if (!this.shadowRoot) return;

    const { currentPath = window.location.pathname, currentUser } = state;
    const path = currentPath;

    // Redirigir a /auth si no hay usuario y no estamos ya en /auth
    if (!currentUser && path !== '/auth') {
      NavigateActions.navigate('/auth');
      return;
    }

    window.history.replaceState({}, '', path);

    // Re-renderizar para mostrar/ocultar sidebar según la ruta
    this.render();

    const content = this.shadowRoot.querySelector('#content');
    if (!content) return;
    content.innerHTML = '';

    switch (path) {
      case '/':
        content.innerHTML = `<main-page></main-page>`;
        break;
      case '/auth':
        content.innerHTML = `<auth-page></auth-page>`;
        break;
      case '/profile':
        content.innerHTML = `<profile-page></profile-page>`;
        break;
      default:
        content.innerHTML = `<h1>404 - Página no encontrada</h1>`;
        break;
      case '/Editprofile':
        content.innerHTML = `<edit-profile-button></edit-profile-button>`;
    }
  }

  render() {
    if (!this.shadowRoot) return;

    const state = store.getState();
    const currentPath = state.currentPath || window.location.pathname;
    const isAuthPage = currentPath === '/auth';
    const isProfilePage = currentPath === '/profile';

    this.shadowRoot.innerHTML = `
      <style>
        #root {
          width: 100vw;
          height: 100vh;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          display: flex;
          ${isProfilePage ? `
          background: linear-gradient(180deg, rgba(235, 59, 132, 0.6) 0%, rgba(16, 6, 43, 0.8) 80%);
        ` : ''}
        }
        
        #content {
          flex-grow: 1;
          ${!isAuthPage ? 'padding-left: 80px;' : ''}
        }
      </style>
      <div id="root">
        ${!isAuthPage ? `
          <side-bar
            logo="https://i.postimg.cc/G2c3BHmQ/logo-R.png"
            home="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMS4zMTI1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWhvdXNlLWljb24gbHVjaWRlLWhvdXNlIj48cGF0aCBkPSJNMTUgMjF2LThhMSAxIDAgMCAwLTEtMWgtNGExIDEgMCAwIDAtMSAxdjgiLz48cGF0aCBkPSJNMyAxMGEyIDIgMCAwIDEgLjcwOS0xLjUyOGw3LTUuOTk5YTIgMiAwIDAgMSAyLjU4MiAwbDcgNS45OTlBMiAyIDAgMCAxIDIxIDEwdjlhMiAyIDAgMCAxLTIgMkg1YTIgMiAwIDAgMS0yLTJ6Ii8+PC9zdmc+"
            add="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMS4zMTI1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXNxdWFyZS1wbHVzLWljb24gbHVjaWRlLXNxdWFyZS1wbHVzIj48cmVjdCB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHg9IjMiIHk9IjMiIHJ4PSIyIi8+PHBhdGggZD0iTTggMTJoOCIvPjxwYXRoIGQ9Ik0xMiA4djgiLz48L3N2Zz4="
            bookmark="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMS4zMTI1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWJvb2ttYXJrLWljb24gbHVjaWRlLWJvb2ttYXJrIj48cGF0aCBkPSJtMTkgMjEtNy00LTcgNFY1YTIgMiAwIDAgMSAyLTJoMTBhMiAyIDAgMCAxIDIgMnYxNnoiLz48L3N2Zz4="
            profileimg="https://i.pinimg.com/736x/e0/5a/19/e05a1996300035d853b03f8af6ce0c4a.jpg"
          ></side-bar>
        ` : ''}
        <div id="content"></div>
      </div>
    `;
  }
}

export default Root;
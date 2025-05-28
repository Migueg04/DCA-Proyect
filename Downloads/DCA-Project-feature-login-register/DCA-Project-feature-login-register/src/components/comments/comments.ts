import { store, State, Comment } from '../../Flux/Store';
import { CommentsActions } from '../../Flux/Actions';

class Comments extends HTMLElement {
  private shadow: ShadowRoot;
  private container: HTMLDivElement;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.container = document.createElement('div');
    this.onStateChange = this.onStateChange.bind(this);
  }

  connectedCallback(): void {
    // Añadimos contenedor al shadow DOM
    this.shadow.appendChild(this.container);
    // Suscripción al store
    store.subscribe(this.onStateChange);
    // Carga de comentarios mockeados
    CommentsActions.loadComments();
  }

  disconnectedCallback(): void {
    // Limpiar suscripción
    store.unsubscribe(this.onStateChange);
  }

  private onStateChange(state: State): void {
    // Renderizar comentarios desde el estado global
    this.render(state.comments);
  }

  private render(comments: Comment[]): void {
    // Generar HTML
    const comentariosHTML = comments
      .map(
        (c) => `
          <div class="username">
            <p>${c.username}</p>
            ${c.verified ? '<span>✔️</span>' : ''}
          </div>
          <div class="message">${c.content}</div>
        `
      )
      .join('');

    // Inyectar estilo y contenido
    this.container.innerHTML = `
      <style>
        #comments-container {
          background-color: rgba(255, 254, 255, 0.33);
          border-radius: 15px;
          max-height: fit-content;
          width: 40vw;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .message {
          margin: 2%;
          color: #ffffff;
        }

        .username {
          display: flex;
          align-items: center;
          font-weight: bold;
          color: #ffffff;
        }

        #comments {
          width: 80%;
          max-height: fit-content;
          margin-top: 3vh;
          font-family: "Nunito", sans-serif;
        }

        #input-comments {
          display: flex;
          width: 100%;
          margin-top: 10px;
        }

        #input-comments input {
          flex: 1;
          border: none;
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
          outline: none;
          font-size: 12px;
          padding: 8px;
        }

        @media (max-width: 426px) {
          #comments-container {
            width: 80vw;
          }

          .message {
            margin: 5%;
          }

          #comments {
            width: 80%;
          }

          #input-comments input {
            font-size: 12px;
            width: 70%;
          }
        }
      </style>
      <div id="comments-container">
        <div id="comments">
          ${comentariosHTML}
        </div>
        <div id="input-comments">
          <input id="input-comments-textfield" type="text" placeholder="Add a comment...">
          <button-component></button-component>
        </div>
      </div>
    `;
  }
}

customElements.define('comments-section', Comments);
export default Comments;

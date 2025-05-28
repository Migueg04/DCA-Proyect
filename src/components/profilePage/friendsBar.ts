import { fetchFriends } from "../../services/friendsServices";
import { Friend } from "../../utils/types/types";

class RightBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    const friends = await fetchFriends();
    this.render(friends);
  }

  render(friends: Friend[]) {
    this.shadowRoot!.innerHTML = `
      <style>
        .right-bar {
          position: fixed;
          top: 0;
          right: 0;
          width: 250px;
          height: 100vh;
          background-color: white;
          box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          display: flex;
          flex-direction: column;
          padding: 16px;
          box-sizing: border-box;
        }

        h1 {
          text-align: right;
          margin: 0 0 32px 0; /* más espacio debajo del título */
          font-size: 1.5rem;
          color: #333;
        }

        .friends-container {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: flex-end; /* alinea todas las tarjetas a la derecha */
        }

        .friend-card {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          justify-content: flex-end; /* alinea los elementos dentro de la tarjeta a la derecha */
        }

        .friend-card img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }

        .friend-card div {
          display: flex;
          flex-direction: column;
          text-align: right; /* alinea el texto del amigo a la derecha */
        }

        .friend-card strong {
          font-size: 16px;
          color: #EA3B81;
        }

        .friend-card span {
          font-size: 14px;
          color: #777;
        }
      </style>

      <div class="right-bar">
        <h1>FRIENDS</h1>
        <div class="friends-container">
          ${friends
            .map(
              (friend) => `
              <div class="friend-card">
                <div>
                  <strong>${friend.name}</strong>
                  <span>@${friend.username}</span>
                </div>
                <img src="${friend.avatar}" alt="${friend.name}" />
              </div>
            `
            )
            .join('')}
        </div>
      </div>
    `;
  }
}

export default RightBar;

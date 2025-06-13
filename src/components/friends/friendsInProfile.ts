import { store } from "../../Flux/Store";
import { UserActions } from "../../Flux/Actions";
import { Friend } from "../../utils/types/types";

class FriendsInProfile extends HTMLElement{
      private unsubscribe: (() => void) | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.unsubscribe = store.subscribe((state) => {
      const currentUser = state.currentUser;
      const friends = currentUser?.friends || [];
      this.render(friends);
    });

    const currentState = store.getState();
    const initialFriends = currentState.currentUser?.friends || [];
    this.render(initialFriends);
  }

  disconnectedCallback() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  private removeFriend(friendUsername: string, friendName: string) {
    const confirmDelete = confirm(`¿Estás seguro de que quieres eliminar a ${friendName} de tus amigos?`);
    if (confirmDelete) {
      try {
        
        UserActions.removeFriendFromProfile(friendUsername);
        
        console.log(`Amigo eliminado exitosamente: ${friendUsername}`);
        
        // Mostrar mensaje de confirmación
        this.showTemporaryMessage(`${friendName} ha sido eliminado de tus amigos`);
      } catch (error) {
        console.error('Error al eliminar amigo:', error);
        alert('Ha ocurrido un error al eliminar el amigo. Por favor, inténtalo de nuevo.');
      }
    }
  }

  private showTemporaryMessage(message: string) {
    // Crear elemento de mensaje temporal
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background-color: #4CAF50;
      color: white;
      padding: 12px 20px;
      border-radius: 4px;
      z-index: 10000;
      font-family: "Nunito", sans-serif;
      font-size: 14px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(messageDiv);
    
    // Remover después de 3 segundos
    setTimeout(() => {
      if (messageDiv.parentNode) {
        messageDiv.parentNode.removeChild(messageDiv);
      }
    }, 3000);
  }

  private setupEventListeners() {
    // Usar delegación de eventos para mejor performance
    const friendsContainer = this.shadowRoot!.querySelector('.friends-container');
    
    if (friendsContainer) {
      friendsContainer.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        
        // Verificar si se hizo clic en el botón de eliminar
        if (target.classList.contains('remove-friend-btn')) {
          e.preventDefault();
          e.stopPropagation();
          
          const friendUsername = target.dataset.friendId;
          const friendName = target.dataset.friendName;
          
          if (friendUsername && friendName) {
            this.removeFriend(friendUsername, friendName);
          } else {
            console.error('Datos del amigo no encontrados:', { friendUsername, friendName });
          }
        }
      });
    }
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
          margin: 30px 0 32px 0;
          font-size: 1.5rem;
          color: #333;
          font-family: "Nunito", sans-serif;
        }

        .friends-container {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: flex-end;
        }

        .friend-card {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          justify-content: flex-end;
          position: relative;
          animation: slideIn 0.3s ease-out;
          padding: 8px;
          border-radius: 8px;
          transition: all 0.2s ease;
          width: 100%;
          max-width: 220px;
        }

        .friend-card:hover {
          background-color: #f8f9fa;
          transform: translateX(-2px);
        }

        .friend-card:hover .remove-friend-btn {
          opacity: 1;
          visibility: visible;
        }

        .friend-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          justify-content: flex-end;
          flex: 1;
        }

        .friend-card img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #f0f0f0;
          transition: border-color 0.2s ease;
        }

        .friend-card:hover img {
          border-color: #EA3B81;
        }

        .friend-card .friend-details {
          display: flex;
          flex-direction: column;
          text-align: right;
        }

        .friend-card strong {
          font-size: 16px;
          color: #EA3B81;
          font-weight: 600;
        }

        .friend-card span {
          font-size: 14px;
          color: #777;
        }

        .remove-friend-btn {
          position: absolute;
          top: 50%;
          left: 25px;
          transform: translateY(-50%);
          background-color: #ff4757;
          color: white;
          border: none;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: bold;
          opacity: 0;
          visibility: hidden;
          transition: all 0.2s ease;
          z-index: 10;
        }

        .remove-friend-btn:hover {
          background-color: #ff3742;
          transform: translateY(-50%) scale(1.1);
        }

        .remove-friend-btn:active {
          transform: translateY(-50%) scale(0.95);
        }

        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex: 1;
          color: #999;
          text-align: center;
          font-family: "Nunito", sans-serif;
        }

        .empty-state p {
          margin: 8px 0;
          font-size: 14px;
        }

        .empty-state .emoji {
          font-size: 48px;
          margin-bottom: 16px;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
            transform: scale(1);
          }
          to {
            opacity: 0;
            transform: scale(0.8);
          }
        }

        .friend-card.removing {
          animation: fadeOut 0.3s ease-out forwards;
        }

        @media (max-width: 480px) {
          .right-bar {
            position: fixed;
            top: auto;
            bottom: 0;
            right: 0;
            width: 100%;
            height: 120px;
            padding: 12px 16px;
            box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
            background-color: white;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
          }

          h1 {
            text-align: center;
            font-size: 1.2rem;
            margin: 0 0 12px 0;
            width: 100%;
          }

          .friends-container {
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            gap: 16px;
            overflow-x: auto;
            overflow-y: hidden;
            width: 100%;
            padding-bottom: 8px;
          }

          .friend-card {
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            text-align: left;
            min-width: 140px;
            padding: 4px;
            gap: 10px;
            max-width: none;
          }

          .friend-info {
            justify-content: flex-start;
          }

          .friend-card img {
            width: 40px;
            height: 40px;
          }

          .friend-card .friend-details {
            text-align: left;
          }

          .friend-card strong {
            font-size: 14px;
          }

          .friend-card span {
            font-size: 12px;
          }

          .remove-friend-btn {
            position: absolute;
            top: 2px;
            right: 2px;
            left: auto;
            transform: none;
            width: 20px;
            height: 20px;
            font-size: 10px;
          }

          .remove-friend-btn:hover {
            transform: scale(1.1);
          }

          .empty-state {
            width: 100%;
            padding: 10px;
          }

          .empty-state p {
            font-size: 12px;
          }

          .empty-state .emoji {
            font-size: 32px;
            margin-bottom: 8px;
          }
        }
      </style>

      <div class="right-bar">
        <h1>Friends</h1>
        <div class="friends-container">
          ${friends.length === 0 ? `
            <div class="empty-state">
              <div class="emoji">👥</div>
              <p>You Have no friends!</p>
              <p>So sad:(</p>
              <p>Add some friends to see them here</p>
            </div>
          ` : friends
            .map(
              (friend) => `
              <div class="friend-card">
                <button 
                  class="remove-friend-btn" 
                  data-friend-id="${friend.username}" 
                  data-friend-name="${friend.name}"
                  title="Eliminar a ${friend.name}"
                  aria-label="Eliminar a ${friend.name} de tus amigos"
                >
                  ×
                </button>
                <div class="friend-info">
                  <div class="friend-details">
                    <strong>${friend.name}</strong>
                    <span>@${friend.username}</span>
                  </div>
                  <img src="${friend.avatar}" alt="Avatar de ${friend.name}" />
                </div>
              </div>
            `
            )
            .join('')}
        </div>
      </div>
    `;

    // Configurar event listeners después de renderizar
    this.setupEventListeners();
  }
}
export default FriendsInProfile
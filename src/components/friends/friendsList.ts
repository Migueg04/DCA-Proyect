import { UserActions } from '../../Flux/Actions';
import { Friend } from '../../utils/types/types';
import { store } from '../../Flux/Store';
import { getAllUsers } from '../../services/Userservice';


class FriendsList extends HTMLElement {
  friends: Friend[] = [];
  friendsPerPage: number = 3;
  private currentFriends: Friend[] = [];
  private unsubscribe: (() => void) | null = null;
  private currentUserFriends: Set<string> = new Set();

  constructor() {
    super();
  }

  connectedCallback() {
    // Suscribirse al store
    this.unsubscribe = store.subscribe((state) => {
      const userFriends = state.currentUser?.friends || [];
      this.currentUserFriends = new Set(userFriends.map(f => f.username));
      this.render();
    });

    // Obtener estado inicial
    const initialState = store.getState();
    const initialUserFriends = initialState.currentUser?.friends || [];
    this.currentUserFriends = new Set(initialUserFriends.map(f => f.username));

    // Obtener todos los usuarios y mostrarlos
    getAllUsers().then((users: Friend[]) => {
      const currentUser = store.getState().currentUser;
      const filtered = users.filter((u: Friend) => u.username !== currentUser?.username);
      this.data = filtered;
    });
  }

  disconnectedCallback() {
    if (this.unsubscribe) this.unsubscribe();
  }

  set data(friends: Friend[]) {
    this.friends = friends;
    this.currentFriends = this.friends.slice(0, this.friendsPerPage);
    this.render();
  }

  private attachEventListeners() {
    this.querySelectorAll('.plus-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const target = e.target as HTMLButtonElement;
        const friendIndex = parseInt(target.getAttribute('data-friend-index') || '0');
        const friend = this.currentFriends[friendIndex];

        if (!friend || this.currentUserFriends.has(friend.username)) return;

        target.textContent = '✓';
        target.disabled = true;
        target.style.background = '#28a745';
        target.style.cursor = 'not-allowed';

        UserActions.addFriendToProfile(friend);

        this.showTemporaryMessage(`${friend.name} has been added to your friends!`);
      });
    });

    const showMoreBtn = this.querySelector('.show-more');
    if (showMoreBtn) {
      showMoreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.loadMoreFriends();
      });
    }
  }

  private loadMoreFriends() {
    const currentStartIndex = this.friends.findIndex(f => f === this.currentFriends[0]);
    let nextStartIndex = currentStartIndex + this.friendsPerPage;

    // Reiniciar si alcanzamos el final
    if (nextStartIndex >= this.friends.length) {
      nextStartIndex = 0;
    }

    const nextBatch = this.friends.slice(nextStartIndex, nextStartIndex + this.friendsPerPage);

    // Si quedan menos de 3 al final, y queremos completar el grupo de 3 desde el principio:
    if (nextBatch.length < this.friendsPerPage) {
      const remaining = this.friends.slice(0, this.friendsPerPage - nextBatch.length);
      this.currentFriends = [...nextBatch, ...remaining];
    } else {
      this.currentFriends = nextBatch;
    }

    this.render();
  }

  private showTemporaryMessage(message: string) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background-color: #28a745;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      z-index: 10000;
      font-family: "Nunito", sans-serif;
      font-size: 14px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      animation: slideInRight 0.3s ease-out;
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }
    `;
    document.head.appendChild(styleSheet);
    document.body.appendChild(messageDiv);

    setTimeout(() => {
      messageDiv.style.animation = 'slideOutRight 0.3s ease-in forwards';
      setTimeout(() => {
        messageDiv.remove();
        styleSheet.remove();
      }, 300);
    }, 3000);
  }

  private isAlreadyFriend(friendUsername: string): boolean {
    return this.currentUserFriends.has(friendUsername);
  }

  render() {
    const hasMoreFriends = this.currentFriends.length < this.friends.length;

    this.innerHTML = `
    <style>
      .friends h3,
      .news h3 {
        font-size: 0.9rem;
        font-weight: 600;
        color: #555;
        margin-bottom: 1rem;
        text-align: center;
      }

      .friend {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1.2rem;
        transition: all 0.2s ease;
      }

      .friend:hover {
        transform: translateX(2px);
      }

      .friend img {
        width: 48px;
        height: 48px;
        border-radius: 999px;
        object-fit: cover;
        border: 2px solid #f0f0f0;
        transition: border-color 0.2s ease;
      }

      .friend:hover img {
        border-color: #ff007f;
      }

      .friend div {
        font-size: 0.9rem;
        line-height: 1.2;
        flex: 1;
      }

      .friend strong {
        display: block;
        font-weight: 600;
        color: #000000;
      }

      .friend span {
        color: #888888;
        font-size: 0.85rem;
      }

      .friend button {
        margin-left: auto;
        background: #ff007f;
        border: none;
        color: white;
        font-size: 1rem;
        font-weight: bold;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .friend button:hover:not(:disabled) {
        background: #e6006b;
        transform: scale(1.05);
      }

      .friend button:disabled {
        background: #28a745 !important;
        cursor: not-allowed !important;
        transform: none !important;
      }

      .friend button.already-friend {
        background: #28a745;
        cursor: not-allowed;
      }

      .friend button.already-friend:hover {
        background: #28a745;
        transform: none;
      }

      .show-more {
        display: ${hasMoreFriends ? 'block' : 'none'};
        width: 100%;
        background: #ff007f;
        color: white;
        border: none;
        padding: 0.6rem 0;
        border-radius: 999px;
        font-weight: bold;
        margin: 1rem auto 0 auto;
        cursor: pointer;
        text-align: center;
        transition: all 0.3s ease;
      }

      .show-more:hover {
        background: #e6006b;
        transform: translateY(-1px);
      }

      .show-more:active {
        transform: translateY(0);
      }

      .friends ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .friends li {
        list-style: none;
      }
    </style>
    <section class="friends">
      <h3>Next-level gamers to follow</h3>
      <ul>
        ${this.currentFriends.map((friend, index) => {
          const isAlreadyFriend = this.isAlreadyFriend(friend.username);
          return `
            <li class="friend">
              <img src="${friend.avatar}" alt="${friend.name}" />
              <div>
                <strong>${friend.name}</strong>
                <span>@${friend.username}</span>
              </div>
              <button
                type="button"
                class="plus-btn ${isAlreadyFriend ? 'already-friend' : ''}"
                data-friend-index="${index}"
                ${isAlreadyFriend ? 'disabled' : ''}
                title="${isAlreadyFriend ? 'Already in your friends list' : `Add ${friend.name} to friends`}"
              >
                ${isAlreadyFriend ? '✓' : '+'}
              </button>
            </li>
          `;
        }).join('')}
      </ul>
      <button type="button" class="show-more">Show more</button>
    </section>
    `;

    this.attachEventListeners();
  }
}

export default FriendsList;
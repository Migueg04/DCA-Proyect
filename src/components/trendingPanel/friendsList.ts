// src/components/friends-list.ts
import { Friend } from '../../utils/types/types';

class FriendsList extends HTMLElement {
  friends: Friend[] = [];

  set data(friends: Friend[]) {
    this.friends = friends;
    this.render();
  }

  render() {
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
      }

      .friend img {
        width: 48px;
        height: 48px;
        border-radius: 999px;
        object-fit: cover;
      }

      .friend div {
        font-size: 0.9rem;
        line-height: 1.2;
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
      }

      .show-more {
        display: block;
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
      }
    </style>
      <section class="friends">
        <h3>Next-level gamers to follow</h3>
        <ul>
          ${this.friends.map(friend => `
            <li class="friend">
              <img src="${friend.avatar}" alt="${friend.name}" />
              <div>
                <strong>${friend.name}</strong>
                <span>@${friend.username}</span>
              </div>
              <button class="plus-btn">+</button>
            </li>
          `).join('')}
        </ul>
        <button class="show-more">Show more</button>
      </section>
    `;

    this.querySelectorAll('.plus-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const modal = document.createElement('create-drop-modal');
        document.body.appendChild(modal);
      });
    });

    this.querySelector('.show-more')?.addEventListener('click', () => {
      console.log('ver nuevos amigos');
    });
  }
}
export default FriendsList;

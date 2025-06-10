// src/components/trending-panel.ts
import { Friend, News } from '../../utils/types/types';
import FriendsList from './friendsList';
import NewsList from './newsList';


class TrendingPanel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    const friends = await this.fetchJSON('/data/friends.json');
    const news = await this.fetchJSON('/data/news.json');
    this.render(friends, news);
  }

  async fetchJSON(path: string) {
    const response = await fetch(path);
    return response.json();
  }

  render(friends: Friend[], news: News[]) {
    this.shadowRoot!.innerHTML = `
      <style>
        .trending-panel {
          position: fixed;
          top: 40px;
          right: 40px;
          width: 290px;
          background: #ffffff;
          color: #000;
          border-radius: 24px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          padding: 1.5rem 1.25rem;
          overflow-y: auto;
          font-family: 'Segoe UI', sans-serif;
          z-index: 1000;
        }

        @media (max-width: 768px) {
          .trending-panel {
            display: none;
          }
        }
      </style>

      <div class="trending-panel">
        <friends-list></friends-list>
        <news-list></news-list>
      </div>
    `;

    const friendsList = this.shadowRoot!.querySelector('friends-list') as FriendsList;
    friendsList.data = friends;

    const newsList = this.shadowRoot!.querySelector('news-list') as NewsList;
    newsList.data = news;
  }
}

export default TrendingPanel;

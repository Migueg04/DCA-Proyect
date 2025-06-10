// src/components/news-list.ts
import { News } from '../../utils/types/types';

class NewsList extends HTMLElement {
  news: News[] = [];

  set data(news: News[]) {
    this.news = news;
    this.render();
  }

  render() {
    this.innerHTML = `
    <style>
    .news h3 {
        margin-top: 2rem;
        font-size: 1rem;
        font-weight: bold;
        color: #111;
        text-align: center;
      }

      .news-card {
        position: relative;
        border-radius: 16px;
        background-size: cover;
        background-position: center;
        height: 140px;
        margin: 1rem 0;
        overflow: hidden;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
      }

      .overlay {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0.75rem 1rem;
        background: rgba(0, 0, 0, 0.45);
        backdrop-filter: blur(4px);
        color: white;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .overlay h4 {
        margin: 0;
        font-size: 1rem;
        font-weight: bold;
      }

      .overlay p {
        font-size: 0.8rem;
        margin: 0;
      }

      .overlay button {
        position: absolute;
        bottom: 0.75rem;
        right: 2.8rem;
        transform: translateX(-4px);
        background: #ff007f;
        border: none;
        border-radius: 50%;
        width: 28px;
        height: 28px;
        font-weight: bold;
        color: white;
        cursor: pointer;
      }
    </style>
      <section class="news">
        <h3>#Trending</h3>
        <div class="news-list">
          ${this.news.map(item => `
            <div class="news-card" style="background-image: url('${item.image}')">
              <div class="overlay">
                <h4>${item.title}</h4>
                <p>${item.subtitle}</p>
                <button class="plus-btn">+</button>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;

    this.querySelectorAll('.plus-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const modal = document.createElement('create-drop-modal');
        document.body.appendChild(modal);
      });
    });
  }
}

export default NewsList;

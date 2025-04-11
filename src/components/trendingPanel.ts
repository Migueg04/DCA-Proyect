import { Friend, News } from '../types/types';

class TrendingPanel extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	async connectedCallback() {
		const friends = await this.fetchJSON('../../src/data/friends.json');
		const news = await this.fetchJSON('../../src/data/news.json');
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
    width: 320px;
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
    right: 0.75rem;
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

      <div class="trending-panel">
        <section class="friends">
          <h3>Next-level gamers to follow</h3>
          <ul>
            ${friends
							.map(
								(friend) => `
              <li class="friend">
                <img src="${friend.avatar}" alt="${friend.name}" />
                <div>
  <strong>${friend.name}</strong>
  <span>@${friend.username}</span>
</div>
                <button>+</button>
              </li>
            `
							)
							.join('')}
          </ul>
          <button class="show-more">Show more</button>
        </section>

        <section class="news">
          <h3>#Trending</h3>
          <div class="news-list">
            ${news
							.map(
								(item) => `
              <div class="news-card" style="background-image: url('${item.image}')">
                <div class="overlay">
                  <h4>${item.title}</h4>
                  <p>${item.subtitle}</p>
                  <button>+</button>
                </div>
              </div>
            `
							)
							.join('')}
          </div>
        </section>
      </div>
    `;
	}
}

customElements.define('trending-panel', TrendingPanel);

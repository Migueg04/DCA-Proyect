//import '../../public/style/trendingPanel.css';
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
          ${news
						.map(
							(item) => `
            <div class="news-card" style="background-image: url('${item.image}')">
              <div class="overlay">
                <p>${item.title}</p>
                <span>${item.subtitle}</span>
                <button>+</button>
              </div>
            </div>
          `
						)
						.join('')}
        </section>
      </div>
    `;
	}
}

customElements.define('trending-panel', TrendingPanel);

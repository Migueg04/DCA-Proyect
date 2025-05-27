import drops from '../data/drops.json';
import { createDropCard } from './dropCard';

interface Drop {
  username: string;
  verified: string;
  profileImage: string;
  content: string;
  image?: string;
}

class MainFeed extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const container = document.createElement('div');
    container.className = 'main-feed-wrapper';

    const style = document.createElement('style');
    style.textContent = `
      .main-feed-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 2rem 0 0 -11rem;
        gap: 1.5rem;
      }
        @media screen and (max-width: 768px) {
        .main-feed-wrapper {
          margin: 2rem 0 0 0; /* 🔁 centrado automático en pantallas chicas */
        }
    `;

    drops.forEach((drop: Drop) => {
      const card = createDropCard(drop);
      container.appendChild(card);
    });

    this.shadowRoot?.appendChild(style);
    this.shadowRoot?.appendChild(container);
  }
}

customElements.define('main-feed', MainFeed);
export default MainFeed;

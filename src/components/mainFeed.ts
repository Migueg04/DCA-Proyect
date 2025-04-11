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

    drops.forEach((drop: Drop) => {
      const card = createDropCard(drop);
      container.appendChild(card);
    });

    this.shadowRoot?.appendChild(container);
  }
}

customElements.define('main-feed', MainFeed);
export default MainFeed;
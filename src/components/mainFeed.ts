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
    this.render();
    window.addEventListener('drop-added', () => this.render());
  }

  render() {
    const container = document.createElement('div');
    container.innerHTML = ''; // limpiar contenido anterior

    const localDrops = JSON.parse(localStorage.getItem('userDrops') || '[]');
    const allDrops: Drop[] = [...localDrops, ...drops]; // nuevos primero

    allDrops.forEach((drop: Drop) => {
      const card = createDropCard(drop);
      container.appendChild(card);
    });

    this.shadowRoot!.innerHTML = ''; // limpiar todo
    this.shadowRoot!.appendChild(container);
  }
}

customElements.define('main-feed', MainFeed);
export default MainFeed;
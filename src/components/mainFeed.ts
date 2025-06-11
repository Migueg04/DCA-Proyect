import { createDropCard, Drop } from './dropCard';

const mockDrops: Drop[] = [
  {
    id: 'post-1',
    username: 'Nayoooo_Nesa',
    verified: 'https://cdn-icons-png.flaticon.com/512/5253/5253968.png',
    profileImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Minecraft-creeper-face.jpg/960px-Minecraft-creeper-face.jpg',
    content: 'Hola, me encanta este juegoo',
    image: 'https://i.ytimg.com/vi/33tkR93pKCk/sddefault.jpg'
  },
  {
    id: 'post-2',
    username: 'SalomeGaymer',
    verified: 'https://cdn-icons-png.flaticon.com/512/5253/5253968.png',
    profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNfF8nLc_K9GWpy14Q6CSM-Ae3iZAdQMRqpA&s',
    content: 'Otro drop más para probar los comentarios y likes.',
    image: 'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2020/05/hollow-knight-1943657.jpg?tf=3840x'
  }
];

class MainFeed extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    window.addEventListener('drop-added', () => this.render());
    window.addEventListener("drop-deleted", () => this.render());

  }

  render() {
    const container = document.createElement('div');
    container.innerHTML = ''; // limpiar contenido anterior

    const localDrops = JSON.parse(localStorage.getItem('userDrops') || '[]');
    const allDrops: Drop[] = [...localDrops, ...mockDrops]; // nuevos primero

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

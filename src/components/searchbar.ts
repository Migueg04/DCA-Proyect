import drops from '../data/drops.json';

class SearchBar extends HTMLElement {
  input?: string;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupSearch();
  }

  setupSearch() {
    const input = this.shadowRoot?.querySelector('input') as HTMLInputElement;
    const list = this.shadowRoot?.querySelector('ul') as HTMLUListElement;

    input.addEventListener('input', () => {
      const value = input.value.toLowerCase();
      const results = drops.filter(user =>
        user.username.toLowerCase().includes(value)
      );

      list.innerHTML = results.length
        ? results
            .map(
              user => `
          <li>
            <img src="${user.profileImage}" alt="${user.username}" />
            <span>${user.username}</span>
          </li>`
            )
            .join('')
        : '<li>No se encontraron resultados</li>';
    });
  }

  render() {
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: sans-serif;
        }
        input {
          width: 100%;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 8px;
          margin-bottom: 8px;
          font-size: 14px;
        }
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
          max-height: 200px;
          overflow-y: auto;
        }
        li {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 6px 4px;
          cursor: pointer;
        }
        li:hover {
          background: #f3f3f3;
        }
        img {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
        }
      </style>
      <input type="text" placeholder="Buscar usuarios..." />
      <ul></ul>
    `;
  }
}

customElements.define('search-bar', SearchBar);
export default SearchBar;

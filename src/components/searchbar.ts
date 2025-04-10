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
  .search-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    background: transparent;
  }

  .search-container input {
    width: 100%;
    max-width: 300px;
    background: transparent;
    border: none;
    border-bottom: 2px solid #ec4899;
    padding: 0.5rem;
    color: white;
    font-size: 16px;
    outline: none;
  }

  .search-container input::placeholder {
    color: #ccc;
  }

  @media (max-width: 600px) {
    .search-container {
      padding: 0.5rem;
    }

    .search-container input {
      font-size: 14px;
      max-width: 100%;
    }
  }
</style>
      <input type="text" placeholder="Search for Usernames..." />
      <ul></ul>
    `;
  }
}

customElements.define('search-bar', SearchBar);
export default SearchBar;

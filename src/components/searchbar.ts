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
    align-items: center;
    background-color: #5c546e;
    border-radius: 1.5rem;
    padding: 0.5rem 1rem;
    width: 100%;
    max-width: 300px;
    margin-bottom: 1rem;
  }

  input {
    background: transparent;
    border: none;
    outline: none;
    color: white;
    font-size: 1rem;
    flex: 1;
    padding-left: 0.5rem;
  }

  input::placeholder {
    color: rgba(255, 255, 255, 0.8);
  }

  .icon {
    width: 20px;
    height: 20px;
    filter: invert(1); 
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0.5rem 0 0;
    background-color: #2b2638;
    border-radius: 0.5rem;
    max-height: 200px;
    overflow-y: auto;
  }

  li {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    color: white;
    border-bottom: 1px solid #444;
  }

  li:last-child {
    border-bottom: none;
  }

  li img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 0.5rem;
  }

  li span {
    font-size: 0.9rem;
  }
</style>

      <div>
        <div class="search-container">
          <a href="#">
            <img class="icon" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwNzAxMjMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1zZWFyY2gtaWNvbiBsdWNpZGUtc2VhcmNoIj48Y2lyY2xlIGN4PSIxMSIgY3k9IjExIiByPSI4Ii8+PHBhdGggZD0ibTIxIDIxLTQuMy00LjMiLz48L3N2Zz4=" alt="Search" />
          </a>
          <input type="text" placeholder="Buscar usuarios..." />
        </div>
        <ul></ul>
      </div>
    `;
  }
}

customElements.define('search-bar', SearchBar);
export default SearchBar;

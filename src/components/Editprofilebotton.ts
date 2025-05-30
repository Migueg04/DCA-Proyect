import Navigate from "../utils/Navigate";
class EditProfileButton extends HTMLElement {
    constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });


    const style = document.createElement('style');
    style.textContent = `
    <style>
    @media (max-width: 768px) {
    .menu {
    flex-direction: column;
}}
    button {
        display: flex;
        align-items: center;
        gap: 8px;
        background-color: #FFD02E;
        color: black;
        border: none;
        border-radius: 20px;
        padding: 10px 16px;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        font-family: sans-serif;
    }

    button:hover {
        filter: brightness(0.95);
    }

    .icon {
        font-size: 18px;
    }
    </style>
    <div class="Editprofile" navigate-to="/Editprofile"></div>
    `;

    const button = document.createElement('button');
    button.innerHTML = `<span class="icon">⚙️</span>Edit profile`;

    this.shadowRoot?.querySelectorAll('[navigate-to]').forEach(element => {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            const path = element.getAttribute('navigate-to');
            if (path) {
            Navigate(path);
            }
        });
        });
    }
}


customElements.define('edit-profile-button', EditProfileButton);

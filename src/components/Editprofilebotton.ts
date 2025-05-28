class EditProfileButton extends HTMLElement {
    constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });


    const style = document.createElement('style');
    style.textContent = `
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
    `;

    const button = document.createElement('button');
    button.innerHTML = `<span class="icon">⚙️</span>Edit profile`;

    button.addEventListener('click', () => {
    ;
    });

    shadow.appendChild(style);
    shadow.appendChild(button);
    }
}


customElements.define('edit-profile-button', EditProfileButton);

class Section extends HTMLElement {
    private commentsVisible = false;

    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.setupListeners();
    }

    render() {
        this.innerHTML = `
            <style>
                #icono {
                    background-color: rgb(178, 35, 35);
                    width: 80vw;
                }
                #commentsContainer {
                    display: none;
                }
            </style>
            <div id="icono">
                <button id="accion"> Hola </button>
            </div>
            <div id="commentsContainer">
                <comments-component></comments-component>
            </div>
        `;
    }

    setupListeners() {
        const button = this.querySelector('#accion');
        const commentsContainer = this.querySelector('#commentsContainer');

        if (button && commentsContainer) {
            button.addEventListener('click', () => {
                this.commentsVisible = !this.commentsVisible;
                commentsContainer.setAttribute('style', `display: ${this.commentsVisible ? 'block' : 'none'}`);
            });
        }
    }
}

customElements.define('section-component', Section);
export default Section;
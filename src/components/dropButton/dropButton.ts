class Button extends HTMLElement {

    shadow: ShadowRoot;
    

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
    }

    connectedCallback(): void {
        this.render();
        this.addEvents();
    }

    render(): void {
        this.shadow.innerHTML = `
            <style>
                button {
                    background-color: #EA3B81;
                    font-family: "Nunito";
                    font-weight: bold;
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
                    border-top-right-radius: 10px;
                    border-bottom-right-radius: 10px;
                    border: none;
                    color: white;
                    cursor: pointer;
                    font-size: 15px;
                    height: 100%;
                }

                @media (max-width: 425px) {
                    button {
                        font-size: 12px;
                    }
                }
            </style>

            <button id="drop">Drop!</button>
        `;
    }

    addEvents(): void {
        const button = this.shadow.querySelector("#drop") as HTMLButtonElement | null;
        if (button) {
            button.addEventListener("click", () => {
                this.dispatchEvent(new CustomEvent("button-click", {
                    bubbles: true,
                    composed: true
                }));
            });
        }
    }
    
}
export default Button;

class MainPage extends HTMLElement{
    constructor(){
        super()
        this.attachShadow({mode: 'open'})
    }

    connectedCallback(){
        this.render()
    }

    render(){
        if(this.shadowRoot)
            this.shadowRoot.innerHTML = `
            <style>
                body {
                    margin: 0;
                    font-family: sans-serif;
                }

                .layout {
                    display: flex;
                }

                side-bar {
                    flex-shrink: 0;
                }

                .main-content {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 1rem;
                }

                @media (max-width: 600px) {
                    .layout {
                        flex-direction: column;
                    }

                    .main-content {
                        margin-left: 0;
                        margin-bottom: 64px;
                    }

                    side-bar {
                        position: fixed;
                        bottom: 0;
                        left: 0;
                        width: 100vw;
                        height: 64px;
                    }
                }
            </style>


            <main class="main-content">
                <search-bar placeholder="Search users..."></search-bar>
                <main-feed></main-feed>
            </main>

            <trending-panel></trending-panel>
        `;
    }
}
export default MainPage
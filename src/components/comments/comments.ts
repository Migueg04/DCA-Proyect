class Comments extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"})
    }

    connectedCallback(){
        this.render()
    }

    render(){
        if (this.shadowRoot)
            this.shadowRoot.innerHTML = `
                
                
            `
    }
}
export default Comments
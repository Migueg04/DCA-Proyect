import comentarios from '../../data/comments.json'; 

type commentsRespuesta = {
    username: string;
    verified: string;
    content: string;
};

class Comments extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.addEventListener("button-click", () => {
            const input = this.querySelector("#input-comments-textfield") as HTMLInputElement | null;
            if (input) {
                console.log("Esto es un comentario nuevo:", input.value);
            }
        });
    }

    getRandomComments(): commentsRespuesta[] {
        const shuffled = [...comentarios].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 3);
    }

    render() {
        const randomComments = this.getRandomComments();
        const comentariosHTML = randomComments.map((comment: commentsRespuesta) => `
            <div class="username">
                <p>${comment.username}</p>
                <img src="${comment.verified}" alt="verified" class="verified-icon" />
            </div>
            <div class="message">${comment.content}</div>
        `).join("");

        this.innerHTML = `
            <style>
                #comments-container{
                    background-color: rgba(255, 254, 255, 0.33);
                    border-radius: 15px;
                    max-height: fit-content;
                    width: 40vw;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                .message{
                    margin: 2%;
                    color: #ffffff
                }

                .username {
                    font-weight: bold;
                    color: white;
                    display: flex;
                    font-weight: bold;
                }


                .verified-icon {
                    width: 16px;
                    height: 16px;
                    margin-left: 2%;
                }

                #comments{
                    width: 80%;
                    max-height: fit-content;
                    margin-top: 3vh;
                    font-family: "Nunito";
                }

                #input-comments{
                    margin-top: 20px;
                    display: flex;
                    justify-content: center;
                    margin-bottom: 10px;
                    width: 100%;
                }

                input{
                    height: 56%;
                    border: none;
                    border-top-left-radius: 10px;
                    border-bottom-left-radius: 10px;
                    border-top-right-radius: 0;
                    border-bottom-right-radius: 0;
                    outline: none;
                    font-size: 16px;
                    background-color: #ffffff;
                    color: #100c2a; /* texto del placeholder */
                    font-weight: 500;
                    width: 75%;
                    padding: 10px;
                    
                }


                @media (max-width:425px){
                    #comments-container{
                        background-color: rgb(80, 130, 130);
                        max-height: fit-content;
                        width: 75vw;
                    }

                    #comments{
                        width: 75%;
                        height: 80%;
                    }
                    
                    #input-comments{
                        margin-top: 20px;
                        display: flex;
                        justify-content: center;
                        margin-bottom: 10px;
                        width: 100%;
                    }

                    button{
                        background-color: #EA3B81;
                        font-family: "Nunito";
                        font-weight: bold;
                        border-top-left-radius: 0;
                        border-bottom-left-radius: 0;
                        border-top-right-radius: 10px;
                        border-bottom-right-radius: 10px;
                        border: none;
                        width:20%;
                        color: white;
                        cursor: pointer;
                        font-size: 12px;
                        height: 100%;  
                    }

                    input{
                        border: none;
                        border-top-left-radius: 10px;
                        border-bottom-left-radius: 10px;
                        border-top-right-radius: 0;
                        border-bottom-right-radius: 0;
                        outline: none;
                        font-size: 12px;
                        background-color: #ffffff;
                        color: #100c2a; 
                        font-weight: 500;
                        width: 70%;
                        height: 56%;
                    }
            </style>
            <div id="comments-container">
                <div id="comments">
                    ${comentariosHTML}
                </div>
                <div id="input-comments">
                    <input id="input-comments-textfield" type="text" placeholder="Add a comment...">
                    <button-component></button-component>
                </div>
            </div>
        `;
    }

}

export default Comments;

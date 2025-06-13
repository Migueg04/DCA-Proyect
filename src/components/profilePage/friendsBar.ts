class RightBar extends HTMLElement {


  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
      this.render();
  }

  render() {
    this.shadowRoot!.innerHTML = `
      <style>
        .right-bar {
          position: fixed;
          top: 0;
          right: 0;
          width: 250px;
          height: 100vh;
          background-color: white;
          box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          display: flex;
          flex-direction: column;
          padding: 16px;
          box-sizing: border-box;
        }

        @media (max-width: 480px) {
          .right-bar {
            position: fixed;
            top: auto;
            bottom: 0;
            right: 0;
            width: 100%;
            height: 120px;
            padding: 12px 16px;
            box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
            background-color: white;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
          }

      </style>

      <div class="right-bar">
        <h1>Friends</h1>
        <div class="friends-container">
          <friends-inprofile></friends-inprofile>
        </div>
      </div>
    `;

    
  }
}

export default RightBar;
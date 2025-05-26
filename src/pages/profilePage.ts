class ProfilePage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot!.innerHTML = `
      <profilecard-component
        bgimg="https://global.unitednations.entermediadb.net/assets/mediadb/services/module/asset/downloads/preset/Libraries/Graphics+Library/27-05-2022-Videogames-climate-05.jpg/image1440x560cropped.jpg"
        profileimg="https://i.pinimg.com/736x/e0/5a/19/e05a1996300035d853b03f8af6ce0c4a.jpg"
        name="EspacioTiago"
        username="Thiagospace"
        bio="Getting on a higher lvl in life, one lot drop at a time. 🎮🔥 #GG"
        age="19"
        friends="5"
      ></profilecard-component>
    `;
  }
}


export default ProfilePage;

(()=>{"use strict";var n={20:(n,e)=>{Object.defineProperty(e,"__esModule",{value:!0});class t extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}async connectedCallback(){const n=await this.fetchJSON("/data/friends.json"),e=await this.fetchJSON("/data/news.json");this.render(n,e)}async fetchJSON(n){return(await fetch(n)).json()}render(n,e){this.shadowRoot.innerHTML=`\n     <style>\n  .trending-panel {\n    position: fixed;\n    top: 40px;\n    right: 40px;\n    width: 290px;\n    background: #ffffff;\n    color: #000;\n    border-radius: 24px;\n    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);\n    padding: 1.5rem 1.25rem;\n    overflow-y: auto;\n    font-family: 'Segoe UI', sans-serif;\n    z-index: 1000;\n  }\n\n  @media (max-width: 768px) {\n    .trending-panel {\n      display: none;\n    }\n  }\n\n  .friends h3,\n  .news h3 {\n    font-size: 0.9rem;\n    font-weight: 600;\n    color: #555;\n    margin-bottom: 1rem;\n    text-align: center;\n  }\n\n  .friend {\n    display: flex;\n    align-items: center;\n    gap: 1rem;\n    margin-bottom: 1.2rem;\n  }\n\n  .friend img {\n    width: 48px;\n    height: 48px;\n    border-radius: 999px;\n    object-fit: cover;\n  }\n\n  .friend div {\n    font-size: 0.9rem;\n    line-height: 1.2;\n  }\n\n  .friend strong {\n    display: block;\n    font-weight: 600;\n    color: #000000;\n  }\n\n  .friend span {\n    color: #888888;\n    font-size: 0.85rem;\n  }\n\n  .friend button {\n    margin-left: auto;\n    background: #ff007f;\n    border: none;\n    color: white;\n    font-size: 1rem;\n    font-weight: bold;\n    width: 32px;\n    height: 32px;\n    border-radius: 50%;\n    cursor: pointer;\n  }\n\n  .show-more {\n    display: block;\n    width: 100%;\n    background: #ff007f;\n    color: white;\n    border: none;\n    padding: 0.6rem 0;\n    border-radius: 999px;\n    font-weight: bold;\n    margin: 1rem auto 0 auto;\n    cursor: pointer;\n    text-align: center;\n  }\n\n  .news h3 {\n    margin-top: 2rem;\n    font-size: 1rem;\n    font-weight: bold;\n    color: #111;\n    text-align: center;\n  }\n\n  .news-card {\n    position: relative;\n    border-radius: 16px;\n    background-size: cover;\n    background-position: center;\n    height: 140px;\n    margin: 1rem 0;\n    overflow: hidden;\n    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);\n  }\n\n  .overlay {\n    position: absolute;\n    bottom: 0;\n    width: 100%;\n    padding: 0.75rem 1rem;\n    background: rgba(0, 0, 0, 0.45);\n    backdrop-filter: blur(4px);\n    color: white;\n    display: flex;\n    flex-direction: column;\n    gap: 4px;\n  }\n\n  .overlay h4 {\n    margin: 0;\n    font-size: 1rem;\n    font-weight: bold;\n  }\n\n  .overlay p {\n    font-size: 0.8rem;\n    margin: 0;\n  }\n\n  .overlay button {\n    position: absolute;\n    bottom: 0.75rem;\n    right: 2.8rem;\n    transform: translateX(-4px);\n    background: #ff007f;\n    border: none;\n    border-radius: 50%;\n    width: 28px;\n    height: 28px;\n    font-weight: bold;\n    color: white;\n    cursor: pointer;\n  }\n</style>\n\n      <div class="trending-panel">\n        <section class="friends">\n          <h3>Next-level gamers to follow</h3>\n          <ul>\n            ${n.map((n=>`\n              <li class="friend">\n                <img src="${n.avatar}" alt="${n.name}" />\n                <div>\n  <strong>${n.name}</strong>\n  <span>@${n.username}</span>\n</div>\n                <button class="plus-btn">+</button>\n              </li>\n            `)).join("")}\n          </ul>\n          <button class="show-more">Show more</button>\n        </section>\n\n        <section class="news">\n          <h3>#Trending</h3>\n          <div class="news-list">\n            ${e.map((n=>`\n              <div class="news-card" style="background-image: url('${n.image}')">\n                <div class="overlay">\n                  <h4>${n.title}</h4>\n                  <p>${n.subtitle}</p>\n                  <button class="plus-btn">+</button>\n                </div>\n              </div>\n            `)).join("")}\n          </div>\n        </section>\n      </div>\n    `,this.shadowRoot.querySelectorAll(".plus-btn").forEach((n=>{n.addEventListener("click",(()=>{window.open("about:blank","_blank")}))}));const t=this.shadowRoot.querySelector(".show-more");t?.addEventListener("click",(()=>{window.open("about:blank","_blank")}))}}customElements.define("trending-panel",t),e.default=t},156:function(n,e,t){var o=this&&this.__importDefault||function(n){return n&&n.__esModule?n:{default:n}};Object.defineProperty(e,"__esModule",{value:!0}),t(20);const i=o(t(660)),a=o(t(786)),r=o(t(185));customElements.define("comments-component",i.default),customElements.define("button-component",a.default),customElements.define("section-component",r.default);const s=t(290),c=o(t(548)),d=document.getElementById("drops-container");if(!d)throw new Error("Contenedor de drops no encontrado");c.default.forEach((n=>{const e=(0,s.createDropCard)(n);d.appendChild(e)})),t(329),t(172)},172:function(n,e,t){var o=this&&this.__importDefault||function(n){return n&&n.__esModule?n:{default:n}};Object.defineProperty(e,"__esModule",{value:!0});const i=o(t(548));class a extends HTMLElement{input;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.setupSearch()}setupSearch(){const n=this.shadowRoot?.querySelector("input"),e=this.shadowRoot?.querySelector("ul");n.addEventListener("input",(()=>{const t=n.value.toLowerCase(),o=i.default.filter((n=>n.username.toLowerCase().includes(t)));e.innerHTML=o.length?o.map((n=>`\n          <li>\n            <img src="${n.profileImage}" alt="${n.username}" />\n            <span>${n.username}</span>\n          </li>`)).join(""):"<li>No se encontraron resultados</li>"}))}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=' \n      <style>\n  .search-container {\n    display: flex;\n    align-items: center;\n    background-color: #5c546e;\n    border-radius: 1.5rem;\n    padding: 0.5rem 1rem;\n    width: 100%;\n    max-width: 300px;\n    margin-bottom: 1rem;\n  }\n\n  input {\n    background: transparent;\n    border: none;\n    outline: none;\n    color: white;\n    font-size: 1rem;\n    flex: 1;\n    padding-left: 0.5rem;\n  }\n\n  input::placeholder {\n    color: rgba(255, 255, 255, 0.8);\n  }\n\n  .icon {\n    width: 20px;\n    height: 20px;\n    filter: invert(1); \n  }\n\n  ul {\n    list-style: none;\n    padding: 0;\n    margin: 0.5rem 0 0;\n    background-color: #2b2638;\n    border-radius: 0.5rem;\n    max-height: 200px;\n    overflow-y: auto;\n  }\n\n  li {\n    display: flex;\n    align-items: center;\n    padding: 0.5rem;\n    color: white;\n    border-bottom: 1px solid #444;\n  }\n\n  li:last-child {\n    border-bottom: none;\n  }\n\n  li img {\n    width: 30px;\n    height: 30px;\n    border-radius: 50%;\n    margin-right: 0.5rem;\n  }\n\n  li span {\n    font-size: 0.9rem;\n  }\n</style>\n\n      <div>\n        <div class="search-container">\n          <a href="#">\n            <img class="icon" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwNzAxMjMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1zZWFyY2gtaWNvbiBsdWNpZGUtc2VhcmNoIj48Y2lyY2xlIGN4PSIxMSIgY3k9IjExIiByPSI4Ii8+PHBhdGggZD0ibTIxIDIxLTQuMy00LjMiLz48L3N2Zz4=" alt="Search" />\n          </a>\n          <input type="text" placeholder="Buscar usuarios..." />\n        </div>\n        <ul></ul>\n      </div>\n    ')}}customElements.define("search-bar",a),e.default=a},185:(n,e)=>{Object.defineProperty(e,"__esModule",{value:!0});class t extends HTMLElement{commentsVisible=!1;constructor(){super()}connectedCallback(){this.render(),this.setupListeners()}render(){this.innerHTML='\n            <style>\n                #icono {\n                    background-color: rgb(178, 35, 35);\n                    width: 10vw;\n                }\n                #commentsContainer {\n                    display: none;\n                }\n            </style>\n            <div id="icono">\n                <button id="accion"> Hola </button>\n            </div>\n            <div id="commentsContainer">\n                <comments-component></comments-component>\n            </div>\n        '}setupListeners(){const n=this.querySelector("#accion"),e=this.querySelector("#commentsContainer");n&&e&&n.addEventListener("click",(()=>{this.commentsVisible=!this.commentsVisible,e.setAttribute("style","display: "+(this.commentsVisible?"block":"none"))}))}}e.default=t},290:(n,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.createDropCard=function(n){const e=document.createElement("div");e.className="drop-card-wrapper";const t=`comments-${Math.random().toString(36).substr(2,9)}`;e.innerHTML=`\n    <style>\n      .drop-card-wrapper {\n        width: 70vw;\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n      }\n\n      .drop-card {\n        display: flex;\n        flex-direction: row;\n        background: #10062B;\n        color: white;\n        padding: 1rem;\n        margin-bottom: 1rem;\n        border-radius: 12px;\n        box-shadow: 0 0 10px rgba(255, 255, 255, 0.05);\n        gap: 1rem;\n        width: 100%;\n        align-items: flex-start;\n      }\n\n      .user-info {\n        display: flex;\n        align-items: center;\n        gap: 5%;\n      }\n\n      .drop-image {\n        width: 230px;\n        height: 230px;\n        object-fit: cover;\n        border-radius: 12px;\n      }\n\n      .drop-right {\n        flex: 1;\n        display: flex;\n        flex-direction: column;\n        justify-content: flex-start;\n        min-height: 230px;\n      }\n\n      .drop-header {\n        display: flex;\n        align-items: center;\n        gap: 0.4rem;\n        margin-bottom: 0.5rem;\n      }\n\n      .profile-img {\n        width: 35px;\n        height: 35px;\n        border-radius: 50%;\n        object-fit: cover;\n        display: block;\n      }\n\n      .username {\n        font-weight: bold;\n        color: white;\n      }\n\n      .verified-icon {\n        width: 16px;\n        height: 16px;\n      }\n\n      .drop-text {\n        font-size: 0.95rem;\n        line-height: 1.4;\n        color: white;\n      }\n\n      .comment-button {\n        background: none;\n        border: none;\n        padding: 0;\n        cursor: pointer;\n      }\n\n      .drop-actions {\n        display: flex;\n        gap: 2%;\n        padding-top: 30px;\n      }\n\n      .comments-container {\n        max-height: 0;\n        overflow: hidden;\n        transition: max-height 0.4s ease, padding 0.4s ease;\n        padding: 0 0;\n        margin-bottom: 0;\n      }\n\n      .comments-container.show {\n        max-height: 500px;\n        padding: 20px 0;\n        margin-bottom: 2rem;\n      }\n\n      @media screen and (max-width: 768px) {\n        .drop-card {\n          flex-direction: column;\n          align-items: center;\n        }\n\n        .drop-image {\n          width: 100%;\n          height: auto;\n        }\n\n        .drop-right {\n          width: 100%;\n        }\n\n        .drop-actions {\n          display: flex;\n          padding-top: 30px;\n        }\n      }\n    </style>\n\n    <div class="drop-card">\n      <div class="drop-image-container">\n        ${n.image?`<img src="${n.image}" alt="drop image" class="drop-image" />`:""}\n      </div>\n      <div class="drop-content">\n        <div class="drop-header">\n          <img src="${n.profileImage}" alt="${n.username}" class="profile-img" />\n          <div class="user-info">\n            <span class="username">${n.username}</span>\n            <img src="${n.verified}" alt="verified" class="verified-icon" />\n          </div>\n        </div>\n        <p class="drop-text">${n.content}</p>\n\n        <div class="drop-actions">\n          <button class="comment-button" type="button">\n            <i class="fa-regular fa-comment fa-xl" style="color: #ffffff;"></i>\n          </button>\n          <button class="comment-button" type="button">\n            <i class="fa-regular fa-heart fa-xl" style="color: #ffffff;"></i>\n          </button>\n          <button class="comment-button" type="button">\n            <i id="bookmarkIcon" class="fa-regular fa-bookmark fa-xl" style="color: #ffffff; cursor: pointer;"></i>\n          </button>\n        </div>\n      </div>\n    </div>\n\n    <div id="${t}" class="comments-container">\n      <comments-component></comments-component>\n    </div>\n  `;const o=e.querySelector(".comment-button"),i=e.querySelector(`#${t}`);if(o&&i){let n=!1;o.addEventListener("click",(()=>{n=!n,i.classList.toggle("show",n)}))}return e}},329:(n,e)=>{var t;Object.defineProperty(e,"__esModule",{value:!0}),e.SidebarAttribute=void 0,function(n){n.logo="logo",n.home="home",n.bookmark="bookmark",n.add="add"}(t||(e.SidebarAttribute=t={}));class o extends HTMLElement{logo;home;bookmark;add;profileimg;static get observedAttributes(){return["logo","home","bookmark","add","profileimg"]}constructor(){super(),this.attachShadow({mode:"open"})}attributeChangedCallback(n,e,t){null!==t&&(this[n]=t),this.render()}connectedCallback(){this.render()}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`\n    <style>\n        :host {\n          display: flex;\n          flex-direction: column;\n          align-items: center;\n          justify-content: space-between;\n          background-color: #ec4899;\n          width: 64px;\n          height: 100vh;\n          padding: 1rem 0;\n          box-sizing: border-box;\n          font-family: sans-serif;\n          border-radius: 20px;\n          position: fixed;\n          left: 0;\n          top: 0;\n        }\n\n        .icons {\n          display: flex;\n          flex-direction: column;\n          align-items: center;\n        }\n\n        .top-icons {\n          display: flex;\n          flex-direction: column;\n          align-items: center;\n          gap: 0.4rem;\n          width: 100%;\n        }\n\n        .top-icons a {\n          display: flex;\n          align-items: center;\n          justify-content: center;\n          width: 100%;\n          height: 40px;\n          cursor: pointer;\n        }\n\n        .top-icons img {\n          width: 24px;\n          height: 24px;\n        }\n\n        .profile {\n          width: 44px;\n          height: 44px;\n          border-radius: 50%;\n          overflow: hidden;\n          border: 2px solid white;\n          margin-bottom: 0.5rem;\n        }\n\n        .profile img {\n          width: 100%;\n          height: 100%;\n          object-fit: cover;\n        }\n\n        @media (max-width: 600px) {\n          :host {\n            flex-direction: row;\n            width: 100%;\n            height: auto;\n            border-radius: 0;\n            padding: 0.5rem;\n            top: auto;\n            bottom: 0;\n          }\n\n          .top-icons {\n            flex-direction: row;\n            gap: 0.4rem;\n          }\n\n          .top-icons a {\n            width: 40px;\n          }\n\n          .profile {\n            width: 36px;\n            height: 36px;\n            margin-bottom: 0;\n          }\n        }\n      </style>\n  <div class="icons">\n        <div class="top-icons">\n          <a class="icon-link" data-target="logo"><img src="${this.logo}" alt="Logo Icon" class="icon" /></a>\n          <a class="icon-link" data-target="home"><img src="${this.home}" alt="Home Icon" class="icon" /></a>\n          <a class="icon-link" data-target="add"><img src="${this.add}" alt="Add Icon" class="icon" /></a>\n          <a class="icon-link" data-target="bookmark"><img src="${this.bookmark}" alt="Bookmark Icon" class="icon" /></a>\n        </div>\n      </div>\n\n      <div class="profile">\n        <img src="${this.profileimg??""}" alt="Profile" />\n      </div>\n    `,this.shadowRoot.querySelectorAll(".icon-link").forEach((n=>{n.addEventListener("click",(n=>{n.preventDefault(),window.open("about:blank","_blank")}))})))}}customElements.define("side-bar",o),e.default=o},548:n=>{n.exports=JSON.parse('[{"username":"GoldenTarnished","verified":"https://cdn-icons-png.flaticon.com/512/5253/5253968.png","profileImage":"https://preview.redd.it/xsy6atxe7ql91.jpg?auto=webp&s=89a07bf36ccd56e91ddc7dd2b78f484f84d8ba70","content":"¡Aún no supero la pelea contra Malenia! Elden Ring es una obra de arte.","image":"https://media.vandal.net/m/4-2025/2/20254215355686_1.jpg"},{"username":"KnightEchoes","verified":"https://cdn-icons-png.flaticon.com/512/5253/5253968.png","profileImage":"https://assetsio.gnwcdn.com/how-hollow-knights-community-crafted-gibberish-into-a-real-language-1567781461548.jpg?width=1200&height=1200&fit=crop&quality=100&format=png&enable=upscale&auto=webp","content":"Hollow Knight me hace sentir cosas que ningún otro juego logró.","image":"https://assetsio.gnwcdn.com/how-hollow-knights-community-crafted-gibberish-into-a-real-language-1567781461548.jpg?width=1200&height=1200&fit=crop&quality=100&format=png&enable=upscale&auto=webp"},{"username":"PixelSteve","verified":"https://cdn-icons-png.flaticon.com/512/5253/5253968.png","profileImage":"https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Minecraft-creeper-face.jpg/800px-Minecraft-creeper-face.jpg","content":"Construí mi casa soñada en Minecraft y luego... llegó un creeper 🧨💥","image":"https://i.blogs.es/7cfcd0/casas-en-minecraft/840_560.jpeg"},{"username":"BuildBattleRoyale","verified":"https://cdn-icons-png.flaticon.com/512/5253/5253968.png","profileImage":"https://cdn2.unrealengine.com/fnce-33-30-tileview-ranked-cups-01-800x800-800x800-4181af1ba9f1.jpg","content":"Fortnite cada vez se pone más loco con las colaboraciones 😮‍💨","image":"https://cdn-0001.qstv.on.epicgames.com/SpeuoUpokQzgOVLpEs/image/landscape_comp.jpeg"},{"username":"OneTapValorant","verified":"https://cdn-icons-png.flaticon.com/512/5253/5253968.png","profileImage":"https://www.pcgamesn.com/wp-content/sites/pcgamesn/2022/04/valorant-characters-viper.jpg","content":"¿Soy yo o Jett está otra vez rota?","image":"https://s2.ppllstatics.com/diariovasco/www/multimedia/202003/07/media/cortadas/valorant-krnB-U100380467984jHB-1248x770@Diario%20Vasco.jpg"},{"username":"CyberRebel77","verified":"https://cdn-icons-png.flaticon.com/512/5253/5253968.png","profileImage":"https://hips.hearstapps.com/hmg-prod/images/cyberpunk-2077-fecha-precio-gameplay-requisitos-keanu-reeves-1-1601891846.jpeg","content":"Volví a Cyberpunk 2077 después del parche 2.0. Es otro juego 🔥","image":"https://www.cyberpunk.net/build/images/cyberpunk/keyart-booklet@1x-6fce3457.jpg"},{"username":"GalacticJake","verified":"https://cdn-icons-png.flaticon.com/512/5253/5253968.png","profileImage":"https://media.vandal.net/m/3-2025/7/20253710562037_1.jpg","content":"Starfield tiene potencial, pero me pierdo en los menús 😵","image":"https://media.es.wired.com/photos/64f8ad08940fa6d04fba8a98/16:9/w_1280,c_limit/Starfield-Review-Featured-Games.png"},{"username":"KratosReturns","verified":"https://cdn-icons-png.flaticon.com/512/5253/5253968.png","profileImage":"https://i.blogs.es/526eb1/por-que-la-piel-de-kratos-es-blanca1/1366_2000.jpeg","content":"Jugar God of War con audífonos es otra experiencia 🎧","image":"https://easycdn.es/1/imagenes/god-of-war-2005-playstation-2-ps3_247696.jpg"},{"username":"MeowExplorer","verified":"https://cdn-icons-png.flaticon.com/512/5253/5253968.png","profileImage":"https://justagame.uk/wp-content/uploads/2023/05/stray-menu2-1.jpg?w=1203","content":"STRAY me hizo llorar. No estaba preparado para eso 😿","image":"https://www.slantmagazine.com/wp-content/uploads/2022/08/stray.jpg"},{"username":"WebSwinger2099","verified":"https://cdn-icons-png.flaticon.com/512/5253/5253968.png","profileImage":"https://gmedia.playstation.com/is/image/SIEPDC/spider-man-2-screenshot-miles-webwing-en-25may23.jpg?$1600px$","content":"Spider-Man 2 tiene las mejores mecánicas de balanceo hasta ahora 🕸️","image":"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2651280/ss_74e612eb0ae275bd6e7f69d407dda8b03d83629f.1920x1080.jpg?t=1738343995"},{"username":"ViceCityDreams","verified":"https://cdn-icons-png.flaticon.com/512/5253/5253968.png","profileImage":"https://es.digitaltrends.com/wp-content/uploads/2025/03/GTA-VI-Grand-Theft-Auto-VI-Rockstar-Games.jpg?fit=1200%2C800&p=1","content":"GTA VI será el evento gamer de la década, mark my words.","image":"https://www.muycomputer.com/wp-content/uploads/2024/08/GTA-6-fecha-de-lanzamiento.jpg"},{"username":"NoVARZone","verified":"https://cdn-icons-png.flaticon.com/512/5253/5253968.png","profileImage":"https://image.europafm.com/clipping/cmsimages02/2024/09/10/2A6D30A4-242D-4B91-9CA9-72D93E9F96CE/lamine-yamal-joven-futbolista-records-que-escucha-karol_98.jpg?crop=4917,2766,x0,y0&width=1900&height=1069&optimize=low&format=webply","content":"FIFA 24 sigue siendo lo mismo... pero igual me vicio ⚽"},{"username":"LinkAwakens","verified":"https://cdn-icons-png.flaticon.com/512/5253/5253968.png","profileImage":"https://nintenduo.com/wp-content/uploads/2023/03/Novedades-Zelda-Tears-Kingdom-01.webp","content":"Tears of the Kingdom es una carta de amor al diseño de mundo abierto.","image":"https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2023/05/zelda-tears-kingdom-3034236.jpg?tf=3840x"},{"username":"JumpMaster","verified":"https://cdn-icons-png.flaticon.com/512/5253/5253968.png","profileImage":"https://cdn.vox-cdn.com/thumbor/uIIJHwjzSyo2uqDrH_8pNBnHtKs=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/21938762/wraith.jpg","content":"Apex necesita un nuevo mapa urgente 😤"},{"username":"BaronStealer","verified":"https://cdn-icons-png.flaticon.com/512/5253/5253968.png","profileImage":"https://assetsio.gnwcdn.com/how-hollow-knights-community-crafted-gibberish-into-a-real-language-1567781461548.jpg?width=1200&height=1200&fit=crop&quality=100&format=png&enable=upscale&auto=webp","content":"League of Legends me hace feliz y miserable al mismo tiempo 💔😂","image":"https://assetsio.gnwcdn.com/how-hollow-knights-community-crafted-gibberish-into-a-real-language-1567781461548.jpg?width=1200&height=1200&fit=crop&quality=100&format=png&enable=upscale&auto=webp"}]')},660:function(n,e,t){var o=this&&this.__importDefault||function(n){return n&&n.__esModule?n:{default:n}};Object.defineProperty(e,"__esModule",{value:!0});const i=o(t(980));class a extends HTMLElement{constructor(){super()}connectedCallback(){this.render(),this.addEventListener("button-click",(()=>{const n=this.querySelector("#input-comments-textfield");n&&console.log("Esto es un comentario nuevo:",n.value)}))}getRandomComments(){return[...i.default].sort((()=>Math.random()-.5)).slice(0,3)}render(){const n=this.getRandomComments().map((n=>`\n            <div class="username">\n                <p>${n.username}</p>\n                <img src="${n.verified}" alt="verified" class="verified-icon" />\n            </div>\n            <div class="message">${n.content}</div>\n        `)).join("");this.innerHTML=`\n            <style>\n                #comments-container{\n                    \n                    border-radius: 15px;\n                    max-height: fit-content;\n                    width: 40vw;\n                    display: flex;\n                    flex-direction: column;\n                    justify-content: center;\n                    align-items: center;\n                }\n\n                .message{\n                    margin: 1%;\n                    margin-bottom: 7%;\n                    color: #ffffff\n                }\n\n                .username {\n                    font-weight: bold;\n                    color: white;\n                    display: flex;\n                    font-weight: bold;\n                }\n\n\n                .verified-icon {\n                    width: 16px;\n                    height: 16px;\n                    margin-left: 2%;\n                }\n\n                #comments{\n                    width: 80%;\n                    max-height: fit-content;\n                    margin-top: 3vh;\n                    font-family: "Nunito";\n                }\n\n                #input-comments{\n                    margin-top: 20px;\n                    display: flex;\n                    justify-content: center;\n                    margin-bottom: 10px;\n                    width: 100%;\n                }\n\n                input{\n                    height: 56%;\n                    border: none;\n                    border-top-left-radius: 10px;\n                    border-bottom-left-radius: 10px;\n                    border-top-right-radius: 0;\n                    border-bottom-right-radius: 0;\n                    outline: none;\n                    font-size: 16px;\n                    background-color: #ffffff;\n                    color: #100c2a; /* texto del placeholder */\n                    font-weight: 500;\n                    width: 75%;\n                    padding: 10px;\n                    \n                }\n\n\n                @media (max-width:426px){\n                    #comments-container{\n                        \n                        max-height: fit-content;\n                        width: 80vw;\n                    }\n\n                    .message{\n                        margin: 5%;\n                        color: #ffffff\n                    }\n\n                    #comments{\n                        width: 80%;\n                        height: 80%;\n                    }\n                    \n                    #input-comments{\n                        margin-top: 20px;\n                        display: flex;\n                        justify-content: center;\n                        margin-bottom: 10px;\n                        width: 100%;\n                    }\n\n                    button{\n                        background-color: #EA3B81;\n                        font-family: "Nunito";\n                        font-weight: bold;\n                        border-top-left-radius: 0;\n                        border-bottom-left-radius: 0;\n                        border-top-right-radius: 10px;\n                        border-bottom-right-radius: 10px;\n                        border: none;\n                        width:20%;\n                        color: white;\n                        cursor: pointer;\n                        font-size: 12px;\n                        height: 100%;  \n                    }\n\n                    input{\n                        border: none;\n                        border-top-left-radius: 10px;\n                        border-bottom-left-radius: 10px;\n                        border-top-right-radius: 0;\n                        border-bottom-right-radius: 0;\n                        outline: none;\n                        font-size: 12px;\n                        background-color: #ffffff;\n                        color: #100c2a; \n                        font-weight: 500;\n                        width: 70%;\n                        height: 56%;\n                    }\n            </style>\n            <div id="comments-container">\n                <div id="comments">\n                    ${n}\n                </div>\n                <div id="input-comments">\n                    <input id="input-comments-textfield" type="text" placeholder="Add a comment...">\n                    <button-component></button-component>\n                </div>\n            </div>\n        `}}e.default=a},786:(n,e)=>{Object.defineProperty(e,"__esModule",{value:!0});class t extends HTMLElement{shadow;constructor(){super(),this.shadow=this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.addEvents()}render(){this.shadow.innerHTML='\n            <style>\n                button {\n                    background-color: #EA3B81;\n                    font-family: "Nunito";\n                    font-weight: bold;\n                    border-top-left-radius: 0;\n                    border-bottom-left-radius: 0;\n                    border-top-right-radius: 10px;\n                    border-bottom-right-radius: 10px;\n                    border: none;\n                    color: white;\n                    cursor: pointer;\n                    font-size: 15px;\n                    height: 100%;\n                }\n\n                @media (max-width: 425px) {\n                    button {\n                        font-size: 12px;\n                    }\n                }\n            </style>\n\n            <button id="drop">Drop!</button>\n        '}addEvents(){const n=this.shadow.querySelector("#drop");n&&n.addEventListener("click",(()=>{this.dispatchEvent(new CustomEvent("button-click",{bubbles:!0,composed:!0}))}))}}e.default=t},980:n=>{n.exports=JSON.parse('[{"username":"@GoldenTarnished","verified":"https://cdn-icons-png.flaticon.com/512/5253/5253968.png","content":"Esto sí que no me lo esperaba."},{"username":"@KnightEchoes","verified":"https://cdn-icons-png.flaticon.com/512/5253/5253968.png","content":"¿Esto era todo?"},{"username":"@PixelSteve","verified":"https://cdn-icons-png.flaticon.com/512/5253/5253968.png","content":"Lo mejor que he visto hoy."},{"username":"@BuildBattleRoyale","verified":"https://cdn-icons-png.flaticon.com/512/5253/5253968.png","content":"Pasó sin pena ni gloria."},{"username":"@OneTapValorant","verified":"https://cdn-icons-png.flaticon.com/512/5253/5253968.png","content":"Clásico pero funcional."},{"username":"@CyberRebel77","verified":"https://cdn-icons-png.flaticon.com/512/5253/5253968.png","content":"10/10 sin dudas."},{"username":"@GalacticJake","verified":"https://cdn-icons-png.flaticon.com/512/5253/5253968.png","content":"Podría mejorar bastante."},{"username":"@KratosReturns","verified":"https://cdn-icons-png.flaticon.com/512/5253/5253968.png","content":"No sé qué pensar aún."},{"username":"@MeowExplorer","verified":"https://cdn-icons-png.flaticon.com/512/5253/5253968.png","content":"Demasiado underrated."},{"username":"@WebSwinger2099","verified":"https://cdn-icons-png.flaticon.com/512/5253/5253968.png","content":"Esto es arte."},{"username":"@ViceCityDreams","verified":"https://cdn-icons-png.flaticon.com/512/5253/5253968.png","content":"No era necesario."},{"username":"@NoVARZone","verified":"https://cdn-icons-png.flaticon.com/512/5253/5253968.png","content":"Visto mil veces."},{"username":"@LinkAwakens","verified":"https://cdn-icons-png.flaticon.com/512/5253/5253968.png","content":"Buen flow en general."},{"username":"@JumpMaster","verified":"https://cdn-icons-png.flaticon.com/512/5253/5253968.png","content":"Pffff... next."},{"username":"@BaronStealer","verified":"https://cdn-icons-png.flaticon.com/512/5253/5253968.png","content":"No sé si reír o llorar."},{"username":"@LootHunter","verified":"https://cdn-icons-png.flaticon.com/512/5253/5253968.png","content":"Insano."},{"username":"@ComboBreakerX","verified":"https://cdn-icons-png.flaticon.com/512/5253/5253968.png","content":"Necesito más de esto."},{"username":"@GGReplay","verified":"https://cdn-icons-png.flaticon.com/512/5253/5253968.png","content":"Se lucieron acá."},{"username":"@PixelRush","verified":"https://cdn-icons-png.flaticon.com/512/5253/5253968.png","content":"Esto no era lo que prometieron."},{"username":"@ClutchVision","verified":"https://cdn-icons-png.flaticon.com/512/5253/5253968.png","content":"GOTY material."}]')}},e={};!function t(o){var i=e[o];if(void 0!==i)return i.exports;var a=e[o]={exports:{}};return n[o].call(a.exports,a,a.exports,t),a.exports}(156)})();
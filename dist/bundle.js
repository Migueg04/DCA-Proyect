(()=>{"use strict";var e={172:function(e,n,t){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0});const a=o(t(548));class i extends HTMLElement{input;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.setupSearch()}setupSearch(){const e=this.shadowRoot?.querySelector("input"),n=this.shadowRoot?.querySelector("ul");e.addEventListener("input",(()=>{const t=e.value.toLowerCase(),o=a.default.filter((e=>e.username.toLowerCase().includes(t)));n.innerHTML=o.length?o.map((e=>`\n          <li>\n            <img src="${e.profileImage}" alt="${e.username}" />\n            <span>${e.username}</span>\n          </li>`)).join(""):"<li>No se encontraron resultados</li>"}))}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=' \n      <style>\n  .search-container {\n    display: flex;\n    align-items: center;\n    background-color: #5c546e;\n    border-radius: 1.5rem;\n    padding: 0.5rem 1rem;\n    width: 100%;\n    max-width: 300px;\n    margin-bottom: 1rem;\n  }\n\n  input {\n    background: transparent;\n    border: none;\n    outline: none;\n    color: white;\n    font-size: 1rem;\n    flex: 1;\n    padding-left: 0.5rem;\n  }\n\n  input::placeholder {\n    color: rgba(255, 255, 255, 0.8);\n  }\n\n  .icon {\n    width: 20px;\n    height: 20px;\n    filter: invert(1); \n  }\n\n  ul {\n    list-style: none;\n    padding: 0;\n    margin: 0.5rem 0 0;\n    background-color: #2b2638;\n    border-radius: 0.5rem;\n    max-height: 200px;\n    overflow-y: auto;\n  }\n\n  li {\n    display: flex;\n    align-items: center;\n    padding: 0.5rem;\n    color: white;\n    border-bottom: 1px solid #444;\n  }\n\n  li:last-child {\n    border-bottom: none;\n  }\n\n  li img {\n    width: 30px;\n    height: 30px;\n    border-radius: 50%;\n    margin-right: 0.5rem;\n  }\n\n  li span {\n    font-size: 0.9rem;\n  }\n</style>\n\n      <div>\n        <div class="search-container">\n          <a href="#">\n            <img class="icon" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwNzAxMjMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1zZWFyY2gtaWNvbiBsdWNpZGUtc2VhcmNoIj48Y2lyY2xlIGN4PSIxMSIgY3k9IjExIiByPSI4Ii8+PHBhdGggZD0ibTIxIDIxLTQuMy00LjMiLz48L3N2Zz4=" alt="Search" />\n          </a>\n          <input type="text" placeholder="Buscar usuarios..." />\n        </div>\n        <ul></ul>\n      </div>\n    ')}}customElements.define("search-bar",i),n.default=i},329:(e,n)=>{var t;Object.defineProperty(n,"__esModule",{value:!0}),n.SidebarAttribute=void 0,function(e){e.logo="logo",e.home="home",e.bookmark="bookmark",e.add="add"}(t||(n.SidebarAttribute=t={}));class o extends HTMLElement{logo;home;bookmark;add;profileimg;static get observedAttributes(){return["logo","home","bookmark","add","profileimg"]}constructor(){super(),this.attachShadow({mode:"open"})}attributeChangedCallback(e,n,t){null!==t&&(this[e]=t),this.render()}connectedCallback(){this.render()}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`\n    <style>\n        :host {\n          display: flex;\n          flex-direction: column;\n          align-items: center;\n          justify-content: space-between;\n          background-color: #ec4899;\n          width: 64px;\n          height: 100vh;\n          padding: 1rem 0;\n          box-sizing: border-box;\n          font-family: sans-serif;\n          border-radius: 20px;\n          position: fixed;\n          left: 0;\n          top: 0;\n        }\n\n        .icons {\n          display: flex;\n          flex-direction: column;\n          align-items: center;\n        }\n\n        .top-icons {\n          display: flex;\n          flex-direction: column;\n          align-items: center;\n          gap: 0.4rem;\n          width: 100%;\n        }\n\n        .top-icons a {\n          display: flex;\n          align-items: center;\n          justify-content: center;\n          width: 100%;\n          height: 40px;\n          cursor: pointer;\n        }\n\n        .top-icons img {\n          width: 24px;\n          height: 24px;\n        }\n\n        .profile {\n          width: 44px;\n          height: 44px;\n          border-radius: 50%;\n          overflow: hidden;\n          border: 2px solid white;\n          margin-bottom: 0.5rem;\n        }\n\n        .profile img {\n          width: 100%;\n          height: 100%;\n          object-fit: cover;\n        }\n\n        @media (max-width: 600px) {\n          :host {\n            flex-direction: row;\n            width: 100%;\n            height: auto;\n            border-radius: 0;\n            padding: 0.5rem;\n            top: auto;\n            bottom: 0;\n          }\n\n          .top-icons {\n            flex-direction: row;\n            gap: 0.4rem;\n          }\n\n          .top-icons a {\n            width: 40px;\n          }\n\n          .profile {\n            width: 36px;\n            height: 36px;\n            margin-bottom: 0;\n          }\n        }\n      </style>\n  <div class="icons">\n        <div class="top-icons">\n          <a class="icon-link" data-target="logo"><img src="${this.logo}" alt="Logo Icon" class="icon" /></a>\n          <a class="icon-link" data-target="home"><img src="${this.home}" alt="Home Icon" class="icon" /></a>\n          <a class="icon-link" data-target="add"><img src="${this.add}" alt="Add Icon" class="icon" /></a>\n          <a class="icon-link" data-target="bookmark"><img src="${this.bookmark}" alt="Bookmark Icon" class="icon" /></a>\n        </div>\n      </div>\n\n      <div class="profile">\n        <img src="${this.profileimg??""}" alt="Profile" />\n      </div>\n    `,this.shadowRoot.querySelectorAll(".icon-link").forEach((e=>{e.addEventListener("click",(e=>{e.preventDefault(),window.open("about:blank","_blank")}))})))}}customElements.define("side-bar",o),n.default=o},548:e=>{e.exports=JSON.parse('[{"username":"GoldenTarnished","verified":"https://cdn-icons-png.flaticon.com/512/5253/5253968.png","profileImage":"https://preview.redd.it/xsy6atxe7ql91.jpg?auto=webp&s=89a07bf36ccd56e91ddc7dd2b78f484f84d8ba70","content":"¡Aún no supero la pelea contra Malenia! Elden Ring es una obra de arte.","image":"https://media.vandal.net/m/4-2025/2/20254215355686_1.jpg"},{"username":"KnightEchoes","verified":"https://cdn-icons-png.flaticon.com/512/5253/5253968.png","profileImage":"https://assetsio.gnwcdn.com/how-hollow-knights-community-crafted-gibberish-into-a-real-language-1567781461548.jpg?width=1200&height=1200&fit=crop&quality=100&format=png&enable=upscale&auto=webp","content":"Hollow Knight me hace sentir cosas que ningún otro juego logró.","image":"https://assetsio.gnwcdn.com/how-hollow-knights-community-crafted-gibberish-into-a-real-language-1567781461548.jpg?width=1200&height=1200&fit=crop&quality=100&format=png&enable=upscale&auto=webp"},{"username":"PixelSteve","verified":"https://cdn-icons-png.flaticon.com/512/5253/5253968.png","profileImage":"https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Minecraft-creeper-face.jpg/800px-Minecraft-creeper-face.jpg","content":"Construí mi casa soñada en Minecraft y luego... llegó un creeper 🧨💥","image":"https://i.blogs.es/7cfcd0/casas-en-minecraft/840_560.jpeg"},{"username":"BuildBattleRoyale","verified":"https://cdn-icons-png.flaticon.com/512/5253/5253968.png","profileImage":"https://cdn2.unrealengine.com/fnce-33-30-tileview-ranked-cups-01-800x800-800x800-4181af1ba9f1.jpg","content":"Fortnite cada vez se pone más loco con las colaboraciones 😮‍💨","image":"https://cdn-0001.qstv.on.epicgames.com/SpeuoUpokQzgOVLpEs/image/landscape_comp.jpeg"},{"username":"OneTapValorant","verified":"https://cdn-icons-png.flaticon.com/512/5253/5253968.png","profileImage":"https://www.pcgamesn.com/wp-content/sites/pcgamesn/2022/04/valorant-characters-viper.jpg","content":"¿Soy yo o Jett está otra vez rota?","image":"https://s2.ppllstatics.com/diariovasco/www/multimedia/202003/07/media/cortadas/valorant-krnB-U100380467984jHB-1248x770@Diario%20Vasco.jpg"},{"username":"CyberRebel77","verified":"https://cdn-icons-png.flaticon.com/512/5253/5253968.png","profileImage":"https://hips.hearstapps.com/hmg-prod/images/cyberpunk-2077-fecha-precio-gameplay-requisitos-keanu-reeves-1-1601891846.jpeg","content":"Volví a Cyberpunk 2077 después del parche 2.0. Es otro juego 🔥","image":"https://www.cyberpunk.net/build/images/cyberpunk/keyart-booklet@1x-6fce3457.jpg"},{"username":"GalacticJake","verified":"https://cdn-icons-png.flaticon.com/512/5253/5253968.png","profileImage":"https://media.vandal.net/m/3-2025/7/20253710562037_1.jpg","content":"Starfield tiene potencial, pero me pierdo en los menús 😵","image":"https://media.es.wired.com/photos/64f8ad08940fa6d04fba8a98/16:9/w_1280,c_limit/Starfield-Review-Featured-Games.png"},{"username":"KratosReturns","verified":"https://cdn-icons-png.flaticon.com/512/5253/5253968.png","profileImage":"https://i.blogs.es/526eb1/por-que-la-piel-de-kratos-es-blanca1/1366_2000.jpeg","content":"Jugar God of War con audífonos es otra experiencia 🎧","image":"https://easycdn.es/1/imagenes/god-of-war-2005-playstation-2-ps3_247696.jpg"},{"username":"MeowExplorer","verified":"https://cdn-icons-png.flaticon.com/512/5253/5253968.png","profileImage":"https://justagame.uk/wp-content/uploads/2023/05/stray-menu2-1.jpg?w=1203","content":"STRAY me hizo llorar. No estaba preparado para eso 😿","image":"https://www.slantmagazine.com/wp-content/uploads/2022/08/stray.jpg"},{"username":"WebSwinger2099","verified":"https://cdn-icons-png.flaticon.com/512/5253/5253968.png","profileImage":"https://gmedia.playstation.com/is/image/SIEPDC/spider-man-2-screenshot-miles-webwing-en-25may23.jpg?$1600px$","content":"Spider-Man 2 tiene las mejores mecánicas de balanceo hasta ahora 🕸️","image":"https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2651280/ss_74e612eb0ae275bd6e7f69d407dda8b03d83629f.1920x1080.jpg?t=1738343995"},{"username":"ViceCityDreams","verified":"https://cdn-icons-png.flaticon.com/512/5253/5253968.png","profileImage":"https://es.digitaltrends.com/wp-content/uploads/2025/03/GTA-VI-Grand-Theft-Auto-VI-Rockstar-Games.jpg?fit=1200%2C800&p=1","content":"GTA VI será el evento gamer de la década, mark my words.","image":"https://www.muycomputer.com/wp-content/uploads/2024/08/GTA-6-fecha-de-lanzamiento.jpg"},{"username":"NoVARZone","verified":"https://cdn-icons-png.flaticon.com/512/5253/5253968.png","profileImage":"https://image.europafm.com/clipping/cmsimages02/2024/09/10/2A6D30A4-242D-4B91-9CA9-72D93E9F96CE/lamine-yamal-joven-futbolista-records-que-escucha-karol_98.jpg?crop=4917,2766,x0,y0&width=1900&height=1069&optimize=low&format=webply","content":"FIFA 24 sigue siendo lo mismo... pero igual me vicio ⚽"},{"username":"LinkAwakens","verified":"https://cdn-icons-png.flaticon.com/512/5253/5253968.png","profileImage":"https://nintenduo.com/wp-content/uploads/2023/03/Novedades-Zelda-Tears-Kingdom-01.webp","content":"Tears of the Kingdom es una carta de amor al diseño de mundo abierto.","image":"https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2023/05/zelda-tears-kingdom-3034236.jpg?tf=3840x"},{"username":"JumpMaster","verified":"https://cdn-icons-png.flaticon.com/512/5253/5253968.png","profileImage":"https://cdn.vox-cdn.com/thumbor/uIIJHwjzSyo2uqDrH_8pNBnHtKs=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/21938762/wraith.jpg","content":"Apex necesita un nuevo mapa urgente 😤"},{"username":"BaronStealer","verified":"https://cdn-icons-png.flaticon.com/512/5253/5253968.png","profileImage":"https://assetsio.gnwcdn.com/how-hollow-knights-community-crafted-gibberish-into-a-real-language-1567781461548.jpg?width=1200&height=1200&fit=crop&quality=100&format=png&enable=upscale&auto=webp","content":"League of Legends me hace feliz y miserable al mismo tiempo 💔😂","image":"https://assetsio.gnwcdn.com/how-hollow-knights-community-crafted-gibberish-into-a-real-language-1567781461548.jpg?width=1200&height=1200&fit=crop&quality=100&format=png&enable=upscale&auto=webp"}]')}},n={};function t(o){var a=n[o];if(void 0!==a)return a.exports;var i=n[o]={exports:{}};return e[o].call(i.exports,i,i.exports,t),i.exports}t(329),t(172)})();
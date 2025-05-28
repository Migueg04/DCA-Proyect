
import { store, State, Drop } from '../Flux/Store';
import { DropsActions } from '../Flux/Actions';
import { createDropCard } from './dropCard';

class MainFeed extends HTMLElement {
  private shadow: ShadowRoot;
  private container: HTMLDivElement;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.container = document.createElement('div');
    this.onStateChange = this.onStateChange.bind(this);
  }

  connectedCallback(): void {
    
    this.shadow.appendChild(this.container);
    
    store.subscribe(this.onStateChange);
   
    DropsActions.loadDrops();
  }

  disconnectedCallback(): void {
    
    store.unsubscribe(this.onStateChange);
  }

  private onStateChange(state: State): void {
    
    this.render(state.drops);
  }

  private render(drops: Drop[]): void {
   
    this.container.innerHTML = '';
    drops.forEach(drop => {
      const card = createDropCard(drop);
      this.container.appendChild(card);
    });
  }
}

customElements.define('main-feed', MainFeed);
export default MainFeed;
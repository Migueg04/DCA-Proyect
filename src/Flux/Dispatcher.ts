export type Action = {
  type: string;
  payload?: any;
};

type Callback = (action: Action) => void;

class Dispatcher {
  private _callbacks: Callback[] = [];

  register(callback: Callback): void {
    this._callbacks.push(callback);
  }

  dispatch(action: Action): void {
    this._callbacks.forEach(callback => callback(action));
  }
}

export const AppDispatcher = new Dispatcher();
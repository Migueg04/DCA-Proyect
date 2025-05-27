import { NavigateActionsType, UserActionsType, User } from './Actions';
import { AppDispatcher, Action } from './Dispatcher';

export type State = {
  currentPath: string;
  currentUser: User | null;
  users: User[];
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
};

type Listener = (state: State) => void;

class Store {
  private _myState: State = {
    currentPath: '/',
    currentUser: null,
    users: [],
    isLoading: false,
    error: null,
    isAuthenticated: false
  };
  private _listeners: Listener[] = [];

  constructor() {
    AppDispatcher.register(this._handleActions.bind(this));
    this.load();
  }

  getState() {
    return this._myState;
  }

  _handleActions(action: Action): void {
    switch (action.type) {
      case NavigateActionsType.NAVIGATE:
        this._handleNavigate(action);
        break;
      case UserActionsType.SET_CURRENT_USER:
        this._handleSetCurrentUser(action);
        break;
      case UserActionsType.UPDATE_USER_PROFILE:
        this._handleUpdateUserProfile(action);
        break;
      case UserActionsType.LOGIN_USER:
        this._handleLoginUser(action);
        break;
      case UserActionsType.LOGOUT_USER:
        this._handleLogoutUser(action);
        break;
      case UserActionsType.ADD_USER:
        this._handleAddUser(action);
        break;
      case UserActionsType.GET_USER_BY_EMAIL:
        this._handleGetUserByEmail(action);
        break;
    }
  }

  private _handleNavigate(action: Action): void {
    if (typeof action.payload === 'object' && action.payload !== null && 'path' in action.payload) {
      const { path } = action.payload as { path: string };
      this._myState = {
        ...this._myState,
        currentPath: path
      };
      this._emitChange();
      this.persist();
    }
  }
  
  private _handleSetCurrentUser(action: Action): void {
    if (typeof action.payload === 'object' && action.payload !== null && 'user' in action.payload) {
      const { user } = action.payload as { user: User };
      this._myState = {
        ...this._myState,
        currentUser: user,
        isAuthenticated: user !== null,
        error: null
      };
      this._emitChange();
      this.persist();
    }
  }

  private _handleUpdateUserProfile(action: Action): void {
    if (
      typeof action.payload === 'object' &&
      action.payload !== null &&
      'userId' in action.payload &&
      'updates' in action.payload
    ) {
      const { userId, updates } = action.payload as { userId: string; updates: Partial<User> };

      const updatedUsers = this._myState.users.map(user =>
        user.id === userId ? { ...user, ...updates } : user
      );

      let updatedCurrentUser = this._myState.currentUser;
      if (this._myState.currentUser && this._myState.currentUser.id === userId) {
        updatedCurrentUser = { ...this._myState.currentUser, ...updates };
      }

      this._myState = {
        ...this._myState,
        users: updatedUsers,
        currentUser: updatedCurrentUser,
        error: null
      };
      this._emitChange();
      this.persist();
    }
  }

  private _handleLoginUser(action: Action): void {
    if (
      typeof action.payload === 'object' &&
      action.payload !== null &&
      'email' in action.payload &&
      'password' in action.payload
    ) {
      const { email } = action.payload as { email: string; password: string };

      this._myState = {
        ...this._myState,
        isLoading: true,
        error: null
      };
      this._emitChange();

      setTimeout(() => {
        const user = this._myState.users.find(u => u.email === email);

        if (user) {
          this._myState = {
            ...this._myState,
            currentUser: user,
            isAuthenticated: true,
            isLoading: false,
            error: null
          };
        } else {
          this._myState = {
            ...this._myState,
            currentUser: null,
            isAuthenticated: false,
            isLoading: false,
            error: 'Usuario no encontrado o credenciales incorrectas'
          };
        }
        this._emitChange();
        this.persist();
      }, 1000);
    }
  }

  private _handleLogoutUser(action: Action): void {
    void action;

    this._myState = {
      ...this._myState,
      currentUser: null,
      isAuthenticated: false,
      error: null
    };
    this._emitChange();
    this.persist();
  }

  private _handleAddUser(action: Action): void {
    if (typeof action.payload === 'object' && action.payload !== null && 'user' in action.payload) {
      const { user } = action.payload as { user: User };

      // Asegurar que users sea un array válido
      const users = Array.isArray(this._myState.users) ? this._myState.users : [];

      const emailExists = users.some(u => u.email === user.email);
      const usernameExists = users.some(u => u.username === user.username);

      if (emailExists) {
        this._myState = {
          ...this._myState,
          error: 'Ya existe un usuario con este correo electrónico'
        };
      } else if (usernameExists) {
        this._myState = {
          ...this._myState,
          error: 'El nombre de usuario ya está en uso'
        };
      } else {
        this._myState = {
          ...this._myState,
          users: [...users, user],
          error: null
        };
        this.persist();
      }

      this._emitChange();
    }
  }

  private _handleGetUserByEmail(action: Action): void {
    if (typeof action.payload === 'object' && action.payload !== null && 'email' in action.payload) {
      const { email } = action.payload as { email: string };

      this._myState = {
        ...this._myState,
        isLoading: true,
        error: null
      };
      this._emitChange();

      setTimeout(() => {
        const user = this._myState.users.find(u => u.email === email);

        if (!user) {
          this._myState = {
            ...this._myState,
            isLoading: false,
            error: 'Usuario no encontrado'
          };
        } else {
          this._myState = {
            ...this._myState,
            isLoading: false,
            error: null
          };
        }
        this._emitChange();
      }, 500);
    }
  }

  private _emitChange(): void {
    const state = this.getState();
    for (const listener of this._listeners) {
      listener(state);
    }
  }

  subscribe(listener: Listener): void {
    this._listeners.push(listener);
    listener(this.getState());
  }

  unsubscribe(listener: Listener): void {
    this._listeners = this._listeners.filter(l => l !== listener);
  }

  persist(): void {
    localStorage.setItem('flux:state', JSON.stringify(this._myState));
  }

  load(): void {
    const persistedState = localStorage.getItem('flux:state');
    if (persistedState) {
      try {
        const loadedState = JSON.parse(persistedState);
        
        // Validar y fusionar el estado cargado con el estado inicial
        this._myState = {
          currentPath: loadedState.currentPath || '/',
          currentUser: loadedState.currentUser || null,
          users: Array.isArray(loadedState.users) ? loadedState.users : [],
          isLoading: false,
          error: null,
          isAuthenticated: loadedState.currentUser !== null && loadedState.currentUser !== undefined
        };
      } catch (error) {
        console.error('Error loading persisted state:', error);
        // Si hay error al parsear, limpiar localStorage y mantener el estado inicial
        localStorage.removeItem('flux:state');
      }
    }
  }

  // Métodos de utilidad para obtener datos específicos
  getCurrentUser(): User | null {
    return this._myState.currentUser;
  }

  getUsers(): User[] {
    return Array.isArray(this._myState.users) ? this._myState.users : [];
  }

  getUserById(id: string): User | undefined {
    const users = this.getUsers();
    return users.find(user => user.id === id);
  }

  getUserByEmail(email: string): User | undefined {
    const users = this.getUsers();
    return users.find(user => user.email === email);
  }

  isUserAuthenticated(): boolean {
    return this._myState.isAuthenticated;
  }

  getError(): string | null {
    return this._myState.error;
  }

  isLoading(): boolean {
    return this._myState.isLoading;
  }

  // Método para limpiar errores
  clearError(): void {
    this._myState = {
      ...this._myState,
      error: null
    };
    this._emitChange();
  }
}

export const store = new Store();
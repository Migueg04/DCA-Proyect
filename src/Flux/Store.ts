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
    if (action.payload?.path) {
      this._myState = {
        ...this._myState,
        currentPath: action.payload.path
      };
      this._emitChange();
      this.persist();
    }
  }

  private _handleSetCurrentUser(action: Action): void {
    const { user } = action.payload;
    this._myState = {
      ...this._myState,
      currentUser: user,
      isAuthenticated: user !== null,
      error: null
    };
    this._emitChange();
    this.persist();
  }

  private _handleUpdateUserProfile(action: Action): void {
    const { userId, updates } = action.payload;
    
    // Actualizar en el array de usuarios
    const updatedUsers = this._myState.users.map(user =>
      user.id === userId ? { ...user, ...updates } : user
    );

    // Actualizar usuario actual si es el mismo
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

  private _handleLoginUser(action: Action): void {
    const { email, password } = action.payload;
    this._myState = {
      ...this._myState,
      isLoading: true,
      error: null
    };
    this._emitChange();

    // Simulación de login - en una app real harías una llamada API
    setTimeout(() => {
      const user = this._myState.users.find(u => u.email === email);
      
      if (user) {
        // Login exitoso
        this._myState = {
          ...this._myState,
          currentUser: user,
          isAuthenticated: true,
          isLoading: false,
          error: null
        };
      } else {
        // Login fallido
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

  private _handleLogoutUser(action: Action): void {
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
    const { user } = action.payload;
    
    // Verificar si el usuario ya existe
    const existingUser = this._myState.users.find(u => u.email === user.email);
    
    if (existingUser) {
      this._myState = {
        ...this._myState,
        error: 'El usuario ya existe con este email'
      };
    } else {
      this._myState = {
        ...this._myState,
        users: [...this._myState.users, user],
        error: null
      };
    }
    this._emitChange();
    this.persist();
  }

  private _handleGetUserByEmail(action: Action): void {
    const { email } = action.payload;
    this._myState = {
      ...this._myState,
      isLoading: true,
      error: null
    };
    this._emitChange();

    // Simulación de búsqueda - en una app real harías una llamada API
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
        this._myState = JSON.parse(persistedState);
      } catch (error) {
        console.error('Error loading persisted state:', error);
        // Si hay error al parsear, mantener el estado inicial
      }
    }
  }

  // Métodos de utilidad para obtener datos específicos
  getCurrentUser(): User | null {
    return this._myState.currentUser;
  }

  getUsers(): User[] {
    return this._myState.users;
  }

  getUserById(id: string): User | undefined {
    return this._myState.users.find(user => user.id === id);
  }

  getUserByEmail(email: string): User | undefined {
    return this._myState.users.find(user => user.email === email);
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
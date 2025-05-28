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

  subscribe(listener: Listener): void {
    this._listeners.push(listener);
    listener(this.getState());
  }

  unsubscribe(listener: Listener): void {
    this._listeners = this._listeners.filter(l => l !== listener);
  }

  private _emitChange(): void {
    const state = this.getState();
    this._listeners.forEach(listener => listener(state));
  }

  private _handleActions(action: Action): void {
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
    const { path } = action.payload as { path: string };
    this._myState = {
      ...this._myState,
      currentPath: path
    };
    this._emitChange();
    this.persist();
  }

  private _handleSetCurrentUser(action: Action): void {
    const { user } = action.payload as { user: User };
    this._myState = {
      ...this._myState,
      currentUser: user,
      isAuthenticated: !!user,
      error: null
    };
    this._emitChange();
    this.persist();
  }

  private _handleUpdateUserProfile(action: Action): void {
    const { userId, updates } = action.payload as { userId: string; updates: Partial<User> };
    const updatedUsers = this._myState.users.map(user =>
      user.id === userId ? { ...user, ...updates } : user
    );
    const updatedCurrentUser = this._myState.currentUser?.id === userId
      ? { ...this._myState.currentUser, ...updates }
      : this._myState.currentUser;

    this._myState = {
      ...this._myState,
      users: updatedUsers,
      currentUser: updatedCurrentUser ?? null,
      error: null
    };
    this._emitChange();
    this.persist();
  }

  private _handleLoginUser(action: Action): void {
    const { email, password } = action.payload as { email: string; password: string };
    this._myState = {
      ...this._myState,
      isLoading: true,
      error: null
    };
    this._emitChange();

    setTimeout(() => {
      const user = this._myState.users.find(u => u.email === email && u.password === password);
      if (user) {
        this._myState = {
          ...this._myState,
          currentUser: user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
          currentPath: '/'
        };
      } else {
        this._myState = {
          ...this._myState,
          currentUser: null,
          isAuthenticated: false,
          isLoading: false,
          error: 'Email o contraseña incorrectos'
        };
      }
      this._emitChange();
      this.persist();
    }, 1000);
  }

  private _handleLogoutUser(_: Action): void {
    this._myState = {
      ...this._myState,
      currentUser: null,
      isAuthenticated: false,
      error: null
    };
    this._emitChange();
    this.persist();
    console.log(_)
  }

  private _handleAddUser(action: Action): void {
    const { user } = action.payload as { user: User };
    const users = Array.isArray(this._myState.users) ? this._myState.users : [];

    const emailExists = users.some(u => u.email === user.email);
    const usernameExists = users.some(u => u.username === user.username);

    if (emailExists) {
      this._myState.error = 'Ya existe un usuario con este correo electrónico';
    } else if (usernameExists) {
      this._myState.error = 'El nombre de usuario ya está en uso';
    } else {
      this._myState.users = [...users, user];
      this._myState.error = null;
      this.persist();
    }

    this._emitChange();
  }

  private _handleGetUserByEmail(action: Action): void {
    const { email } = action.payload as { email: string };
    this._myState = {
      ...this._myState,
      isLoading: true,
      error: null
    };
    this._emitChange();

    setTimeout(() => {
      const user = this._myState.users.find(u => u.email === email);
      this._myState = {
        ...this._myState,
        isLoading: false,
        error: user ? null : 'Usuario no encontrado'
      };
      this._emitChange();
    }, 500);
  }

  persist(): void {
    localStorage.setItem('flux:state', JSON.stringify(this._myState));
  }

  load(): void {
    const persistedState = localStorage.getItem('flux:state');
    if (persistedState) {
      try {
        const loaded = JSON.parse(persistedState);
        this._myState = {
          currentPath: loaded.currentPath || '/',
          currentUser: loaded.currentUser || null,
          users: Array.isArray(loaded.users) ? loaded.users : [],
          isLoading: false,
          error: null,
          isAuthenticated: !!loaded.currentUser
        };
        this._emitChange();
      } catch (e) {
        console.error('Error loading state:', e);
        localStorage.removeItem('flux:state');
      }
    }
  }

  // Getters
  getCurrentUser(): User | null {
    return this._myState.currentUser;
  }

  getUsers(): User[] {
    return this._myState.users;
  }

  getUserById(id: string): User | undefined {
    return this._myState.users.find(u => u.id === id);
  }

  getUserByEmail(email: string): User | undefined {
    return this._myState.users.find(u => u.email === email);
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

  clearError(): void {
    this._myState = {
      ...this._myState,
      error: null
    };
    this._emitChange();
  }
}

export const store = new Store();

// src/Flux/Store.ts

import { Friend } from '../utils/types/types';
import {
  NavigateActionsType,
  UserActionsType,
  CommentActionsType,
  LikeActionsType,
  User,
  Comment
} from './Actions';
import { AppDispatcher, Action } from './Dispatcher';

export type State = {
  currentPath: string;
  currentUser: User | null;
  users: User[];
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  commentsByPost: Record<string, Comment[]>;
  visibleComments: Record<string, boolean>;
  likesByPost: Record<string, string[]>;
};

type Listener = (state: State) => void;

class Store {
  private _myState: State = {
    currentPath: '/',
    currentUser: null,
    users: [],
    isLoading: false,
    error: null,
    isAuthenticated: false,
    commentsByPost: {},
    visibleComments: {},
    likesByPost: {}
  };

  private _listeners: Listener[] = [];

  constructor() {
    AppDispatcher.register(this._handleActions.bind(this));
    this.load();
  }

  getState(): State {
    return this._myState;
  }

  subscribe(listener: Listener): () => void {
    this._listeners.push(listener);
    // Llamamos de inmediato para que tenga el estado inicial
    listener(this.getState());
    return () => {
      this.unsubscribe(listener);
    };
  }

  unsubscribe(listener: Listener): void {
    this._listeners = this._listeners.filter(l => l !== listener);
  }

  private _emitChange(): void {
    const state = this.getState();
    this._listeners.forEach(l => l(state));
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
        this._handleLogoutUser();
        break;
      case UserActionsType.ADD_USER:
        this._handleAddUser(action);
        break;
      case UserActionsType.GET_USER_BY_EMAIL:
        this._handleGetUserByEmail(action);
        break;
      case CommentActionsType.TOGGLE_COMMENTS:
        this._handleToggleComments(action);
        break;
      case CommentActionsType.ADD_COMMENT:
        this._handleAddComment(action);
        break;
      case LikeActionsType.TOGGLE_LIKE:
        this._handleToggleLike(action);
        break;
      case UserActionsType.ADD_FRIEND_TO_PROFILE:
        this._handleAddFriendToProfile(action);
        break;
      case UserActionsType.REMOVE_FRIEND_FROM_PROFILE:
        this._handleRemoveFriendFromProfile(action);
        break;
    }
  }

  private _handleNavigate(action: Action): void {
    const { path } = action.payload as { path: string };
    this._myState.currentPath = path;
    this._emitChange();
    this.persist();
  }

  private _handleSetCurrentUser(action: Action): void {
    const { user } = action.payload as { user: User };
    // Nos aseguramos de que friends siempre sea un array
    this._myState.currentUser = {
      ...user,
      friends: Array.isArray(user.friends) ? user.friends : []
    };
    this._myState.isAuthenticated = true;
    this._emitChange();
    this.persist();
  }

  private _handleUpdateUserProfile(action: Action): void {
    const { userId, updates } = action.payload as { userId: string; updates: Partial<User> };
    this._myState.users = this._myState.users.map(u =>
      u.id === userId ? { ...u, ...updates } : u
    );
    if (this._myState.currentUser?.id === userId) {
      this._myState.currentUser = {
        ...this._myState.currentUser!,
        ...updates
      };
    }
    this._emitChange();
    this.persist();
  }

  private _handleLoginUser(action: Action): void {
    const { email, password } = action.payload as { email: string; password: string };
    this._myState.isLoading = true;
    this._emitChange();

    setTimeout(() => {
      const found = this._myState.users.find(u => u.email === email);
      if (!found) {
        alert('Usuario no registrado.');
        this._myState.error = 'Usuario no registrado';
        this._myState.currentUser = null;
        this._myState.isAuthenticated = false;
      } else if (found.password !== password) {
        alert('Contraseña incorrecta.');
        this._myState.error = 'Contraseña incorrecta';
        this._myState.currentUser = null;
        this._myState.isAuthenticated = false;
      } else {
        this._myState.currentUser = {
          ...found,
          friends: Array.isArray(found.friends) ? found.friends : []
        };
        this._myState.isAuthenticated = true;
        this._myState.error = null;
      }
      this._myState.isLoading = false;
      this._emitChange();
      this.persist();
    }, 1000);
  }

  private _handleLogoutUser(): void {
    this._myState.currentUser = null;
    this._myState.isAuthenticated = false;
    this._myState.error = null;
    this._emitChange();
    this.persist();
  }

  private _handleAddUser(action: Action): void {
    const { user } = action.payload as { user: User };
    const newUser: User = {
      ...user,
      friends: Array.isArray(user.friends) ? user.friends : []
    };
    const emailExists = this._myState.users.some(u => u.email === newUser.email);
    const usernameExists = this._myState.users.some(u => u.username === newUser.username);
    if (!emailExists && !usernameExists) {
      this._myState.users.push(newUser);
      this._myState.error = null;
    } else {
      this._myState.error = emailExists
        ? 'Ya existe un usuario con este correo electrónico'
        : 'El nombre de usuario ya está en uso';
    }
    this._emitChange();
    this.persist();
  }

  private _handleGetUserByEmail(action: Action): void {
    const { email } = action.payload as { email: string };
    this._myState.isLoading = true;
    this._emitChange();

    setTimeout(() => {
      const user = this._myState.users.find(u => u.email === email);
      this._myState.error = user ? null : 'Usuario no encontrado';
      this._myState.isLoading = false;
      this._emitChange();
    }, 500);
  }

  private _handleToggleComments(action: Action): void {
    const { postId } = action.payload as { postId: string };
    const current = this._myState.visibleComments[postId] || false;
    this._myState.visibleComments[postId] = !current;
    this._emitChange();
    this.persist();
  }

  private _handleAddComment(action: Action): void {
    const { comment } = action.payload as { comment: Comment };
    const arr = this._myState.commentsByPost[comment.postId] || [];
    this._myState.commentsByPost[comment.postId] = [...arr, comment];
    this._emitChange();
    this.persist();
  }

  private async _handleAddFriendToProfile(action: Action): Promise<void> {
    const { friend } = action.payload as { friend: Friend };
    if (!this._myState.currentUser) return;
    const existing = this._myState.currentUser.friends || [];
    if (existing.some(f => f.username === friend.username)) return;
    const updated = [...existing, friend];
    this._myState.currentUser = { ...this._myState.currentUser, friends: updated };
    this._myState.users = this._myState.users.map(u =>
      u.id === this._myState.currentUser!.id ? { ...u, friends: updated } : u
    );
    this._myState.error = null;
    this._emitChange();
    this.persist();
  }

  private async _handleRemoveFriendFromProfile(action: Action): Promise<void> {
    const { friendUsername } = action.payload as { friendUsername: string };
    if (!this._myState.currentUser) return;
    const existing = this._myState.currentUser.friends || [];
    const filtered = existing.filter(f => f.username !== friendUsername);
    this._myState.currentUser = { ...this._myState.currentUser, friends: filtered };
    this._myState.users = this._myState.users.map(u =>
      u.id === this._myState.currentUser!.id ? { ...u, friends: filtered } : u
    );
    this._myState.error = null;
    this._emitChange();
    this.persist();
  }

  private _handleToggleLike(action: Action): void {
    const { postId, userId } = action.payload as { postId: string; userId: string };
    const likes = Array.isArray(this._myState.likesByPost[postId])
      ? [...this._myState.likesByPost[postId]]
      : [];
    if (likes.includes(userId)) {
      this._myState.likesByPost[postId] = likes.filter(id => id !== userId);
    } else {
      this._myState.likesByPost[postId] = [...likes, userId];
    }
    this._emitChange();
    this.persist();
  }

  isPostLikedByUser(postId: string, userId: string): boolean {
    return Array.isArray(this._myState.likesByPost[postId]) &&
      this._myState.likesByPost[postId].includes(userId);
  }

  persist(): Promise<void> {
    return new Promise((res, rej) => {
      try {
        const toSave = {
          currentUser: this._myState.currentUser,
          users: this._myState.users
        };
        localStorage.setItem('flux:state', JSON.stringify(toSave));
        res();
      } catch (e) {
        rej(e);
      }
    });
  }

  load(): void {
    const stored = localStorage.getItem('flux:state');
    if (!stored) return;
    try {
      const loaded = JSON.parse(stored);
      // Si no tenía friends o venía undefined, forzamos array vacío
      if (loaded.currentUser) {
        loaded.currentUser.friends = Array.isArray(loaded.currentUser.friends)
          ? loaded.currentUser.friends
          : [];
      }
      this._myState = {
        ...this._myState,
        ...loaded,
        isAuthenticated: !!loaded.currentUser
      };
      this._emitChange();
    } catch {
      localStorage.removeItem('flux:state');
    }
  }

  getComments(postId: string): Comment[] {
    return this._myState.commentsByPost[postId] || [];
  }

  areCommentsVisible(postId: string): boolean {
    return !!this._myState.visibleComments[postId];
  }

  getLikes(postId: string): number {
    return this._myState.likesByPost[postId]?.length || 0;
  }

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
    this._myState.error = null;
    this._emitChange();
  }
}

export const store = new Store();

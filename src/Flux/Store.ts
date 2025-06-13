import { Friend } from '../utils/types/types';
import { NavigateActionsType, UserActionsType, CommentActionsType, User, Comment } from './Actions';
import { AppDispatcher, Action } from './Dispatcher';

export const LikeActionsType = {
  TOGGLE_LIKE: 'TOGGLE_LIKE'
};

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

  getState() {
    return this._myState;
  }

  // Método subscribe actualizado que devuelve función de cleanup
  subscribe(listener: Listener): () => void {
    this._listeners.push(listener);
    listener(this.getState());
    
    // Devolver función de cleanup
    return () => {
      this.unsubscribe(listener);
    };
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
      case UserActionsType.REMOVE_FRIEND_FROM_PROFILE:  // <- NUEVO CASE
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
    this._myState.currentUser = user;
    this._myState.isAuthenticated = !!user;
    this._emitChange();
    this.persist();
  }

  private _handleUpdateUserProfile(action: Action): void {
    const { userId, updates } = action.payload as { userId: string; updates: Partial<User> };
    this._myState.users = this._myState.users.map(user =>
      user.id === userId ? { ...user, ...updates } : user
    );
    if (this._myState.currentUser?.id === userId) {
      this._myState.currentUser = { ...this._myState.currentUser, ...updates };
    }
    this._emitChange();
    this.persist();
  }

  private _handleLoginUser(action: Action): void {
    const { email, password } = action.payload as { email: string; password: string };
    this._myState.isLoading = true;
    this._emitChange();

    setTimeout(() => {
      const user = this._myState.users.find(u => u.email === email);

      if (!user) {
        alert('Usuario no registrado.');
        this._myState.currentUser = null;
        this._myState.isAuthenticated = false;
        this._myState.error = 'Usuario no registrado.';
      } else if (user.password !== password) {
        alert('Contraseña incorrecta.');
        this._myState.currentUser = null;
        this._myState.isAuthenticated = false;
        this._myState.error = 'Contraseña incorrecta.';
      } else {
        this._myState.currentUser = user;
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
    const emailExists = this._myState.users.some(u => u.email === user.email);
    const usernameExists = this._myState.users.some(u => u.username === user.username);
    if (!emailExists && !usernameExists) {
      this._myState.users.push(user);
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
      this._myState.isLoading = false;
      this._myState.error = user ? null : 'Usuario no encontrado';
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
    const postComments = this._myState.commentsByPost[comment.postId] || [];
    this._myState.commentsByPost[comment.postId] = [...postComments, comment];
    this._emitChange();
    this.persist();
  }

   private async _handleAddFriendToProfile(action: Action): Promise<void> {
    const { friend } = action.payload as { friend: Friend };
    
    if (!this._myState.currentUser) {
      console.error('No hay usuario autenticado para añadir amigo');
      return;
    }

    try {
      // Verificar si el amigo ya existe para evitar duplicados
      const existingFriends = this._myState.currentUser.friends || [];
      const friendExists = existingFriends.some(f => f.username === friend.username);
      
      if (friendExists) {
        console.warn(`El amigo ${friend.name} ya está en la lista`);
        return;
      }

      // Crear la nueva lista de amigos
      const updatedFriends = [...existingFriends, friend];
      
      // Actualizar currentUser inmediatamente
      this._myState.currentUser = {
        ...this._myState.currentUser,
        friends: updatedFriends
      };
      
      // También actualizar en la lista de usuarios para mantener consistencia
      this._myState.users = this._myState.users.map(user =>
        user.id === this._myState.currentUser!.id 
          ? { ...user, friends: updatedFriends }
          : user
      );
      
      // Limpiar errores
      this._myState.error = null;
      
      console.log(`✅ Amigo "${friend.name}" (@${friend.username}) añadido exitosamente`);
      console.log(`📊 Total de amigos: ${updatedFriends.length}`);
      
      // Emitir cambios INMEDIATAMENTE
      this._emitChange();
      
      // Persistir de forma asíncrona (sin bloquear)
      this.persist().catch(error => {
        console.error('Error al persistir después de añadir amigo:', error);
      });
      
    } catch (error) {
      console.error('❌ Error al añadir amigo:', error);
      this._myState.error = 'Error al añadir el amigo';
      this._emitChange();
    }
  }

  private async _handleRemoveFriendFromProfile(action: Action): Promise<void> {
    const { friendUsername } = action.payload as { friendUsername: string };
    
    if (!this._myState.currentUser) {
      console.error('No hay usuario autenticado para eliminar amigo');
      return;
    }

    if (!friendUsername) {
      console.error('Username del amigo no proporcionado');
      return;
    }

    try {
      // Obtener la lista actual de amigos
      const existingFriends = this._myState.currentUser.friends || [];
      
      // Verificar si el amigo existe antes de eliminarlo
      const friendToRemove = existingFriends.find(friend => friend.username === friendUsername);
      
      if (!friendToRemove) {
        console.warn(`El amigo con username "${friendUsername}" no se encuentra en la lista`);
        return;
      }

      // Filtrar el amigo de la lista
      const updatedFriends = existingFriends.filter(friend => friend.username !== friendUsername);
      
      // Actualizar currentUser inmediatamente
      this._myState.currentUser = {
        ...this._myState.currentUser,
        friends: updatedFriends
      };
      
      // También actualizar en la lista de usuarios para mantener consistencia
      this._myState.users = this._myState.users.map(user =>
        user.id === this._myState.currentUser!.id 
          ? { ...user, friends: updatedFriends }
          : user
      );
      
      // Limpiar cualquier error previo
      this._myState.error = null;
      
      console.log(`✅ Amigo "${friendToRemove.name}" (@${friendUsername}) eliminado exitosamente`);
      console.log(`📊 Total de amigos: ${updatedFriends.length}`);
      
      // Emitir cambios INMEDIATAMENTE
      this._emitChange();
      
      // Persistir de forma asíncrona
      this.persist().catch(error => {
        console.error('Error al persistir después de eliminar amigo:', error);
      });
      
    } catch (error) {
      console.error('❌ Error al eliminar amigo:', error);
      this._myState.error = 'Error al eliminar el amigo';
      this._emitChange();
    }
  }

  async persist(): Promise<void> {
    try {
      const dataToSave = {
        currentUser: this._myState.currentUser,
        users: this._myState.users,
        // otros datos que necesites persistir
      };
      
      localStorage.setItem('appState', JSON.stringify(dataToSave));
      console.log('💾 Estado persistido correctamente');
      
    } catch (error) {
      console.error('❌ Error al persistir estado:', error);
      throw error;
    }
  }

  // Método útil para debug
  debugFriends(): void {
    const friends = this._myState.currentUser?.friends || [];
    console.log('🔍 Debug - Estado actual de amigos:', {
      user: this._myState.currentUser?.name,
      friendsCount: friends.length,
      friends: friends.map(f => ({ name: f.name, username: f.username }))
    });
  }


  private _handleToggleLike(action: Action): void {
    const { postId, userId } = action.payload as { postId: string; userId: string };
    let likes: string[] = Array.isArray(this._myState.likesByPost[postId]) ? this._myState.likesByPost[postId] : [];

    if (likes.includes(userId)) {
      likes = likes.filter(id => id !== userId);
    } else {
      likes.push(userId);
    }

    this._myState.likesByPost[postId] = likes;
    this._emitChange();
    this.persist();
  }

  isPostLikedByUser(postId: string, userId: string): boolean {
    return Array.isArray(this._myState.likesByPost[postId]) && this._myState.likesByPost[postId].includes(userId);
  }

  load(): void {
    const persistedState = localStorage.getItem('flux:state');
    if (persistedState) {
      try {
        const loaded = JSON.parse(persistedState);
        this._myState = {
          ...this._myState,
          ...loaded,
          isAuthenticated: !!loaded.currentUser
        };
        this._emitChange();
      } catch (e) {
        console.error('Error loading state:', e);
        localStorage.removeItem('flux:state');
      }
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
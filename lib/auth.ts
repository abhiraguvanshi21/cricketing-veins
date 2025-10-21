export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

// Simple local storage based auth
export class AuthService {
  private static instance: AuthService;
  private currentUser: User | null = null;

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  constructor() {
    if (typeof window !== 'undefined') {
      this.loadUserFromStorage();
    }
  }

  private loadUserFromStorage() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.currentUser = JSON.parse(userData);
    }
  }

  private saveUserToStorage(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUser = user;
  }

  private removeUserFromStorage() {
    localStorage.removeItem('currentUser');
    this.currentUser = null;
  }

  async signUp(email: string, password: string, name: string): Promise<{ user: User | null; error: string | null }> {
    try {
      // Check if user already exists
      const existingUsers = this.getAllUsers();
      if (existingUsers.find(u => u.email === email)) {
        return { user: null, error: 'User already exists with this email' };
      }

      const user: User = {
        id: Date.now().toString(),
        email,
        name,
        role: email === 'admin@cricketingveins.com' ? 'admin' : 'user',
        createdAt: new Date().toISOString()
      };

      // Save user to users list
      const users = [...existingUsers, user];
      localStorage.setItem('users', JSON.stringify(users));

      // Set as current user
      this.saveUserToStorage(user);

      return { user, error: null };
    } catch (error) {
      return { user: null, error: 'Failed to create account' };
    }
  }

  async signIn(email: string, password: string): Promise<{ user: User | null; error: string | null }> {
    try {
      const users = this.getAllUsers();
      const user = users.find(u => u.email === email);

      if (!user) {
        return { user: null, error: 'Invalid email or password' };
      }

      this.saveUserToStorage(user);
      return { user, error: null };
    } catch (error) {
      return { user: null, error: 'Failed to sign in' };
    }
  }

  async signOut(): Promise<void> {
    this.removeUserFromStorage();
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  private getAllUsers(): User[] {
    if (typeof window === 'undefined') return [];
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  }
}
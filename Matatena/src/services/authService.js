import { apiRequest } from '../utils/api';

export const authService = {
  async login(username, password) {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    
    if (data.status === 'success' && data.data?.tokens) {
      localStorage.setItem('token', data.data.tokens.accessToken);
      localStorage.setItem('refreshToken', data.data.tokens.refreshToken);
<<<<<<< HEAD
=======
      localStorage.setItem('userId', data.data.user.id);
>>>>>>> HEAD@{1}
      localStorage.setItem('username', data.data.user.username);
      return data.data;
    }
    
    throw new Error('Formato de respuesta inesperado');
  },

  async register(username, password) {
    const data = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    
    if (data.status === 'success' && data.data?.tokens) {
      localStorage.setItem('token', data.data.tokens.accessToken);
      localStorage.setItem('refreshToken', data.data.tokens.refreshToken);
<<<<<<< HEAD
=======
      localStorage.setItem('userId', data.data.user.id);
>>>>>>> HEAD@{1}
      localStorage.setItem('username', data.data.user.username);
      return data.data;
    }
    
    throw new Error('Formato de respuesta inesperado');
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
<<<<<<< HEAD
=======
    localStorage.removeItem('userId');
>>>>>>> HEAD@{1}
    localStorage.removeItem('username');
  },

  isAuthenticated() {
    return !!localStorage.getItem('token');
  },

  getCurrentUser() {
    return {
<<<<<<< HEAD
=======
      id: localStorage.getItem('userId'),
>>>>>>> HEAD@{1}
      username: localStorage.getItem('username'),
    };
  }
};
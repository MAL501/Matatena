import { io } from 'socket.io-client';
import { SOCKET_URL, SOCKET_EVENTS } from '../utils/constants';

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
  }

  connect() {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('No hay token de autenticación');
    }

    this.socket = io(SOCKET_URL, {
      auth: {
        token: token
      }
    });

    this.socket.on('connect', () => {
      console.log('Conectado al servidor WebSocket');
      this.isConnected = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor WebSocket');
      this.isConnected = false;
    });

    this.socket.on('error', (error) => {
      console.error('Error de WebSocket:', error);
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  // Métodos que implementaremos en las siguientes fases
  joinGame(gameId) {
    if (this.socket) {
      this.socket.emit(SOCKET_EVENTS.JOIN_GAME, gameId);
    }
  }

  makePlay(gameId, dice, column) {
    if (this.socket) {
      this.socket.emit(SOCKET_EVENTS.MAKE_PLAY, { gameId, dice, column });
    }
  }

  endGame(gameId, winnerId) {
    if (this.socket) {
      this.socket.emit(SOCKET_EVENTS.END_GAME, { gameId, winnerId });
    }
  }

  // Métodos para escuchar eventos
  onGameJoined(callback) {
    if (this.socket) {
      this.socket.on(SOCKET_EVENTS.GAME_JOINED, callback);
    }
  }

  onGameStarted(callback) {
    if (this.socket) {
      this.socket.on(SOCKET_EVENTS.GAME_STARTED, callback);
    }
  }

  onPlayMade(callback) {
    if (this.socket) {
      this.socket.on(SOCKET_EVENTS.PLAY_MADE, callback);
    }
  }

  onGameEnded(callback) {
    if (this.socket) {
      this.socket.on(SOCKET_EVENTS.GAME_ENDED, callback);
    }
  }

  onError(callback) {
    if (this.socket) {
      this.socket.on(SOCKET_EVENTS.ERROR, callback);
    }
  }
}

// Exportar una instancia singleton
export const socketService = new SocketService();
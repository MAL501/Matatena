import { apiRequest } from '../utils/api';

export const gameService = {
  async createGame() {
    const data = await apiRequest('/games', {
      method: 'POST',
    });
    return data.data;
  },

  async joinGameByCode(code) {
    const data = await apiRequest('/games/join', {
      method: 'POST',
      body: JSON.stringify({ code }),
    });
    return data.data;
  },

  async getGame(gameId) {
    const data = await apiRequest(`/games/${gameId}`);
    return data.data;
  },

  async getGameByCode(code) {
    const data = await apiRequest(`/games/code/${code}`);
    return data.data;
  },

  async endGame(gameId, winnerId) {
    const data = await apiRequest(`/games/${gameId}/end`, {
      method: 'PUT',
      body: JSON.stringify({ winnerId }),
    });
    return data.data;
  },

  async makePlay(gameId, dice, column) {
    const data = await apiRequest(`/games/${gameId}/play`, {
      method: 'POST',
      body: JSON.stringify({ dice, column }),
    });
    return data.data;
  },

  async getGamePlays(gameId) {
    const data = await apiRequest(`/games/${gameId}/plays`);
    return data.data;
  }
};
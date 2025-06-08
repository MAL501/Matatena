export const API_BASE_URL = 'http://localhost:8080';
export const SOCKET_URL = 'http://localhost:8080';
export const APP_BASE_URL = '/Matatena'; 

export const GAME_STATES = {
  WAITING: 'waiting',
  PLAYING: 'playing',
  FINISHED: 'finished'
};

export const SOCKET_EVENTS = {
  JOIN_GAME: 'joinGame',
  MAKE_PLAY: 'makePlay',
  END_GAME: 'endGame',
  GAME_JOINED: 'gameJoined',
  GAME_STARTED: 'gameStarted',
  PLAY_MADE: 'playMade',
  GAME_ENDED: 'gameEnded',
  ERROR: 'error'
};
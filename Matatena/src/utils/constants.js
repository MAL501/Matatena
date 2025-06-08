<<<<<<< HEAD
export const FRONTEND_ROUTES = {
  HOME: '/Matatena/',
  PLAY_LOCAL: '/Matatena/play',
  GAME: '/Matatena/game',
  WAITING_ROOM: '/Matatena/waiting-room',
  RANKING: '/Matatena/ranking',
  LOGIN: '/Matatena/login',
  REGISTER: '/Matatena/register'
};

export const BACKEND_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh-token'
  },
  GAMES: {
    CREATE: '/games',
    JOIN: '/games/join',
    GET_BY_ID: (id) => `/games/${id}`,
    GET_BY_CODE: (code) => `/games/code/${code}`,
    END: (id) => `/games/${id}/end`,
    PLAY: (id) => `/games/${id}/play`,
    PLAYS: (id) => `/games/${id}/plays`
  }
=======
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
>>>>>>> HEAD@{1}
};
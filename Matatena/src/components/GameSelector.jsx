import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { gameService } from '../services/gameService';

const inputStyle = "w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400";
const buttonStyle = "w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed";
const buttonLocalStyle = "w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-700 transition";
const errorStyle = "text-red-500 text-sm mb-2 text-center";
const successStyle = "text-green-600 text-sm mb-2 text-center";

const GameSelector = () => {
  const [gameCode, setGameCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [createdGameCode, setCreatedGameCode] = useState('');
  
  const { isAuthenticated, user } = useAuth();

  // Función para crear una nueva partida online
  const handleCreateGame = async () => {
    if (!isAuthenticated) {
      setError('Debes iniciar sesión para crear una partida online');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const gameData = await gameService.createGame();
      setCreatedGameCode(gameData.gameCode);
      setSuccess(`¡Partida creada! Código: ${gameData.gameCode}`);
      
      // Redirigir a la sala de espera después de un momento
      setTimeout(() => {
        window.location.href = `/waiting-room/${gameData.gameId}`;
      }, 2000);
      
    } catch (error) {
      setError(error.message || 'Error al crear la partida');
      console.error('Error al crear partida:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Función para unirse a una partida por código
  const handleJoinGame = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setError('Debes iniciar sesión para unirte a una partida online');
      return;
    }

    if (!gameCode.trim()) {
      setError('Por favor, introduce un código de partida');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const gameData = await gameService.joinGameByCode(gameCode.toUpperCase());
      setSuccess('¡Te has unido a la partida!');
      
      // Redirigir al juego
      setTimeout(() => {
        window.location.href = `/game/${gameData.game.id}`;
      }, 1000);
      
    } catch (error) {
      setError(error.message || 'Error al unirse a la partida');
      console.error('Error al unirse a partida:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Función para jugar en modo local
  const handlePlayLocal = () => {
    window.location.href = '/play';
  };

  // Función para copiar código al portapapeles
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setSuccess('¡Código copiado al portapapeles!');
    } catch (error) {
      console.error('Error al copiar:', error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Seleccionar Modo de Juego</h2>
      
      {error && <div className={errorStyle}>{error}</div>}
      {success && <div className={successStyle}>{success}</div>}
      
      {/* Botones superiores */}
      <div className="space-y-4 mb-6">
        <button
          onClick={handleCreateGame}
          disabled={isLoading || !isAuthenticated}
          className={buttonStyle}
        >
          {isLoading ? 'Creando partida...' : 'Crear Partida Online'}
        </button>
        
        <button
          onClick={handlePlayLocal}
          disabled={isLoading}
          className={buttonLocalStyle}
        >
          Jugar Local
        </button>
      </div>

      {/* Mostrar código de partida creada */}
      {createdGameCode && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-gray-600 mb-2">Código de tu partida:</p>
          <div className="flex items-center space-x-2">
            <code className="flex-1 bg-white px-3 py-2 rounded border text-lg font-mono text-center">
              {createdGameCode}
            </code>
            <button
              onClick={() => copyToClipboard(createdGameCode)}
              className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm"
            >
              Copiar
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Comparte este código con tu oponente para que se una a la partida
          </p>
        </div>
      )}

      {/* Sección para unirse a partida */}
      <div className="border-t pt-6">
        <p className="text-sm text-gray-600 mb-3 text-center">
          Si quieres unirte a una partida introduce un código:
        </p>
        
        <form onSubmit={handleJoinGame} className="space-y-4">
          <input
            type="text"
            placeholder="Código de partida (ej: ABC12)"
            value={gameCode}
            onChange={(e) => setGameCode(e.target.value.toUpperCase())}
            className={inputStyle}
            maxLength={5}
            disabled={isLoading || !isAuthenticated}
            style={{ textTransform: 'uppercase' }}
          />
          
          <button
            type="submit"
            disabled={isLoading || !isAuthenticated || !gameCode.trim()}
            className={buttonStyle}
          >
            {isLoading ? 'Uniéndose...' : 'Unirse a Partida'}
          </button>
        </form>
      </div>

      {/* Mensaje para usuarios no autenticados */}
      {!isAuthenticated && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800 text-center">
            <strong>Nota:</strong> Debes iniciar sesión para jugar online
          </p>
        </div>
      )}

      {/* Información del usuario autenticado */}
      {isAuthenticated && user && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800 text-center">
            Conectado como: <strong>{user.username}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default GameSelector;
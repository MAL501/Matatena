import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useGame } from '../hooks/useGame';

const WaitingRoom = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { gameState, loading, error } = useGame(gameId);
  const [copied, setCopied] = useState(false);

  // Redirigir si no está autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Redirigir al juego cuando se una el segundo jugador
  useEffect(() => {
    if (gameState.gameStarted && gameState.opponentName) {
      setTimeout(() => {
        navigate(`/game/${gameId}`);
      }, 2000);
    }
  }, [gameState.gameStarted, gameState.opponentName, gameId, navigate]);

  // Función para copiar código al portapapeles
  const copyGameCode = async () => {
    if (gameState.game?.code) {
      try {
        await navigator.clipboard.writeText(gameState.game.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Error al copiar:', err);
      }
    }
  };

  // Función para cancelar partida
  const cancelGame = () => {
    if (window.confirm('¿Estás seguro de que quieres cancelar la partida?')) {
      navigate('/');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando partida...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Volver al menú
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Sala de Espera</h1>
          <p className="text-gray-600">
            Hola, <span className="font-semibold">{user?.username}</span>
          </p>
        </div>

        {/* Código de partida */}
        {gameState.game?.code && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-600 mb-2 text-center">Código de partida:</p>
            <div className="flex items-center space-x-2">
              <code className="flex-1 bg-white px-4 py-3 rounded border text-2xl font-mono text-center tracking-wider">
                {gameState.game.code}
              </code>
              <button
                onClick={copyGameCode}
                className="px-4 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm"
              >
                {copied ? '✓' : 'Copiar'}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Comparte este código con tu oponente
            </p>
          </div>
        )}

        {/* Estado de la partida */}
        <div className="text-center mb-6">
          {!gameState.gameStarted ? (
            <div>
              <div className="animate-pulse text-4xl mb-4">⏳</div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Esperando oponente...
              </h3>
              <p className="text-gray-500 text-sm">
                La partida comenzará automáticamente cuando se una otro jugador
              </p>
            </div>
          ) : (
            <div>
              <div className="text-4xl mb-4">🎮</div>
              <h3 className="text-lg font-semibold text-green-600 mb-2">
                ¡{gameState.opponentName} se ha unido!
              </h3>
              <p className="text-gray-500 text-sm">
                Redirigiendo al juego...
              </p>
            </div>
          )}
        </div>

        {/* Información adicional */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-gray-700 mb-2">Información de la partida:</h4>
          <div className="space-y-1 text-sm text-gray-600">
            <p><span className="font-medium">Anfitrión:</span> {gameState.isHost ? 'Tú' : 'Oponente'}</p>
            <p><span className="font-medium">Estado:</span> {gameState.gameStarted ? 'Iniciada' : 'Esperando'}</p>
            {gameState.opponentName && (
              <p><span className="font-medium">Oponente:</span> {gameState.opponentName}</p>
            )}
          </div>
        </div>

        {/* Botones de acción */}
        <div className="space-y-3">
          {gameState.gameStarted && gameState.opponentName && (
            <button
              onClick={() => navigate(`/game/${gameId}`)}
              className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition font-semibold"
            >
              Ir al Juego
            </button>
          )}
          
          <button
            onClick={cancelGame}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            Cancelar Partida
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition"
          >
            Volver al Menú
          </button>
        </div>
      </div>
    </div>
  );
};

export default WaitingRoom;
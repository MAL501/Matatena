import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

const WaitingRoom = () => {
  const { gameId } = useParams()
  const navigate = useNavigate()
  const [gameCode, setGameCode] = useState("")
  const [copied, setCopied] = useState(false)
  const [isWaiting, setIsWaiting] = useState(true)
  const [error, setError] = useState("")

  // Simular código de partida basado en gameId
  useEffect(() => {
    if (gameId) {
      // Generar un código simple basado en el gameId
      const code = `GAME${gameId.slice(-3).toUpperCase()}`
      setGameCode(code)
    }
  }, [gameId])

  // Función para copiar código al portapapeles
  const copyGameCode = async () => {
    if (gameCode) {
      try {
        await navigator.clipboard.writeText(gameCode)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error("Error al copiar:", err)
      }
    }
  }

  // Función para cancelar partida
  const cancelGame = () => {
    if (window.confirm("¿Estás seguro de que quieres cancelar la partida?")) {
      navigate("/")
    }
  }

  // Simular inicio de partida después de 10 segundos (para testing)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsWaiting(false)
      // Redirigir al juego después de 2 segundos
      setTimeout(() => {
        navigate("/play")
      }, 2000)
    }, 10000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Sala de Espera</h1>
          <p className="text-gray-600">
            Partida: <span className="font-semibold">{gameId}</span>
          </p>
        </div>

        {/* Código de partida */}
        {gameCode && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-600 mb-2 text-center">Código de partida:</p>
            <div className="flex items-center space-x-2">
              <code className="flex-1 bg-white px-4 py-3 rounded border text-2xl font-mono text-center tracking-wider">
                {gameCode}
              </code>
              <button
                onClick={copyGameCode}
                className="px-4 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm"
              >
                {copied ? "✓" : "Copiar"}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">Comparte este código con tu oponente</p>
          </div>
        )}

        {/* Estado de la partida */}
        <div className="text-center mb-6">
          {isWaiting ? (
            <div>
              <div className="animate-pulse text-4xl mb-4">⏳</div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Esperando oponente...</h3>
              <p className="text-gray-500 text-sm">La partida comenzará automáticamente cuando se una otro jugador</p>
            </div>
          ) : (
            <div>
              <div className="text-4xl mb-4">🎮</div>
              <h3 className="text-lg font-semibold text-green-600 mb-2">¡Oponente encontrado!</h3>
              <p className="text-gray-500 text-sm">Redirigiendo al juego...</p>
            </div>
          )}
        </div>

        {/* Información adicional */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-gray-700 mb-2">Información de la partida:</h4>
          <div className="space-y-1 text-sm text-gray-600">
            <p>
              <span className="font-medium">ID:</span> {gameId}
            </p>
            <p>
              <span className="font-medium">Estado:</span> {isWaiting ? "Esperando" : "Iniciando"}
            </p>
            <p>
              <span className="font-medium">Código:</span> {gameCode}
            </p>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="space-y-3">
          <button
            onClick={() => navigate("/play")}
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition font-semibold"
          >
            Ir al Juego (Test)
          </button>

          <button
            onClick={cancelGame}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            Cancelar Partida
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition"
          >
            Volver al Menú
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800 text-center">{error}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default WaitingRoom;

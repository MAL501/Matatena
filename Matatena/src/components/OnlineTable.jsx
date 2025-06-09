"use client"

import { useEffect, useState, useCallback } from "react"
import { useParams, useNavigate } from "react-router-dom"
import "../styles/cup.css"
import Cup from "./Cup"
import Board from "./Board"
import CloseButton from "./CloseButton"
import MessageDialog from "./MessageDialog"
import { getDice, pointsColumn, removeDices } from "../services/diceService"
import { DndContext } from "@dnd-kit/core"
import { socketService } from "../services/socketService"
import { showNotification } from "./NotificationContainer"
import { NOTIFICATION_TYPES, GAME_STATES } from "../utils/constants"

const OnlineTable = () => {
  const { gameId } = useParams()
  const navigate = useNavigate()

  // Estados del juego online
  const [isMyTurn, setIsMyTurn] = useState(true)
  const [opponentName, setOpponentName] = useState("Oponente")
  const [myName, setMyName] = useState("Tú")
  const [gameStatus, setGameStatus] = useState(GAME_STATES.WAITING)
  const [connectionStatus, setConnectionStatus] = useState("connected")
  const [opponentConnected, setOpponentConnected] = useState(true)

  //--------------------Variables del jugador----------------------
  const [player1_points, setPlayer1_points] = useState(0)
  const [player2_points, setPlayer2_points] = useState(0)
  const [player1_name, setPlayer1_name] = useState("Jugador 1")
  const [player2_name, setPlayer2_name] = useState("Jugador 2")

  //--------------------Variables del cubilete----------------------
  const CUP_IP = 0
  const CUP_PLAYER2_POSITION = "cup-player2"
  const CUP_PLAYER1_POSITION = "cup-player1"
  const [cup_position, setCup_position] = useState(CUP_PLAYER1_POSITION)
  const [dice, setDice] = useState(1)

  //--------------------Variables del tablero----------------------
  const [turn, setTurn] = useState(true)
  const [player1_hookDice, setPlayer1_hookDice] = useState({
    column_id: 0,
    face: 0,
  })
  const [player2_hookDice, setPlayer2_hookDice] = useState({
    column_id: 0,
    face: 0,
  })

  // Estados de las columnas
  const [player1_first_column_dices, setPlayer1_first_column_dices] = useState([])
  const [player1_second_column_dices, setPlayer1_second_column_dices] = useState([])
  const [player1_third_column_dices, setPlayer1_third_column_dices] = useState([])
  const [player2_first_column_dices, setPlayer2_first_column_dices] = useState([])
  const [player2_second_column_dices, setPlayer2_second_column_dices] = useState([])
  const [player2_third_column_dices, setPlayer2_third_column_dices] = useState([])

  const IDS_BOARD1 = ["1", "2", "3"]
  const IDS_BOARD2 = ["4", "5", "6"]

  const [first_columns_update, setFirst_columns_update] = useState(false)
  const [second_columns_update, setSecond_columns_update] = useState(false)
  const [third_columns_update, setThird_columns_update] = useState(false)

  const [board1_enabled, setBoard1_enabled] = useState(true)
  const [board2_enabled, setBoard2_enabled] = useState(false)

  const [winner, setWinner] = useState(null)
  const [gameOver, setGameOver] = useState(false)

  // Inicialización del juego online
  useEffect(() => {
    if (gameId) {
      // Configurar nombre del jugador
      const username = localStorage.getItem("username") || "Jugador 1"
      setMyName(username)
      setPlayer1_name(username)
      setPlayer2_name("Esperando oponente...")

      // Conectar al socket si no está conectado
      if (!socketService.isConnected) {
        try {
          socketService.connect()
        } catch (error) {
          console.error("Error al conectar socket:", error)
          showNotification({
            type: NOTIFICATION_TYPES.ERROR,
            message: "Error al conectar con el servidor",
          })
        }
      }

      // Unirse a la sala del juego
      socketService.joinGame(gameId)

      // Configurar listeners de socket
      setupSocketListeners()

      // Mostrar notificación de inicio
      showNotification({
        type: NOTIFICATION_TYPES.INFO,
        message: "Conectando a la partida...",
      })
    }

    return () => {
      // Limpiar listeners al desmontar
      cleanupSocketListeners()
    }
  }, [gameId])

  const setupSocketListeners = () => {
    // Conexión y desconexión
    socketService.onConnect((data) => {
      setConnectionStatus("connected")
      showNotification({
        type: NOTIFICATION_TYPES.SUCCESS,
        message: "Conectado al servidor",
      })
    })

    socketService.onDisconnect((data) => {
      setConnectionStatus("disconnected")
      showNotification({
        type: NOTIFICATION_TYPES.WARNING,
        message: "Desconectado del servidor",
      })
    })

    // Eventos del juego
    socketService.onGameJoined((data) => {
      setGameStatus(GAME_STATES.WAITING)
      setIsMyTurn(data.isHost) // El host comienza

      if (data.opponentName) {
        setOpponentName(data.opponentName)
        setPlayer2_name(data.opponentName)
        setGameStatus(GAME_STATES.PLAYING)
        showNotification({
          type: NOTIFICATION_TYPES.SUCCESS,
          message: `¡${data.opponentName} se ha unido a la partida!`,
        })
      }
    })

    socketService.onGameStarted((data) => {
      setOpponentName(data.opponentName)
      setPlayer2_name(data.opponentName)
      setGameStatus(GAME_STATES.PLAYING)
      showNotification({
        type: NOTIFICATION_TYPES.SUCCESS,
        message: `¡${data.opponentName} se ha unido a la partida!`,
      })
    })

    socketService.onPlayMade((data) => {
      // Actualizar el tablero con la jugada del oponente
      handleOpponentPlay(data)

      // Cambiar el turno
      setIsMyTurn(true)
      setTurn(true)

      showNotification({
        type: NOTIFICATION_TYPES.INFO,
        message: "Es tu turno",
      })
    })

    socketService.onGameEnded((data) => {
      setGameStatus(GAME_STATES.FINISHED)
      setGameOver(true)

      if (data.winnerId === Number.parseInt(localStorage.getItem("userId"))) {
        setWinner(myName)
        showNotification({
          type: NOTIFICATION_TYPES.SUCCESS,
          message: "¡Has ganado la partida!",
        })
      } else {
        setWinner(opponentName)
        showNotification({
          type: NOTIFICATION_TYPES.INFO,
          message: "Has perdido la partida",
        })
      }
    })

    socketService.onOpponentDisconnect(() => {
      setOpponentConnected(false)
      showNotification({
        type: NOTIFICATION_TYPES.WARNING,
        message: "Tu oponente se ha desconectado",
      })
    })

    socketService.onOpponentReconnect(() => {
      setOpponentConnected(true)
      showNotification({
        type: NOTIFICATION_TYPES.SUCCESS,
        message: "Tu oponente se ha reconectado",
      })
    })

    socketService.onError((error) => {
      showNotification({
        type: NOTIFICATION_TYPES.ERROR,
        message: error.message || "Error en la conexión",
      })
    })
  }

  const cleanupSocketListeners = () => {
    // Limpiar todos los listeners
    socketService.off("onConnect")
    socketService.off("onDisconnect")
    socketService.off("onGameJoined")
    socketService.off("onGameStarted")
    socketService.off("onPlayMade")
    socketService.off("onGameEnded")
    socketService.off("onOpponentDisconnect")
    socketService.off("onOpponentReconnect")
    socketService.off("onError")
  }

  const handleOpponentPlay = (playData) => {
    // Actualizar el tablero con la jugada del oponente
    setPlayer2_hookDice({
      column_id: playData.column,
      face: playData.dice,
    })

    // Actualizar el dado
    setDice(getDice())
  }

  const getTotalPoints = useCallback((column1, column2, column3) => {
    let ret = 0
    ret += pointsColumn(column1)
    ret += pointsColumn(column2)
    ret += pointsColumn(column3)
    return ret
  }, [])

  useEffect(() => {
    setCup_position(turn ? CUP_PLAYER1_POSITION : CUP_PLAYER2_POSITION)
    setBoard1_enabled(!turn)
    setBoard2_enabled(turn)
    setDice(getDice())
  }, [turn])

  // Efectos para eliminar dados del oponente
  useEffect(() => {
    setPlayer2_first_column_dices((prev) =>
      removeDices(prev, player1_first_column_dices[player1_first_column_dices.length - 1]),
    )
    setFirst_columns_update(!first_columns_update)
  }, [player1_first_column_dices])

  useEffect(() => {
    setPlayer2_second_column_dices((prev) =>
      removeDices(prev, player1_second_column_dices[player1_second_column_dices.length - 1]),
    )
    setSecond_columns_update(!second_columns_update)
  }, [player1_second_column_dices])

  useEffect(() => {
    setPlayer2_third_column_dices((prev) =>
      removeDices(prev, player1_third_column_dices[player1_third_column_dices.length - 1]),
    )
    setThird_columns_update(!third_columns_update)
  }, [player1_third_column_dices])

  useEffect(() => {
    setPlayer1_first_column_dices((prev) =>
      removeDices(prev, player2_first_column_dices[player2_first_column_dices.length - 1]),
    )
    setFirst_columns_update(!first_columns_update)
  }, [player2_first_column_dices])

  useEffect(() => {
    setPlayer1_second_column_dices((prev) =>
      removeDices(prev, player2_second_column_dices[player2_second_column_dices.length - 1]),
    )
    setSecond_columns_update(!second_columns_update)
  }, [player2_second_column_dices])

  useEffect(() => {
    setPlayer1_third_column_dices((prev) =>
      removeDices(prev, player2_third_column_dices[player2_third_column_dices.length - 1]),
    )
    setThird_columns_update(!third_columns_update)
  }, [player2_third_column_dices])

  useEffect(() => {
    setPlayer1_points(
      getTotalPoints(player1_first_column_dices, player1_second_column_dices, player1_third_column_dices),
    )
    setPlayer2_points(
      getTotalPoints(player2_first_column_dices, player2_second_column_dices, player2_third_column_dices),
    )

    // Verificar si el juego ha terminado
    if (
      player1_first_column_dices.length === 3 &&
      player1_second_column_dices.length === 3 &&
      player1_third_column_dices.length === 3
    ) {
      setWinner(player1_name)
      setGameOver(true)
      setGameStatus(GAME_STATES.FINISHED)

      // Notificar al servidor
      socketService.endGame(gameId, Number.parseInt(localStorage.getItem("userId")))
    }

    if (
      player2_first_column_dices.length === 3 &&
      player2_second_column_dices.length === 3 &&
      player2_third_column_dices.length === 3
    ) {
      setWinner(player2_name)
      setGameOver(true)
      setGameStatus(GAME_STATES.FINISHED)
    }
  }, [
    player1_first_column_dices,
    player1_second_column_dices,
    player1_third_column_dices,
    player2_first_column_dices,
    player2_second_column_dices,
    player2_third_column_dices,
    getTotalPoints,
    gameId,
    player1_name,
    player2_name,
  ])

  const changeTurn = () => {
    setTurn(!turn)
    setIsMyTurn(false)
  }

  const resetGame = () => {
    setPlayer1_points(0)
    setPlayer2_points(0)
    setPlayer1_first_column_dices([])
    setPlayer1_second_column_dices([])
    setPlayer1_third_column_dices([])
    setPlayer2_first_column_dices([])
    setPlayer2_second_column_dices([])
    setPlayer2_third_column_dices([])
    setTurn(true)
    setIsMyTurn(true)
    setCup_position(CUP_PLAYER1_POSITION)
    setDice(1)
    setFirst_columns_update(false)
    setSecond_columns_update(false)
    setThird_columns_update(false)
    setWinner(null)
    setGameOver(false)
    setGameStatus(GAME_STATES.PLAYING)
  }

  const handleDragEnd = (event) => {
    const { active, over } = event

    // Solo permitir movimientos si es tu turno y el juego está en curso
    if (!isMyTurn || gameStatus !== GAME_STATES.PLAYING) {
      return
    }

    if (!over || over.data.current.size >= 3) {
      return
    }

    if (active.id === over.id) {
      return
    }

    // Actualizar el tablero local
    setPlayer1_hookDice({
      column_id: over.id,
      face: active.data.current.face,
    })

    // Enviar el movimiento al servidor
    socketService.makePlay(gameId, active.data.current.face, over.id)

    // Mostrar notificación
    showNotification({
      type: NOTIFICATION_TYPES.INFO,
      message: "Movimiento realizado. Esperando al oponente...",
    })

    changeTurn()
  }

  const handleSurrender = () => {
    if (window.confirm("¿Estás seguro de que quieres rendirte?")) {
      // Notificar al servidor
      socketService.surrender(gameId)

      // Actualizar estado local
      setWinner(opponentName)
      setGameOver(true)
      setGameStatus(GAME_STATES.FINISHED)

      showNotification({
        type: NOTIFICATION_TYPES.INFO,
        message: "Te has rendido",
      })
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="relative w-full h-screen flex flex-col justify-center items-center">
        {/* Header con información del juego online */}
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-md p-4 z-10">
          <div className="text-sm space-y-1">
            <div className="flex items-center space-x-2">
              <span
                className={`w-3 h-3 rounded-full ${connectionStatus === "connected" ? "bg-green-500" : "bg-red-500"}`}
              ></span>
              <span className="font-medium">{connectionStatus === "connected" ? "Conectado" : "Desconectado"}</span>
            </div>
            <div>
              Partida: <span className="font-mono">{gameId}</span>
            </div>
            <div>
              Estado: <span className="capitalize">{gameStatus}</span>
            </div>
            {gameStatus === GAME_STATES.PLAYING &&
              (isMyTurn ? (
                <div className="text-green-600 font-medium">🎯 Tu turno</div>
              ) : (
                <div className="text-orange-600 font-medium">⏳ Turno del oponente</div>
              ))}
            {!opponentConnected && <div className="text-red-600 font-medium">⚠️ Oponente desconectado</div>}
          </div>
        </div>

        {/* Botón de rendirse */}
        <div className="absolute top-4 right-20 z-10">
          <button
            onClick={handleSurrender}
            className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition"
            disabled={gameStatus !== GAME_STATES.PLAYING}
          >
            Rendirse
          </button>
        </div>

        <CloseButton />

        {/* Board superior (Oponente) */}
        <div className="mb-[1%]">
          <Board
            id={IDS_BOARD2}
            enabled={board2_enabled || !isMyTurn}
            dice={player2_hookDice}
            first_column_dices={player2_first_column_dices}
            setFirst_column_dices={setPlayer2_first_column_dices}
            second_column_dices={player2_second_column_dices}
            setSecond_column_dices={setPlayer2_second_column_dices}
            third_column_dices={player2_third_column_dices}
            setThird_column_dices={setPlayer2_third_column_dices}
            opponent_first_column={player1_first_column_dices}
            opponent_second_column={player1_second_column_dices}
            opponent_third_column={player1_third_column_dices}
            owner={false}
            first_columns_update={first_columns_update}
            second_columns_update={second_columns_update}
            third_columns_update={third_columns_update}
          />
        </div>
        <p className="font-medium">{player2_name}</p>
        <p className="font-extrabold text-xl">{player2_points}</p>
        <p className="font-extrabold text-xl">{player1_points}</p>
        <p className="font-medium">{player1_name}</p>

        {/* Board inferior (Jugador) */}
        <div className="mt-[1%]">
          <Board
            id={IDS_BOARD1}
            enabled={board1_enabled || !isMyTurn}
            dice={player1_hookDice}
            first_column_dices={player1_first_column_dices}
            setFirst_column_dices={setPlayer1_first_column_dices}
            second_column_dices={player1_second_column_dices}
            setSecond_column_dices={setPlayer1_second_column_dices}
            third_column_dices={player1_third_column_dices}
            setThird_column_dices={setPlayer1_third_column_dices}
            opponent_first_column={player2_first_column_dices}
            opponent_second_column={player2_second_column_dices}
            opponent_third_column={player2_third_column_dices}
            owner={true}
            first_columns_update={first_columns_update}
            second_columns_update={second_columns_update}
            third_columns_update={third_columns_update}
          />
        </div>

        {/* Cubilete con indicador de turno */}
        <div className={cup_position}>
          <div className={`${!isMyTurn || gameStatus !== GAME_STATES.PLAYING ? "opacity-50 pointer-events-none" : ""}`}>
            <Cup id={CUP_IP} face={dice} />
          </div>
        </div>

        {/* Overlay cuando no es tu turno */}
        {!isMyTurn && gameStatus === GAME_STATES.PLAYING && (
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center z-20 pointer-events-none">
            <div className="bg-white rounded-lg p-6 shadow-xl">
              <div className="text-center">
                <div className="text-4xl mb-2">⏳</div>
                <h3 className="text-lg font-semibold">Turno del oponente</h3>
                <p className="text-gray-600">Espera tu turno...</p>
              </div>
            </div>
          </div>
        )}

        {/* Overlay cuando el juego está en espera */}
        {gameStatus === GAME_STATES.WAITING && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
            <div className="bg-white rounded-lg p-8 shadow-xl max-w-md w-full">
              <div className="text-center">
                <div className="animate-pulse text-4xl mb-4">⏳</div>
                <h3 className="text-xl font-bold mb-2">Esperando oponente</h3>
                <p className="text-gray-600 mb-4">La partida comenzará cuando se una otro jugador</p>
                <button
                  onClick={() => navigate("/")}
                  className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition"
                >
                  Cancelar partida
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dialog de fin de partida */}
        {gameOver && <MessageDialog winner={winner} reset={resetGame} p1={player1_points} p2={player2_points} />}
      </div>
    </DndContext>
  )
}

export default OnlineTable

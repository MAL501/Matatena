import React, { useEffect, useState } from "react";
import Cup from "./Cup";
import Board from "./Board";
import CloseButton from "./CloseButton";
import { getDice, removeDices } from "../services/diceService";
import {DndContext} from '@dnd-kit/core';


const Table = () => {
//--------------------Variables del jugador----------------------
    //Controlan los puntos de cada jugador
    const [player1_points, setPlayer1_points] = useState(0);
    const [player2_points, setPlayer2_points] = useState(0);

//--------------------Variables del cubilete----------------------
    const CUP_IP = 0;

    //Posiciones del cubilete	
    const CUP_PLAYER1_POSITION = "absolute bottom-[25%] left-[15%]";
    const CUP_PLAYER2_POSITION = "absolute top-[25%] right-[15%]";

    //Indica quién debe tener el cubilete
    const [cup_position, setCup_position]=useState(CUP_PLAYER1_POSITION);
    
    //Dado que se usa
    const [dice, setDice] = useState(1);
//--------------------Variables del tablero----------------------
    //Controla el turno del jugador
    const [turn,setTurn] = useState(true);
    //Nos indica la columna dónde el jugador deja el dado y
    //el valor del dado
    const [player1_hookDice, setPlayer1_hookDice] = useState({
        column_id: 0,
        face: 0
    });

    const [player2_hookDice, setPlayer2_hookDice] = useState({
        column_id: 0,
        face: 0
    });

    //Estados para los dados en las columnas
    const [player1_first_column_dices, setPlayer1_first_column_dices] = useState([]);
    const [player1_second_column_dices, setPlayer1_second_column_dices] = useState([]);
    const [player1_third_column_dices, setPlayer1_third_column_dices] = useState([]);

    const [player2_first_column_dices, setPlayer2_first_column_dices] = useState([]);
    const [player2_second_column_dices, setPlayer2_second_column_dices] = useState([]);
    const [player2_third_column_dices, setPlayer2_third_column_dices] = useState([]);

    //IDs que necesitan los tableros para poder 
    //"Droppear" los dados en las columnas
    const IDS_BOARD1 = ["1","2","3"];
    const IDS_BOARD2 = ["4","5","6"];

    //Nos permite poder, o no, usar el tablero según el turno
    let [board1_enabled, setBoard1_enabled] = useState(true);
    let [board2_enabled, setBoard2_enabled] = useState(false);

    
    /**
     * Cuando turn sea true, será el turno del host o jugador 1
     * Cuando turn sea false, será el turno del guest o el jugador 2
     */
    useEffect(() =>{
        setCup_position(turn ? CUP_PLAYER1_POSITION : CUP_PLAYER2_POSITION);
        setBoard1_enabled(!turn);
        setBoard2_enabled(turn);
        setDice(getDice());
    },[turn]);
    //TODO: Los puntos del oponente no se actualizan al eliminar los dados
    //Eliminan los dados del oponente
    useEffect(() => {
        setPlayer2_first_column_dices((prev) => removeDices(prev, player1_first_column_dices[player1_first_column_dices.length - 1]));
    }, [player1_first_column_dices]);

    useEffect(() => {
        setPlayer2_second_column_dices((prev) => removeDices(prev, player1_second_column_dices[player1_second_column_dices.length - 1]));
    }, [player1_second_column_dices]);

    useEffect(() => {
        setPlayer2_third_column_dices((prev) => removeDices(prev, player1_third_column_dices[player1_third_column_dices.length - 1]));
    }, [player1_third_column_dices]);

    useEffect(() => {
        setPlayer1_first_column_dices((prev) => removeDices(prev, player2_first_column_dices[player2_first_column_dices.length - 1]));
    }, [player2_first_column_dices]);

    useEffect(() => {
        setPlayer1_second_column_dices((prev) => removeDices(prev, player2_second_column_dices[player2_second_column_dices.length - 1]));
    }, [player2_second_column_dices]);

    useEffect(() => {
        setPlayer1_third_column_dices((prev) => removeDices(prev, player2_third_column_dices[player2_third_column_dices.length - 1]));
    }, [player2_third_column_dices]);

    const changeTurn = () =>{
        setTurn(!turn);
    }

    const handleDragEnd = (event) => {
        const {active, over} = event;
        //Si no se suelta en ninguna columna o
        //la columna está llena, entonces no se hace nada
        if(!over || over.data.current.size >= 3){
            return;
        }
        // Si el dado se suelta fuera de la tabla, no se hace nada
        if(active.id === over.id){
            return;
        }
        turn ? setPlayer1_hookDice({
            column_id: over.id,
            face: active.data.current.face
        }) : setPlayer2_hookDice({
            column_id: over.id,
            face: active.data.current.face
        });
        changeTurn();
    }

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="relative w-full h-screen flex flex-col justify-center items-center">
                <CloseButton />
                {/* Board superior (Guest) */}
                <div className="mb-[1%]">
                    <Board 
                        id={IDS_BOARD2} 
                        enabled={board2_enabled} 
                        setPoints={setPlayer2_points} 
                        dice={player2_hookDice}
                        first_column_dices={player2_first_column_dices}
                        setFirst_column_dices={setPlayer2_first_column_dices}
                        second_column_dices={player2_second_column_dices}
                        setSecond_column_dices={setPlayer2_second_column_dices}
                        third_column_dices={player2_third_column_dices}
                        setThird_column_dices={setPlayer2_third_column_dices}
                    />
                </div>

                {/* Board inferior (Host) */}
                <div className="mt-[1%]">
                    <Board 
                        id={IDS_BOARD1} 
                        enabled={board1_enabled} 
                        setPoints={setPlayer1_points} 
                        dice={player1_hookDice}
                        first_column_dices={player1_first_column_dices}
                        setFirst_column_dices={setPlayer1_first_column_dices}
                        second_column_dices={player1_second_column_dices}
                        setSecond_column_dices={setPlayer1_second_column_dices}
                        third_column_dices={player1_third_column_dices}
                        setThird_column_dices={setPlayer1_third_column_dices}
                    />
                </div>

                {/* Cup inferior izquierdo */}
                <div className={cup_position}>
                    <Cup id={CUP_IP} face={dice}/>
                </div>
            </div>
        </DndContext>
    );
};

export default Table;

import React, { useEffect, useState } from "react";
import Cup from "./Cup";
import Board from "./Board";
import CloseButton from "./CloseButton";
import { getDice } from "../services/diceService";
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

    const changeTurn = () =>{
        setTurn(!turn);
    }

    const handleDragEnd = (event) => {
        const {active, over} = event;
        if(!over){
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
        console.clear();
        //console.log("Player 1: ",player1_hookDice);
        //console.log("Player 2: ",player2_hookDice);
        changeTurn();
    }

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="relative w-full h-screen flex flex-col justify-center items-center">
                <CloseButton />
                {/* Board superior (Guest) */}
                <div className="mb-[1%]">
                    <Board id={IDS_BOARD2} enabled={board2_enabled} setPoints={setPlayer2_points} dice={player2_hookDice}/>
                </div>

                {/* Board inferior (Host) */}
                <div className="mt-[1%]">
                    <Board id={IDS_BOARD1} enabled={board1_enabled} setPoints={setPlayer1_points} dice={player1_hookDice}/>
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

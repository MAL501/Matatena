import React, { useEffect, useState } from "react";
import Cup from "./Cup";
import Board from "./Board";
import CloseButton from "./CloseButton";
import { getDice } from "../services/diceService";
import {DndContext} from '@dnd-kit/core';


const Table = () => {
    const [player1_points, setPlayer1_points] = useState(0);
    const [player2_points, setPlayer2_points] = useState(0);
    const [dice, setDice] = useState(null);
    const cup_player1_position = "absolute bottom-[25%] left-[15%]";
    const cup_player2_position = "absolute top-[25%] right-[15%]";
    const [cup_position, setCup_position]=useState(cup_player1_position);
    const cup_id = 0;
    /**
     * Cuando turn sea false, será el turno del host o jugador 1
     * Cuando turn sea verdadero, será el turno del guest o el jugador 2
     */
    const [turn,setTurn] = useState(false);
    useEffect(() =>{
        setCup_position(turn ? cup_player1_position : cup_player2_position);
    },[turn])
    const changeTurn = () =>{
        setTurn(!turn);
    }

    return (
        <DndContext>
            <div className="relative w-full h-screen flex flex-col justify-center items-center">
                <CloseButton />
                {/* Board superior (Guest) */}
                <div className="mb-[1%]">
                    <Board setPoints={setPlayer2_points} />
                </div>

                {/* Board inferior (Host) */}
                <div className="mt-[1%]">
                    <Board setPoints={setPlayer1_points} />
                </div>

                {/* Cup inferior izquierdo */}
                <div className={cup_position}>
                    <Cup id={cup_id} setDice={setDice}/>
                </div>
            </div>
        </DndContext>
    );
};

export default Table;

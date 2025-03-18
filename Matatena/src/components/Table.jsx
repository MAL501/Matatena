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
    const player1_id = 0;
    const player2_id = 4;
    /**
     * Cuando turn sea false, será el turno del host o jugador 1
     * Cuando turn sea verdadero, será el turno del guest o el jugador 2
     */
    let turn = useState(false);
    useEffect(() =>{
        //setDice(getDice());
    },[turn])
    
    return (
        <DndContext>
            <div className="relative w-full h-screen flex flex-col justify-center items-center">
                <CloseButton />
                {/* Cup superior derecho */}
                <div className="absolute top-[25%] right-[15%]">
                    <Cup id={player2_id} setDice={setDice} />
                </div>

                {/* Board superior (Guest) */}
                <div className="mb-[1%]">
                    <Board setPoints={setPlayer2_points} />
                </div>

                {/* Board inferior (Host) */}
                <div className="mt-[1%]">
                    <Board setPoints={setPlayer1_points} />
                </div>

                {/* Cup inferior izquierdo */}
                <div className="absolute bottom-[25%] left-[15%]">
                    <Cup id={player1_id} setDice={setDice}/>
                </div>
            </div>
        </DndContext>
    );
};

export default Table;

import React, { useState } from "react";
import Cup from "./Cup";
import Board from "./Board";
import CloseButton from "./CloseButton";
import {DndContext} from '@dnd-kit/core';


const Table = () => {
    const [player1_points, setPlayer1_points] = useState(0);
    const [player2_points, setPlayer2_points] = useState(0);
    const [dice, setDice] = useState(null);
    const player1_id = 0;
    const player2_id = 1;
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

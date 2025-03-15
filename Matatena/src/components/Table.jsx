import React from "react";
import Cup from "./Cup";
import Board from "./Board";
import CloseButton from "./CloseButton";
import {DndContext} from '@dnd-kit/core';


const Table = () => {
  return (
    <DndContext>
        <div className="relative w-full h-screen flex flex-col justify-center items-center">
            <CloseButton />
            {/* Cup superior derecho */}
            <div className="absolute top-[25%] right-[15%]">
                <Cup />
            </div>

            {/* Board superior (Guest) */}
            <div className="mb-[1%]">
                <Board />
            </div>

            {/* Board inferior (Host) */}
            <div className="mt-[1%]">
                <Board />
            </div>

            {/* Cup inferior izquierdo */}
            <div className="absolute bottom-[25%] left-[15%]">
                <Cup />
            </div>
        </div>
    </DndContext>
  );
};

export default Table;

import React from "react";
import Cup from "./Cup";
import Board from "./Board";

const Table = () => {
  return (
    <div className="relative w-full h-screen flex flex-col justify-center items-center">
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
  );
};

export default Table;

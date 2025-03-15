import React from 'react';
import PropTypes from 'prop-types';
import "../styles/dices.css";
import { useDroppable } from '@dnd-kit/core';

const Board = () => {
  const { setNodeRef: setFirstColumnRef } = useDroppable({ id: "1" });
  const { setNodeRef: setSecondColumnRef } = useDroppable({ id: "2" });
  const { setNodeRef: setThirdColumnRef } = useDroppable({ id: "3" });

  return (
    <div className="w-72 h-72 grid grid-cols-3 gap-x-2 bg-white border-4 border-black p-2">
      {/* Primera columna */}
      <div ref={setFirstColumnRef} className="flex flex-col">
        <div className="flex justify-center items-center aspect-square border-b-4 border-black bg-sky-200" />
        <div className="flex justify-center items-center aspect-square border-b-4 border-black bg-sky-200" />
        <div className="flex justify-center items-center aspect-square bg-sky-200" />
      </div>

      {/* Segunda columna */}
      <div ref={setSecondColumnRef} className="flex flex-col">
        <div className="flex justify-center items-center aspect-square border-b-4 border-black bg-sky-400" />
        <div className="flex justify-center items-center aspect-square border-b-4 border-black bg-sky-400" />
        <div className="flex justify-center items-center aspect-square bg-sky-400" />
      </div>

      {/* Tercera columna */}
      <div ref={setThirdColumnRef} className="flex flex-col">
        <div className="flex justify-center items-center aspect-square border-b-4 border-black bg-sky-600" />
        <div className="flex justify-center items-center aspect-square border-b-4 border-black bg-sky-600" />
        <div className="flex justify-center items-center aspect-square bg-sky-600" />
      </div>
    </div>
  );
};

Board.propTypes = {};

export default Board;
import React, { useEffect } from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import "../styles/dices.css";
import { useDroppable } from '@dnd-kit/core';

// Constantes para las clases de Tailwind
const boardContainer = "w-72 h-72 grid grid-cols-3 gap-x-2 bg-white border-4 border-black p-2 rounded-xl";
const columnStyle = "flex flex-col";
const cellStyle = "flex justify-center items-center aspect-square bg-sky-200 rounded-sm";
const cellWithBorder = `${cellStyle} border-b-4 border-black`;
const pointsTextStyle = "text-center mb-2 text-lg font-bold"; // Estilo para el texto de puntos

const Board = ({ setPoints, dice }) => {
  const { setNodeRef: setFirstColumnRef } = useDroppable({ id: "1" });
  const { setNodeRef: setSecondColumnRef } = useDroppable({ id: "2" });
  const { setNodeRef: setThirdColumnRef } = useDroppable({ id: "3" });
  const [first_column, setFirst_column] = useState(0);
  const [second_column, setSecond_column] = useState(0);
  const [third_column, setThird_column] = useState(0);

  useEffect(() => {
    setPoints(first_column + second_column + third_column);
  }, [first_column, second_column, third_column]);

  return (
    <div className={boardContainer}>
      {/* Primera columna */}
      <div>
        <p className={pointsTextStyle}>{first_column}</p> {/* Texto de puntos */}
        <div ref={setFirstColumnRef} className={columnStyle}>
          <div className={cellWithBorder} />
          <div className={cellWithBorder} />
          <div className={cellStyle} />
        </div>
      </div>

      {/* Segunda columna */}
      <div>
        <p className={pointsTextStyle}>{second_column}</p> {/* Texto de puntos */}
        <div ref={setSecondColumnRef} className={columnStyle}>
          <div className={cellWithBorder} />
          <div className={cellWithBorder} />
          <div className={cellStyle} />
        </div>
      </div>

      {/* Tercera columna */}
      <div>
        <p className={pointsTextStyle}>{third_column}</p> {/* Texto de puntos */}
        <div ref={setThirdColumnRef} className={columnStyle}>
          <div className={cellWithBorder} />
          <div className={cellWithBorder} />
          <div className={cellStyle} />
        </div>
      </div>
    </div>
  );
};

Board.propTypes = {
  setPoints: PropTypes.func.isRequired, // Asegura que setPoints sea una función requerida
};

export default Board;
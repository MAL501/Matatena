import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import "../styles/dices.css";
import { useDroppable } from '@dnd-kit/core';
import Column from './Column';

// Constantes para las clases de Tailwind
const boardContainer = "w-72 h-72 grid grid-cols-3 gap-x-2 bg-white border-4 border-black p-2 rounded-xl";

const Board = ({ setPoints, enabled ,id, dice }) => {
    // Dados en cada columna
    const [first_column_dices, setFirst_column_dices] = useState([]); 
    const [second_column_dices, setSecond_column_dices] = useState([]);
    const [third_column_dices, setThird_column_dices] = useState([]);
  
  const { setNodeRef: setFirstColumnRef } = useDroppable({
    id: id[0],
    disabled: enabled,
    data: {
      size: first_column_dices.length,
    },
  });
  const { setNodeRef: setSecondColumnRef } = useDroppable({
    id: id[1],
    disabled: enabled,
    data: {
      size: second_column_dices.length,
    },
  });
  const { setNodeRef: setThirdColumnRef } = useDroppable({
    id: id[2],
    disabled: enabled,
    data: {
      size: third_column_dices.length,
    },
  });
  // Puntuación de cada columna
  const [first_column, setFirst_column] = useState(0);
  const [second_column, setSecond_column] = useState(0);
  const [third_column, setThird_column] = useState(0);

  
  useEffect(() => {
    switch (dice.column_id) {
      case id[0]:
        setFirst_column_dices((prev) => [...prev, dice.face]);
        break;
      case id[1]:
        setSecond_column_dices((prev) => [...prev, dice.face]);
        break;
      case id[2]:
        setThird_column_dices((prev) => [...prev, dice.face]);
        break;
      default:
        break;
    }
  },[dice]);
  useEffect(() => {
    setPoints(first_column + second_column + third_column);
  }, [first_column, second_column, third_column]);

  return (
    <div className={boardContainer}>
      {/* Primera columna */}
      <Column
        points={first_column}
        setNodeRef={setFirstColumnRef}
        dice={first_column_dices}
      />

      {/* Segunda columna */}
      <Column
        points={second_column}
        setNodeRef={setSecondColumnRef}
        dice={second_column_dices}
      />

      {/* Tercera columna */}
      <Column
        points={third_column}
        setNodeRef={setThirdColumnRef}
        dice={third_column_dices}
      />
    </div>
  );
};

Board.propTypes = {
  setPoints: PropTypes.func.isRequired, // Asegura que setPoints sea una función requerida
};

export default Board;
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import "../styles/dices.css";
import { useDroppable } from '@dnd-kit/core';
import Column from './Column';

// Constantes para las clases de Tailwind
const boardContainer = "w-72 h-72 grid grid-cols-3 gap-x-2 bg-white border-4 border-black p-2 rounded-xl";

const Board = ({ setPoints, id }) => {
  /**todo Poner board_ + id_player */
  const { setNodeRef: setFirstColumnRef } = useDroppable({ id: id[0] });
  const { setNodeRef: setSecondColumnRef } = useDroppable({ id: id[1] });
  const { setNodeRef: setThirdColumnRef } = useDroppable({ id: id[2] });

  // Puntuación de cada columna
  const [first_column, setFirst_column] = useState(0);
  const [second_column, setSecond_column] = useState(0);
  const [third_column, setThird_column] = useState(0);

  // Dados en cada columna
  const [first_dice, setFirst_dice] = useState([null, null, null]); 
  const [second_dice, setSecond_dice] = useState([null, null, null]);
  const [third_dice, setThird_dice] = useState([null, null, null]);

  useEffect(() => {
    setPoints(first_column + second_column + third_column);
  }, [first_column, second_column, third_column]);

  return (
    <div className={boardContainer}>
      {/* Primera columna */}
      <Column
        points={first_column}
        setNodeRef={setFirstColumnRef}
        dice={first_dice}
      />

      {/* Segunda columna */}
      <Column
        points={second_column}
        setNodeRef={setSecondColumnRef}
        dice={second_dice}
      />

      {/* Tercera columna */}
      <Column
        points={third_column}
        setNodeRef={setThirdColumnRef}
        dice={third_dice}
      />
    </div>
  );
};

Board.propTypes = {
  setPoints: PropTypes.func.isRequired, // Asegura que setPoints sea una función requerida
};

export default Board;
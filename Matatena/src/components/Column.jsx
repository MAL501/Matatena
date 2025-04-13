import React from 'react';
import PropTypes from 'prop-types';
import Dice from './Dice';

// Constantes para las clases de Tailwind
const columnStyle = "flex flex-col";
const cellStyle = "flex justify-center items-center p-8 border-2 border-black border-b-4 rounded-sm w-full h-full mb-[5%]"; // Ajuste del tamaño, padding y borde inferior
const pointsTextStyle = "text-center mb-2 text-lg font-bold"; // Estilo para el texto de puntos

const Column = ({  points, setNodeRef, dice, owner }) => {
  if (owner == true) {
    return (
      <div>
        <p className={pointsTextStyle}>{points}</p> {/* Texto de puntos */}
        <div ref={setNodeRef} className={columnStyle}>
          {dice.map((face, index) => (
            <div key={index} className={cellStyle}>
              {face && <Dice face={face} />} {/* Renderiza el dado si existe */}
            </div>
          ))}
          {/* Rellenar las celdas vacías si es necesario */}
          {dice.length < 3 &&
            Array.from({ length: 3 - dice.length }).map((_, index) => (
              <div key={`empty-${index}`} className={cellStyle} />
            ))}
        </div>
      </div>
    );
  
  }else{
    return (
      <div>
        <div ref={setNodeRef} className={columnStyle}>
          {dice.map((face, index) => (
            <div key={index} className={cellStyle}>
              {face && <Dice face={face} />} {/* Renderiza el dado si existe */}
            </div>
          ))}
          {/* Rellenar las celdas vacías si es necesario */}
          {dice.length < 3 &&
            Array.from({ length: 3 - dice.length }).map((_, index) => (
              <div key={`empty-${index}`} className={cellStyle} />
            ))}
        </div>
        <p className={pointsTextStyle}>{points}</p> {/* Texto de puntos */}
      </div>
    );
  
  }
};

Column.propTypes = {
  id: PropTypes.string.isRequired, // Identificador de la columna
  points: PropTypes.number.isRequired, // Puntuación de la columna
  setNodeRef: PropTypes.func.isRequired, // Función para establecer la referencia del área droppable
  dice: PropTypes.arrayOf(PropTypes.number), // Array de dados en la columna
};

export default Column;
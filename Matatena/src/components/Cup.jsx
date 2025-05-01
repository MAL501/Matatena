import React from 'react';
import "../styles/dices.css";
import { useDraggable } from '@dnd-kit/core';
import Dice from './Dice';

const Cup = ({ id, face }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: {face: face},
  });

  // Estilos dinámicos para el movimiento
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        className="flex justify-center items-center p-8 border-2 border-black cursor-grab active:cursor-grabbing"
        style={style} 
    >
        <Dice face={face} />
    </div>
  );
};


export default Cup;
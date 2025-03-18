import React from 'react';
import "../styles/dices.css";
import PropTypes from 'prop-types';
import { useDraggable } from '@dnd-kit/core';
import Dice from './Dice';

const Cup = ({id}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  // Estilos dinámicos para el movimiento
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      className="flex justify-center items-center p-8 border-2 border-black cursor-grab active:cursor-grabbing"
    >
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={style} // Aplicamos los estilos dinámicos

      >
        <Dice face="1" />
      </div>
    </div>
  );
};

Cup.propTypes = {};

export default Cup;
import React from 'react';
import "../styles/dices.css"
import PropTypes from 'prop-types';
import { useDraggable } from '@dnd-kit/core';

/**
 * 
 * 
 * 
 * @returns 
 */

const Cup = () => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id:"player_dice",
  })
  
    return (
      <div ref={setNodeRef} {...listeners} {...attributes} className="flex justify-center items-center p-8 border-2 border-black">
        <div >
          <div className="face one">
            <span></span>
          </div>
        </div>
      </div>
    );
};


Cup.propTypes = {

};


export default Cup;

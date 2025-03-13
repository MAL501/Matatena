import React from 'react';
import PropTypes from 'prop-types';
import "../styles/dices.css"


const Board = () => {
    return (
    <div className="w-72 h-72 grid grid-cols-3 gap-x-2 bg-white border-4 border-black p-2">
      {/* Celdas del tablero */}
      <div className="flex justify-center items-center aspect-square border-r-4 border-black last:border-r-0"></div>
      <div className="flex justify-center items-center aspect-square border-r-4 border-black last:border-r-0"></div>
      <div className="flex justify-center items-center aspect-square"></div>

      <div className="flex justify-center items-center aspect-square border-r-4 border-black last:border-r-0"></div>
      <div className="flex justify-center items-center aspect-square border-r-4 border-black last:border-r-0"></div>
      <div className="flex justify-center items-center aspect-square"></div>

      <div className="flex justify-center items-center aspect-square border-r-4 border-black last:border-r-0"></div>
      <div className="flex justify-center items-center aspect-square border-r-4 border-black last:border-r-0"></div>
      <div className="flex justify-center items-center aspect-square"></div>
    </div>
    );
};


Board.propTypes = {

};


export default Board;

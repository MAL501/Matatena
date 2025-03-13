import React from 'react';
import Cup from './Cup';
import Board from './Board';
import PropTypes from 'prop-types';


const Table = () => {
    return (
        <div>
            {/* Espacio del guest */}
            <Board />
            <Cup />
            {/* Espacio del host */}

            <Board />
            <Cup />
        </div>
    );
};


Table.propTypes = {

};


export default Table;

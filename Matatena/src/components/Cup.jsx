import React from 'react';
import "../styles/dices.css"
import PropTypes from 'prop-types';
/**
 * 
 * 
 * 
 * @returns 
 */

const Cup = () => {
    return (
      <div className="flex justify-center items-center p-8 border-2 border-black">
        <div class="face one">
          <span></span>
        </div>
      </div>
    );
};


Cup.propTypes = {

};


export default Cup;

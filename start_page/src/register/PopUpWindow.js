import React from 'react';
import Popup from 'reactjs-popup';


/**
 * Module Name: PopUp.js
 * Date of Creation: 08/09/2022
 * Creator: Hao Xu  
 * Summary: Pop up page that appears when user finishes register
 * Variable Accessed: 
 */

const PopUpWindow = () => {
  return (
    <Popup className='PopUp'
    trigger={<button className="button"> Open Modal </button>}
    modal
    nested
  >
    {close => (
      <div className="modal">
        <h1 className="header">Successfully Created Account </h1>
        <div className="actions">
          <button
            className="button"
            onClick={() => {
              console.log('modal closed ');
              close();
            }}
          >
            Go To Log In
          </button>
        </div>
      </div>
    )}
  </Popup>
  )
}

export default PopUpWindow

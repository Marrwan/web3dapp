import React from 'react'
import "./modal.css";
const Modal = (props) => {
    return (
        <div className='modal'>
            <div className="modal-content">
                <h3>Insufficient tron in wallet</h3>
                <div className='modal-button-container'>

                    <button className='modal-button'
                        onClick={props.closeModal}
                    >Ok</button>
                </div>
            </div>

        </div>
    )
}

export default Modal
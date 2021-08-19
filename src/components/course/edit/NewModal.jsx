import React from 'react';
import Modal from 'react-modal';
Modal.setAppElement("#root");


export default function NewModal(props) {
    const { isOpen, onRequestClose, setNewUnit, onCreateNewUnitClick, modalMessage, hideModal } = props;

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="Modal"
            overlayClassName="Overlay"
            contentLabel="modal label">
            <div className="modal__header">
                <span>Start composing your new unit by naming it below:</span>
            </div>
            <div className="modal__body">
                <div className="input-form--long">
                    <input onChange={e => setNewUnit(e.target.value)} type="text" className="input-form--long__input" id="unit-name" placeholder=" " />
                    <label className="input-form--long__label" htmlFor="unit-name">Unit title</label>
                </div>
            </div>

            <div className="modal__footer">
                <button className="button-default" onClick={() => hideModal()}>Cancel</button>
                <button className="button-default" onClick={() => onCreateNewUnitClick()}>Create</button>
            </div>

            <div className="modal__message">
                <span>{modalMessage}</span>
            </div>
        </Modal>
    )
}

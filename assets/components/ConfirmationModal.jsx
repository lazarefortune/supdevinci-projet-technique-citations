import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement("#root");

function ConfirmationModal({ isOpen, onRequestClose, onConfirm }) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="modal"
            overlayClassName="modal-overlay"
        >
            <h2 className="text-2xl mb-4">Confirmer la suppression</h2>
            <p className="mb-4">Êtes-vous sûr de vouloir supprimer cette citation ? Cette action est irréversible.</p>
            <div className="flex justify-end space-x-4">
                <button onClick={onRequestClose} className="px-4 py-2 bg-gray-500 text-white rounded shadow hover:bg-gray-700">Annuler</button>
                <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-700">Supprimer</button>
            </div>
        </Modal>
    );
}

export default ConfirmationModal;
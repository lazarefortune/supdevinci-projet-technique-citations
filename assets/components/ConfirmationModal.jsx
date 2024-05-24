import React from 'react';
import Modal from 'react-modal';
import { Trash2 } from "lucide-react";

Modal.setAppElement("#root");

const ConfirmationModal = ({ isOpen, onRequestClose, onConfirm }) => {
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
                <button onClick={onRequestClose} className="btn-light">Annuler</button>
                <button onClick={onConfirm} className="btn-danger">
                    <Trash2 size={20} className="mr-1" />
                    Supprimer
                </button>
            </div>
        </Modal>
    );
}

export default React.memo(ConfirmationModal);

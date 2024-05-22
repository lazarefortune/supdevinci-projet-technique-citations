import React, { useState, useEffect } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

function QuoteModal({ isOpen, onRequestClose, onSave, quote }) {
    const [content, setContent] = useState(quote ? quote.content : "");
    const [author, setAuthor] = useState(quote ? quote.author : "");

    useEffect(() => {
        if (quote) {
            setContent(quote.content);
            setAuthor(quote.author);
        } else {
            setContent("");
            setAuthor("");
        }
    }, [quote]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ content, author, id: quote ? quote.id : undefined });
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal stack-large" overlayClassName="modal-overlay">
            <h2 className="h3">{quote ? "Modifier la citation" : "Ajouter une citation"}</h2>
            <form onSubmit={handleSubmit} className="stack">
                <div>
                    <label>Votre inspiration</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Auteur</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn-primary">
                    {quote ? "Enregistrer" : "Ajouter la citation"}
                </button>
            </form>
            <button onClick={onRequestClose} className="btn-light">Fermer</button>
        </Modal>
    );
}

export default QuoteModal;
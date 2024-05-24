import React, { useState, useEffect, useCallback } from "react";
import Modal from "react-modal";
import { Save, Send } from "lucide-react";

Modal.setAppElement("#root");

const QuoteModal = ({ isOpen, onRequestClose, onSave, quote }) => {
    const [ content, setContent ] = useState(quote ? quote.content : "");
    const [ author, setAuthor ] = useState(quote ? quote.author : "");
    const [ isVerified, setIsVerified ] = useState(quote ? quote.isVerified : false);

    useEffect(() => {
        if (quote) {
            setContent(quote.content);
            setAuthor(quote.author);
            setIsVerified(quote.isVerified);
        } else {
            setContent("");
            setAuthor("");
            setIsVerified(false);
        }
    }, [ quote ]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        onSave({ content, author, isVerified, id: quote ? quote.id : undefined });
    }, [ content, author, isVerified, onSave, quote ]);

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal stack-large"
               overlayClassName="modal-overlay">
            <h2 className="h3">{quote ? "Modifier la citation" : "Ajouter une citation"}</h2>
            <form onSubmit={handleSubmit} className="stack">
                <div>
                    <label className="text-muted">Nom de l'auteur</label>
                    <input
                        type="text"
                        value={author}
                        required
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </div>
                <div>
                    <label className="relative inline-flex cursor-pointer items-center">
                        <input type="checkbox"
                               className="peer sr-only"
                               checked={isVerified}
                               onChange={(e) => setIsVerified(e.target.checked)}
                        />
                        <div
                            className="h-6 w-11 rounded-full bg-slate-100 dark:bg-dark-soft-3 after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition-all after:content-[''] hover:bg-slate-200 peer-checked:bg-primary-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-disabled:cursor-not-allowed peer-disabled:bg-slate-100 peer-disabled:after:bg-slate-50"></div>
                        <span className="ml-3 label">
                            Certifié l'auteur
                        </span>
                    </label>
                </div>
                <div>
                    <label className="text-muted">Laissez parler l'imagination</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        rows={10}
                    />
                </div>
                <div className="flex justify-end space-x-2">
                    <button onClick={onRequestClose} className="btn-light">Annuler</button>
                    <button type="submit" className="btn-primary">
                        {quote ? <Save size={20} className="mr-1" /> : <Send size={20} className="mr-1" />}
                        {quote ? "Enregistrer" : "Publier"}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default React.memo(QuoteModal);

import React, { useState } from "react";
import QuoteModal from "./QuoteModal";
import QuoteList from "./QuoteList";
import useQuotes from "../hooks/useQuotes";
import useLikeDislike from "../hooks/useLikeDislike";

function App() {
    const { quotes, addQuote, updateQuote, deleteQuote } = useQuotes();
    const { handleLike, handleDislike } = useLikeDislike(quotes);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedQuote, setSelectedQuote] = useState(null);

    const openModal = (quote = null) => {
        setSelectedQuote(quote);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedQuote(null);
    };

    const handleSave = async (quote) => {
        if (quote.id) {
            await updateQuote(quote);
        } else {
            await addQuote(quote);
        }
        closeModal();
    };

    return (
        <div className="max-w-5xl mx-auto min-h-screen py-6 space-y-3">
            <button onClick={() => openModal()} className="btn-primary">Ajouter une citation</button>
            <QuoteList
                quotes={quotes}
                onEdit={openModal}
                onDelete={deleteQuote}
                onLike={handleLike}
                onDislike={handleDislike}
            />
            <QuoteModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                onSave={handleSave}
                quote={selectedQuote}
            />
        </div>
    );
}

export default App;

import React, { useEffect, useState, useContext } from "react";
import QuoteModal from "./QuoteModal";
import QuoteList from "./QuoteList";
import { QuoteContext } from "../context/QuoteContext";

function App() {
    const { state, fetchQuotes, addQuote, updateQuote, deleteQuote, handleLike, handleDislike } = useContext(QuoteContext);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedQuote, setSelectedQuote] = useState(null);

    useEffect(() => {
        fetchQuotes();
    }, []);

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
                quotes={state.quotes}
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

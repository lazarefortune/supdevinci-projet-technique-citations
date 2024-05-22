import React, { useEffect, useState, useContext } from "react";
import QuoteModal from "./QuoteModal";
import QuoteList from "./QuoteList";
import { QuoteContext } from "../context/QuoteContext";
import ConfirmationModal from "./ConfirmationModal";
import { Plus } from "lucide-react";

function App() {
    const { state, fetchQuotes, addQuote, updateQuote, deleteQuote, handleLike, handleDislike } = useContext(QuoteContext);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [confirmationModalIsOpen, setConfirmationModalIsOpen] = useState(false);
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

    const openConfirmationModal = (quote) => {
        setSelectedQuote(quote);
        setConfirmationModalIsOpen(true);
    };

    const closeConfirmationModal = () => {
        setConfirmationModalIsOpen(false);
        setSelectedQuote(null);
    };

    const handleDelete = async () => {
        if (selectedQuote) {
            await deleteQuote(selectedQuote.id);
            closeConfirmationModal();
        }
    };

    return (
        <div className="max-w-5xl mx-auto min-h-screen py-6 space-y-3">
            <button onClick={() => openModal()} className="btn-primary mb-8">
                <Plus size={24} />
                Ajouter une citation
            </button>
            <QuoteList
                quotes={state.quotes}
                onEdit={openModal}
                onDelete={openConfirmationModal}
                onLike={handleLike}
                onDislike={handleDislike}
            />
            <QuoteModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                onSave={handleSave}
                quote={selectedQuote}
            />
            <ConfirmationModal
                isOpen={confirmationModalIsOpen}
                onRequestClose={closeConfirmationModal}
                onConfirm={handleDelete}
            />
        </div>
    );
}

export default App;

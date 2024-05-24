import { Feather, Plus } from "lucide-react";
import React, { useCallback, useContext, useState } from "react";
import QuoteModal from "./QuoteModal";
import { QuoteContext } from "../context/QuoteContext";

const AddQuoteButton = () => {
    const { addQuote } = useContext(QuoteContext);

    const [ modalIsOpen, setModalIsOpen ] = useState(false);
    const [ selectedQuote, setSelectedQuote ] = useState(null);

    const openModal = useCallback((quote = null) => {
        setSelectedQuote(quote);
        setModalIsOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setModalIsOpen(false);
        setSelectedQuote(null);
    }, []);

    const handleSave = useCallback(async (quote) => {
        await addQuote(quote);
        closeModal();
    }, [ addQuote, closeModal ]);

    return (
        <>
            <button onClick={() => openModal()} className="btn-primary">
                <Feather size={24}/>
                Ecrire une citation
            </button>
            <QuoteModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                onSave={handleSave}
                quote={selectedQuote}
            />
        </>
    );
}

export default AddQuoteButton;
import React, { useCallback, useContext, useEffect, useState } from "react";
import { BadgeCheck, Pencil, Quote, Share, ThumbsDown, ThumbsUp, Trash } from "lucide-react";
import { QuoteContext } from "../context/QuoteContext";
import QuoteModal from "./QuoteModal";
import ConfirmationModal from "./ConfirmationModal";

const QuoteItem = ({ quoteId }) => {

    const [ quote, setQuote ] = useState([]);
    const { state, addQuote, updateQuote, deleteQuote, handleLike, handleDislike } = useContext(QuoteContext);

    const [ modalIsOpen, setModalIsOpen ] = useState(false);
    const [ selectedQuote, setSelectedQuote ] = useState(null);
    const [ confirmationModalIsOpen, setConfirmationModalIsOpen ] = useState(false);

    useEffect(() => {
        state.quotes.map((quote) => {
            if (quoteId === quote.id) {
                setQuote(quote);
            }
        });
    }, [ state.quotes ]);

    // edit modal
    const openModal = useCallback((quote = null) => {
        setSelectedQuote(quote);
        setModalIsOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setModalIsOpen(false);
        setSelectedQuote(null);
    }, []);

    const handleSave = useCallback(async (quote) => {
        if (quote.id) {
            await updateQuote(quote);
        } else {
            await addQuote(quote);
        }
        closeModal();
    }, [ addQuote, updateQuote, closeModal ]);

    // delete modal
    const openConfirmationModal = useCallback((quote) => {
        setSelectedQuote(quote);
        setConfirmationModalIsOpen(true);
    }, []);

    const closeConfirmationModal = useCallback(() => {
        setConfirmationModalIsOpen(false);
        setSelectedQuote(null);
    }, []);

    const handleDelete = useCallback(async () => {
        if (selectedQuote) {
            await deleteQuote(selectedQuote.id);
            closeConfirmationModal();
        }
    }, [ selectedQuote, deleteQuote, closeConfirmationModal ]);

    return (
        <li className="p-4 md:p-8 bg-white shadow">
            <div className="flex justify-end space-x-4 items-center">
                <button onClick={() => openModal(quote)} className="btn-icon">
                    <Pencil size={16}/>
                </button>
                <button onClick={() => openConfirmationModal(quote)} className="btn-icon">
                    <Trash size={16}/>
                </button>
            </div>

            <div className="space-y-3 flex flex-col">
                <div className="relative flex flex-col border border-slate-200 py-4 px-4 items-center">
                    <span className="absolute -top-4 left-0 text-slate-900"
                    >
                        <Quote/>
                    </span>
                    <p className="text-base md:text-lg font-serif leading-relaxed text-gray-800">
                        {quote.content}
                    </p>
                    <span className="absolute -bottom-4 right-0 text-slate-900">
                        <Quote/>
                    </span>
                </div>
            </div>


            <div className="flex items-center">
                <div className="text-base mt-4 flex items-center gap-1 text-slate-700">
                    {quote.isVerified && <BadgeCheck className="inline-block" color="green" size={20}/>}
                    {quote.author}
                </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
                <button onClick={() => handleLike(quote.id)} className="btn-soft">
                    <ThumbsUp size={20} {...quote.userVote === 'like' && { fill: 'rgba(37,99,235,0.38)' }}/>
                    <span className='text-slate-900'>
                        {quote.likes}
                    </span>
                </button>
                <button onClick={() => handleDislike(quote.id)} className="btn-soft">
                    <ThumbsDown size={20} {...quote.userVote === 'dislike' && { fill: 'rgba(235,37,80,0.56)' }}/>
                    <span className='text-slate-900'>
                        {quote.dislikes}
                    </span>
                </button>
            </div>

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
        </li>
    );
}

export default QuoteItem;

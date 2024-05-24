import React, { useCallback, useContext, useEffect, useState } from "react";
import { BadgeCheck, Feather, Quote, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react";
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
        <li>
            <div className="relative rounded-lg bg-white text-slate-900 shadow dark:bg-dark-soft dark:text-white">
                <div className="px-4 pt-4 pb-4 md:px-8">
                    <div className="mb-1 flex items-center justify-end">
                        <button onClick={() => openModal(quote)} className="btn-icon">
                            <Feather size={16}/>
                        </button>
                        <button onClick={() => openConfirmationModal(quote)} className="btn-icon">
                            <Trash2 size={16}/>
                        </button>
                    </div>

                    <div className="flex flex-col space-y-3">
                        <div
                            className="relative flex flex-col items-center rounded-lg border border-slate-200 px-4 py-8 dark:border-dark-soft-2">
                    <span className="absolute -top-4 -left-4 bg-white dark:bg-dark-soft p-3 text-slate-900 dark:text-white">
                        <Quote/>
                    </span>
                            <p className="font-serif text-base leading-relaxed text-gray-800 font-hanken-grotesk dark:text-white md:text-lg">
                                {quote.content}
                            </p>
                            <span
                                className="absolute -right-4 -bottom-4 rotate-180 transform bg-white dark:bg-dark-soft p-3 text-slate-900 dark:text-white">
                        <Quote/>
                    </span>
                        </div>
                    </div>

                    <div className="mt-4 flex items-center justify-end">
                        <div
                            className="mt-4 flex items-center gap-1 text-base text-slate-700 font-ibmPlexSans dark:text-white">
                            <span className="text-sm">- </span>
                            {quote.isVerified &&
                                <BadgeCheck className="inline-block text-primary-600 dark:text-primary-500" size={20}/>}
                            {quote.author}
                        </div>
                    </div>
                </div>

                <div className="flex justify-start bg-slate-50 px-4 py-2 space-x-4 dark:bg-dark-soft-3 md:px-8">
                    <button onClick={() => handleLike(quote.id)} className="btn-soft">
                        <ThumbsUp size={20} {...quote.userVote === 'like' && { fill: '#a089fc' }}/>
                        <span>{quote.likes}</span>
                    </button>
                    <button onClick={() => handleDislike(quote.id)} className="btn-soft">
                        <ThumbsDown size={20} {...quote.userVote === 'dislike' && { fill: '#a089fc' }}/>
                        <span>{quote.dislikes}</span>
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
            </div>
        </li>
    );
}

export default QuoteItem;

import { useState, useEffect } from "react";
import axios from "axios";

const useQuotes = () => {
    const [quotes, setQuotes] = useState([]);

    useEffect(() => {
        fetchQuotes();
    }, []);

    const fetchQuotes = async () => {
        try {
            const response = await axios.get('/api/quotes/');
            setQuotes(response.data.quotes);
        } catch (error) {
            console.error(error);
        }
    };

    const addQuote = async (quote) => {
        try {
            const response = await axios.post('/api/quotes/', quote);
            setQuotes([...quotes, response.data]);
        } catch (error) {
            console.error(error);
        }
    };

    const updateQuote = async (quote) => {
        try {
            const response = await axios.put(`/api/quotes/${quote.id}`, quote);
            setQuotes(quotes.map(q => (q.id === quote.id ? response.data : q)));
        } catch (error) {
            console.error(error);
        }
    };

    const deleteQuote = async (id) => {
        try {
            await axios.delete(`/api/quotes/${id}`);
            setQuotes(quotes.filter(q => q.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return {
        quotes,
        addQuote,
        updateQuote,
        deleteQuote
    };
};

export default useQuotes;

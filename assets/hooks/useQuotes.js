import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "/api/quotes";

const useQuotes = () => {
    const [ quotes, setQuotes ] = useState([]);

    useEffect(() => {
        fetchQuotes();
    }, []);

    const fetchQuotes = async () => {
        try {
            const response = await axios.get(API_URL + "/");
            setQuotes(response.data.quotes);
        } catch (error) {
            console.error(error);
        }
    };

    const addQuote = async (quote) => {
        try {
            const response = await axios.post(API_URL + "/", quote);
            setQuotes([ ...quotes, response.data ]);
        } catch (error) {
            console.error(error);
        }
    };

    const updateQuote = async (quote) => {
        try {
            const response = await axios.put(API_URL + `/${quote.id}`, quote);
            setQuotes(quotes.map(q => (q.id === quote.id ? response.data : q)));
        } catch (error) {
            console.error(error);
        }
    };

    const deleteQuote = async (id) => {
        try {
            await axios.delete(API_URL + `/${id}`);
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

import React, { createContext, useReducer } from 'react';
import { quoteReducer, initialState } from '../reducers/quoteReducer';
import axios from 'axios';

export const QuoteContext = createContext(
    {
        state: initialState,
        fetchQuotes: () => {},
        addQuote: () => {},
        updateQuote: () => {},
        deleteQuote: () => {},
        handleLike: () => {},
        handleDislike: () => {},
    }
);

export const QuoteProvider = ({ children }) => {
    const [state, dispatch] = useReducer(quoteReducer, initialState, (initialState) => initialState);

    const fetchQuotes = async () => {
        try {
            const response = await axios.get('/api/quotes/');
            dispatch({ type: 'SET_QUOTES', payload: response.data.quotes });
        } catch (error) {
            console.error(error);
        }
    };

    const addQuote = async (quote) => {
        try {
            const response = await axios.post('/api/quotes/', quote);
            dispatch({ type: 'ADD_QUOTE', payload: response.data });
        } catch (error) {
            console.error(error);
        }
    };

    const updateQuote = async (quote) => {
        try {
            const response = await axios.put(`/api/quotes/${quote.id}`, quote);
            dispatch({ type: 'UPDATE_QUOTE', payload: response.data });
        } catch (error) {
            console.error(error);
        }
    };

    const deleteQuote = async (id) => {
        try {
            await axios.delete(`/api/quotes/${id}`);
            dispatch({ type: 'DELETE_QUOTE', payload: id });
        } catch (error) {
            console.error(error);
        }
    };

    const handleLike = async (id) => {
        try {
            const response = await axios.post(`/api/quotes/${id}/like`);
            dispatch({ type: 'LIKE_QUOTE', payload: { id, likes: response.data.likes, dislikes: response.data.dislikes } });
        } catch (error) {
            console.error(error);
        }
    };

    const handleDislike = async (id) => {
        try {
            const response = await axios.post(`/api/quotes/${id}/dislike`);
            dispatch({ type: 'DISLIKE_QUOTE', payload: { id, likes: response.data.likes, dislikes: response.data.dislikes } });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <QuoteContext.Provider value={{ state, fetchQuotes, addQuote, updateQuote, deleteQuote, handleLike, handleDislike }}>
            {children}
        </QuoteContext.Provider>
    );
};

import React,{ createContext,useReducer,useCallback,useState } from 'react';
import { quoteReducer,initialState } from '../reducers/quoteReducer';
import axios from 'axios';

const API_URL = "/api/quotes";

export const QuoteContext = createContext(
    {
        state: initialState,
        fetchQuotes: () => {
        },
        addQuote: () => {
        },
        updateQuote: () => {
        },
        deleteQuote: () => {
        },
        handleLike: () => {
        },
        handleDislike: () => {
        },
        currentPage: 1,
        setCurrentPage: () => {
        },
        totalPages: 1,
    }
);

export const QuoteProvider = ({ children }) => {
    const [ state,dispatch ] = useReducer(quoteReducer,initialState);

    const [currentPage , setCurrentPage] = useState(1);
    const [totalPages , setTotalPages] = useState(1);

    const fetchQuotes = useCallback(async () => {
        try {
            const url = currentPage ? `${API_URL}?page=${currentPage}` : API_URL;
            const response = await axios.get(url);
            if (response.data.totalPages) {
                setTotalPages(response.data.totalPages);
            }
            if (response.data.currentPage) {
                setCurrentPage(response.data.currentPage);
            }
            dispatch({ type: 'SET_QUOTES',payload: response.data.quotes });
        } catch (error) {
            console.error(error);
        }
    },[currentPage]);

    const addQuote = useCallback(async (quote) => {
        try {
            const response = await axios.post(API_URL + '/',quote);
            dispatch({ type: 'ADD_QUOTE',payload: response.data });
        } catch (error) {
            console.error(error);
        }
    },[]);

    const updateQuote = useCallback(async (quote) => {
        try {
            const response = await axios.put(API_URL + `/${quote.id}`,quote);
            dispatch({ type: 'UPDATE_QUOTE',payload: response.data });
        } catch (error) {
            console.error(error);
        }
    },[]);

    const deleteQuote = useCallback(async (id) => {
        try {
            await axios.delete(API_URL + `/${id}`);
            dispatch({ type: 'DELETE_QUOTE',payload: id });
        } catch (error) {
            console.error(error);
        }
    },[]);

    const handleLike = useCallback(async (id) => {
        try {
            const response = await axios.post(API_URL + `/${id}/like`);
            dispatch({
                type: 'LIKE_QUOTE',
                payload: {
                    id,
                    likes: response.data.likes,
                    dislikes: response.data.dislikes,
                    userVote: response.data.userVote
                }
            });
        } catch (error) {
            console.error(error);
        }
    },[]);

    const handleDislike = useCallback(async (id) => {
        try {
            const response = await axios.post(API_URL + `/${id}/dislike`);
            dispatch({
                type: 'DISLIKE_QUOTE',
                payload: {
                    id,
                    likes: response.data.likes,
                    dislikes: response.data.dislikes,
                    userVote: response.data.userVote
                }
            });
        } catch (error) {
            console.error(error);
        }
    },[]);

    return (
        <QuoteContext.Provider value={{
            state,
            fetchQuotes,
            addQuote,
            updateQuote,
            deleteQuote,
            handleLike,
            handleDislike,
            currentPage,
            setCurrentPage,
            totalPages,
        }}>
            {children}
        </QuoteContext.Provider>
    );
};

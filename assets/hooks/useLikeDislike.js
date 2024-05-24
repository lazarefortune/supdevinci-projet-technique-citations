import React,{ useState } from "react";
import axios from "axios";

const API_URL = "/api/quotes";

const useLikeDislike = (initialQuotes) => {
    const [ quotes,setQuotes ] = useState(initialQuotes);

    const handleLike = async (id) => {
        try {
            const response = await axios.post(API_URL + `/${id}/like`);
            setQuotes(quotes.map(q => (q.id === id ? {
                ...q,
                likes: response.data.likes,
                dislikes: response.data.dislikes
            } : q)));
        } catch (error) {
            console.error(error);
        }
    };

    const handleDislike = async (id) => {
        try {
            const response = await axios.post(API_URL + `/${id}/dislike`);
            setQuotes(quotes.map(q => (q.id === id ? {
                ...q,
                likes: response.data.likes,
                dislikes: response.data.dislikes
            } : q)));
        } catch (error) {
            console.error(error);
        }
    };

    return {
        quotes,
        handleLike,
        handleDislike
    };
};

export default useLikeDislike;

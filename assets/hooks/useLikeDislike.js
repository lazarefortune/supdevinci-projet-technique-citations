import React,{ useState } from "react";
import axios from "axios";

const useLikeDislike = (initialQuotes) => {
    const [ quotes,setQuotes ] = useState(initialQuotes);

    const handleLike = async (id) => {
        try {
            const response = await axios.post(`/api/quotes/${id}/like`);
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
            const response = await axios.post(`/api/quotes/${id}/dislike`);
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

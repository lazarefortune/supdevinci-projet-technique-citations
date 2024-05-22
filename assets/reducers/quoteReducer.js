export const initialState = {
    quotes: [],
};

export const quoteReducer = (state, action) => {
    switch (action.type) {
        case 'SET_QUOTES':
            return { ...state, quotes: action.payload };
        case 'ADD_QUOTE':
            return { ...state, quotes: [...state.quotes, action.payload] };
        case 'UPDATE_QUOTE':
            return {
                ...state,
                quotes: state.quotes.map(q => q.id === action.payload.id ? action.payload : q),
            };
        case 'DELETE_QUOTE':
            return {
                ...state,
                quotes: state.quotes.filter(q => q.id !== action.payload),
            };
        case 'LIKE_QUOTE':
        case 'DISLIKE_QUOTE':
            return {
                ...state,
                quotes: state.quotes.map(q => q.id === action.payload.id ? { ...q, likes: action.payload.likes, dislikes: action.payload.dislikes } : q),
            };
        default:
            return state;
    }
};

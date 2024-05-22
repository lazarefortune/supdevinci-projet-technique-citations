import React from "react";
import QuoteItem from "./QuoteItem";

const QuoteList = ({ quotes, onEdit, onDelete, onLike, onDislike }) => (
    <ul className="grid3">
        {quotes.map(quote => (
            <QuoteItem
                key={quote.id}
                quote={quote}
                onEdit={onEdit}
                onDelete={onDelete}
                onLike={onLike}
                onDislike={onDislike}
            />
        ))}
    </ul>
);

export default QuoteList;

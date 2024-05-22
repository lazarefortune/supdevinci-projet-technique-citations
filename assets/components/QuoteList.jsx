import React from "react";
import QuoteItem from "./QuoteItem";

const QuoteList = ({ quotes, onEdit, onDelete, onLike, onDislike }) => (
    <ul className="w-full flex flex-col space-y-10">
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
import React from "react";
import QuoteItem from "./QuoteItem";

const QuoteList = ({ quotes }) => (
    <ul className="w-full flex flex-col space-y-10">
        {quotes.map(quote => (
            <QuoteItem
                key={quote.id}
                quoteId={quote.id}
                quote={quote}
            />
        ))}
    </ul>
);

export default QuoteList;
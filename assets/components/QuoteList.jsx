import React from "react";
import QuoteItem from "./QuoteItem";
import Reveal from "./Reveal";

const QuoteList = ({ quotes }) => (
    <ul className="w-full flex flex-col space-y-10">
        {quotes.map(quote => (
            <Reveal key={quote.id} delay={0.1 * quotes.indexOf(quote)}>
                <QuoteItem
                    key={quote.id}
                    quoteId={quote.id}
                    quote={quote}
                />
            </Reveal>
        ))}
    </ul>
);

export default QuoteList;
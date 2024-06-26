import React, { useEffect, useContext} from "react";
import { QuoteContext } from "../context/QuoteContext";
import QuoteList from "./QuoteList";
import AddQuoteButton from "./AddQuoteButton";
import Paginator from "./Paginator";
import ThemeSwitcher from "./ThemeSwitcher";

function App() {
    const { state, fetchQuotes } = useContext(QuoteContext);

    useEffect(() => {
        fetchQuotes();
    }, [fetchQuotes]);

    return (
        <div className="max-w-5xl mx-auto min-h-screen py-6 space-y-3">
            <div className="mb-6 flex justify-between items-center">
                <AddQuoteButton />
                <ThemeSwitcher />
            </div>
            <QuoteList quotes={state.quotes}/>
            <div className="mt-10">
                <Paginator/>
            </div>
        </div>
    );
}

export default App;

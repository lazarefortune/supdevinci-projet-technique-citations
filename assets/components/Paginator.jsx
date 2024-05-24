import React, { useContext } from "react";
import { QuoteContext } from "../context/QuoteContext";

const Paginator = () => {
    const { currentPage, setCurrentPage, totalPages } = useContext(QuoteContext);

    return (
        <div className="flex justify-center space-x-2">
            {currentPage > 1 && (
                <button onClick={() => setCurrentPage(currentPage - 1)} className="btn-light">
                    Précédent
                </button>
            )}
            {currentPage < totalPages && (
                <button onClick={() => setCurrentPage(currentPage + 1)} className="btn-light">
                    Suivant
                </button>
            )}
        </div>
    )
}

export default Paginator;
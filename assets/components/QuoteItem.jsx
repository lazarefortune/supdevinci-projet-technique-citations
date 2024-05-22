import React from "react";
import { Pencil, ThumbsDown, ThumbsUp, Trash } from "lucide-react";

const QuoteItem = ({ quote, onEdit, onDelete, onLike, onDislike }) => (
    <li className="p-3 bg-slate-50 shadow">
        <p>{quote.content}</p>
        <p>{quote.author}</p>
        <div className="flex space-x-3">
            <button onClick={() => onEdit(quote)} className="btn-icon">
                <Pencil size={16} />
            </button>
            <button onClick={() => onDelete(quote.id)} className="btn-icon">
                <Trash size={16} />
            </button>
            <button onClick={() => onLike(quote.id)} className="btn-icon">
                ({quote.likes})
                <ThumbsUp size={16} />
            </button>
            <button onClick={() => onDislike(quote.id)} className="btn-icon">
                ({quote.dislikes})
                <ThumbsDown size={16} />
            </button>
        </div>
    </li>
);

export default QuoteItem;

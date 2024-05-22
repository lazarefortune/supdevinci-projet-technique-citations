import React from "react";
import { Pencil, ThumbsDown, ThumbsUp, Trash } from "lucide-react";

const QuoteItem = ({ quote, onEdit, onDelete, onLike, onDislike }) => (
    <li className="px-4 py-3 bg-white shadow">
        <p>"{quote.content}"</p>
        <p className="italic text-muted text-sm">{quote.author}</p>
        <div className="flex space-x-3">
            <button onClick={() => onEdit(quote)} className="btn-icon">
                <Pencil size={20} />
            </button>
            <button onClick={() => onDelete(quote.id)} className="btn-icon">
                <Trash size={20} />
            </button>
            <button onClick={() => onLike(quote.id)} className="btn-icon flex items-center gap-1">
                <span>{quote.likes}</span>
                <ThumbsUp size={20} />
            </button>
            <button onClick={() => onDislike(quote.id)} className="btn-icon flex items-center gap-1">
                <span>{quote.dislikes}</span>
                <ThumbsDown size={20} />
            </button>
        </div>
    </li>
);

export default QuoteItem;

import React from "react";
import { Pencil, ThumbsDown, ThumbsUp, Trash } from "lucide-react";

const QuoteItem = ({ quote, onEdit, onDelete, onLike, onDislike }) => (
    <li className="p-4 md:p-8 bg-white shadow">
        <div className="flex justify-end space-x-4 items-center">
            <button onClick={() => onEdit(quote)} className="btn-icon">
                <Pencil size={16}/>
            </button>
            <button onClick={() => onDelete(quote)} className="btn-icon">
                <Trash size={16}/>
            </button>
        </div>

        <div className="space-y-3 flex flex-col">
            <span className="text-primary-600 text-2xl md:text-3xl font-serif italic leading-relaxed"
            >“</span>
            <p className="text-base md:text-lg font-serif italic leading-relaxed text-gray-800"
            >{quote.content}</p>
            <span className="text-primary-600 text-right text-2xl md:text-3xl font-serif italic leading-relaxed"
            >”</span>
        </div>

        <div className="text-right text-sm text-gray-500 mt-4">- {quote.author}</div>

        <div className="flex justify-end space-x-4 mt-6">
            <button onClick={() => onLike(quote.id)} className="btn-light">
                <span className="text-slate-900">{quote.likes}</span>
                <ThumbsUp size={24}/>
            </button>
            <button onClick={() => onDislike(quote.id)} className="btn-light">
                <span className="text-slate-900">{quote.dislikes}</span>
                <ThumbsDown size={24}/>
            </button>
        </div>
    </li>
);

export default QuoteItem;

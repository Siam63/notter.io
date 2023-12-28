import React from 'react'

function Note({ text, onDelete }) {
    return (
        <li>
            {text}
            <button className="bg-slate-300 hover:bg-slate-400 transition-all hover:scale-110 p-2 m-2 rounded-md" onClick={onDelete}>Delete</button>
        </li>
    )
}

export default Note

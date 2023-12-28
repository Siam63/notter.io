import React from 'react'

function Note({ text, onDelete }) {
    return (
        <li>
            {text}
            <button onClick={onDelete}>Delete</button>
        </li>
    )
}

export default Note

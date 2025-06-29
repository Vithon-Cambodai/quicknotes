import React from 'react';

const NoteCard = ({ note, onView, onEdit, onDelete }) => (
  <div
    className="note-card"
    style={{ backgroundColor: note.color || '#e6f0fa' }}
  >
    <h3>{note.title}</h3>
    <p>{note.content.length > 100 ? note.content.slice(0, 100) + '...' : note.content}</p>
    <div>
      <button onClick={() => onView(note)}>View</button>
      <button onClick={() => onEdit(note)}>Edit</button>
      <button onClick={() => onDelete(note.id)}>Delete</button>
    </div>
  </div>
);

export default NoteCard;

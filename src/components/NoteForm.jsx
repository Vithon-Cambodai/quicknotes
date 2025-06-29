import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const NoteForm = ({ onAddNote, existingNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState('#f9c74f'); // default color

  useEffect(() => {
    if (existingNote) {
      setTitle(existingNote.title);
      setContent(existingNote.content);
      setColor(existingNote.color || '#f9c74f');
    } else {
      setTitle('');
      setContent('');
      setColor('#f9c74f');
    }
  }, [existingNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return;

    const note = {
      id: existingNote ? existingNote.id : uuidv4(),
      title,
      content,
      color,
      createdAt: existingNote?.createdAt || new Date().toISOString()
    };

    onAddNote(note);
    setTitle('');
    setContent('');
    setColor('#f9c74f');
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Note Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Write your note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <label>
        Choose Color:
        <select
          value={color}
          onChange={(e) => setColor(e.target.value)}
          style={{ marginLeft: '10px', padding: '6px', borderRadius: '6px' }}
        >
          <option value="#f9c74f">Default (Yellow)</option>
          <option value="#f94144">Red</option>
          <option value="#90be6d">Green</option>
          <option value="#577590">Steel Blue</option>
          <option value="#f9844a">Orange</option>
          <option value="#43aa8b">Mint Green</option>
          <option value="#9d4edd">Purple</option>
          <option value="#ff6f61">Coral</option>
        </select>
      </label>

      <button type="submit">
        {existingNote ? 'Update Note' : 'Save Note'}
      </button>
    </form>
  );
};

export default NoteForm;

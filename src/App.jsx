import React, { useState, useEffect } from 'react';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import './styles.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [viewingNote, setViewingNote] = useState(null);
  const [editingNote, setEditingNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [filterColor, setFilterColor] = useState('');

  // Load notes from localStorage on start
  useEffect(() => {
    const storedNotes = localStorage.getItem('quicknotes');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  // Save notes to localStorage when updated
  useEffect(() => {
    localStorage.setItem('quicknotes', JSON.stringify(notes));
  }, [notes]);

  // Add or update note
  const addNote = (note) => {
    if (editingNote) {
      setNotes(notes.map(n => n.id === note.id ? note : n));
      setEditingNote(null);
    } else {
      const newNote = { ...note, createdAt: new Date().toISOString() };
      setNotes([newNote, ...notes]);
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
  };

  const handleViewNote = (note) => {
    setViewingNote(note);
  };

  // Filter, Search and Sort notes
  let filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filterColor) {
    filteredNotes = filteredNotes.filter(note => note.color === filterColor);
  }

  if (sortOption === 'az') {
    filteredNotes.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOption === 'za') {
    filteredNotes.sort((a, b) => b.title.localeCompare(a.title));
  } else if (sortOption === 'newest') {
    filteredNotes.sort((a, b) =>
      new Date(b.createdAt || b.id) - new Date(a.createdAt || a.id)
    );
  }

  return (
    <>
      <div className="container">
        {/* Title + Search */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <h1>QuickNotes</h1>
          <input
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            style={{ width: '250px' }}
          />
        </div>

        {/* Sort + Filter + Clear */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap' }}>
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="dropdown">
            <option value="">Sort</option>
            <option value="az">A → Z</option>
            <option value="za">Z → A</option>
            <option value="newest">Newest First</option>
          </select>

          <select value={filterColor} onChange={(e) => setFilterColor(e.target.value)} className="dropdown">
            <option value="">Filter by Color</option>
            <option value="#e6f0fa">Blue</option>
            <option value="#f9c74f">Yellow</option>
            <option value="#f94144">Red</option>
            <option value="#90be6d">Green</option>
            <option value="#577590">Steel Blue</option>
            <option value="#f9844a">Orange</option>
            <option value="#43aa8b">Mint Green</option>
            <option value="#9d4edd">Purple</option>
            <option value="#ff6f61">Coral</option>
          </select>

          <button
            onClick={() => {
              setSearchQuery('');
              setSortOption('');
              setFilterColor('');
            }}
            className="btn-clear"
          >
            Clear Filters
          </button>
        </div>

        {/* Note Form */}
        <NoteForm onAddNote={addNote} existingNote={editingNote} />

        {/* Note List */}
        <NoteList
          notes={filteredNotes}
          onDeleteNote={deleteNote}
          onEditNote={handleEditNote}
          onViewNote={handleViewNote}
        />
      </div>

      {/* View Modal */}
      {viewingNote && (
        <div className="modal">
          <div className="modal-content">
            <h2>{viewingNote.title}</h2>
            <p>{viewingNote.content}</p>
            <button onClick={() => setViewingNote(null)}>Close</button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingNote && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Note</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!editingNote.title || !editingNote.content) return;
                setNotes(notes.map(n => n.id === editingNote.id ? editingNote : n));
                setEditingNote(null);
              }}
              className="note-form"
            >
              <input
                type="text"
                value={editingNote.title}
                onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
              />
              <textarea
                value={editingNote.content}
                onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
              />
              <label>
                Choose Color:
                <select
                  value={editingNote.color || '#e6f0fa'}
                  onChange={(e) => setEditingNote({ ...editingNote, color: e.target.value })}
                  style={{ marginLeft: '10px' }}
                >
                  <option value="#e6f0fa">Blue</option>
                  <option value="#f9c74f">Yellow</option>
                  <option value="#f94144">Red</option>
                  <option value="#90be6d">Green</option>
                  <option value="#577590">Steel Blue</option>
                  <option value="#f9844a">Orange</option>
                  <option value="#43aa8b">Mint Green</option>
                  <option value="#9d4edd">Purple</option>
                  <option value="#ff6f61">Coral</option>
                </select>
              </label>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                <button type="submit" className="edit-btn">Save</button>
                <button type="button" onClick={() => setEditingNote(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default App;

import React from 'react';

const NoteList = ({ notes, onViewNote, onEditNote, onDeleteNote }) => (
  <table className="note-table">
    <thead>
      <tr>
        <th>No.</th>
        <th>Title</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {notes.map((note, index) => (
        <tr key={note.id}>
          <td>{index + 1}</td>
          <td>
            <span
              style={{
                display: 'inline-block',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: note.color || '#f9c74f',
                marginRight: '8px'
              }}
            ></span>
            {note.title}
          </td>
          <td>
            <button className="btn btn-view" onClick={() => onViewNote(note)}>View</button>
            <button className="btn btn-edit" onClick={() => onEditNote(note)}>Edit</button>
            <button className="btn btn-delete" onClick={() => onDeleteNote(note.id)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default NoteList;

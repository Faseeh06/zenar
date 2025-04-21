import { useState } from 'react';

function Guest({ guest, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(guest.name);
  const [editEmail, setEditEmail] = useState(guest.email);
  const [error, setError] = useState('');

  const handleEdit = () => {
    // Validate input
    if (!editName.trim() || !editEmail.trim()) {
      setError('Both name and email are required');
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editEmail)) {
      setError('Please enter a valid email address');
      return;
    }

    // Update guest info
    onUpdate({
      ...guest,
      name: editName,
      email: editEmail
    });
    
    setError('');
    setIsEditing(false);
  };

  const toggleConfirmation = () => {
    onUpdate({
      ...guest,
      confirmed: !guest.confirmed
    });
  };

  if (isEditing) {
    return (
      <div className="guest-item editing">
        <div className="form-group">
          <label htmlFor={`edit-name-${guest.id}`}>Name:</label>
          <input
            type="text"
            id={`edit-name-${guest.id}`}
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor={`edit-email-${guest.id}`}>Email:</label>
          <input
            type="email"
            id={`edit-email-${guest.id}`}
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="guest-actions">
          <button onClick={handleEdit}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`guest-item ${guest.confirmed ? 'confirmed' : 'unconfirmed'}`}>
      <div className="guest-info">
        <h3>{guest.name}</h3>
        <p>{guest.email}</p>
        <p className="status">
          Status: {guest.confirmed ? 'Confirmed' : 'Not Confirmed'}
        </p>
      </div>
      <div className="guest-actions">
        <button 
          onClick={toggleConfirmation}
          className={guest.confirmed ? 'confirmed-btn' : 'unconfirmed-btn'}
        >
          {guest.confirmed ? 'Unconfirm' : 'Confirm'}
        </button>
        <button onClick={() => setIsEditing(true)}>Edit</button>
        <button onClick={() => onDelete(guest.id)}>Remove</button>
      </div>
    </div>
  );
}

export default Guest; 
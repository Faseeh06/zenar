import Guest from './Guest';

function GuestList({ guests, updateGuest, deleteGuest }) {
  if (guests.length === 0) {
    return (
      <div className="guest-list empty">
        <h2>Guest List</h2>
        <p className="empty-message">No guests have been added yet.</p>
      </div>
    );
  }

  return (
    <div className="guest-list">
      <h2>Guest List</h2>
      <div className="guests-container">
        {guests.map(guest => (
          <Guest 
            key={guest.id} 
            guest={guest} 
            onUpdate={updateGuest} 
            onDelete={deleteGuest} 
          />
        ))}
      </div>
    </div>
  );
}

export default GuestList; 
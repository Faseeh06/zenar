function RsvpSummary({ guests }) {
  const totalGuests = guests.length;
  const confirmedGuests = guests.filter(guest => guest.confirmed).length;
  const unconfirmedGuests = totalGuests - confirmedGuests;
  
  return (
    <div className="rsvp-summary">
      <h2>RSVP Summary</h2>
      <div className="summary-stats">
        <div className="stat-item">
          <span className="stat-label">Total Guests:</span>
          <span className="stat-value">{totalGuests}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Confirmed:</span>
          <span className="stat-value">{confirmedGuests}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Unconfirmed:</span>
          <span className="stat-value">{unconfirmedGuests}</span>
        </div>
        {totalGuests > 0 && (
          <div className="stat-item">
            <span className="stat-label">Confirmation Rate:</span>
            <span className="stat-value">
              {Math.round((confirmedGuests / totalGuests) * 100)}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default RsvpSummary; 
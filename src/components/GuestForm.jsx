import { useState } from 'react';

function GuestForm({ addGuest }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate input
    if (!name.trim() || !email.trim()) {
      setError('Both name and email are required');
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Add guest and reset form
    addGuest({ name, email, confirmed: false });
    setName('');
    setEmail('');
    setError('');
  };

  return (
    <div className="guest-form">
      <h2>Add New Guest</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter guest name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter guest email"
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Add Guest</button>
      </form>
    </div>
  );
}

export default GuestForm; 
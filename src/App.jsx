import { useState, useEffect } from 'react'
import './App.css'
import GuestForm from './components/GuestForm'
import GuestList from './components/GuestList'
import RsvpSummary from './components/RsvpSummary'

// Direct image URLs for logos
const LOGO_LIGHT_URL = 'https://i.postimg.cc/ZqBV8qV3/image.png'
const LOGO_DARK_URL = 'https://i.postimg.cc/PrKpts18/image.png'
const MENU_DARK_URL = 'https://i.postimg.cc/Bn2SCt0F/image.png'
const MENU_LIGHT_URL = 'https://i.postimg.cc/3xbwRzYS/image.png'

function App() {
  const [guests, setGuests] = useState([]);
  const [activePage, setActivePage] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editError, setEditError] = useState('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Set up dark mode effect
  useEffect(() => {
    // Check if user has a theme preference in localStorage
    const savedTheme = localStorage.getItem('zenar-theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    } else {
      setIsDarkMode(false);
      document.body.classList.remove('dark-mode');
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    if (isDarkMode) {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('zenar-theme', 'light');
    } else {
      document.body.classList.add('dark-mode');
      localStorage.setItem('zenar-theme', 'dark');
    }
    setIsDarkMode(!isDarkMode);
  };

  // Add a new guest
  const addGuest = (newGuest) => {
    const guestWithId = {
      ...newGuest,
      id: Date.now().toString()
    };
    setGuests(prevGuests => [...prevGuests, guestWithId]);
  };

  // Start editing a guest
  const startEditing = (guest) => {
    setEditingId(guest.id);
    setEditName(guest.name);
    setEditEmail(guest.email);
    setEditError('');
    document.getElementById('edit-guest-modal').showModal();
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingId(null);
    setEditName('');
    setEditEmail('');
    setEditError('');
    document.getElementById('edit-guest-modal').close();
  };

  // Save edited guest
  const saveEdit = () => {
    // Validate input
    if (!editName.trim() || !editEmail.trim()) {
      setEditError('Both name and email are required');
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editEmail)) {
      setEditError('Please enter a valid email address');
      return;
    }
    
    // Find the guest
    const guestToUpdate = guests.find(guest => guest.id === editingId);
    if (!guestToUpdate) return;
    
    // Update guest
    updateGuest({
      ...guestToUpdate,
      name: editName,
      email: editEmail
    });
    
    // Reset editing state
    cancelEditing();
  };

  // Update an existing guest
  const updateGuest = (updatedGuest) => {
    setGuests(prevGuests => 
      prevGuests.map(guest => 
        guest.id === updatedGuest.id ? updatedGuest : guest
      )
    );
  };

  // Delete a guest
  const deleteGuest = (guestId) => {
    setGuests(prevGuests => 
      prevGuests.filter(guest => guest.id !== guestId)
    );
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Filter guests based on search term
  const filteredGuests = searchTerm
    ? guests.filter(guest => 
        guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guest.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : guests;

  const totalGuests = guests.length;
  const confirmedGuests = guests.filter(guest => guest.confirmed).length;
  const pendingGuests = totalGuests - confirmedGuests;
  const confirmationRate = totalGuests > 0 ? Math.round((confirmedGuests / totalGuests) * 100) : 0;

  return (
    <div className={`app ${isSidebarCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}>
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-container">
            <img src={LOGO_LIGHT_URL} alt="Zenar Logo" className="logo light-mode-logo" />
            <img src={LOGO_DARK_URL} alt="Zenar Logo" className="logo dark-mode-logo" />
          </div>
          {!isSidebarCollapsed && (
            <button className="toggle-sidebar" onClick={toggleSidebar} aria-label="Toggle sidebar">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          )}
        </div>
        <nav className="sidebar-nav">
          <ul className="nav-list">
            <li className={`nav-item ${activePage === 'dashboard' ? 'active' : ''}`} onClick={() => setActivePage('dashboard')}>
              <span className="nav-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
              </span>
              <span className="nav-label">Dashboard</span>
            </li>
            <li className={`nav-item ${activePage === 'guests' ? 'active' : ''}`} onClick={() => setActivePage('guests')}>
              <span className="nav-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </span>
              <span className="nav-label">Guests</span>
            </li>
            <li className={`nav-item ${activePage === 'events' ? 'active' : ''}`} onClick={() => setActivePage('events')}>
              <span className="nav-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </span>
              <span className="nav-label">Events</span>
            </li>
            <li className={`nav-item ${activePage === 'settings' ? 'active' : ''}`} onClick={() => setActivePage('settings')}>
              <span className="nav-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
              </span>
              <span className="nav-label">Settings</span>
            </li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <button className="logout-button">
            <span className="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-container">
          <header className="content-header">
            <div className="header-content">
              <h2 className="page-title">Dashboard</h2>
              <p className="page-subtitle">Guest management overview</p>
            </div>
            <div className="header-actions">
              <div className="search-container">
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder="Search guests..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="search-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </span>
              </div>
              <button className="add-guest-btn" onClick={() => document.getElementById('add-guest-modal').showModal()}>
                <span className="add-icon">+</span> Add Guest
              </button>
            </div>
          </header>

          {/* Stats Summary */}
          <section className="stats-summary">
            <div className="stat-card total">
              <div className="stat-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div className="stat-content">
                <h3 className="stat-label">Total Guests</h3>
                <p className="stat-value">{totalGuests}</p>
              </div>
            </div>
            <div className="stat-card confirmed">
              <div className="stat-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <div className="stat-content">
                <h3 className="stat-label">Confirmed</h3>
                <p className="stat-value">{confirmedGuests}</p>
              </div>
            </div>
            <div className="stat-card pending">
              <div className="stat-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <div className="stat-content">
                <h3 className="stat-label">Pending</h3>
                <p className="stat-value">{pendingGuests}</p>
              </div>
            </div>
            <div className="stat-card rate">
              <div className="stat-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
              </div>
              <div className="stat-content">
                <h3 className="stat-label">Confirmation Rate</h3>
                <p className="stat-value">{confirmationRate}%</p>
                <div className="progress-bar">
                  <div className="progress" style={{ width: `${confirmationRate}%` }}></div>
                </div>
              </div>
            </div>
          </section>

          {/* Guest List */}
          <section className="guest-list-section">
            <h2 className="section-title">Guest List</h2>
            <div className="guest-table">
              {filteredGuests.length === 0 ? (
                <p className="empty-message">No guests have been added yet.</p>
              ) : (
                filteredGuests.map(guest => (
                  <div key={guest.id} className="guest-row">
                    <div className="guest-avatar">
                      {guest.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="guest-details">
                      <h3 className="guest-name">{guest.name}</h3>
                      <p className="guest-email">{guest.email}</p>
                    </div>
                    <div className="guest-actions">
                      {!guest.confirmed ? (
                        <button 
                          className="confirm-btn" 
                          onClick={() => updateGuest({...guest, confirmed: true})}
                        >
                          Confirm
                        </button>
                      ) : (
                        <button 
                          className="confirmed-indicator" 
                          onClick={() => updateGuest({...guest, confirmed: false})}
                        >
                          Confirm
                        </button>
                      )}
                      <button className="edit-btn" onClick={() => startEditing(guest)}>
                        <span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                        </span>
                      </button>
                      <button className="delete-btn" onClick={() => deleteGuest(guest.id)}>
                        <span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </main>

      {/* Floating Theme Toggle Button */}
      <button 
        className="theme-toggle-floating" 
        onClick={toggleTheme} 
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        )}
      </button>

      {/* Menu Toggle Button */}
      {isSidebarCollapsed && (
        <button 
          className="menu-toggle-floating" 
          onClick={toggleSidebar} 
          aria-label="Expand sidebar"
        >
          <img 
            src={isDarkMode ? MENU_DARK_URL : MENU_LIGHT_URL} 
            alt="Menu" 
            className="menu-icon" 
          />
        </button>
      )}

      {/* Add Guest Modal */}
      <dialog id="add-guest-modal" className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h2>Add New Guest</h2>
            <button className="close-modal" onClick={() => document.getElementById('add-guest-modal').close()}>×</button>
          </div>
          <GuestForm addGuest={(guest) => {
            addGuest(guest);
            document.getElementById('add-guest-modal').close();
          }} />
        </div>
      </dialog>

      {/* Edit Guest Modal */}
      <dialog id="edit-guest-modal" className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h2>Edit Guest</h2>
            <button className="close-modal" onClick={cancelEditing}>×</button>
          </div>
          <div className="guest-form">
            <form onSubmit={(e) => { e.preventDefault(); saveEdit(); }}>
              <div className="form-group">
                <label htmlFor="edit-name">Name</label>
                <input
                  type="text"
                  id="edit-name"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Enter guest name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="edit-email">Email</label>
                <input
                  type="email"
                  id="edit-email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  placeholder="Enter guest email"
                />
              </div>
              {editError && <div className="error-message">{editError}</div>}
              <button type="submit">Save Changes</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default App

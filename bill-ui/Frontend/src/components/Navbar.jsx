import './Navbar.css'

function Navbar({ currentPage, setCurrentPage, userName, userRole, onLogout }) {
  const isAdmin = userRole === 'admin'
  const menuItems = [
    ...(isAdmin ? [{ id: 'dashboard', label: '📊 Dashboard' }] : []),
    { id: 'invoice', label: '📄 New Invoice' },
    { id: 'history', label: '📋 Invoice History' },
    { id: 'products', label: '🛠️ Products' },
    { id: 'customers', label: '👥 Customers' },
  ]

  return (
    <nav className="navbar">
      <div className="navbar-header">
        <h2>⚙️ Selvam Motors</h2>
        <p>Billing System</p>
      </div>
      <ul className="navbar-menu">
        {menuItems.map(item => (
          <li key={item.id}>
            <button
              className={`nav-btn ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => setCurrentPage(item.id)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
      <div className="navbar-footer">
        <p className="user-name">Signed in as {userName} ({userRole})</p>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
        <p>© 2024 Selvam Motors</p>
      </div>
    </nav>
  )
}

export default Navbar

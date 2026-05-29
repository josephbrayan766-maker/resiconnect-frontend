import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

function Navbar({ role }) {
    const { logout, user } = useAuth()
    const navigate = useNavigate()

    function handleLogout() {
        logout()
        navigate('/')
    }

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <polygon points="18,2 34,10 34,26 18,34 2,26 2,10" fill="none" stroke="#d4af37" strokeWidth="1" />
                    <polygon points="18,7 29,13 29,23 18,29 7,23 7,13" fill="none" stroke="#d4af37" strokeWidth="0.5" opacity="0.5" />
                    <circle cx="18" cy="18" r="4" fill="#d4af37" opacity="0.8" />
                    <line x1="18" y1="2" x2="18" y2="7" stroke="#d4af37" strokeWidth="1" />
                    <line x1="18" y1="29" x2="18" y2="34" stroke="#d4af37" strokeWidth="1" />
                    <line x1="2" y1="10" x2="7" y2="13" stroke="#d4af37" strokeWidth="1" />
                    <line x1="29" y1="23" x2="34" y2="26" stroke="#d4af37" strokeWidth="1" />
                    <line x1="34" y1="10" x2="29" y2="13" stroke="#d4af37" strokeWidth="1" />
                    <line x1="7" y1="23" x2="2" y2="26" stroke="#d4af37" strokeWidth="1" />
                </svg>
                <span>RESICONNECT</span>
            </div>
            <div className="navbar-links">
                {role === 'resident' && (
                    <>
                        <Link to="/resident/dashboard">Dashboard</Link>
                        <Link to="/resident/payments">Paiements</Link>
                        <Link to="/resident/tickets">Tickets</Link>
                        <Link to="/resident/announcements">Annonces</Link>
                    </>
                )}
                {role === 'manager' && (
                    <>
                        <Link to="/manager/dashboard">Dashboard</Link>
                        <Link to="/manager/payments">Paiements</Link>
                        <Link to="/manager/tickets">Tickets</Link>
                        <Link to="/manager/announcements">Annonces</Link>
                    </>
                )}
                {user && <span style={{ color: 'rgba(212,175,55,0.7)', fontSize: '13px', letterSpacing: '1px' }}>👤 {user.nom}</span>}
                <button onClick={handleLogout} className="logout" style={{ background: 'none', border: 'none', padding: '0', fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase' }}>Déconnexion</button>
            </div>
        </nav>
    )
}

export default Navbar
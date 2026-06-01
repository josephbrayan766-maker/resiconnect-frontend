import './Login.css'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../../services/api'

const CODE_GESTIONNAIRE = 'Mavie20'

function Register() {
    const [nom, setNom] = useState('')
    const [email, setEmail] = useState('')
    const [motDePasse, setMotDePasse] = useState('')
    const [role, setRole] = useState('resident')
    const [codeSecret, setCodeSecret] = useState('')
    const [erreur, setErreur] = useState('')
    const navigate = useNavigate()

    async function handleRegister() {
        if (!nom || !email || !motDePasse) {
            setErreur('Tous les champs sont obligatoires')
            return
        }
        if (role === 'manager' && codeSecret !== CODE_GESTIONNAIRE) {
            setErreur('Code gestionnaire incorrect')
            return
        }
        try {
            setErreur('')
            await api.post('/auth/register', { nom, email, mot_de_passe: motDePasse, role })
            navigate('/')
        } catch (err) {
            setErreur('Email déjà utilisé')
        }
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Resiconnect</h2>
                <p className="login-subtitle">Créer un compte</p>
                {erreur && <p style={{ color: '#ff6b6b', textAlign: 'center', marginBottom: '12px', fontSize: '13px' }}>{erreur}</p>}
                <input
                    type="text"
                    placeholder="Nom complet"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Adresse email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={motDePasse}
                    onChange={(e) => setMotDePasse(e.target.value)}
                />
                <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                    <button
                        onClick={() => setRole('resident')}
                        style={{
                            flex: 1, padding: '12px',
                            background: role === 'resident' ? '#d4af37' : 'rgba(255,255,255,0.05)',
                            color: role === 'resident' ? '#0a0a0f' : 'rgba(255,255,255,0.6)',
                            border: '1px solid rgba(212,175,55,0.3)',
                            borderRadius: '10px', cursor: 'none',
                            fontWeight: role === 'resident' ? 'bold' : 'normal',
                            letterSpacing: '1px', fontSize: '13px'
                        }}>
                        Résident
                    </button>
                    <button
                        onClick={() => setRole('manager')}
                        style={{
                            flex: 1, padding: '12px',
                            background: role === 'manager' ? '#d4af37' : 'rgba(255,255,255,0.05)',
                            color: role === 'manager' ? '#0a0a0f' : 'rgba(255,255,255,0.6)',
                            border: '1px solid rgba(212,175,55,0.3)',
                            borderRadius: '10px', cursor: 'none',
                            fontWeight: role === 'manager' ? 'bold' : 'normal',
                            letterSpacing: '1px', fontSize: '13px'
                        }}>
                        Gestionnaire
                    </button>
                </div>

                {role === 'manager' && (
                    <input
                        type="password"
                        placeholder="Code secret gestionnaire"
                        value={codeSecret}
                        onChange={(e) => setCodeSecret(e.target.value)}
                    />
                )}

                <button type="submit" onClick={handleRegister}>Créer mon compte</button>
                <Link to="/" className="forgot-password" style={{ textAlign: 'center', display: 'block', marginTop: '16px' }}>
                    Déjà un compte ? Se connecter
                </Link>
            </div>
        </div>
    )
}

export default Register
import './Login.css'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import api from '../../services/api'

function Login() {
    const [email, setEmail] = useState('')
    const [motDePasse, setMotDePasse] = useState('')
    const [erreur, setErreur] = useState('')
    const { login } = useAuth()
    const navigate = useNavigate()

    async function handleLogin() {
        try {
            setErreur('')
            const res = await api.post('/auth/login', { email, mot_de_passe: motDePasse })
            login(res.data.token, res.data.role, res.data.nom)
            if (res.data.role === 'manager') {
                navigate('/manager/dashboard')
            } else {
                navigate('/resident/dashboard')
            }
        } catch (err) {
            setErreur('Email ou mot de passe incorrect')
        }
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Resiconnect</h2>
                <p className="login-subtitle">Espace privé — Connexion</p>
                {erreur && <p style={{ color: '#ff6b6b', textAlign: 'center', marginBottom: '12px', fontSize: '13px' }}>{erreur}</p>}
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
                <a href="#" className="forgot-password">Mot de passe oublié ?</a>
                <button type="submit" onClick={handleLogin}>Accéder</button>
                <Link to="/register" className="forgot-password" style={{ textAlign: 'center', display: 'block', marginTop: '16px' }}>
                    Pas encore de compte ? S'inscrire
                </Link>
            </div>
        </div>
    )
}

export default Login
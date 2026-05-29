import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import '../resident/Dashboard.css'
import api from '../../services/api'

function ResidentTickets() {
    const [tickets, setTickets] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [titre, setTitre] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        api.get('/tickets').then(res => setTickets(res.data)).catch(() => { })
    }, [])

    async function handleSubmit() {
        if (titre && description) {
            await api.post('/tickets', { titre, description })
            const res = await api.get('/tickets')
            setTickets(res.data)
            setTitre('')
            setDescription('')
            setShowForm(false)
        }
    }

    return (
        <>
            <Navbar role="resident" />
            <div className="dashboard-container">
                <h1>Mes Tickets</h1>
                <div className="card">
                    {tickets.length === 0 && <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>Aucun ticket</p>}
                    {tickets.map((t, i) => (
                        <div key={i} className="card-item">
                            <span><strong style={{ color: 'white' }}>{t.titre}</strong> — {t.description}</span>
                            <span className={t.statut === 'Résolu' ? 'badge-green' : 'badge-orange'}>{t.statut}</span>
                        </div>
                    ))}
                </div>

                {showForm && (
                    <div className="card" style={{ marginTop: '20px' }}>
                        <h3>Signaler un problème</h3>
                        <input type="text" placeholder="Titre du problème" value={titre}
                            onChange={(e) => setTitre(e.target.value)}
                            style={{ width: '100%', padding: '10px', marginBottom: '12px', borderRadius: '6px', border: '1px solid rgba(212,175,55,0.3)', background: 'rgba(255,255,255,0.05)', color: 'white', boxSizing: 'border-box' }} />
                        <textarea placeholder="Description" value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            style={{ width: '100%', padding: '10px', marginBottom: '12px', borderRadius: '6px', border: '1px solid rgba(212,175,55,0.3)', background: 'rgba(255,255,255,0.05)', color: 'white', boxSizing: 'border-box', height: '100px' }} />
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button onClick={handleSubmit} style={{ padding: '10px 20px', background: '#d4af37', color: '#0a0a0f', border: 'none', borderRadius: '6px', cursor: 'none', fontWeight: 'bold' }}>Envoyer</button>
                            <button onClick={() => setShowForm(false)} style={{ padding: '10px 20px', background: 'rgba(220,53,69,0.3)', color: '#ff6b6b', border: '1px solid rgba(220,53,69,0.3)', borderRadius: '6px', cursor: 'none' }}>Annuler</button>
                        </div>
                    </div>
                )}

                {!showForm && (
                    <button onClick={() => setShowForm(true)} style={{ marginTop: '20px', padding: '12px 24px', background: '#d4af37', color: '#0a0a0f', border: 'none', borderRadius: '6px', cursor: 'none', fontWeight: 'bold', letterSpacing: '1px' }}>
                        + Signaler un problème
                    </button>
                )}
            </div>
        </>
    )
}

export default ResidentTickets
import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import './Dashboard.css'
import api from '../../services/api'

function ManagerTickets() {
    const [tickets, setTickets] = useState([])

    useEffect(() => {
        api.get('/tickets/all').then(res => setTickets(res.data)).catch(() => { })
    }, [])

    async function handleStatut(id, statut) {
        const newStatut = statut === 'En cours' ? 'Résolu' : 'En cours'
        await api.put(`/tickets/${id}`, { statut: newStatut })
        const res = await api.get('/tickets/all')
        setTickets(res.data)
    }

    return (
        <>
            <Navbar role="manager" />
            <div className="dashboard-container">
                <h1>Tickets des résidents</h1>
                <div className="card">
                    {tickets.length === 0 && <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>Aucun ticket</p>}
                    {tickets.map((t, i) => (
                        <div key={i} className="card-item">
                            <span><strong style={{ color: 'white' }}>{t.nom}</strong> — {t.titre} — {t.description}</span>
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <span className={t.statut === 'Résolu' ? 'badge-green' : 'badge-orange'}>{t.statut}</span>
                                <button onClick={() => handleStatut(t.id, t.statut)}
                                    style={{ padding: '4px 12px', background: '#d4af37', color: '#0a0a0f', border: 'none', borderRadius: '6px', cursor: 'none', fontSize: '12px', fontWeight: 'bold' }}>
                                    {t.statut === 'En cours' ? 'Marquer résolu' : 'Rouvrir'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ManagerTickets
import { useEffect, useState } from 'react'
import './Dashboard.css'
import Navbar from '../../components/Navbar'
import api from '../../services/api'
import { useAuth } from '../../context/AuthContext'

function ResidentDashboard() {
    const { user } = useAuth()
    const [paiements, setPaiements] = useState([])
    const [tickets, setTickets] = useState([])
    const [annonces, setAnnonces] = useState([])

    useEffect(() => {
        api.get('/paiements').then(res => setPaiements(res.data)).catch(() => { })
        api.get('/tickets').then(res => setTickets(res.data)).catch(() => { })
        api.get('/annonces').then(res => setAnnonces(res.data)).catch(() => { })
    }, [])

    return (
        <>
            <Navbar role="resident" />
            <div className="dashboard-container">
                <h1>Mon Dashboard</h1>
                <div className="cards-grid">
                    <div className="card">
                        <h3> Paiements</h3>
                        {paiements.length === 0 && <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>Aucun paiement</p>}
                        {paiements.map((p, i) => (
                            <div key={i} className="card-item">
                                <span>{p.mois} — {p.montant}€</span>
                                <span className={p.statut === 'Payé' ? 'badge-green' : 'badge-red'}>{p.statut}</span>
                            </div>
                        ))}
                    </div>
                    <div className="card">
                        <h3> Tickets</h3>
                        {tickets.length === 0 && <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>Aucun ticket</p>}
                        {tickets.map((t, i) => (
                            <div key={i} className="card-item">
                                <span>{t.titre}</span>
                                <span className={t.statut === 'Résolu' ? 'badge-green' : 'badge-orange'}>{t.statut}</span>
                            </div>
                        ))}
                    </div>
                    <div className="card">
                        <h3> Annonces</h3>
                        {annonces.length === 0 && <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>Aucune annonce</p>}
                        {annonces.map((a, i) => (
                            <div key={i} className="card-item">
                                <span>{a.titre}</span>
                                <span className="badge-blue">{a.date}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResidentDashboard
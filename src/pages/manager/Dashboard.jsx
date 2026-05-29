import { useEffect, useState } from 'react'
import './Dashboard.css'
import Navbar from '../../components/Navbar'
import api from '../../services/api'

function ManagerDashboard() {
    const [paiements, setPaiements] = useState([])
    const [tickets, setTickets] = useState([])
    const [annonces, setAnnonces] = useState([])

    useEffect(() => {
        api.get('/paiements/all').then(res => setPaiements(res.data)).catch(() => { })
        api.get('/tickets/all').then(res => setTickets(res.data)).catch(() => { })
        api.get('/annonces').then(res => setAnnonces(res.data)).catch(() => { })
    }, [])

    return (
        <>
            <Navbar role="manager" />
            <div className="dashboard-container">
                <h1>Dashboard Gestionnaire</h1>
                <div className="cards-grid">
                    <div className="card">
                        <h3> Paiements</h3>
                        {paiements.map((p, i) => (
                            <div key={i} className="card-item">
                                <span>{p.nom} — {p.mois}</span>
                                <span className={p.statut === 'Payé' ? 'badge-green' : 'badge-red'}>{p.statut}</span>
                            </div>
                        ))}
                    </div>
                    <div className="card">
                        <h3> Tickets</h3>
                        {tickets.map((t, i) => (
                            <div key={i} className="card-item">
                                <span>{t.nom} — {t.titre}</span>
                                <span className={t.statut === 'Résolu' ? 'badge-green' : 'badge-orange'}>{t.statut}</span>
                            </div>
                        ))}
                    </div>
                    <div className="card">
                        <h3> Annonces</h3>
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

export default ManagerDashboard
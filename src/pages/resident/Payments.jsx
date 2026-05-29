import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import '../resident/Dashboard.css'
import api from '../../services/api'

function ResidentPayments() {
    const [paiements, setPaiements] = useState([])

    useEffect(() => {
        api.get('/paiements').then(res => setPaiements(res.data)).catch(() => { })
    }, [])

    return (
        <>
            <Navbar role="resident" />
            <div className="dashboard-container">
                <h1>Mes Paiements</h1>
                <div className="card">
                    {paiements.length === 0 && <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>Aucun paiement</p>}
                    {paiements.map((p, i) => (
                        <div key={i} className="card-item">
                            <span>{p.mois} — {p.montant}€</span>
                            <span className={p.statut === 'Payé' ? 'badge-green' : 'badge-red'}>{p.statut}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ResidentPayments
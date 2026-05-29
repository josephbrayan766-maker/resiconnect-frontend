import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import '../resident/Dashboard.css'
import api from '../../services/api'

function ResidentAnnouncements() {
    const [annonces, setAnnonces] = useState([])

    useEffect(() => {
        api.get('/annonces').then(res => setAnnonces(res.data)).catch(() => { })
    }, [])

    return (
        <>
            <Navbar role="resident" />
            <div className="dashboard-container">
                <h1>Annonces</h1>
                {annonces.length === 0 && <p style={{ color: 'rgba(255,255,255,0.4)' }}>Aucune annonce</p>}
                {annonces.map((a, i) => (
                    <div key={i} className="card" style={{ marginBottom: '16px' }}>
                        <div className="card-item">
                            <h3>{a.titre}</h3>
                            <span className="badge-blue">{a.date}</span>
                        </div>
                        <p style={{ marginTop: '8px', color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>{a.contenu}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ResidentAnnouncements
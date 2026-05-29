import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import './Dashboard.css'
import api from '../../services/api'

function ManagerAnnouncements() {
    const [annonces, setAnnonces] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [titre, setTitre] = useState('')
    const [date, setDate] = useState('')
    const [contenu, setContenu] = useState('')

    useEffect(() => {
        api.get('/annonces').then(res => setAnnonces(res.data)).catch(() => { })
    }, [])

    async function handleSubmit() {
        if (titre && date && contenu) {
            await api.post('/annonces', { titre, contenu, date })
            const res = await api.get('/annonces')
            setAnnonces(res.data)
            setTitre('')
            setDate('')
            setContenu('')
            setShowForm(false)
        }
    }

    async function handleSupprimer(id) {
        await api.delete(`/annonces/${id}`)
        const res = await api.get('/annonces')
        setAnnonces(res.data)
    }

    return (
        <>
            <Navbar role="manager" />
            <div className="dashboard-container">
                <h1>Gestion des Annonces</h1>
                {annonces.map((a, i) => (
                    <div key={i} className="card" style={{ marginBottom: '16px' }}>
                        <div className="card-item">
                            <h3>{a.titre}</h3>
                            <span className="badge-blue">{a.date}</span>
                        </div>
                        <p style={{ marginTop: '8px', color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>{a.contenu}</p>
                        <div style={{ marginTop: '12px' }}>
                            <button onClick={() => handleSupprimer(a.id)}
                                style={{ padding: '6px 16px', background: 'rgba(220,53,69,0.3)', color: '#ff6b6b', border: '1px solid rgba(220,53,69,0.3)', borderRadius: '6px', cursor: 'none' }}>
                                Supprimer
                            </button>
                        </div>
                    </div>
                ))}

                {showForm && (
                    <div className="card" style={{ marginTop: '20px' }}>
                        <h3>Publier une annonce</h3>
                        <input type="text" placeholder="Titre" value={titre} onChange={(e) => setTitre(e.target.value)}
                            style={{ width: '100%', padding: '10px', marginBottom: '12px', borderRadius: '6px', border: '1px solid rgba(212,175,55,0.3)', background: 'rgba(255,255,255,0.05)', color: 'white', boxSizing: 'border-box' }} />
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
                            style={{ width: '100%', padding: '10px', marginBottom: '12px', borderRadius: '6px', border: '1px solid rgba(212,175,55,0.3)', background: 'rgba(255,255,255,0.05)', color: 'white', boxSizing: 'border-box' }} />
                        <textarea placeholder="Contenu" value={contenu} onChange={(e) => setContenu(e.target.value)}
                            style={{ width: '100%', padding: '10px', marginBottom: '12px', borderRadius: '6px', border: '1px solid rgba(212,175,55,0.3)', background: 'rgba(255,255,255,0.05)', color: 'white', boxSizing: 'border-box', height: '100px' }} />
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button onClick={handleSubmit}
                                style={{ padding: '10px 20px', background: '#d4af37', color: '#0a0a0f', border: 'none', borderRadius: '6px', cursor: 'none', fontWeight: 'bold' }}>
                                Publier
                            </button>
                            <button onClick={() => setShowForm(false)}
                                style={{ padding: '10px 20px', background: 'rgba(220,53,69,0.3)', color: '#ff6b6b', border: '1px solid rgba(220,53,69,0.3)', borderRadius: '6px', cursor: 'none' }}>
                                Annuler
                            </button>
                        </div>
                    </div>
                )}

                {!showForm && (
                    <button onClick={() => setShowForm(true)}
                        style={{ marginTop: '8px', padding: '12px 24px', background: '#d4af37', color: '#0a0a0f', border: 'none', borderRadius: '6px', cursor: 'none', fontWeight: 'bold', letterSpacing: '1px' }}>
                        + Publier une annonce
                    </button>
                )}
            </div>
        </>
    )
}

export default ManagerAnnouncements
import { createContext, useState, useContext } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem('token')
        const role = localStorage.getItem('role')
        const nom = localStorage.getItem('nom')
        return token ? { token, role, nom } : null
    })

    function login(token, role, nom) {
        localStorage.setItem('token', token)
        localStorage.setItem('role', role)
        localStorage.setItem('nom', nom)
        setUser({ token, role, nom })
    }

    function logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        localStorage.removeItem('nom')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}
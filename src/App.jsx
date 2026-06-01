import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CustomCursor from './components/CustomCursor'
import PrivateRoute from './routes/PrivateRoute'
import Login from './pages/auth/Login'
import ResidentDashboard from './pages/resident/Dashboard'
import ResidentPayments from './pages/resident/Payments'
import ResidentTickets from './pages/resident/Tickets'
import ResidentAnnouncements from './pages/resident/Announcements'
import ManagerDashboard from './pages/manager/Dashboard'
import ManagerPayments from './pages/manager/Payments'
import ManagerTickets from './pages/manager/Tickets'
import ManagerAnnouncements from './pages/manager/Announcements'
import Register from './pages/auth/Register'
function App() {
    return (
        <BrowserRouter>
            <CustomCursor />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/resident/dashboard" element={<PrivateRoute role="resident"><ResidentDashboard /></PrivateRoute>} />
                <Route path="/resident/payments" element={<PrivateRoute role="resident"><ResidentPayments /></PrivateRoute>} />
                <Route path="/resident/tickets" element={<PrivateRoute role="resident"><ResidentTickets /></PrivateRoute>} />
                <Route path="/resident/announcements" element={<PrivateRoute role="resident"><ResidentAnnouncements /></PrivateRoute>} />
                <Route path="/manager/dashboard" element={<PrivateRoute role="manager"><ManagerDashboard /></PrivateRoute>} />
                <Route path="/manager/payments" element={<PrivateRoute role="manager"><ManagerPayments /></PrivateRoute>} />
                <Route path="/manager/tickets" element={<PrivateRoute role="manager"><ManagerTickets /></PrivateRoute>} />
                <Route path="/manager/announcements" element={<PrivateRoute role="manager"><ManagerAnnouncements /></PrivateRoute>} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
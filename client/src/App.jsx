import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import Dashboard from './components/Dashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import './index.css';

const ProtectedRoute = ({ children, allowedRole }) => {
    const { user, token } = useAuth();

    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRole && user.role !== allowedRole) {
        return <Navigate to="/" replace />;
    }

    return children;
};

const AppRoutes = () => {
    const { user } = useAuth();

    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />

            {/* User Route */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute allowedRole="user">
                        <Dashboard viewingUserId={user?.userId || 'user1'} userName={user?.name || 'User'} />
                    </ProtectedRoute>
                }
            />

            {/* Doctor Route */}
            <Route
                path="/doctor"
                element={
                    <ProtectedRoute allowedRole="doctor">
                        <DoctorDashboard />
                    </ProtectedRoute>
                }
            />

            {/* Default Redirect */}
            <Route path="/" element={
                user ? (user.role === 'doctor' ? <Navigate to="/doctor" /> : <Navigate to="/dashboard" />) : <Navigate to="/login" />
            } />
        </Routes>
    );
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <AppRoutes />
            </Router>
        </AuthProvider>
    );
}

export default App;

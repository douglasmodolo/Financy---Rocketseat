import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/auth';

import { DashboardPage } from './pages/Dashboard/Dashboard';
import { LoginPage } from './pages/Auth/Login';
import { SignupPage } from './pages/Auth/Signup';
import { ProfilePage } from './pages/Auth/Profile';
import { CategoriesPage } from './pages/Categories/CategoriesPage';
import { TransactionsPage } from './pages/Transactions/TransactionPage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore()
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore()
  return !isAuthenticated ? <>{children}</> : <Navigate to="/" replace />
}

export function App() {
  return (
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignupPage />
            </PublicRoute>
          }
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/transactions" 
          element={
            <ProtectedRoute>
              <TransactionsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/categories" 
          element={
            <ProtectedRoute>
              <CategoriesPage />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />    
        <Route path="*" element={<Navigate to="/dashboard" replace />} />            
      </Routes>
  );
}

export default App;
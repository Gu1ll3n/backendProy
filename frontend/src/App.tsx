import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

import AuthPage from "@/pages/auth/AuthPage";
import AppLayout from "@/components/AppLayout";
import DashboardPage from "@/pages/dashboard/DashboardPage";

// Importa tus componentes de página aquí
import UsersPage from "@/pages/users/UsersPage";
import PatientsPage from "@/pages/patients/PatientsPage";
import AppointmentsPage from "@/pages/appointments/AppointmentsPage";
import ReportsPage from "@/pages/reports/ReportsPage";
import AuditPage from "@/pages/audit/AuditPage";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<AuthPage />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="patients" element={<PatientsPage />} />
            <Route path="appointments" element={<AppointmentsPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="audit" element={<AuditPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>

      <Toaster position="top-right" theme="dark" richColors />
    </QueryClientProvider>
  );
}
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from './components/shell/AppShell';
import { Dashboard } from './pages/Dashboard';
import { Patients } from './pages/Patients';
import { PatientNew } from './pages/PatientNew';
import { PatientProfile } from './pages/PatientProfile';
import { Queue } from './pages/Queue';
import { Consultation } from './pages/Consultation';
import { Invoices } from './pages/Billing';
import { CreateInvoice } from './pages/CreateInvoice';
import { Medicines } from './pages/Pharmacy';
import { LabOrders, LabReportReview } from './pages/Lab';
import { IPD, BedBoard } from './pages/IPD';
import { AIClinical } from './pages/AIAssistant';
import { RevenueReport } from './pages/Reports';
import { Staff, RolesPermissions } from './pages/Settings';
import { Login, OTPVerify } from './pages/Auth';
import { AppointmentCalendar } from './pages/AppointmentCalendar';
import { PharmacySale } from './pages/PharmacySale';
import { DayClosing } from './pages/DayClosing';
import { NursingStation } from './pages/NursingStation';
import { DischargeSummary } from './pages/DischargeSummary';
import { AIAdminCopilot } from './pages/AIAdminCopilot';
import { AuditLog } from './pages/AuditLog';
import { Prescriptions } from './pages/Prescriptions';
import { ExpiryAlerts } from './pages/ExpiryAlerts';
import { StockEntry } from './pages/StockEntry';
import { AIPatientSummary } from './pages/AIPatientSummary';
import { AIReportExplainer } from './pages/AIReportExplainer';
import { Templates } from './pages/Templates';
import { Security } from './pages/Security';
import { Integrations } from './pages/Integrations';
import { FollowUps } from './pages/FollowUps';
import { Radiology } from './pages/Radiology';
import { PurchaseOrders } from './pages/PurchaseOrders';
import { Payments } from './pages/Payments';
import { Refunds } from './pages/Refunds';
import { AppointmentReport } from './pages/AppointmentReport';
import { PharmacyReport } from './pages/PharmacyReport';
import { OrganizationSettings } from './pages/OrganizationSettings';
import { BranchesSettings } from './pages/BranchesSettings';
import { ForgotPassword } from './pages/ForgotPassword';
import { FirstTimeSetup } from './pages/FirstTimeSetup';
import { DoctorDashboard } from './pages/DoctorDashboard';
import { ReceptionDashboard } from './pages/ReceptionDashboard';
import { PharmacyDashboard } from './pages/PharmacyDashboard';
import { LabDashboard } from './pages/LabDashboard';
import { QueueDisplay } from './pages/QueueDisplay';
import { NewAppointment } from './pages/NewAppointment';
import { NewAdmission } from './pages/NewAdmission';
import { SampleCollection } from './pages/SampleCollection';
import { ResultEntry } from './pages/ResultEntry';
import { MAR } from './pages/MAR';
import { AIContentReview } from './pages/AIContentReview';
import { DoctorPerformanceReport } from './pages/DoctorPerformanceReport';
export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Standalone (no AppShell) */}
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<OTPVerify />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/setup" element={<FirstTimeSetup />} />
        <Route path="/queue/display" element={<QueueDisplay />} />

        <Route element={<AppShell />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/queue" element={<Queue />} />
          <Route path="/calendar" element={<AppointmentCalendar />} />

          {/* Role dashboards */}
          <Route path="/dashboard/doctor" element={<DoctorDashboard />} />
          <Route path="/dashboard/reception" element={<ReceptionDashboard />} />
          <Route path="/dashboard/pharmacy" element={<PharmacyDashboard />} />
          <Route path="/dashboard/lab" element={<LabDashboard />} />

          {/* Patients */}
          <Route path="/patients" element={<Patients />} />
          <Route path="/patients/new" element={<PatientNew />} />
          <Route path="/patients/:id" element={<PatientProfile />} />
          <Route path="/patients/:id/timeline" element={<PatientProfile />} />

          {/* OPD */}
          <Route path="/appointments" element={<AppointmentCalendar />} />
          <Route path="/appointments/new" element={<NewAppointment />} />
          <Route path="/consultations" element={<Consultation />} />
          <Route path="/consultations/:id" element={<Consultation />} />
          <Route path="/prescriptions" element={<Prescriptions />} />
          <Route path="/followups" element={<FollowUps />} />

          {/* IPD */}
          <Route path="/ipd" element={<IPD />} />
          <Route path="/ipd/new" element={<NewAdmission />} />
          <Route path="/ipd/mar" element={<MAR />} />
          <Route path="/ipd/mar/:bedId" element={<MAR />} />
          <Route path="/beds" element={<BedBoard />} />
          <Route path="/nursing" element={<NursingStation />} />
          <Route path="/discharge" element={<DischargeSummary />} />

          {/* Lab */}
          <Route path="/lab/orders" element={<LabOrders />} />
          <Route path="/lab/reports" element={<LabReportReview />} />
          <Route path="/lab/collection" element={<SampleCollection />} />
          <Route path="/lab/result-entry" element={<ResultEntry />} />
          <Route path="/radiology" element={<Radiology />} />

          {/* Pharmacy */}
          <Route path="/pharmacy/sales" element={<PharmacySale />} />
          <Route path="/pharmacy/medicines" element={<Medicines />} />
          <Route path="/pharmacy/stock" element={<StockEntry />} />
          <Route path="/pharmacy/purchase" element={<PurchaseOrders />} />
          <Route path="/pharmacy/expiry" element={<ExpiryAlerts />} />

          {/* Billing */}
          <Route path="/billing/invoices" element={<Invoices />} />
          <Route path="/billing/invoices/new" element={<CreateInvoice />} />
          <Route path="/billing/payments" element={<Payments />} />
          <Route path="/billing/refunds" element={<Refunds />} />
          <Route path="/billing/day-closing" element={<DayClosing />} />

          {/* AI */}
          <Route path="/ai/clinical" element={<AIClinical />} />
          <Route path="/ai/summary" element={<AIPatientSummary />} />
          <Route path="/ai/explainer" element={<AIReportExplainer />} />
          <Route path="/ai/admin" element={<AIAdminCopilot />} />
          <Route path="/ai/review" element={<AIContentReview />} />

          {/* Reports */}
          <Route path="/reports/revenue" element={<RevenueReport />} />
          <Route path="/reports/appointments" element={<AppointmentReport />} />
          <Route path="/reports/pharmacy" element={<PharmacyReport />} />
          <Route
            path="/reports/doctors"
            element={<DoctorPerformanceReport />} />
          
          <Route path="/reports/audit" element={<AuditLog />} />

          {/* Settings */}
          <Route
            path="/settings/organization"
            element={<OrganizationSettings />} />
          
          <Route path="/settings/branches" element={<BranchesSettings />} />
          <Route path="/settings/staff" element={<Staff />} />
          <Route path="/settings/roles" element={<RolesPermissions />} />
          <Route path="/settings/templates" element={<Templates />} />
          <Route path="/settings/integrations" element={<Integrations />} />
          <Route path="/settings/security" element={<Security />} />
        </Route>
      </Routes>
    </BrowserRouter>);

}
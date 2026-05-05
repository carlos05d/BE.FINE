import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import {
  Heart,
  Activity,
  Users,
  AlertTriangle,
  MessageCircle,
  User,
  LogOut,
  Menu,
  X,
  TrendingUp,
  CheckCircle,
  Clock,
  Stethoscope,
  Search,
  Send,
  ChevronLeft,
  Droplets,
  Gauge,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type TabType = "overview" | "patients" | "alerts" | "chat" | "profile";

export default function DoctorDashboard() {
  const { user, logout } = useAuth({ redirectOnUnauthenticated: true });
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (user && user.role === "patient") {
      navigate("/patient-dashboard");
    }
  }, [user, navigate]);

  if (!user) return null;

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: "overview", label: "Overview", icon: <Activity className="w-5 h-5" /> },
    { id: "patients", label: "My Patients", icon: <Users className="w-5 h-5" /> },
    { id: "alerts", label: "Alerts", icon: <AlertTriangle className="w-5 h-5" /> },
    { id: "chat", label: "Messages", icon: <MessageCircle className="w-5 h-5" /> },
    { id: "profile", label: "Profile", icon: <User className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/50 via-white to-teal-50/30 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-100 fixed h-full z-10">
        <div className="p-6">
          <div className="flex items-center gap-2">
            <img src="/logo-icon.png" alt="BE.Fine" className="w-8 h-8" />
            <span className="text-lg font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
              BE.Fine
            </span>
          </div>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                activeTab === tab.id
                  ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/25"
                  : "text-gray-600 hover:bg-purple-50 hover:text-purple-700"
              )}
            >
              {tab.icon}
              {tab.label}
              {tab.id === "alerts" && <DoctorAlertBadge />}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-teal-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {user.name?.[0]?.toUpperCase() || "D"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate">{user.name || "Doctor"}</div>
              <div className="text-xs text-gray-500">Psychiatrist</div>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-40 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/logo-icon.png" alt="BE.Fine" className="w-7 h-7" />
          <span className="font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
            BE.Fine
          </span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2">
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-50" onClick={() => setSidebarOpen(false)}>
          <div className="absolute right-0 top-0 bottom-0 w-64 bg-white shadow-xl p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-end mb-4">
              <button onClick={() => setSidebarOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                    activeTab === tab.id
                      ? "bg-purple-500 text-white"
                      : "text-gray-600 hover:bg-purple-50"
                  )}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>
            <button onClick={logout} className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 mt-4">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 pt-16 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl">
          {activeTab === "overview" && <OverviewTab />}
          {activeTab === "patients" && <PatientsTab />}
          {activeTab === "alerts" && <AlertsTab />}
          {activeTab === "chat" && <ChatTab />}
          {activeTab === "profile" && <ProfileTab />}
        </div>
      </main>
    </div>
  );
}

function DoctorAlertBadge() {
  const count = 2;
  if (count === 0) return null;
  return (
    <span className="ml-auto w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
      {count}
    </span>
  );
}

// ==================== OVERVIEW TAB ====================
function OverviewTab() {
  const patients = [
    { id: 1, name: "Marie Dupont", email: "marie.dupont@email.com", profile: { conditions: "Anxiété généralisée" } },
    { id: 2, name: "Pierre Martin", email: "pierre.martin@email.com", profile: { conditions: "Dépression modérée" } },
    { id: 3, name: "Sophie Leclerc", email: "sophie.leclerc@email.com", profile: { conditions: "Stress chronique" } },
    { id: 4, name: "Jean Moreau", email: "jean.moreau@email.com", profile: { conditions: "Trouble panique" } },
  ];
  const alerts = [
    { id: 1, severity: "high", type: "vital_anomaly", message: "HR > 110 BPM pendant 5 min", patientId: 1 },
    { id: 2, severity: "critical", type: "stress_crisis", message: "Stress score 92/100 - Intervention requise", patientId: 2 },
  ];
  const unreadAlerts = alerts;
  const criticalAlerts = alerts.filter((a) => a.severity === "critical" || a.severity === "high");

  const stats = [
    { label: "Total Patients", value: patients.length, icon: <Users className="w-5 h-5 text-purple-600" />, color: "purple" },
    { label: "Unread Alerts", value: unreadAlerts.length, icon: <AlertTriangle className="w-5 h-5 text-red-600" />, color: "red" },
    { label: "Critical", value: criticalAlerts.length, icon: <TrendingUp className="w-5 h-5 text-amber-600" />, color: "amber" },
    { label: "Pending", value: 3, icon: <Clock className="w-5 h-5 text-blue-600" />, color: "blue" },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Doctor Dashboard</h1>
        <p className="text-gray-500">Monitor your patients in real-time (Mode Démo)</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                  {stat.icon}
                </div>
                <span className="text-2xl font-bold">{stat.value}</span>
              </div>
              <div className="text-sm text-gray-500 mt-2">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Critical Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              Recent Critical Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            {criticalAlerts.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">No critical alerts</p>
            ) : (
              <div className="space-y-3">
                {criticalAlerts.slice(0, 5).map((alert) => (
                  <div key={alert.id} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="destructive">{alert.severity}</Badge>
                      <span className="text-xs text-gray-500">{alert.type}</span>
                    </div>
                    <p className="text-sm">{alert.message}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Patient Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              Patient Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {patients.slice(0, 5).map((patient) => (
                <div key={patient.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold text-sm">
                    {patient.name[0]?.toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{patient.name}</div>
                    <div className="text-xs text-gray-500">
                      {patient.profile.conditions}
                    </div>
                  </div>
                  <div className="w-3 h-3 bg-green-400 rounded-full" title="Monitoring Active" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ==================== PATIENTS TAB ====================
function PatientsTab() {
  const patients = [
    { id: 1, name: "Marie Dupont", email: "marie.dupont@email.com" },
    { id: 2, name: "Pierre Martin", email: "pierre.martin@email.com" },
    { id: 3, name: "Sophie Leclerc", email: "sophie.leclerc@email.com" },
    { id: 4, name: "Jean Moreau", email: "jean.moreau@email.com" },
    { id: 5, name: "Claire Bernard", email: "claire.bernard@email.com" },
  ];
  const pending = [
    { relationId: 6, name: "Luc Durand", email: "luc.durand@email.com" },
  ];
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null);

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedPatient) {
    return <PatientDetail patientId={selectedPatient} onBack={() => setSelectedPatient(null)} />;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Patients (Mode Démo)</h1>
        <p className="text-gray-500">Manage and monitor your patients</p>
      </div>

      {/* Pending Requests */}
      {pending.length > 0 && (
        <Card className="mb-6 border-amber-300 bg-amber-50/50">
          <CardHeader>
            <CardTitle className="text-lg">Pending Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pending.map((req) => (
                <div key={req.relationId} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 font-bold">
                      {req.name[0]?.toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium">{req.name}</div>
                      <div className="text-xs text-gray-500">{req.email}</div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => alert('Accepté en mode démo!')}
                    className="bg-teal-500 hover:bg-teal-600"
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Accept
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search patients..."
          className="pl-10"
        />
      </div>

      <div className="space-y-3">
        {filteredPatients.map((patient) => (
          <Card
            key={patient.id}
            className="cursor-pointer hover:shadow-md transition-all"
            onClick={() => setSelectedPatient(patient.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-purple-100 rounded-full flex items-center justify-center text-gray-700 font-bold">
                    {patient.name[0]?.toUpperCase()}
                  </div>
                  <div>
                    <div className="font-semibold">{patient.name}</div>
                    <div className="text-sm text-gray-500">{patient.email}</div>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        <Heart className="w-3 h-3 mr-1 text-red-500" />
                        Monitoring
                      </Badge>
                    </div>
                  </div>
                </div>
                <ChevronLeft className="w-5 h-5 text-gray-400 rotate-180" />
              </div>
            </CardContent>
          </Card>
        ))}
        {filteredPatients.length === 0 && (
          <Card className="p-12 text-center">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No patients found</p>
          </Card>
        )}
      </div>
    </div>
  );
}

// ==================== PATIENT DETAIL ====================
function PatientDetail({ patientId, onBack }: { patientId: number; onBack: () => void }) {
  const patientName = "Marie Dupont";
  const patientEmail = "marie.dupont@email.com";
  const vitalsHistory = [
    {
      id: 1,
      heartRate: 72,
      oxygenLevel: 98,
      stressScore: 35,
      bloodPressureSystolic: 120,
      bloodPressureDiastolic: 80,
      recordedAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    },
  ];
  const medications = [
    { id: 1, name: "Sertraline", dosage: "50mg", frequency: "1x jour", reminderTime: "08:00", isActive: true },
    { id: 2, name: "Lorazépam", dosage: "1mg", frequency: "au besoin", reminderTime: "", isActive: true },
  ];
  const alerts = [
    { id: 1, severity: "high", type: "stress_anomaly", message: "Stress élevé détecté (85/100)", isResolved: false },
  ];

  const handleResolveAlert = (alertId: number) => {
    alert('Alerte résolue en mode démo!');
  };

  return (
    <div>
      <Button variant="outline" onClick={onBack} className="mb-4">
        <ChevronLeft className="w-4 h-4 mr-1" />
        Back to Patients
      </Button>

      <div className="mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-purple-100 rounded-full flex items-center justify-center text-2xl font-bold text-gray-700">
            {patientName[0]?.toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{patientName}</h1>
            <p className="text-gray-500">{patientEmail}</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Medical Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-teal-600" />
              Medical Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <InfoItem label="Date of Birth" value="15/03/1985" />
              <InfoItem label="Phone" value="+33 6 12 34 56 78" />
              <InfoItem label="Emergency Contact" value="Paul Dupont" />
              <InfoItem label="Emergency Phone" value="+33 6 98 76 54 32" />
              <div className="col-span-2">
                <InfoItem label="Conditions" value="Anxiété généralisée, Dépression saisonnière" />
              </div>
              <div className="col-span-2">
                <InfoItem label="Allergies" value="Aucune" />
              </div>
              <div className="col-span-2">
                <InfoItem label="Notes" value="Suivi régulier, bonne observance médicamenteuse" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Latest Vitals */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="w-5 h-5 text-red-600" />
              Latest Vitals
            </CardTitle>
          </CardHeader>
          <CardContent>
            {vitalsHistory.length > 0 ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <VitalDisplay icon={<Heart className="w-4 h-4 text-red-500" />} label="Heart Rate" value={`${vitalsHistory[0].heartRate} BPM`} />
                  <VitalDisplay icon={<Droplets className="w-4 h-4 text-blue-500" />} label="SpO2" value={`${vitalsHistory[0].oxygenLevel}%`} />
                  <VitalDisplay icon={<Gauge className="w-4 h-4 text-purple-500" />} label="Stress" value={`${vitalsHistory[0].stressScore}/100`} />
                  <VitalDisplay icon={<BarChart3 className="w-4 h-4 text-teal-500" />} label="BP" value={`${vitalsHistory[0].bloodPressureSystolic}/${vitalsHistory[0].bloodPressureDiastolic}`} />
                </div>
                <p className="text-xs text-gray-400 text-center">
                  Last updated: {new Date(vitalsHistory[0].recordedAt).toLocaleString()}
                </p>
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">No vitals data available</p>
            )}
          </CardContent>
        </Card>

        {/* Medications */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Heart className="w-5 h-5 text-purple-600" />
              Current Medications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {medications.filter((m) => m.isActive).map((med) => (
                <div key={med.id} className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">{med.name}</div>
                    <div className="text-xs text-gray-500">{med.dosage} - {med.frequency}</div>
                  </div>
                  {med.reminderTime && (
                    <Badge variant="outline" className="text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {med.reminderTime}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Patient Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              Alert History
            </CardTitle>
          </CardHeader>
          <CardContent>
            {alerts.length > 0 ? (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {alerts.map((alert) => (
                  <div key={alert.id} className={`p-3 rounded-lg border ${alert.isResolved ? "bg-gray-50 opacity-60" : alert.severity === "critical" ? "bg-red-50 border-red-200" : "bg-amber-50 border-amber-200"}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={alert.severity === "critical" ? "destructive" : "secondary"}>{alert.severity}</Badge>
                      <span className="text-xs text-gray-500">{alert.type}</span>
                    </div>
                    <p className="text-sm">{alert.message}</p>
                    {!alert.isResolved && (
                      <Button size="sm" variant="outline" className="mt-2" onClick={() => handleResolveAlert(alert.id)}>
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Resolve
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">No alerts for this patient</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function VitalDisplay({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="text-xs text-gray-500">{label}</span>
      </div>
      <div className="font-semibold text-sm">{value}</div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-sm font-medium">{value}</div>
    </div>
  );
}

// ==================== ALERTS TAB ====================
function AlertsTab() {
  const alerts = [
    {
      id: 1,
      severity: "critical",
      type: "stress_crisis",
      message: "Pierre Martin - Stress score 92/100 depuis 12 minutes",
      createdAt: new Date(Date.now() - 1000 * 60 * 12),
      isResolved: false,
      vitalSnapshot: "HR: 118 BPM, Stress: 92/100, SpO2: 94%",
    },
    {
      id: 2,
      severity: "high",
      type: "vital_anomaly",
      message: "Marie Dupont - Fréquence cardiaque élevée persistante",
      createdAt: new Date(Date.now() - 1000 * 60 * 45),
      isResolved: true,
      doctorResponse: "Vérifié et surveillé. Conseillé respiration profonde.",
    },
    {
      id: 3,
      severity: "high",
      type: "low_spo2",
      message: "Sophie Leclerc - SpO2 descendu à 91% pendant 3 min",
      createdAt: new Date(Date.now() - 1000 * 60 * 120),
      isResolved: false,
    },
  ];
  const [responseText, setResponseText] = useState<Record<number, string>>({});

  const handleResolve = (alertId: number) => {
    alert(`Réponse envoyée en mode démo pour alerte ${alertId}`);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Crisis Alerts (Mode Démo)</h1>
        <p className="text-gray-500">Respond to patient alerts in real-time</p>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <Card key={alert.id} className={alert.isResolved ? "opacity-60" : alert.severity === "critical" ? "border-red-300 shadow-red-100" : ""}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Badge variant={alert.severity === "critical" ? "destructive" : alert.severity === "high" ? "default" : "secondary"}>
                    {alert.severity}
                  </Badge>
                  <Badge variant="outline">{alert.type}</Badge>
                  {alert.isResolved && <Badge className="bg-green-500">Resolved</Badge>}
                </div>
                <span className="text-xs text-gray-400">
                  {alert.createdAt.toLocaleString()}
                </span>
              </div>
              <p className="text-sm mb-3">{alert.message}</p>
              {alert.vitalSnapshot && (
                <div className="p-3 bg-gray-50 rounded-lg text-xs text-gray-600 mb-3">{alert.vitalSnapshot}</div>
              )}
              {alert.doctorResponse && (
                <div className="p-3 bg-teal-50 rounded-lg border border-teal-200 mb-3">
                  <div className="text-xs font-medium text-teal-700 mb-1">Your Response:</div>
                  <p className="text-sm text-teal-800">{alert.doctorResponse}</p>
                </div>
              )}
              {!alert.isResolved && (
                <div className="flex gap-2">
                  <Input
                    value={responseText[alert.id] || ""}
                    onChange={(e) => setResponseText({ ...responseText, [alert.id]: e.target.value })}
                    placeholder="Type your response..."
                    className="flex-1"
                  />
                  <Button
                    onClick={() => handleResolve(alert.id)}
                    className="bg-teal-500 hover:bg-teal-600"
                  >
                    <Send className="w-4 h-4 mr-1" />
                    Respond
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ==================== CHAT TAB ====================
function ChatTab() {
  const patients = [
    { id: 1, name: "Marie Dupont" },
    { id: 2, name: "Pierre Martin" },
    { id: 3, name: "Sophie Leclerc" },
  ];
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null);

  if (selectedPatient) {
    const patientName = patients.find(p => p.id === selectedPatient)?.name || "Patient";
    return <ChatConversation patientId={selectedPatient} onBack={() => setSelectedPatient(null)} patientName={patientName} />;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Messages (Mode Démo)</h1>
        <p className="text-gray-500">Chat with your patients</p>
      </div>

      <div className="space-y-3">
        {patients.map((patient) => (
          <Card
            key={patient.id}
            className="cursor-pointer hover:shadow-md transition-all"
            onClick={() => setSelectedPatient(patient.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold">
                  {patient.name[0]?.toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{patient.name}</div>
                  <div className="text-sm text-gray-500">Click to start conversation</div>
                </div>
                <MessageCircle className="w-5 h-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ChatConversation({ patientId, onBack, patientName }: { patientId: number; onBack: () => void; patientName: string }) {
  const [messages, setMessages] = useState([
    { id: 1, senderId: patientId, content: "Bonjour Docteur, j'ai du mal à dormir ce soir.", createdAt: new Date(Date.now() - 1000 * 60 * 10) },
    { id: 2, senderId: 0, content: "Bonsoir Marie, essayez la technique 4-7-8: inspirez 4s, retenez 7s, expirez 8s.", createdAt: new Date(Date.now() - 1000 * 60 * 8) },
    { id: 3, senderId: patientId, content: "Merci, je vais essayer. C'est mieux déjà.", createdAt: new Date(Date.now() - 1000 * 60 * 2) },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, {
        id: Date.now(),
        senderId: 0, // doctor
        content: input,
        createdAt: new Date(),
      }]);
      setInput("");
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold">
          {patientName[0]?.toUpperCase()}
        </div>
        <div>
          <h2 className="font-semibold">{patientName}</h2>
          <p className="text-xs text-green-600">En ligne</p>
        </div>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.senderId === patientId ? "justify-start" : "justify-end"}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl ${
                  msg.senderId === patientId
                    ? "bg-gray-100 text-gray-800 rounded-bl-md"
                    : "bg-purple-500 text-white rounded-br-md"
                }`}>
                  <div className="text-sm">{msg.content}</div>
                  <div className={`text-[10px] mt-1 ${msg.senderId === patientId ? "text-gray-400" : "text-purple-200"}`}>
                    {new Date(msg.createdAt).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            {messages.length === 0 && (
              <p className="text-center text-gray-400 py-8">No messages yet. Start the conversation!</p>
            )}
          </div>
        </ScrollArea>
        <Separator />
        <div className="p-4 flex gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Tapez un message..."
            className="flex-1"
          />
          <Button
            onClick={sendMessage}
            className="bg-purple-500 hover:bg-purple-600"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}

// ==================== PROFILE TAB ====================
function ProfileTab() {
  const { user } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    specialty: "Psychiatrie",
    licenseNumber: "RPPS 12345678901",
    hospital: "CHU de Paris",
    phone: "+33 1 23 45 67 89",
    bio: "Spécialiste en troubles anxieux et dépressifs. 15 ans d'expérience.",
  });
  const [profile, setProfile] = useState(formData);

  const handleSave = () => {
    setProfile(formData);
    setEditMode(false);
    alert('Profil sauvegardé en mode démo!');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Profile (Mode Démo)</h1>
        <p className="text-gray-500">Your professional information</p>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-teal-400 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user?.name?.[0]?.toUpperCase() || "D"}
            </div>
            <div>
              <h2 className="text-xl font-bold">Dr. {user?.name || "Doctor"}</h2>
              <p className="text-gray-500">{user?.email}</p>
              <Badge className="bg-purple-500">Doctor</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Professional Information</h3>
          <Button size="sm" variant="outline" onClick={() => setEditMode(true)}>
            Edit
          </Button>
        </div>

        {editMode ? (
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Specialty</label>
              <Input value={formData.specialty} onChange={(e) => setFormData({ ...formData, specialty: e.target.value })} placeholder="e.g., Psychiatry" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">License Number</label>
              <Input value={formData.licenseNumber} onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })} placeholder="Medical license" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Hospital/Clinic</label>
              <Input value={formData.hospital} onChange={(e) => setFormData({ ...formData, hospital: e.target.value })} placeholder="Workplace" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Phone</label>
              <Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+33..." />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-medium mb-1 block">Bio</label>
              <Input value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} placeholder="Short bio..." />
            </div>
            <div className="sm:col-span-2 flex gap-3">
              <Button onClick={handleSave} className="bg-purple-500 hover:bg-purple-600">Save</Button>
              <Button variant="outline" onClick={() => setEditMode(false)}>Cancel</Button>
            </div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            <InfoItem label="Specialty" value={profile.specialty} />
            <InfoItem label="License" value={profile.licenseNumber} />
            <InfoItem label="Hospital" value={profile.hospital} />
            <InfoItem label="Phone" value={profile.phone} />
            <div className="col-span-2">
              <InfoItem label="Bio" value={profile.bio} />
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

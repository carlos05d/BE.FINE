import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import {
  Heart,
  Activity,
  Watch,
  Pill,
  AlertTriangle,
  User,
  LogOut,
  Menu,
  X,
  TrendingUp,
  TrendingDown,
  Minus,
  Send,
  Bot,
  Sparkles,
  Plus,
  Trash2,
  Edit3,
  Clock,
  Droplets,
  Gauge,
  Stethoscope,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type TabType = "overview" | "vitals" | "medications" | "chatbot" | "alerts" | "profile";

export default function PatientDashboard() {
  const { user, logout } = useAuth({ redirectOnUnauthenticated: true });
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (user && user.role === "doctor") {
      navigate("/doctor-dashboard");
    }
  }, [user, navigate]);

  if (!user) return null;

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: "overview", label: "Overview", icon: <Activity className="w-5 h-5" /> },
    { id: "vitals", label: "My Vitals", icon: <Watch className="w-5 h-5" /> },
    { id: "medications", label: "Medications", icon: <Pill className="w-5 h-5" /> },
    { id: "chatbot", label: "AI Support", icon: <Bot className="w-5 h-5" /> },
    { id: "alerts", label: "Alerts", icon: <AlertTriangle className="w-5 h-5" /> },
    { id: "profile", label: "Profile", icon: <User className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50/50 via-white to-purple-50/30 flex">
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
                  ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/25"
                  : "text-gray-600 hover:bg-teal-50 hover:text-teal-700"
              )}
            >
              {tab.icon}
              {tab.label}
              {tab.id === "alerts" && <AlertBadge />}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-purple-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {user.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate">{user.name || "User"}</div>
              <div className="text-xs text-gray-500">Patient</div>
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
                      ? "bg-teal-500 text-white"
                      : "text-gray-600 hover:bg-teal-50"
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
          {activeTab === "vitals" && <VitalsTab />}
          {activeTab === "medications" && <MedicationsTab />}
          {activeTab === "chatbot" && <ChatbotTab />}
          {activeTab === "alerts" && <AlertsTab />}
          {activeTab === "profile" && <ProfileTab />}
        </div>
      </main>
    </div>
  );
}

function AlertBadge() {
  return (
    <span className="ml-auto w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
      2
    </span>
  );
}

// ==================== OVERVIEW TAB ====================
function OverviewTab() {
  const latestVital = {
    heartRate: 72,
    oxygenLevel: 98,
    stressScore: 35,
    bloodPressureSystolic: 120,
    bloodPressureDiastolic: 80,
  };
  const medications = [
    { id: 1, name: "Sertraline", dosage: "50mg", frequency: "1x/jour", isActive: true },
    { id: 2, name: "Lorazépam", dosage: "1mg", frequency: "au besoin", isActive: true },
  ];
  const alerts = [
    { id: 1, severity: "high", type: "stress", message: "Stress élevé détecté", isRead: false },
    { id: 2, severity: "medium", type: "hr_anomaly", message: "Pouls rapide détecté", isRead: true },
  ];
  const activeMeds = medications.filter((m) => m.isActive);
  const unreadAlerts = alerts.filter((a) => !a.isRead);

  const simulateVitals = () => {
    alert('Vitale simulées en mode démo!');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview (Mode Démo)</h1>
        <p className="text-gray-500">Welcome back! Here's your health at a glance.</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <button
          onClick={() => simulateVitals()}
          className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center hover:shadow-md transition-all"
        >
          <Activity className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
          <span className="text-xs font-medium text-emerald-700">Normal</span>
        </button>
        <button
          onClick={() => simulateVitals()}
          className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-center hover:shadow-md transition-all"
        >
          <TrendingUp className="w-5 h-5 text-amber-600 mx-auto mb-1" />
          <span className="text-xs font-medium text-amber-700">Stress</span>
        </button>
        <button
          onClick={() => simulateVitals()}
          className="p-3 bg-red-50 border border-red-200 rounded-xl text-center hover:shadow-md transition-all pulse-ring"
        >
          <AlertTriangle className="w-5 h-5 text-red-600 mx-auto mb-1" />
          <span className="text-xs font-medium text-red-700">Crisis</span>
        </button>
        <button
          onClick={() => simulateVitals()}
          className="p-3 bg-teal-50 border border-teal-200 rounded-xl text-center hover:shadow-md transition-all"
        >
          <Watch className="w-5 h-5 text-teal-600 mx-auto mb-1" />
          <span className="text-xs font-medium text-teal-700">Sync Watch</span>
        </button>
      </div>

      {/* Vitals Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <VitalCard
          icon={<Heart className="w-5 h-5 text-red-500" />}
          label="Heart Rate"
          value={`${latestVital.heartRate} BPM`}
          status="normal"
        />
        <VitalCard
          icon={<Droplets className="w-5 h-5 text-blue-500" />}
          label="Oxygen (SpO2)"
          value={`${latestVital.oxygenLevel}%`}
          status="normal"
        />
        <VitalCard
          icon={<Gauge className="w-5 h-5 text-purple-500" />}
          label="Stress Score"
          value={`${latestVital.stressScore}/100`}
          status="normal"
        />
        <VitalCard
          icon={<Activity className="w-5 h-5 text-teal-500" />}
          label="Blood Pressure"
          value={`${latestVital.bloodPressureSystolic}/${latestVital.bloodPressureDiastolic}`}
          status="normal"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Medications Summary */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Pill className="w-5 h-5 text-teal-600" />
                Active Medications
              </CardTitle>
              <Badge variant="secondary">{activeMeds.length}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            {activeMeds.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">No active medications</p>
            ) : (
              <div className="space-y-3">
                {activeMeds.slice(0, 3).map((med) => (
                  <div key={med.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-sm">{med.name}</div>
                      <div className="text-xs text-gray-500">{med.dosage} - {med.frequency}</div>
                    </div>
                    <Clock className="w-4 h-4 text-gray-400" />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                Recent Alerts
              </CardTitle>
              {unreadAlerts.length > 0 && (
                <Badge className="bg-red-500">{unreadAlerts.length} new</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {alerts.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">No alerts yet</p>
            ) : (
              <div className="space-y-3">
                {alerts.slice(0, 3).map((alert) => (
                  <div key={alert.id} className={`p-3 rounded-lg border ${alert.severity === "critical" ? "bg-red-50 border-red-200" : alert.severity === "high" ? "bg-amber-50 border-amber-200" : "bg-gray-50 border-gray-200"}`}>
                    <div className="flex items-center gap-2">
                      <Badge variant={alert.severity === "critical" ? "destructive" : alert.severity === "high" ? "default" : "secondary"} className="text-[10px]">
                        {alert.severity}
                      </Badge>
                      <span className="text-xs text-gray-500">{alert.type}</span>
                    </div>
                    <p className="text-sm mt-1">{alert.message}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function VitalCard({ icon, label, value, status }: { icon: React.ReactNode; label: string; value: string; status: string }) {
  const statusColor = status === "high" ? "text-red-600 bg-red-50 border-red-200" : status === "medium" ? "text-amber-600 bg-amber-50 border-amber-200" : status === "low" ? "text-blue-600 bg-blue-50 border-blue-200" : "text-gray-900 bg-white border-gray-200";
  const StatusIcon = status === "high" ? TrendingUp : status === "low" ? TrendingDown : Minus;

  return (
    <div className={`p-4 rounded-xl border ${statusColor} shadow-sm`}>
      <div className="flex items-center justify-between mb-2">
        {icon}
        <StatusIcon className="w-4 h-4 opacity-50" />
      </div>
      <div className="text-xl font-bold">{value}</div>
      <div className="text-xs opacity-70">{label}</div>
    </div>
  );
}

// ==================== VITALS TAB ====================
function VitalsTab() {
  const history = [
    {
      id: 1,
      heartRate: 72,
      oxygenLevel: 98,
      stressScore: 35,
      bloodPressureSystolic: 120,
      bloodPressureDiastolic: 80,
      recordedAt: new Date(Date.now() - 1000 * 60 * 30),
    },
    {
      id: 2,
      heartRate: 78,
      oxygenLevel: 97,
      stressScore: 42,
      bloodPressureSystolic: 122,
      bloodPressureDiastolic: 82,
      recordedAt: new Date(Date.now() - 1000 * 60 * 25),
    },
    // ... more mock data
  ];

  const simulateVitals = () => {
    alert('Données simulées en mode démo!');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Vitals</h1>
        <p className="text-gray-500">Real-time data from your smartwatch</p>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <Button onClick={() => simulateVitals.mutate({ scenario: "normal" })} variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
          <Activity className="w-4 h-4 mr-2" />
          Simulate Normal
        </Button>
        <Button onClick={() => simulateVitals.mutate({ scenario: "stress" })} variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50">
          <TrendingUp className="w-4 h-4 mr-2" />
          Simulate Stress
        </Button>
        <Button onClick={() => simulateVitals.mutate({ scenario: "crisis" })} variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
          <AlertTriangle className="w-4 h-4 mr-2" />
          Simulate Crisis
        </Button>
      </div>

      {(!history || history.length === 0) ? (
        <Card className="p-12 text-center">
          <Watch className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Data Yet</h3>
          <p className="text-gray-500 mb-4">Use the simulation buttons above to generate sample data.</p>
          <p className="text-xs text-gray-400">In production, this data comes from your smartwatch automatically.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Vitals History ({history.length} readings)</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {history.map((vital) => (
                <div key={vital.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 flex-1">
                    <div>
                      <div className="text-xs text-gray-500">Heart Rate</div>
                      <div className="font-semibold text-sm flex items-center gap-1">
                        <Heart className="w-3 h-3 text-red-500" />
                        {vital.heartRate} BPM
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">SpO2</div>
                      <div className="font-semibold text-sm flex items-center gap-1">
                        <Droplets className="w-3 h-3 text-blue-500" />
                        {vital.oxygenLevel}%
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Stress</div>
                      <div className="font-semibold text-sm flex items-center gap-1">
                        <Gauge className="w-3 h-3 text-purple-500" />
                        {vital.stressScore}/100
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">BP</div>
                      <div className="font-semibold text-sm">
                        {vital.bloodPressureSystolic}/{vital.bloodPressureDiastolic}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 ml-4">
                    {vital.recordedAt ? new Date(vital.recordedAt).toLocaleTimeString() : ""}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== MEDICATIONS TAB ====================
function MedicationsTab() {
  const { data: medications, refetch } = trpc.medication.list.useQuery({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMed, setNewMed] = useState({ name: "", dosage: "", frequency: "", reminderTime: "" });

  const createMed = trpc.medication.create.useMutation({ onSuccess: () => { refetch(); setShowAddForm(false); setNewMed({ name: "", dosage: "", frequency: "", reminderTime: "" }); } });
  const updateMed = trpc.medication.update.useMutation({ onSuccess: () => refetch() });
  const deleteMed = trpc.medication.delete.useMutation({ onSuccess: () => refetch() });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Medications</h1>
          <p className="text-gray-500">Track your prescriptions and reminders</p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)} className="bg-teal-500 hover:bg-teal-600">
          <Plus className="w-4 h-4 mr-2" />
          Add Medication
        </Button>
      </div>

      {showAddForm && (
        <Card className="mb-6 p-6 border-teal-200 bg-teal-50/50">
          <h3 className="font-semibold mb-4">Add New Medication</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Name</label>
              <Input value={newMed.name} onChange={(e) => setNewMed({ ...newMed, name: e.target.value })} placeholder="e.g., Sertraline" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Dosage</label>
              <Input value={newMed.dosage} onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })} placeholder="e.g., 50mg" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Frequency</label>
              <Input value={newMed.frequency} onChange={(e) => setNewMed({ ...newMed, frequency: e.target.value })} placeholder="e.g., Once daily" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Reminder Time</label>
              <Input value={newMed.reminderTime} onChange={(e) => setNewMed({ ...newMed, reminderTime: e.target.value })} placeholder="e.g., 08:00" />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <Button onClick={() => createMed.mutate(newMed)} className="bg-teal-500 hover:bg-teal-600">Save</Button>
            <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
          </div>
        </Card>
      )}

      <div className="space-y-3">
        {medications?.map((med) => (
          <Card key={med.id} className={med.isActive ? "" : "opacity-50"}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
                    <Pill className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <div className="font-semibold">{med.name}</div>
                    <div className="text-sm text-gray-500">{med.dosage} - {med.frequency}</div>
                    {med.reminderTime && (
                      <div className="text-xs text-teal-600 flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" />
                        Reminder at {med.reminderTime}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateMed.mutate({ id: med.id, isActive: !med.isActive })}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Edit3 className="w-4 h-4 text-gray-500" />
                  </button>
                  <button
                    onClick={() => deleteMed.mutate({ id: med.id })}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {(!medications || medications.length === 0) && (
          <Card className="p-12 text-center">
            <Pill className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No medications added yet</p>
          </Card>
        )}
      </div>
    </div>
  );
}

// ==================== CHATBOT TAB ====================
function ChatbotTab() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: "assistant", content: "Hello! I'm BeFine, your AI mental health assistant. I'm here to help you with breathing exercises, grounding techniques, medication reminders, or just to talk. How are you feeling today?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = trpc.chatbot.getAIResponse.useMutation();

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const result = await sendMessage.mutateAsync({ message: userMessage });
      setMessages((prev) => [...prev, { role: "assistant", content: result.response }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "I'm sorry, I'm having trouble responding right now. Please try again or contact your doctor if this is urgent." },
      ]);
    }
    setIsLoading(false);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Bot className="w-6 h-6 text-teal-600" />
          AI Support
          <Sparkles className="w-4 h-4 text-amber-500" />
        </h1>
        <p className="text-gray-500">Your 24/7 mental health companion</p>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl ${
                  msg.role === "user"
                    ? "bg-teal-500 text-white rounded-br-md"
                    : "bg-gray-100 text-gray-800 rounded-bl-md"
                }`}>
                  {msg.role === "assistant" && (
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-teal-400 to-purple-400 rounded-full flex items-center justify-center">
                        <Bot className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-xs font-medium text-teal-600">BeFine AI</span>
                    </div>
                  )}
                  <div className="text-sm whitespace-pre-line">{msg.content}</div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-4 rounded-2xl rounded-bl-md">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                    <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <Separator />
        <div className="p-4 flex gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button onClick={handleSend} disabled={isLoading} className="bg-gradient-to-r from-teal-500 to-purple-600">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}

// ==================== ALERTS TAB ====================
function AlertsTab() {
  const { data: alerts, refetch } = trpc.alert.myAlerts.useQuery(undefined);
  const markAsRead = trpc.alert.markAsRead.useMutation({ onSuccess: () => refetch() });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Alerts</h1>
        <p className="text-gray-500">Crisis alerts and notifications from your doctor</p>
      </div>

      <div className="space-y-3">
        {alerts?.map((alert) => (
          <Card key={alert.id} className={alert.isRead ? "opacity-70" : ""}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={alert.severity === "critical" ? "destructive" : alert.severity === "high" ? "default" : "secondary"}>
                      {alert.severity}
                    </Badge>
                    <Badge variant="outline">{alert.type}</Badge>
                    {!alert.isRead && <Badge className="bg-blue-500">New</Badge>}
                  </div>
                  <p className="text-sm text-gray-800">{alert.message}</p>
                  {alert.vitalSnapshot && (
                    <p className="text-xs text-gray-500 mt-2 bg-gray-50 p-2 rounded">{alert.vitalSnapshot}</p>
                  )}
                  {alert.doctorResponse && (
                    <div className="mt-3 p-3 bg-teal-50 rounded-lg border border-teal-200">
                      <div className="text-xs font-medium text-teal-700 mb-1">Doctor's Response:</div>
                      <p className="text-sm text-teal-800">{alert.doctorResponse}</p>
                    </div>
                  )}
                  <div className="text-xs text-gray-400 mt-2">
                    {alert.createdAt ? new Date(alert.createdAt).toLocaleString() : ""}
                  </div>
                </div>
                {!alert.isRead && (
                  <Button size="sm" variant="outline" onClick={() => markAsRead.mutate({ alertId: alert.id })} className="ml-2">
                    Mark Read
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        {(!alerts || alerts.length === 0) && (
          <Card className="p-12 text-center">
            <AlertTriangle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No alerts yet. Your vitals are being monitored.</p>
          </Card>
        )}
      </div>
    </div>
  );
}

// ==================== PROFILE TAB ====================
function ProfileTab() {
  const { user } = useAuth();
  const { data: profile, refetch } = trpc.patient.getProfile.useQuery({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    dateOfBirth: profile?.dateOfBirth || "",
    phone: profile?.phone || "",
    emergencyContact: profile?.emergencyContact || "",
    emergencyPhone: profile?.emergencyPhone || "",
    conditions: profile?.conditions || "",
    allergies: profile?.allergies || "",
    notes: profile?.notes || "",
  });

  const updateProfile = trpc.patient.updateProfile.useMutation({
    onSuccess: () => { refetch(); setEditMode(false); },
  });
  const createProfile = trpc.patient.createProfile.useMutation({
    onSuccess: () => refetch(),
  });

// Removed useEffect as profile is now static mock data

  const handleSave = () => {
    if (profile) {
      updateProfile.mutate(formData);
    } else {
      createProfile.mutate(formData);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-500">Your personal and medical information</p>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-purple-400 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div>
              <h2 className="text-xl font-bold">{user?.name || "User"}</h2>
              <p className="text-gray-500">{user?.email}</p>
              <Badge variant="secondary">Patient</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {!profile && !editMode && (
        <Card className="p-6 text-center">
          <p className="text-gray-500 mb-4">Complete your medical profile for better care</p>
          <Button onClick={() => setEditMode(true)} className="bg-teal-500 hover:bg-teal-600">
            Create Profile
          </Button>
        </Card>
      )}

      {(profile || editMode) && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Medical Information</h3>
            {!editMode && (
              <Button size="sm" variant="outline" onClick={() => setEditMode(true)}>
                <Edit3 className="w-4 h-4 mr-2" />
                Edit
              </Button>
            )}
          </div>

          {editMode ? (
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Date of Birth</label>
                <Input value={formData.dateOfBirth} onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })} placeholder="DD/MM/YYYY" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Phone</label>
                <Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+33..." />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Emergency Contact</label>
                <Input value={formData.emergencyContact} onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })} placeholder="Name" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Emergency Phone</label>
                <Input value={formData.emergencyPhone} onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })} placeholder="+33..." />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium mb-1 block">Medical Conditions</label>
                <Input value={formData.conditions} onChange={(e) => setFormData({ ...formData, conditions: e.target.value })} placeholder="e.g., Anxiety, Depression" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium mb-1 block">Allergies</label>
                <Input value={formData.allergies} onChange={(e) => setFormData({ ...formData, allergies: e.target.value })} placeholder="e.g., Penicillin" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium mb-1 block">Notes</label>
                <Input value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} placeholder="Any additional information" />
              </div>
              <div className="sm:col-span-2 flex gap-3">
                <Button onClick={handleSave} className="bg-teal-500 hover:bg-teal-600">Save</Button>
                <Button variant="outline" onClick={() => setEditMode(false)}>Cancel</Button>
              </div>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              <InfoRow label="Date of Birth" value={profile?.dateOfBirth || "Not set"} />
              <InfoRow label="Phone" value={profile?.phone || "Not set"} />
              <InfoRow label="Emergency Contact" value={profile?.emergencyContact || "Not set"} />
              <InfoRow label="Emergency Phone" value={profile?.emergencyPhone || "Not set"} />
              <InfoRow label="Conditions" value={profile?.conditions || "None listed"} />
              <InfoRow label="Allergies" value={profile?.allergies || "None listed"} />
              <InfoRow label="Notes" value={profile?.notes || "None"} />
            </div>
          )}
        </Card>
      )}

      {/* My Doctors */}
      <MyDoctorsSection />
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-gray-500 uppercase tracking-wider">{label}</div>
      <div className="font-medium text-sm mt-1">{value}</div>
    </div>
  );
}

function MyDoctorsSection() {
  const { data: doctors } = trpc.patient.myDoctors.useQuery(undefined);
  const { data: allDoctors } = trpc.patient.searchDoctors.useQuery(undefined);
  const utils = trpc.useUtils();
  const connectDoctor = trpc.patient.connectDoctor.useMutation({ onSuccess: () => utils.patient.myDoctors.invalidate() });
  const [showSearch, setShowSearch] = useState(false);

  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-purple-600" />
            My Doctors
          </CardTitle>
          <Button size="sm" variant="outline" onClick={() => setShowSearch(!showSearch)}>
            <Plus className="w-4 h-4 mr-1" />
            Connect Doctor
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {showSearch && allDoctors && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium mb-2">Available Doctors</h4>
            <div className="space-y-2">
              {allDoctors.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-2 bg-white rounded border">
                  <div>
                    <div className="font-medium text-sm">{doc.name}</div>
                    <div className="text-xs text-gray-500">{doc.profile?.specialty || "General"}</div>
                  </div>
                  <Button size="sm" onClick={() => connectDoctor.mutate({ doctorId: doc.id })} className="bg-purple-500 hover:bg-purple-600">
                    Connect
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
        {doctors && doctors.length > 0 ? (
          <div className="space-y-3">
            {doctors.map((doc: Record<string, unknown>) => (
              <div key={doc.id as number} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-bold">
                  {(doc.name as string)?.[0]?.toUpperCase()}
                </div>
                <div>
                  <div className="font-medium text-sm">{doc.name as string}</div>
                  <div className="text-xs text-gray-500">{(doc.profile as Record<string, unknown>)?.specialty as string || "Psychiatrist"}</div>
                </div>
                <Badge variant="outline" className="ml-auto text-xs">Active</Badge>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">No doctors connected yet</p>
        )}
      </CardContent>
    </Card>
  );
}

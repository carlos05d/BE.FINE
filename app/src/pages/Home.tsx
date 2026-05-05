import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Activity,
  Shield,
  MessageCircle,
  Watch,
  Pill,
  AlertTriangle,
  Brain,
  ChevronRight,
  Stethoscope,
  Lock,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

function Home() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "patient") {
        navigate("/patient-dashboard");
      } else if (user.role === "doctor") {
        navigate("/doctor-dashboard");
      } else {
        navigate("/role-select");
      }
    }
  }, [isAuthenticated, user, navigate]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-white to-purple-50 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-teal-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <img src="/logo-icon.png" alt="BE.Fine" className="w-9 h-9" />
              <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
                BE.Fine
              </span>
              <span className="text-[10px] text-gray-400 ml-1">by XomaxX</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection("features")} className="text-sm text-gray-600 hover:text-teal-600 transition-colors">Features</button>
              <button onClick={() => scrollToSection("how-it-works")} className="text-sm text-gray-600 hover:text-teal-600 transition-colors">How It Works</button>
              <button onClick={() => scrollToSection("security")} className="text-sm text-gray-600 hover:text-teal-600 transition-colors">Security</button>
              <Button
                onClick={() => navigate("/login")}
                className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-full px-6 shadow-lg shadow-teal-500/25"
              >
                Get Started
              </Button>
            </div>
            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
            <button onClick={() => scrollToSection("features")} className="block text-sm text-gray-600 py-2">Features</button>
            <button onClick={() => scrollToSection("how-it-works")} className="block text-sm text-gray-600 py-2">How It Works</button>
            <button onClick={() => scrollToSection("security")} className="block text-sm text-gray-600 py-2">Security</button>
            <Button onClick={() => navigate("/login")} className="w-full bg-teal-500 text-white rounded-full">
              Get Started
            </Button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero-banner.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/80 via-teal-800/60 to-purple-900/70" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-teal-300" />
                <span className="text-sm font-medium">AI-Powered Mental Wellness</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Your Mental Health,{" "}
                <span className="text-teal-300">Monitored & Protected</span>
              </h1>
              <p className="text-lg text-white/80 mb-8 max-w-xl leading-relaxed">
                BE.Fine connects your smartwatch to your psychiatrist in real-time. 
                We detect crisis moments, send instant alerts, and provide AI-powered 
                support when you need it most.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={() => navigate("/login")}
                  size="lg"
                  className="bg-white text-teal-700 hover:bg-teal-50 rounded-full px-8 shadow-xl font-semibold"
                >
                  Start Your Journey
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
                <Button
                  onClick={() => scrollToSection("how-it-works")}
                  variant="outline"
                  size="lg"
                  className="border-white/40 text-white hover:bg-white/10 rounded-full px-8"
                >
                  Learn More
                </Button>
              </div>
              <div className="flex items-center gap-6 mt-10">
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-300">24/7</div>
                  <div className="text-xs text-white/60">Monitoring</div>
                </div>
                <div className="w-px h-10 bg-white/20" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-300">&lt;2s</div>
                  <div className="text-xs text-white/60">Alert Time</div>
                </div>
                <div className="w-px h-10 bg-white/20" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-300">AI</div>
                  <div className="text-xs text-white/60">Chat Support</div>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-purple-400 rounded-[2.5rem] blur-2xl opacity-30" />
                <img
                  src="/smartwatch-mockup.jpg"
                  alt="Smartwatch Health Monitor"
                  className="relative w-80 h-auto rounded-[2rem] shadow-2xl border-4 border-white/20 float-animation"
                />
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center heart-beat">
                      <Heart className="w-4 h-4 text-red-500" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Heart Rate</div>
                      <div className="text-sm font-bold text-gray-800">72 BPM</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                      <Activity className="w-4 h-4 text-teal-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">SpO2</div>
                      <div className="text-sm font-bold text-gray-800">98%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Features</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">
              Everything You Need for <span className="text-gradient-teal">Peace of Mind</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              BE.Fine combines smartwatch monitoring, AI assistance, and direct doctor connectivity 
              in one secure platform.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Watch className="w-6 h-6 text-teal-600" />}
              title="Smartwatch Sync"
              description="Real-time heart rate, oxygen levels, and stress scoring from your wearable device. Automatic anomaly detection."
              gradient="from-teal-50 to-teal-100/50"
            />
            <FeatureCard
              icon={<AlertTriangle className="w-6 h-6 text-red-500" />}
              title="Crisis Alerts"
              description="Instant notifications to your doctor when abnormal vitals are detected. Automatic AI chatbot activation after 2 minutes."
              gradient="from-red-50 to-red-100/50"
            />
            <FeatureCard
              icon={<Brain className="w-6 h-6 text-purple-600" />}
              title="AI Support"
              description="Intelligent chatbot provides breathing exercises, grounding techniques, and medication reminders 24/7."
              gradient="from-purple-50 to-purple-100/50"
            />
            <FeatureCard
              icon={<Pill className="w-6 h-6 text-amber-600" />}
              title="Medication Tracking"
              description="Never miss a dose with smart reminders. Track your medications, dosages, and schedules in one place."
              gradient="from-amber-50 to-amber-100/50"
            />
            <FeatureCard
              icon={<MessageCircle className="w-6 h-6 text-blue-600" />}
              title="Doctor Chat"
              description="Secure messaging with your psychiatrist. Share updates, ask questions, and get professional guidance anytime."
              gradient="from-blue-50 to-blue-100/50"
            />
            <FeatureCard
              icon={<Activity className="w-6 h-6 text-emerald-600" />}
              title="Health Analytics"
              description="Beautiful charts and insights into your vitals history. Track your progress and identify patterns over time."
              gradient="from-emerald-50 to-emerald-100/50"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">Process</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">
              How <span className="text-gradient-lavender">BE.Fine</span> Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Seamless integration between your smartwatch, our AI, and your doctor.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <StepCard
              number="01"
              icon={<Watch className="w-8 h-8 text-teal-600" />}
              title="Connect Watch"
              description="Pair your smartwatch with BE.Fine to start monitoring your vitals in real-time."
            />
            <StepCard
              number="02"
              icon={<Heart className="w-8 h-8 text-red-500" />}
              title="Monitor"
              description="We continuously track your heart rate, SpO2, and stress levels."
            />
            <StepCard
              number="03"
              icon={<AlertTriangle className="w-8 h-8 text-amber-500" />}
              title="Detect Crisis"
              description="Our AI detects abnormal patterns and instantly alerts your doctor."
            />
            <StepCard
              number="04"
              icon={<Shield className="w-8 h-8 text-emerald-600" />}
              title="Get Support"
              description="AI chatbot provides immediate help while your doctor responds."
            />
          </div>
        </div>
      </section>

      {/* Patient & Doctor Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Built for <span className="text-gradient-teal">Everyone</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Whether you're a patient seeking support or a doctor monitoring your patients, 
              BE.Fine has you covered.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <RoleCard
              icon={<Heart className="w-10 h-10 text-teal-600" />}
              title="For Patients"
              features={[
                "Real-time vitals monitoring from smartwatch",
                "Instant crisis alerts to your doctor",
                "AI chatbot for immediate support",
                "Medication reminders & tracking",
                "Secure chat with your psychiatrist",
                "Personal health analytics & insights",
              ]}
              color="teal"
            />
            <RoleCard
              icon={<Stethoscope className="w-10 h-10 text-purple-600" />}
              title="For Doctors"
              features={[
                "Real-time patient vitals dashboard",
                "Instant crisis notifications",
                "Patient history & analytics",
                "Secure messaging with patients",
                "Medication oversight & compliance",
                "Emergency response coordination",
              ]}
              color="purple"
            />
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-20 bg-gradient-to-b from-teal-900 via-teal-800 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-teal-300 font-semibold text-sm uppercase tracking-wider">Security</span>
              <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-6">
                Your Data is <span className="text-teal-300">Sacred</span>
              </h2>
              <p className="text-white/80 mb-8 leading-relaxed">
                We understand the sensitivity of mental health data. BE.Fine implements 
                enterprise-grade security measures to protect your information.
              </p>
              <div className="space-y-4">
                <SecurityFeature
                  icon={<Lock className="w-5 h-5 text-teal-300" />}
                  title="End-to-End Encryption"
                  description="All communications between patient and doctor are fully encrypted."
                />
                <SecurityFeature
                  icon={<Shield className="w-5 h-5 text-teal-300" />}
                  title="HIPAA Compliant"
                  description="Our platform adheres to strict medical data protection standards."
                />
                <SecurityFeature
                  icon={<Activity className="w-5 h-5 text-teal-300" />}
                  title="Audit Logging"
                  description="Complete transparency with comprehensive activity logs."
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="text-4xl font-bold text-teal-300 mb-1">256-bit</div>
                <div className="text-sm text-white/60">AES Encryption</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="text-4xl font-bold text-teal-300 mb-1">99.9%</div>
                <div className="text-sm text-white/60">Uptime SLA</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="text-4xl font-bold text-teal-300 mb-1">GDPR</div>
                <div className="text-sm text-white/60">Compliant</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="text-4xl font-bold text-teal-300 mb-1">SOC2</div>
                <div className="text-sm text-white/60">Certified</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ready to Take Control of Your <span className="text-gradient-teal">Mental Health</span>?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of patients and doctors who trust BE.Fine for real-time 
            mental health monitoring and support.
          </p>
          <Button
            onClick={() => navigate("/login")}
            size="lg"
            className="bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 text-white rounded-full px-10 py-6 text-lg shadow-xl shadow-purple-500/25"
          >
            Get Started Free
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
          <p className="text-sm text-gray-400 mt-4">Free forever. No credit card required.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/logo-icon.png" alt="BE.Fine" className="w-8 h-8" />
                <span className="text-lg font-bold">BE.Fine</span>
              </div>
              <p className="text-gray-400 text-sm">
                AI-powered mental health monitoring and crisis prevention platform.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Features</li>
                <li>Smartwatch Sync</li>
                <li>Crisis Alerts</li>
                <li>AI Chatbot</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Doctors</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Patient Dashboard</li>
                <li>Real-time Alerts</li>
                <li>Analytics</li>
                <li>Secure Messaging</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>HIPAA Compliance</li>
                <li>Data Security</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              &copy; 2024 BE.Fine by XomaxX. All rights reserved.
            </p>
            <p className="text-sm text-gray-500">
              Made with care for mental health.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, gradient }: { icon: React.ReactNode; title: string; description: string; gradient: string }) {
  return (
    <div className={`bg-gradient-to-br ${gradient} rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
      <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

function StepCard({ number, icon, title, description }: { number: string; icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="text-center relative">
      <div className="text-6xl font-bold text-gray-100 absolute -top-4 left-1/2 -translate-x-1/2 -z-10">
        {number}
      </div>
      <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

function RoleCard({ icon, title, features, color }: { icon: React.ReactNode; title: string; features: string[]; color: string }) {
  const borderColor = color === "teal" ? "border-teal-200" : "border-purple-200";
  const bgGradient = color === "teal" ? "from-teal-50 to-white" : "from-purple-50 to-white";
  
  return (
    <div className={`bg-gradient-to-br ${bgGradient} rounded-2xl p-8 border ${borderColor}`}>
      <div className="mb-6">{icon}</div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      <ul className="space-y-3">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
            <div className={`w-5 h-5 rounded-full ${color === "teal" ? "bg-teal-100" : "bg-purple-100"} flex items-center justify-center flex-shrink-0 mt-0.5`}>
              <div className={`w-2 h-2 rounded-full ${color === "teal" ? "bg-teal-500" : "bg-purple-500"}`} />
            </div>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SecurityFeature({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold mb-1">{title}</h4>
        <p className="text-sm text-white/60">{description}</p>
      </div>
    </div>
  );
}

export default Home;

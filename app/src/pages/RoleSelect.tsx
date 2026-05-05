import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Heart, Stethoscope, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export default function RoleSelect() {
  const { user, refresh } = useAuth({ redirectOnUnauthenticated: false });
  const navigate = useNavigate();
  const [selected, setSelected] = useState<"patient" | "doctor" | null>(null);
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (selected && user) {
      setLoading(true);
      const { error } = await supabase
        .from('profiles')
        .update({ 
          role: selected,
          name: user.name || 'User',
          updated_at: new Date().toISOString()
        })
        .eq('id', (await supabase.auth.getUser()).data.user!.id);

      setLoading(false);
      if (error) {
        toast.error(error.message);
      } else {
        await refresh();
        if (selected === "patient") {
          navigate("/patient-dashboard");
        } else if (selected === "doctor") {
          navigate("/doctor-dashboard");
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        <div className="text-center mb-10">
          <img src="/logo-icon.png" alt="BE.Fine" className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to BE.Fine</h1>
          <p className="text-gray-600">Choose your role</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={() => setSelected("patient")}
            disabled={loading}
            className={`relative p-8 rounded-2xl border-2 transition-all duration-300 text-left ${
              selected === "patient"
                ? "border-teal-500 bg-teal-50 shadow-lg shadow-teal-500/10"
                : "border-gray-200 bg-white hover:border-teal-200 hover:shadow-md"
            }`}
          >
            {selected === "patient" && (
              <div className="absolute top-4 right-4 w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
            )}
            <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
              <Heart className="w-7 h-7 text-teal-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">I'm a Patient</h3>
            <p className="text-sm text-gray-600">
              Connect your smartwatch, monitor your vitals, and get instant support during crisis moments.
            </p>
          </button>

          <button
            onClick={() => setSelected("doctor")}
            disabled={loading}
            className={`relative p-8 rounded-2xl border-2 transition-all duration-300 text-left ${
              selected === "doctor"
                ? "border-purple-500 bg-purple-50 shadow-lg shadow-purple-500/10"
                : "border-gray-200 bg-white hover:border-purple-200 hover:shadow-md"
            }`}
          >
            {selected === "doctor" && (
              <div className="absolute top-4 right-4 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
            )}
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <Stethoscope className="w-7 h-7 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">I'm a Doctor</h3>
            <p className="text-sm text-gray-600">
              Monitor your patients in real-time, receive crisis alerts, and provide remote support.
            </p>
          </button>
        </div>

        <Button
          onClick={handleContinue}
          disabled={!selected || loading}
          className="w-full bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 text-white rounded-xl py-6 text-lg font-semibold shadow-xl disabled:opacity-50"
        >
          {loading ? "Saving..." : "Continue"}
        </Button>
      </div>
    </div>
  );
}


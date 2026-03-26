import { useState } from "react";
import { useAuthStore } from "../features/auth/authStore";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const { signIn } = useAuthStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleDemoLogin = async () => {
  setLoading(true);

  const demoEmail = "demo@user.com";
  const demoPassword = "123456";

  try {
    await signIn(demoEmail, demoPassword);
  } catch {
    await supabase.auth.signUp({
      email: demoEmail,
      password: demoPassword,
    });

    await signIn(demoEmail, demoPassword);
  }

     navigate("/dashboard");
     setLoading(false);
  };

  const handleLogin = async () => {
    setLoading(true);

    try {
      await signIn(email, password);
      navigate("/dashboard");
    } catch {
      const { error } = await supabase.auth.signUp({ email, password });

      if (!error) {
        await signIn(email, password);
        navigate("/dashboard");
      }
    }

    setLoading(false);
  };

  return (
    <div className="h-screen bg-[#020617] flex flex-col">
      
      <div className="h-14 relative border-b border-gray-800 flex items-center px-6">
      <h1 className="absolute left-1/2 -translate-x-1/2 text-white text-lg font-semibold">
      Frontend Observability Platform
      </h1>
      </div>

      {/* Main */}
      <div className="flex-1 flex">

        <div className="hidden md:flex w-1/2 flex-col justify-center px-16 bg-gradient-to-b from-[#020617] to-[#020617]">
          <h2 className="text-white text-5xl font-semibold leading-tight max-w-xl">
            Monitor your frontend
            <br />
            performance in real time
          </h2>

          <p className="text-gray-400 mt-5 text-base max-w-md">
            Track performance, detect errors, and stay ahead with actionable insights.
          </p>

          <div className="mt-10 space-y-2 text-sm text-gray-500">
            <p>• Real-time metrics</p>
            <p>• Alerts & monitoring</p>
            <p>• Role-based dashboards</p>
          </div>
          
        </div>

        {/* Login Card */}
        <div className="flex w-full md:w-1/2 items-center justify-center px-6">
          <div className="w-[380px] bg-[#0f172a]/80 backdrop-blur border border-gray-700 rounded-2xl p-8 shadow-2xl">
            
            <h2 className="text-white text-xl font-semibold text-center">
              Welcome back
            </h2>

            <p className="text-gray-400 text-center text-sm mt-1 mb-6">
              Sign in to continue
            </p>

            <input
              className="w-full mb-4 px-3 py-2.5 rounded-md bg-[#020617]/60 border border-gray-600 text-white text-sm focus:outline-none focus:border-indigo-500"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="w-full mb-4 px-3 py-2.5 rounded-md bg-[#020617]/60 border border-gray-600 text-white text-sm focus:outline-none focus:border-indigo-500"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 transition py-2.5 rounded-md text-sm font-medium shadow-md"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              New here? Just sign in — we’ll create your account.
            </p>
            <button
            onClick={handleDemoLogin}
            className="w-full mt-3 border border-gray-700 py-2 rounded-md text-sm text-gray-300 hover:bg-gray-800 transition"
            >
            Try Demo Account
            </button>
            <p className="text-xs text-gray-500 text-center mt-2">
            No signup needed — explore instantly
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
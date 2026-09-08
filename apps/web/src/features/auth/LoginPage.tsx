import { zodResolver } from "@hookform/resolvers/zod";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  CheckCircle2,
  AlertTriangle,
  TrendingDown,
  Zap,
  Pill,
  ShieldAlert,
  Upload,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { loginUser } from "@/api/auth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { FeatureCarousel } from "@/components/FeatureCarousel";
import { useAuthStore } from "@/store/authStore";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginPage() {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore((state) => state.login);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const from = (location.state as { from?: string })?.from ?? "/search";

  async function onSubmit(data: LoginFormData) {
    setError("");
    setLoading(true);
    try {
      const response = await loginUser(data);
      login(response.token, response.user);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Carousel features
  const carouselFeatures = [
    {
      icon: <Pill className="h-16 w-16 text-orange-500" strokeWidth={1.5} />,
      label: "Upload Prescription",
      description: "Snap or upload your prescription; OCR extracts drug names automatically.",
    },
    {
      icon: <Sparkles className="h-16 w-16 text-orange-500" strokeWidth={1.5} />,
      label: "AI Extraction",
      description: "Our pipeline identifies drugs, dosages, and quantities from the image.",
    },
    {
      icon: <TrendingDown className="h-16 w-16 text-orange-500" strokeWidth={1.5} />,
      label: "Compare Prices",
      description: "See real-time prices across pharmacies side by side, cheapest highlighted.",
    },
    {
      icon: <ShieldAlert className="h-16 w-16 text-orange-500" strokeWidth={1.5} />,
      label: "Order Safely",
      description: "Get RAG-based drug interaction warnings before you buy.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-50/50 to-amber-50">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left Column - Login Form */}
        <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16">
          <div className="w-full max-w-md mx-auto">
            {/* Logo */}
            <Link to="/" className="inline-flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity">
              <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-orange-500 text-white">
                <Pill className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <span className="text-2xl font-black text-ink">Medkart.ai</span>
            </Link>

            {/* Heading */}
            <div className="mb-8">
              <h1 className="text-3xl font-black text-ink mb-2">Welcome back</h1>
              <p className="text-slate-600">Sign in to compare medicine prices and save money.</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex gap-3">
                <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-ink mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    className="pl-12 border-slate-200 rounded-lg bg-white text-ink placeholder:text-slate-500"
                    {...form.register("email")}
                  />
                </div>
                {form.formState.errors.email && (
                  <p className="text-xs text-red-500 mt-1">{form.formState.errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-ink">Password</label>
                  <Link to="#" className="text-xs text-orange-600 hover:text-orange-700 font-medium">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
                  <Input
                    type={show ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-12 pr-12 border-slate-200 rounded-lg bg-white text-ink placeholder:text-slate-500"
                    {...form.register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {form.formState.errors.password && (
                  <p className="text-xs text-red-500 mt-1">{form.formState.errors.password.message}</p>
                )}
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500"
                />
                <label htmlFor="remember" className="text-sm text-slate-600">
                  Remember me
                </label>
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold h-12 rounded-lg transition-colors"
              >
                {loading ? (
                  <>
                    <span className="inline-block animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In <ArrowRight className="ml-2 h-4 w-4 inline" />
                  </>
                )}
              </Button>
            </form>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-slate-600 mt-6">
              Don't have an account?{" "}
              <Link to="/register" className="text-orange-600 font-semibold hover:text-orange-700">
                Create one free
              </Link>
            </p>

            {/* Demo Note */}
            <p className="text-center text-xs text-slate-500 mt-4 pt-4 border-t border-slate-200">
              Demo: Use any email to test login
            </p>
          </div>
        </div>

        {/* Right Column - Carousel (Hidden on small screens) */}
        <div className="hidden lg:flex flex-col justify-center items-center px-12 py-16 bg-gradient-to-br from-white/40 via-orange-50/30 to-amber-50/20">
          <div className="max-w-sm w-full space-y-8">
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-orange-500 text-white mx-auto mb-4">
                <Pill className="h-8 w-8" strokeWidth={1.5} />
              </div>
              <h2 className="text-3xl font-black text-ink">Medkart.ai</h2>
              <p className="text-lg font-semibold text-orange-600">AI-Powered Medicine Price Comparison</p>
              <p className="text-sm text-slate-600 italic">Compare prices across every major pharmacy in seconds.</p>
            </div>

            {/* Feature Carousel */}
            <FeatureCarousel features={carouselFeatures} autoRotate={true} />

            {/* Trust Badge */}
            <div className="text-center pt-4 border-t border-orange-200/50">
              <div className="flex items-center justify-center gap-2 text-xs text-slate-600">
                <CheckCircle2 className="h-4 w-4 text-orange-500" />
                <span>Trusted by thousands of patients</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

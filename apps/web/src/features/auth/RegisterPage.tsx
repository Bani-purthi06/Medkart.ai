import { zodResolver } from "@hookform/resolvers/zod";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  CheckCircle2,
  Phone,
  User,
  Pill,
  Sparkles,
  TrendingDown,
  ShieldAlert,
  Upload,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { registerUser } from "@/api/auth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { FeatureCarousel } from "@/components/FeatureCarousel";
import { useAuthStore } from "@/store/authStore";

const registerSchema = z
  .object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email"),
    phone: z.string().min(8, "Phone must be at least 8 digits"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirm: z.string().min(6, "Please confirm your password"),
    terms: z.literal(true, {
      errorMap: () => ({ message: "You must agree to the terms" }),
    }),
  })
  .refine((data) => data.password === data.confirm, {
    path: ["confirm"],
    message: "Passwords don't match",
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterPage() {
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore((state) => state.login);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  async function onSubmit(data: RegisterFormData) {
    setError("");
    setLoading(true);
    try {
      const response = await registerUser({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        password: data.password,
      });
      login(response.token, response.user);
      const from = (location.state as { from?: string } | null)?.from ?? "/search";
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed. Please try again.");
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
        {/* Left Column - Registration Form */}
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
              <h1 className="text-3xl font-black text-ink mb-2">Create your Medkart account</h1>
              <p className="text-slate-600">Track prices, prescriptions, alerts, and safety checks.</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-ink mb-2">Full name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
                  <Input
                    type="text"
                    placeholder="John Doe"
                    className="pl-12 border-slate-200 rounded-lg bg-white text-ink placeholder:text-slate-500"
                    {...form.register("fullName")}
                  />
                </div>
                {form.formState.errors.fullName && (
                  <p className="text-xs text-red-500 mt-1">{form.formState.errors.fullName.message}</p>
                )}
              </div>

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

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-ink mb-2">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
                  <Input
                    type="tel"
                    placeholder="+91 9876543210"
                    className="pl-12 border-slate-200 rounded-lg bg-white text-ink placeholder:text-slate-500"
                    {...form.register("phone")}
                  />
                </div>
                {form.formState.errors.phone && (
                  <p className="text-xs text-red-500 mt-1">{form.formState.errors.phone.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-ink mb-2">Password</label>
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

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-ink mb-2">Confirm password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
                  <Input
                    type={showConfirm ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-12 pr-12 border-slate-200 rounded-lg bg-white text-ink placeholder:text-slate-500"
                    {...form.register("confirm")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {form.formState.errors.confirm && (
                  <p className="text-xs text-red-500 mt-1">{form.formState.errors.confirm.message}</p>
                )}
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-start gap-2 pt-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500 mt-1"
                  {...form.register("terms")}
                />
                <label htmlFor="terms" className="text-sm text-slate-600">
                  I agree to the <Link to="#" className="text-orange-600 hover:text-orange-700 font-medium">terms and conditions</Link>
                </label>
              </div>
              {form.formState.errors.terms && (
                <p className="text-xs text-red-500">{form.formState.errors.terms.message}</p>
              )}

              {/* Create Account Button */}
              <Button
                type="submit"
                disabled={loading || !form.formState.isValid}
                className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold h-12 rounded-lg transition-colors"
              >
                {loading ? (
                  <>
                    <span className="inline-block animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create account
                  </>
                )}
              </Button>
            </form>

            {/* Sign In Link */}
            <p className="text-center text-sm text-slate-600 mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-orange-600 font-semibold hover:text-orange-700">
                Sign in
              </Link>
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
              <p className="text-sm text-slate-600 italic">Join thousands of patients saving money on medicines.</p>
            </div>

            {/* Feature Carousel */}
            <FeatureCarousel features={carouselFeatures} autoRotate={true} />

            {/* Trust Badge */}
            <div className="text-center pt-4 border-t border-orange-200/50">
              <div className="flex items-center justify-center gap-2 text-xs text-slate-600">
                <CheckCircle2 className="h-4 w-4 text-orange-500" />
                <span>Free account · No credit card required</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

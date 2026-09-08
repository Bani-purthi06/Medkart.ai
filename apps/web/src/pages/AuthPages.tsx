import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Eye, EyeOff, Lock, Mail, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { loginUser, loginWithGoogle, registerUser } from "@/api/auth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Spinner } from "@/components/ui/Spinner";
import { useAuthStore } from "@/store/authStore";

const loginSchema = z.object({ email: z.string().email(), password: z.string().min(6) });
const registerSchema = loginSchema
  .extend({ fullName: z.string().min(2), phone: z.string().min(8), confirm: z.string().min(6), terms: z.literal(true) })
  .refine((data) => data.password === data.confirm, { path: ["confirm"], message: "Passwords must match" });

function AuthShell({ children, mode }: { children: React.ReactNode; mode: "login" | "register" }) {
  return (
    <main className="min-h-screen bg-black px-4 py-8 text-white sm:px-6 lg:grid lg:place-items-center">
      <div className="absolute right-6 top-6 grid size-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white/80">
        <Sparkles className="size-5" />
      </div>
      <section className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-[1.4rem] border border-white/10 bg-[#0c0c0d] shadow-[0_26px_80px_rgba(0,0,0,0.45)] lg:min-h-[720px] lg:grid-cols-[1.08fr_0.92fr]">
        <div className="relative hidden overflow-hidden p-8 md:block lg:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_10%,rgba(28,163,119,0.34),transparent_35%),radial-gradient(circle_at_16%_95%,rgba(35,120,200,0.30),transparent_34%)]" />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/20 to-black" />
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                <ShieldCheck className="size-4" />
                Verified medicine savings
              </span>
              <h1 className="mt-12 max-w-lg text-5xl font-black leading-[1.05] text-white lg:text-6xl">
                Every medicine price, checked before checkout.
              </h1>
              <p className="mt-5 max-w-lg text-base leading-7 text-white/72">
                Compare trusted pharmacy prices, review prescription safety, and track target prices without digging through tabs.
              </p>
            </div>
            <div className="relative h-72">
              <img
                className="absolute bottom-0 left-0 h-56 w-44 rounded-xl object-cover shadow-2xl"
                src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=520&q=80"
                alt="Medicine bottles on a pharmacy counter"
              />
              <img
                className="absolute bottom-9 left-44 h-64 w-44 rounded-xl object-cover shadow-2xl"
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=520&q=80"
                alt="Patient using a healthcare app"
              />
              <img
                className="absolute bottom-0 left-[22rem] h-56 w-44 rounded-xl object-cover shadow-2xl"
                src="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=520&q=80"
                alt="Prescription and tablets"
              />
            </div>
          </div>
        </div>
        <div className="grid place-items-center p-6 sm:p-10 lg:p-12">
          <div className="w-full max-w-md">
            <div className="mb-10 text-center">
              <Link to="/" className="focus-ring mx-auto mb-8 inline-flex items-center gap-2 rounded-md text-2xl font-black text-white">
                <span className="grid size-9 place-items-center rounded-lg bg-mint text-white">
                  <ShieldCheck className="size-5" />
                </span>
                Medkart.ai
              </Link>
              <h2 className="text-2xl font-black">{mode === "login" ? "Sign in to compare smarter" : "Create your Medkart account"}</h2>
              <p className="mt-3 text-sm text-white/58">
                {mode === "login" ? "Use Google auth or your email to continue." : "Track prices, prescriptions, alerts, and safety checks."}
              </p>
            </div>
            {children}
          </div>
        </div>
      </section>
    </main>
  );
}

function FieldIcon({ children }: { children: React.ReactNode }) {
  return <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/42">{children}</span>;
}

const darkInput =
  "min-h-14 rounded-lg border-white/12 bg-white/[0.075] pl-12 text-white placeholder:text-white/40 focus-visible:outline-blue-500 dark:border-white/12 dark:bg-white/[0.075]";

export function LoginPage() {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore((state) => state.login);
  const form = useForm<z.infer<typeof loginSchema>>({ resolver: zodResolver(loginSchema), mode: "onChange" });
  const from = (location.state as { from?: string })?.from ?? "/";

  async function handleGoogle() {
    setGoogleLoading(true);
    const result = await loginWithGoogle();
    login(result.token, result.user);
    navigate(from);
  }

  return (
    <AuthShell mode="login">
      <div className="grid gap-5">
        <Button
          variant="secondary"
          className="min-h-14 border border-white/15 bg-transparent text-white ring-0 hover:bg-white/8 dark:bg-transparent dark:text-white dark:ring-0"
          onClick={handleGoogle}
          disabled={googleLoading}
          icon={googleLoading ? <Spinner /> : <span className="text-lg font-black text-[#4285F4]">G</span>}
        >
          Continue with Google
        </Button>
        <div className="flex items-center gap-4 text-xs font-semibold uppercase text-white/52">
          <span className="h-px flex-1 bg-white/22" />
          OR
          <span className="h-px flex-1 bg-white/22" />
        </div>
        {error && <p className="rounded-md border border-coral/25 bg-coral/10 p-3 text-sm text-coral">{error}</p>}
        <form
          className="grid gap-4"
          onSubmit={form.handleSubmit(async (values) => {
            try {
              const result = await loginUser(values);
              login(result.token, result.user);
              navigate(from);
            } catch (err) {
              setError(err instanceof Error ? err.message : "Incorrect email or password");
            }
          })}
        >
          <label className="grid gap-2 text-sm font-semibold text-white/72">
            <span className="sr-only">Email</span>
            <div className="relative">
              <FieldIcon><Mail className="size-5" /></FieldIcon>
              <Input placeholder="Email address" {...form.register("email")} className={darkInput} />
            </div>
            {form.formState.errors.email && <span className="text-coral">{form.formState.errors.email.message}</span>}
          </label>
          <label className="grid gap-2 text-sm font-semibold text-white/72">
            <span className="sr-only">Password</span>
            <div className="relative">
              <FieldIcon><Lock className="size-5" /></FieldIcon>
              <Input type={show ? "text" : "password"} placeholder="Password" {...form.register("password")} className={`${darkInput} pr-12`} />
              <button type="button" className="focus-ring absolute right-4 top-1/2 -translate-y-1/2 rounded p-1 text-white/48" aria-label="Toggle password visibility" onClick={() => setShow(!show)}>
                {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </label>
          <Button className="min-h-14 bg-[#2f80ff] hover:bg-[#2872e5]" disabled={!form.formState.isValid || form.formState.isSubmitting} icon={form.formState.isSubmitting ? <Spinner /> : undefined}>
            Sign in <ArrowRight className="size-4" />
          </Button>
        </form>
        <a className="mx-auto text-sm font-semibold text-[#2f80ff]" href="#">Forgot password?</a>
        <p className="pt-5 text-center text-sm text-white">
          New to Medkart.ai? <Link className="font-bold text-[#2f80ff]" to="/register">Create an account</Link>
        </p>
        <p className="text-center text-xs text-white/48">Frontend demo. Google authentication is simulated locally.</p>
      </div>
    </AuthShell>
  );
}

export function RegisterPage() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const form = useForm<z.infer<typeof registerSchema>>({ resolver: zodResolver(registerSchema), mode: "onChange" });
  const field = (name: keyof z.infer<typeof registerSchema>, label: string, type = "text") => (
    <label className="grid gap-2 text-sm font-semibold text-white/72">
      <span>{label}</span>
      <Input type={type} {...form.register(name)} className="min-h-12 rounded-lg border-white/12 bg-white/[0.075] text-white placeholder:text-white/40 dark:border-white/12 dark:bg-white/[0.075]" />
      {form.formState.errors[name] && <span className="text-sm text-coral">{String(form.formState.errors[name]?.message)}</span>}
    </label>
  );
  return (
    <AuthShell mode="register">
        <form className="mt-5 grid gap-4" onSubmit={form.handleSubmit(async ({ confirm, terms, ...values }) => {
          void confirm;
          void terms;
          const result = await registerUser(values);
          login(result.token, result.user);
          navigate("/");
        })}>
          {field("fullName", "Full name")}
          {field("email", "Email", "email")}
          {field("phone", "Phone")}
          <label className="grid gap-2 text-sm font-semibold text-white/72">
            Password
            <div className="relative">
              <Input type={show ? "text" : "password"} {...form.register("password")} className="min-h-12 rounded-lg border-white/12 bg-white/[0.075] text-white dark:border-white/12 dark:bg-white/[0.075]" />
              <button type="button" className="focus-ring absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-white/48" aria-label="Toggle password visibility" onClick={() => setShow(!show)}>
                {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </label>
          {field("confirm", "Confirm password", "password")}
          <label className="flex gap-2 text-sm text-white/70"><input type="checkbox" {...form.register("terms")} /> I agree to the terms</label>
          <Button className="min-h-13 bg-[#2f80ff] hover:bg-[#2872e5]" disabled={!form.formState.isValid || form.formState.isSubmitting} icon={form.formState.isSubmitting ? <Spinner /> : undefined}>Create account</Button>
        </form>
        <p className="mt-5 text-center text-sm text-white/65">Already have an account? <Link className="font-semibold text-[#2f80ff]" to="/login">Login</Link></p>
    </AuthShell>
  );
}

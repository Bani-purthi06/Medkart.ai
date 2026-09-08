import { useQuery } from "@tanstack/react-query";
import { Plus, Play } from "lucide-react";
import { getAdminDashboard, getCatalog, getScrapers, getUsers } from "@/api/admin";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { PageContainer } from "@/components/layout/PageContainer";
import { AnalyticsDashboard } from "@/components/admin/AnalyticsDashboard";
import { AnomalyMonitorPanel } from "@/components/admin/AnomalyMonitorPanel";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Skeleton } from "@/components/ui/Skeleton";
import { Table } from "@/components/ui/Table";
import { useUiStore } from "@/store/uiStore";

function AdminShell({ children }: { children: React.ReactNode }) {
  return <PageContainer><div className="md:flex md:gap-6"><AdminSidebar /><div className="min-w-0 flex-1">{children}</div></div></PageContainer>;
}

export function AdminDashboardPage() {
  const { data, isLoading } = useQuery({ queryKey: ["admin-dashboard"], queryFn: getAdminDashboard });
  return (
    <AdminShell>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">Operations center</p><h1 className="mb-5 mt-2 text-3xl font-black text-ink">Admin dashboard</h1>
      {isLoading || !data ? <Skeleton className="h-96" /> : (
        <div className="grid gap-5">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{data.kpis.map((kpi) => <Card key={kpi.label} className="p-5"><p className="text-sm text-slate-500">{kpi.label}</p><strong className="mt-2 block text-3xl text-ink dark:text-white">{kpi.value}</strong></Card>)}</div>
          <AnalyticsDashboard />
          <AnomalyMonitorPanel anomalies={data.anomalies} />
        </div>
      )}
    </AdminShell>
  );
}

export function AdminCatalogPage() {
  const { data = [] } = useQuery({ queryKey: ["catalog"], queryFn: getCatalog });
  const addToast = useUiStore((state) => state.addToast);
  return (
    <AdminShell>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">Medicine intelligence</p><h1 className="mt-2 text-3xl font-black text-ink">Catalog</h1></div><Button icon={<Plus className="size-4" />} onClick={() => addToast({ tone: "info", message: "Medicine modal opened" })}>Add medicine</Button></div>
      <Input placeholder="Search catalog" className="mb-4" />
      <Card className="p-2"><Table><thead><tr className="border-b text-xs uppercase text-slate-500"><th className="px-4 py-3">Name</th><th className="px-4 py-3">Brand</th><th className="px-4 py-3">Form</th><th className="px-4 py-3">Manufacturer</th><th className="px-4 py-3">Salts</th></tr></thead><tbody>{data.map((m) => <tr key={m.id} className="border-b border-slate-100"><td className="px-4 py-4 font-semibold">{m.medicineName}</td><td className="px-4 py-4">{m.brandName}</td><td className="px-4 py-4">{m.dosageForm}</td><td className="px-4 py-4">{m.manufacturer}</td><td className="px-4 py-4">{m.salts.map((s) => s.saltName).join(", ")}</td></tr>)}</tbody></Table></Card>
    </AdminShell>
  );
}

export function AdminUsersPage() {
  const { data = [] } = useQuery({ queryKey: ["users"], queryFn: getUsers });
  const addToast = useUiStore((state) => state.addToast);
  return (
    <AdminShell>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">Access management</p><h1 className="mb-5 mt-2 text-3xl font-black text-ink">Users</h1>
      <Input placeholder="Search by name or email" className="mb-4" />
      <Card className="p-2"><Table><thead><tr className="border-b text-xs uppercase text-slate-500"><th className="px-4 py-3">Name</th><th className="px-4 py-3">Email</th><th className="px-4 py-3">Phone</th><th className="px-4 py-3">Signup</th><th className="px-4 py-3">Watchlist</th><th className="px-4 py-3">Action</th></tr></thead><tbody>{data.map((u) => <tr key={u.id} className="border-b border-slate-100"><td className="px-4 py-4 font-semibold">{u.fullName}</td><td className="px-4 py-4">{u.email}</td><td className="px-4 py-4">{u.phone}</td><td className="px-4 py-4">{u.signupDate}</td><td className="px-4 py-4">{u.watchlistCount}</td><td className="px-4 py-4"><Button variant="secondary" onClick={() => addToast({ tone: "info", message: u.active ? "Deactivate confirmation opened" : "Reactivate confirmation opened" })}>{u.active ? "Deactivate" : "Reactivate"}</Button></td></tr>)}</tbody></Table></Card>
    </AdminShell>
  );
}

export function AdminScrapersPage() {
  const { data = [] } = useQuery({ queryKey: ["scrapers"], queryFn: getScrapers });
  const addToast = useUiStore((state) => state.addToast);
  return (
    <AdminShell>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">Data sources</p><h1 className="mt-2 text-3xl font-black text-ink">Scraper config</h1></div><Button icon={<Plus className="size-4" />}>Add platform</Button></div>
      <div className="grid gap-4">{data.map((platform) => <Card key={platform.id} className="grid gap-4 p-5 lg:grid-cols-[1fr_1fr_auto]"><div><h2 className="font-bold text-ink dark:text-white">{platform.platformName}</h2><p className="text-sm text-slate-500">{platform.baseUrl}</p></div><div className="grid grid-cols-2 gap-2 text-sm"><span>Type: {platform.scrapeType}</span><span>Schedule: {platform.frequency}</span><span>Last: {platform.lastSuccess}</span><span>Next: {platform.nextRun}</span>{platform.lastError && <span className="col-span-2 text-coral">{platform.lastError}</span>}</div><Button variant="secondary" icon={<Play className={`size-4 ${platform.status === "running" ? "animate-pulse text-mint" : ""}`} />} onClick={() => addToast({ tone: "success", message: `${platform.platformName} scrape started` })}>Run now</Button></Card>)}</div>
    </AdminShell>
  );
}

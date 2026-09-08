import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { useAuthStore } from "@/store/authStore";
import { useUiStore } from "@/store/uiStore";

export function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const addToast = useUiStore((state) => state.addToast);
  const navigate = useNavigate();
  return (
    <PageContainer narrow>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">Your workspace</p><h1 className="mb-5 mt-2 text-3xl font-black text-ink">Profile</h1>
      <div className="grid gap-4">
        <Card className="grid gap-4 p-5">
          <h2 className="font-bold text-ink">Account details</h2>
          <Input defaultValue={user?.fullName ?? ""} aria-label="Full name" />
          <Input defaultValue={user?.email ?? ""} aria-label="Email" />
          <Input defaultValue="+91 98765 43210" aria-label="Phone" />
          <Button className="w-fit" onClick={() => addToast({ tone: "success", message: "Profile saved" })}>Save profile</Button>
        </Card>
        <Card className="grid gap-4 p-5">
          <h2 className="font-bold text-ink">Change password</h2>
          <Input type="password" placeholder="Current password" aria-label="Current password" />
          <Input type="password" placeholder="New password" aria-label="New password" />
          <Button className="w-fit" onClick={() => addToast({ tone: "success", message: "Password updated" })}>Update password</Button>
        </Card>
        <Card className="grid gap-3 p-5">
          <h2 className="font-bold text-ink">Notification preferences</h2>
          {["Push", "Email", "SMS"].map((channel) => <label key={channel} className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked={channel !== "SMS"} /> {channel}</label>)}
          <Button className="w-fit" onClick={() => addToast({ tone: "success", message: "Preferences saved" })}>Save preferences</Button>
        </Card>
        <Card className="border-red-200 bg-red-50/40 p-5">
          <Button variant="danger" icon={<LogOut className="size-4" />} onClick={() => { logout(); navigate("/"); }}>Logout</Button>
        </Card>
      </div>
    </PageContainer>
  );
}

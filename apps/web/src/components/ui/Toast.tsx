import { X } from "lucide-react";
import { useEffect } from "react";
import { useUiStore } from "@/store/uiStore";
import { cn } from "@/utils/cn";

export function ToastHost() {
  const toasts = useUiStore((state) => state.toasts);
  const removeToast = useUiStore((state) => state.removeToast);

  useEffect(() => {
    const timers = toasts.map((toast) => window.setTimeout(() => removeToast(toast.id), 3500));
    return () => timers.forEach(window.clearTimeout);
  }, [toasts, removeToast]);

  return (
    <div className="fixed bottom-4 right-4 z-50 grid w-[calc(100vw-2rem)] gap-2 sm:w-96">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "flex items-center justify-between rounded-md border bg-white p-3 text-sm shadow-soft dark:bg-slate-900",
            toast.tone === "success" && "border-mint/30 text-mint",
            toast.tone === "error" && "border-coral/30 text-coral",
            toast.tone === "info" && "border-sky/30 text-sky",
          )}
          role="status"
        >
          <span>{toast.message}</span>
          <button className="focus-ring rounded p-1" aria-label="Dismiss toast" onClick={() => removeToast(toast.id)}>
            <X className="size-4" />
          </button>
        </div>
      ))}
    </div>
  );
}

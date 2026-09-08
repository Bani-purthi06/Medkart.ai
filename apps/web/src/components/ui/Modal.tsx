import { X } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "./Button";

interface ModalProps {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

export function Modal({ open, title, children, onClose }: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-ink/40 p-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-lg rounded-lg bg-white p-5 shadow-soft dark:bg-slate-950">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-ink dark:text-white">{title}</h2>
          <Button variant="ghost" className="size-9 px-0" aria-label="Close modal" onClick={onClose}>
            <X className="size-4" />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
}

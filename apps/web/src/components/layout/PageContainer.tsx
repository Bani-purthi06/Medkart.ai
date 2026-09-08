import type { ReactNode } from "react";

export function PageContainer({ children, narrow = false }: { children: ReactNode; narrow?: boolean }) {
  return <main className={narrow ? "mx-auto w-full max-w-4xl px-4 py-6 sm:px-6" : "mx-auto w-full max-w-7xl px-4 py-6 sm:px-6"}>{children}</main>;
}

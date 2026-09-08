import type { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

export function Table({ className, ...props }: HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="overflow-x-auto">
      <table className={cn("w-full min-w-[680px] text-left text-sm", className)} {...props} />
    </div>
  );
}

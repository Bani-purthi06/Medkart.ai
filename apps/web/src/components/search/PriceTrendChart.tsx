import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { PricePoint } from "@/types";
import { Card } from "@/components/ui/Card";
import { Tabs } from "@/components/ui/Tabs";

const colors = ["#15A377", "#2378C8", "#F15B5B", "#E9A23B"];

export function PriceTrendChart({ data }: { data: PricePoint[] }) {
  const [range, setRange] = useState<"30" | "90">("30");
  const [hidden, setHidden] = useState<string[]>([]);
  const platforms = useMemo(() => Object.keys(data[0] ?? {}).filter((key) => key !== "date"), [data]);

  if (!data.length) {
    return (
      <Card className="grid min-h-72 place-items-center p-6 text-center">
        <div>
          <h3 className="font-bold text-ink dark:text-white">No price history yet</h3>
          <p className="mt-1 text-sm text-slate-500">We haven't tracked this medicine's price history yet.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-bold text-ink dark:text-white">Price trend</h3>
        <Tabs value={range} onChange={setRange} options={[{ label: "30 days", value: "30" }, { label: "90 days", value: "90" }]} />
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend
              onClick={(entry) =>
                setHidden((current) =>
                  current.includes(String(entry.value))
                    ? current.filter((item) => item !== entry.value)
                    : [...current, String(entry.value)],
                )
              }
            />
            {platforms.map((platform, index) => (
              <Line
                key={platform}
                type="monotone"
                dataKey={platform}
                stroke={colors[index % colors.length]}
                strokeWidth={3}
                hide={hidden.includes(platform)}
                dot={{ r: 3 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

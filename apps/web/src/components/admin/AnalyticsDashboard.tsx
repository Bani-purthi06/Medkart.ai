import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "@/components/ui/Card";

const searchTrend = [
  { day: "Mon", searches: 1200 },
  { day: "Tue", searches: 1560 },
  { day: "Wed", searches: 1780 },
  { day: "Thu", searches: 1490 },
  { day: "Fri", searches: 2050 },
];

const compared = [
  { name: "Dolo", count: 420 },
  { name: "Azithral", count: 310 },
  { name: "Telma", count: 260 },
  { name: "Pantocid", count: 230 },
];

export function AnalyticsDashboard() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card className="p-4">
        <h3 className="mb-4 font-bold text-ink dark:text-white">Search volume</h3>
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={searchTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="searches" stroke="#15A377" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <Card className="p-4">
        <h3 className="mb-4 font-bold text-ink dark:text-white">Most compared</h3>
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={compared}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#2378C8" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}

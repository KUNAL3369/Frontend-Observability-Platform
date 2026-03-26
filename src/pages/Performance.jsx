import Layout from "../components/layout/Layout";
import { useMetricsStore } from "../features/metrics/components/metricsStore";

export default function Performance() {
  const history = useMetricsStore((s) => s.history);

  if (history.length === 0) {
    return (
      <Layout>
        <p className="text-gray-400 p-6">No data available</p>
      </Layout>
    );
  }

  const avg = (key) =>
    (
      history.reduce((sum, h) => sum + h[key], 0) / history.length
    ).toFixed(2);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-xl text-white">Performance</h1>

        <div className="grid grid-cols-3 gap-4">
          <Card title="Avg Page Load" value={`${avg("pageLoadTime")} ms`} />
          <Card title="Avg API Latency" value={`${avg("apiLatency")} ms`} />
          <Card title="Avg Error Rate" value={`${avg("errorRate")} %`} />
        </div>

        <div className="bg-[#020617] border border-gray-800 p-4 rounded-xl">
          <p className="text-gray-400 text-sm">
            Showing average metrics based on recent activity.
          </p>
        </div>
      </div>
    </Layout>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-[#020617] border border-gray-800 p-4 rounded-xl">
      <p className="text-gray-400 text-sm">{title}</p>
      <p className="text-white text-lg font-semibold mt-1">{value}</p>
    </div>
  );
}
import Layout from "../components/layout/Layout";
import { useAlertsStore } from "../features/alerts/alertsStore";

export default function Errors() {
  const { alerts } = useAlertsStore();

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-xl text-white">Errors</h1>

        {alerts.length === 0 && (
          <p className="text-gray-400">No errors detected</p>
        )}

        <div className="space-y-3">
          {alerts.map((a) => (
            <div
              key={a.id}
              className="bg-[#020617] border border-gray-800 p-3 rounded"
            >
              <p className="text-red-400 text-sm">{a.message}</p>
              <p className="text-xs text-gray-500">
                {a.value} • {a.time}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
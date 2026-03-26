import { useAlertsStore } from "../alertsStore";
import { useAuthStore } from "../../auth/authStore";

export default function AlertPanel() {
  const { alerts, clearAlerts } = useAlertsStore();
  const { role } = useAuthStore();

  return (
    <div className="w-72 p-3 bg-[#020617]  shadow-lg">
      
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-200">Alerts</h3>

        <button
          onClick={clearAlerts}
          disabled={role === "analyst"}
          className="text-xs text-blue-400 hover:text-blue-300 disabled:opacity-40"
        >
          Clear
        </button>
      </div>

      {alerts.length === 0 && (
        <p className="text-xs text-gray-500">No alerts</p>
      )}

      <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-3 rounded border-nonetransition ${
              alert.type === "error"
                ? "border-red-500 bg-red-900/20 hover:bg-red-900/30"
                : "border-yellow-500 bg-yellow-900/20 hover:bg-yellow-900/30"
            }`}
          >
            <p
              className={`text-sm font-medium ${
                alert.type === "error"
                  ? "text-red-400"
                  : "text-yellow-300"
              }`}
            >
              {alert.message}
            </p>

            <p className="text-xs text-gray-400 mt-1">
              {alert.value} • {alert.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
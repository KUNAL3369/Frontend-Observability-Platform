import { useState } from "react";
import { useFilterStore } from "../../features/filters/filterStore";
import { useAlertsStore } from "../../features/alerts/alertsStore";
import { useAuthStore } from "../../features/auth/authStore";
import AlertPanel from "../../features/alerts/components/AlertPanel";

export default function Topbar() {
  const { dateRange, device, setDateRange, setDevice } = useFilterStore();
  const { alerts } = useAlertsStore();
  const { role, setRole } = useAuthStore();
  const [open, setOpen] = useState(false);

  return (
    <div className="h-14 border-b border-gray-800 flex items-center justify-between px-6 bg-[#0f172a]">
      <div className="flex gap-3">
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="bg-[#020617] border border-gray-700 rounded px-2 py-1 text-sm"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
        </select>

        <select
          value={device}
          onChange={(e) => setDevice(e.target.value)}
          className="bg-[#020617] border border-gray-700 rounded px-2 py-1 text-sm"
        >
          <option value="all">All Devices</option>
          <option value="mobile">Mobile</option>
          <option value="desktop">Desktop</option>
        </select>
      </div>

      <div className="flex items-center gap-4">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="bg-[#020617] border border-gray-700 rounded px-2 py-1 text-sm"
        >
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="analyst">Analyst</option>
        </select>

        <div className="relative">
          <div onClick={() => setOpen(!open)} className="cursor-pointer">
            🔔
            {alerts.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                {alerts.length}
              </span>
            )}
          </div>

          {open && (
            <div className="absolute right-0 mt-2 bg-white border rounded shadow w-72">
              <AlertPanel />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
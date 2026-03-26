import { useEffect, useState, useRef } from "react";
import MetricCard from "../features/metrics/components/MetricCard";
import Layout from "../components/layout/Layout";
import { useFilterStore } from "../features/filters/filterStore";
import { useAlertsStore } from "../features/alerts/alertsStore";
import { useAuthStore } from "../features/auth/authStore";
import Button from "../components/ui/Button";
import { useMetricsStore } from "../features/metrics/components/metricsStore";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

export default function Dashboard() {
  const { dateRange, device } = useFilterStore();
  const { addAlert } = useAlertsStore();
  const { role } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const setGlobalHistory = useMetricsStore((s) => s.setHistory);
  
  const [metrics, setMetrics] = useState({
    pageLoadTime: 2400,
    apiLatency: 820,
    errorRate: 2.1,
  });

  const [history, setHistory] = useState([]);

  const handleExport = () => {
  const data = {
    metrics,
    history,
    dateRange,
    device,
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });

  
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
    a.href = url;
    a.download = "metrics.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const lastAlertRef = useRef({
    error: 0,
    performance: 0,
  });

  useEffect(() => {
    const intervalTime = dateRange === "7d" ? 2000 : 1000;
    const interval = setInterval(() => {
      setMetrics((prev) => {
        const variation = dateRange === "7d" ? 150 : 400;

        let deviceMultiplier = 1;
        if (device === "mobile") deviceMultiplier = 1.3;
        if (device === "desktop") deviceMultiplier = 0.9;

        const updated = {
          pageLoadTime: Math.round(
            Math.min(5000, Math.max(500,
              prev.pageLoadTime +
              Math.floor(Math.random() * variation - variation / 2)
              ) 
            )*deviceMultiplier
         ),

          apiLatency: Math.round(
            Math.min(2000, Math.max(200,
            prev.apiLatency +
              Math.floor(Math.random() * (variation / 2) - variation / 4))) *
            deviceMultiplier
          ),

          errorRate: Number(
            Math.max(
              0,
              prev.errorRate + Math.random() * 0.5 - 0.25
            ).toFixed(2)
          ),
        };

      const now = Date.now();

      // RBAC
      if (role !== "analyst") {
        if (
          updated.errorRate > 2.5 &&
          now - lastAlertRef.current.error > 8000
        ) {
          addAlert({
            id: now,
            type: "error",
            message: "High error rate detected",
            value: updated.errorRate,
            time: new Date().toLocaleTimeString(),
          });

          lastAlertRef.current.error = now;
        }

        if (
          updated.pageLoadTime > 2500 &&
          now - lastAlertRef.current.performance > 8000
        ) {
          addAlert({
            id: now + 1,
            type: "warning",
            message: "Page load time is slow",
            value: updated.pageLoadTime,
            time: new Date().toLocaleTimeString(),
          });

          lastAlertRef.current.performance = now;
        }
      }
      

      setHistory((h) => {
        const updatedHistory = [...h.slice(-9), updated];
        setGlobalHistory(updatedHistory);
        return updatedHistory;
      });

      return updated;
      });
      setLoading(false);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [addAlert, dateRange, device, setGlobalHistory, role]);

  const PAGE_LOAD_THRESHOLD = 2000;

  const chartData = history.map((item, index) => ({
    time: index + 1,
    value: item.pageLoadTime,
  }));
  if (loading) {
  return (
    <Layout>
      <p className="p-6 text-gray-400">Loading dashboard...</p>
    </Layout>
  );
  }

  return (
  <Layout>
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex items-start justify-between mb-6">

      {/* LEFT SIDE */}
      <div>
      <h1 className="text-xl font-semibold text-white">
        UI Pulse Monitor
      </h1>

      <p className="text-sm text-gray-400 mt-1">
        Monitor system performance and alerts
      </p>

      <div className="text-xs text-gray-500 mt-2">
        {dateRange} • {device} • Role: {role}
      </div>
    </div>

    {/* RIGHT SIDE (ACTIONS) */}
      <div className="flex gap-3">
      {role === "admin" && (
        <Button
          onClick={() =>
            setMetrics({
              pageLoadTime: 2000,
              apiLatency: 500,
              errorRate: 1,
            })
          }
        >
        Reset Metrics
        </Button> 
      )}

        <Button onClick={handleExport} disabled={role === "analyst"} variant="secondary">
          Export Data
        </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4">
        <MetricCard
          title="Page Load Time"
          value={metrics.pageLoadTime}
          unit="ms"
          historyKey="pageLoadTime"
          history={history}
        />
        <MetricCard
          title="API Latency"
          value={metrics.apiLatency}
          unit="ms"
          historyKey="apiLatency"
          history={history}
        />
        <MetricCard
          title="Error Rate"
          value={metrics.errorRate}
          unit="%"
          historyKey="errorRate"
          history={history}
        />
      </div>

      {/* Chart */}
      <div className="bg-[#020617] border border-gray-800 rounded-xl p-4 mt-6">
        <h2 className="text-sm text-gray-400 mb-3">
          Performance Trend
        </h2>

        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={chartData}>
            <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
            <XAxis dataKey="time" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip contentStyle={{ background: "#020617", border: "none" }}
              formatter={(value) => `${Math.round(value)} ms`}
            />

            <ReferenceLine
              y={PAGE_LOAD_THRESHOLD}
              stroke="#ef4444"
              strokeDasharray="5 5"
            />
            
            <Line
              type="monotone"
              dataKey="value"
              stroke="#38bdf8"
              name="Page Load Time"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  </Layout>
  );
}
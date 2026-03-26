import {
  getMetricStatus,
  getExplanation,
  hasRegression,
} from "../../../utils/metrics";

export default function MetricCard({
  title,
  value,
  unit,
  historyKey,
  history,
}) {
  const status = getMetricStatus(title, value);
  const explanation = getExplanation(title, status);
  const regression = hasRegression(history, historyKey, value, title);

    let trend = null;
    if (history.length >= 2) {
      const prev = history[history.length - 2]?.[historyKey];
      if (prev !== undefined && prev !== value) {
      trend = value > prev ? "worse" : "better";
      }
    }
  const statusColor =
    status === "good"
      ? "text-emerald-400 font-bold tracking-wide"
      : status === "warning"
      ? "text-amber-400"
      : "text-red-500";

  const formattedValue =
  typeof value === "number" ? value.toFixed(0) : value;



  return (
    <div className="bg-[#020617] border border-gray-800 p-5 rounded-xl text-center hover:border-gray-700 hover:shadow-md transition min-h-[140px]">
      <h3 className="text-xl text-gray-400">{title}</h3>

      <div className="text-xl font-semibold text-white mt-1">
        {formattedValue} {unit}
      </div>

      <div className={`text-xs font-semibold mt-1 ${statusColor}`}>
        {status.toUpperCase()}
      </div>

      <p className="text-xs text-gray-500 mt-2 max-w-[220px] mx-auto">{explanation}</p>

      {regression && (
        <div className="text-xs text-red-500 mt-2 font-medium">
          ⚠️ Regression detected
        </div>
      )}
      {trend &&  (
        <div className="text-xs mt-1 text-gray-400">
          {trend === "worse" ? "↑ degrading" : "↓ improving"}
        </div>
      )}
    </div>
  );
}


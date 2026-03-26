import {
  getMetricStatus,
  getExplanation,
  getStatusColor,
  hasRegression,
} from "../utils/metrics";

export default function MetricCard({
  title,
  value,
  unit,
  historyKey,
  history,
}) {
  const status = getMetricStatus(title, value);
  const explanation = getExplanation(title, status);
  const regression = hasRegression(history, historyKey, value);

  return (
    <div
      className="card"
      style={{ backgroundColor: getStatusColor(status) }}
    >
      <h3>{title}</h3>

      <div className="value">
        {value} {unit}
      </div>

      <div className="status">Status: {status}</div>

      <div className="explanation">{explanation}</div>

      {regression && (
        <div className="regression">
          ⚠️ Regression detected compared to recent history
        </div>
      )}
    </div>
  );
}

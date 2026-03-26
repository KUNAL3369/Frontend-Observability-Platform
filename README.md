# Frontend Observability Dashboard

A production-style frontend observability dashboard built with React. The application simulates real-time frontend performance monitoring, highlights health status using thresholds, and visualizes trends to detect regressions over time.

This project is intentionally designed as an internal engineering tool, not a UI demo.

# Live Demo

https://frontend-observability-dashboard.netlify.app/

## Features

### Live Metrics Simulation
- Page Load Time
- API Latency
- Error Rate

### Health Status Evaluation
- Metrics classified as `Good`, `Warning`, or `Bad`
- Threshold-based evaluation similar to real observability systems

### Trend Visualization
- Line chart for Page Load Time history
- Helps identify gradual performance regressions

### Explainability
- Clear, human-readable explanations for metric status
- Focus on impact, not just raw numbers

### Responsive Dashboard Layout
- Optimized for desktop and laptop screens
- Compact layout to fit metrics and charts on a single view

### Real-Time Updates
- Metrics update at regular intervals to simulate live data

## Tech Stack

- **Framework:** React 18 (Vite)
- **Language:** JavaScript (ES6+)
- **Styling:** CSS (Flexbox & Grid)
- **Charts:** Recharts
- **State Management:** React Hooks

## Getting Started

### Clone the repository

```bash
git clone https://github.com/KUNAL3369/frontend-observability-dashboard.git
cd frontend-observability-dashboard
```

### Install dependencies

```bash
npm install
```

### Run the project

```bash
npm run dev
```

### Open your browser at:

```
http://localhost:5173
```

## Project Structure

```
src/
├── components/
│   └── MetricCard.jsx        # Metric UI + status rendering
├── App.jsx                   # Main dashboard logic and layout
├── App.css                   # Dashboard styles
├── main.jsx                  # Entry point
└── index.css                 # Global styles
```

## How It Works

### Metric Evaluation
Each metric is evaluated against predefined thresholds to determine system health. This mirrors how frontend monitoring tools assess performance signals.

### Historical Tracking
A rolling window of historical data is maintained for each metric to support trend analysis.

### Trend Detection
Instead of relying on a single data point, the dashboard visualizes trends to highlight performance drift over time.

### Explainability Layer
Each metric includes short contextual explanations to help engineers quickly understand user impact.

## Why This Project

This project demonstrates:
- System-level frontend thinking
- Time-based state modeling
- Observability concepts applied at the UI layer
- Internal dashboard design patterns used by platform teams

**Applicable to:**
- Frontend platform tools
- Admin dashboards
- Monitoring and observability systems
- Data-driven web applications

## Notes

- UI-only project (no backend)
- Metrics are simulated to reflect real-world behavior
- Designed for clarity, maintainability, and interview discussion

## Author

**Kunal**  
Frontend Developer

---

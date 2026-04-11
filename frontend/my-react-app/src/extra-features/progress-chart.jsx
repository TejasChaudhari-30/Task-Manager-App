import react from "react"
import {Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useEffect,useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export const Graph2 = (prop) => {

  const total = prop.high + prop.moderate + prop.low;

  const chartData = {
    labels: ["High", "Moderate", "Low"],
    datasets: [
      {
        data: [prop.high, prop.moderate, prop.low],

        backgroundColor: [
          "rgba(248, 113, 113, 0.6)",   // soft red
          "rgba(251, 191, 36, 0.6)",    // soft amber
          "rgba(74, 222, 128, 0.6)"     // soft green
        ],

        borderColor: [
          "rgba(248, 113, 113, 1)",
          "rgba(251, 191, 36, 1)",
          "rgba(74, 222, 128, 1)"
        ],

        borderWidth: 2,
        hoverOffset: 10
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#cbd5f5",
          font: {
            size: 12
          }
        }
      },

      // 🎯 Percentage inside chart
      datalabels: {
        color: "#ffffff",
        font: {
          weight: "bold",
          size: 12
        },
        formatter: (value) => {
          const percentage = ((value / total) * 100).toFixed(0);
          return percentage + "%";
        }
      }
    },

    // ✨ animation
    animation: {
      animateRotate: true,
      duration: 1200,
      easing: "easeOutQuart"
    },

    cutout: "65%" // donut thickness
  };

  return (
    <div className="progress-card2">
      <Doughnut data={chartData} options={options} plugins={[ChartDataLabels]} />
    </div>
  );
};

export const Graph = (prop) => {

  const total = prop.pending + prop.done;

  // 🔢 animation state
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 800;
    const stepTime = Math.max(Math.floor(duration / total), 20);

    const timer = setInterval(() => {
      start += 1;
      setCount(start);

      if (start >= total) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [total]);

  const chartData = {
    labels: ["Pending", "Completed"],
    datasets: [
      {
        data: [prop.pending, prop.done],
        backgroundColor: [
          "rgba(96, 165, 250, 0.6)",
          "rgba(74, 222, 128, 0.6)"
        ],
        borderColor: [
          "rgba(96, 165, 250, 1)",
          "rgba(74, 222, 128, 1)"
        ],
        borderWidth: 2,
        hoverOffset: 10
      }
    ]
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: "#cbd5f5"
        }
      },
      datalabels: {
        color: "#fff",
        font: {
          weight: "bold",
          size: 12
        },
        formatter: (value) => {
          const percentage = ((value / total) * 100).toFixed(0);
          return percentage + "%";
        }
      }
    },
    animation: {
      animateRotate: true,
      duration: 1200
    },
    cutout: "70%"
  };

  return (
    <div className="progress-card center-chart">
      
      {/* 🔢 Center Content */}
      <div className="chart-center">
        <h2>{count}</h2>
        <p>Total</p>
      </div>

      <Doughnut
        data={chartData}
        options={options}
        plugins={[ChartDataLabels]}
      />
    </div>
  );
};
export default Graph;


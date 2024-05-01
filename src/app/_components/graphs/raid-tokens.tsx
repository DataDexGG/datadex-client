"use client";

import {Line} from "react-chartjs-2";

function weeks() {
  const w = [];
  for (let i = 1; i <= 52; i++) {
    w.push(`Week ${i}`);
  }
  return w;
}

let width, height, gradient;
export function getGraphGradient(ctx, chartArea) {
  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.bottom - chartArea.top;
  if (!gradient || width !== chartWidth || height !== chartHeight) {
    // Create the gradient because this is either the first render
    // or the size of the chart has changed
    width = chartWidth;
    height = chartHeight;
    gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);

    gradient.addColorStop(0.45, "#ff6f6f");

    // gradient.addColorStop(0.667, "#fff86b");
    gradient.addColorStop(0.666, "#fff86b");

    gradient.addColorStop(0.8, "#6bff6b");
  }

  return gradient;
}

export default function RaidTokenWeeklyGraph(props) {
  const { guild, member } = props;

  return (
    <div className="relative w-full h-fit p-2 bg-[#2d2e33] border-2 border-[#26272a]">
      <div className="-mt-1 absolute left-1/2 transform -translate-x-1/2">
        <span className="font-medium text-white">Raid Tokens Earned</span>
      </div>
      <div className="mt-2 absolute left-1/2 transform -translate-x-1/2">
        <span className="font-medium text-white text-xs">Weekly</span>
      </div>

      <div className="relative w-full h-[20rem] mt-8">
        <Line data={{
          labels: weeks(),
          datasets: [{
            label: '2024',
            data: [7*600, 6*600, 5*600, 4*600, 5.1*600, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: [ 'rgba(255,255,255,0.1)' ],
            borderColor: function(context) {
              const chart = context.chart;
              const {ctx, chartArea} = chart;

              if (!chartArea) return;
              return getGraphGradient(ctx, chartArea);
            },
            borderWidth: 4,
            tension: 0.25,
            fill: true,
            pointRadius: 3,
            pointHoverRadius: 10,
            pointHoverBorderWidth: 3,
          }]
        }}
              options={{
                maintainAspectRatio: false,
                interaction: {
                  mode: 'index',
                  intersect: false,
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    suggestedMin: 0,
                    suggestedMax: 7 * 600,
                    ticks: {
                      stepSize: 600,
                    }
                  }
                },
              }}
        />
      </div>
    </div>
  )
}

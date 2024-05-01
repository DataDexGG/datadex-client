"use client";

import {Line} from "react-chartjs-2";
import {getGraphGradient} from "./graph-util";

export default function GalacticPowerGraph(props) {
  const { guild, member } = props;

  return (
    <div className="relative w-full h-full p-2 bg-[#2d2e33] border-2 border-[#26272a]">
      <div className="-mt-1 absolute left-1/2 transform -translate-x-1/2">
        <span className="font-medium text-white whitespace-nowrap">Galactic Power</span>
      </div>
      <div className="mt-2 absolute left-1/2 transform -translate-x-1/2">
        <span className="font-medium text-white text-xs">Monthly</span>
      </div>

      <div className="relative w-full h-[20rem] mt-8">
        <Line data={{
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            label: '2024',
            data: [11,10,10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
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
                    ticks: {
                      stepSize: 600 * 2,
                    }
                  }
                }
              }}
        />
      </div>
    </div>
  );
}

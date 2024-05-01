"use client";

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
    gradient.addColorStop(0.2, "#ff6f6f");
    gradient.addColorStop(0.8, "#6bff6b");
  }

  return gradient;
}

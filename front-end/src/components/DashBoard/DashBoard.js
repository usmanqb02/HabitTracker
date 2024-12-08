import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2'; // Import the Bar chart from chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const HabitProgressBarChart = () => {
  // Sample static data (Replace with API data later)
  const sampleData = {
    dailyProgress: [
      { date: "2024-12-01", progress: 50 },
      { date: "2024-12-02", progress: 60 },
      { date: "2024-12-03", progress: 70 },
      { date: "2024-12-04", progress: 80 },
      { date: "2024-12-05", progress: 85 },
      { date: "2024-12-06", progress: 90 },
      { date: "2024-12-07", progress: 95 }
    ]
  };

  const [apiData] = useState(sampleData); // Set initial data directly (no delay)
  const [barColors, setBarColors] = useState([]); // State for storing colors

  useEffect(() => {
    // Only generate colors once
    const generateRandomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    const colors = apiData.dailyProgress.map(() => generateRandomColor());
    setBarColors(colors);
  }, [apiData]); // Only run once when apiData is set

  // Prepare chart data for the Bar chart
  const chartLabels = apiData.dailyProgress.map(item => item.date); // Dates from the dailyProgress
  const chartDataValues = apiData.dailyProgress.map(item => item.progress); // Progress percentages

  // Calculate summary statistics (average, best, worst day)
  const totalProgress = chartDataValues.reduce((acc, value) => acc + value, 0);
  const averageProgress = (totalProgress / chartDataValues.length).toFixed(2);
  const maxProgress = Math.max(...chartDataValues);
  const minProgress = Math.min(...chartDataValues);
  const bestDay = chartDataValues.indexOf(maxProgress);
  const worstDay = chartDataValues.indexOf(minProgress);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
  };

  const chartDataConfig = {
    labels: chartLabels, // Dates as labels for the chart
    datasets: [
      {
        label: 'Daily Habit Progress',
        data: chartDataValues, // Daily progress data points
        backgroundColor: barColors, // Colorful bars
        borderColor: barColors.map(color => color), // Matching border color for each bar
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-12 shadow-md">
      <h2 className="text-xl font-semibold mb-6">Habit Progress Overview</h2>

      {/* Summary Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Summary</h3>
        <div className="space-y-4">
          <div className="text-sm">
            <strong>Average Progress:</strong> {averageProgress}%
          </div>
          <div className="text-sm">
            <strong>Best Day:</strong> {chartLabels[bestDay]} with {maxProgress}% progress
          </div>
          <div className="text-sm">
            <strong>Worst Day:</strong> {chartLabels[worstDay]} with {minProgress}% progress
          </div>
        </div>
      </div>

      {/* Bar Chart Section */}
      <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Habit Progress Over Time</h3>
        <Bar data={chartDataConfig} options={chartOptions} />
      </div>
    </div>
  );
};

export default HabitProgressBarChart;

import React, { useState, useEffect, useMemo } from "react";
import { Line } from "react-chartjs-2";
import config from "../UrlConfig";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useTheme } from "../../theme/ThemeContext";
import axios from "axios";
import { FaCheckCircle, FaTasks, FaFire, FaClock } from "react-icons/fa";

// ChartJS registration
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Memoized Habit Summary Card
const HabitSummaryCard = React.memo(
  ({ icon, title, value, iconColor, backgroundColor }) => (
    <div
      className={`flex items-center p-4 rounded-xl shadow-md ${backgroundColor} hover:shadow-lg transition`}
    >
      <div className={`text-3xl ${iconColor} mr-4`}>{icon}</div>
      <div>
        <span className="text-lg font-medium">{title}:</span>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  )
);

const HabitProgressBarChart = () => {
  const { theme } = useTheme();
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const api = axios.create({
    baseURL: config.apiBaseUrl,
    headers: { Authorization: `Token ${localStorage.getItem("token")}` },
  });

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const { data } = await api.get("/habits/");
        setHabits(data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching habits. Please try again later.");
        setLoading(false);
      }
    };
    fetchHabits();
  }, [api]);

  // Memoizing the total streaks and last checked habit
  const totalStreaks = useMemo(
    () => habits.reduce((acc, habit) => acc + habit.streak, 0),
    [habits]
  );
  const lastCheckedHabit = useMemo(
    () =>
      habits
        .filter((habit) => habit.checked)
        .sort((a, b) => b.lastChecked - a.lastChecked)[0],
    [habits]
  );

  // Chart Data
  const chartData = {
    labels: habits.map((habit) => habit.title),
    datasets: [
      {
        label: "Streak Progress",
        data: habits.map((habit) => habit.streak),
        borderColor: "#14B8A6",
        backgroundColor: "rgba(20, 184, 166, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: theme === "dark" ? "#FFF" : "#333",
          font: {
            size: 14,
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: theme === "dark" ? "#FFF" : "#333",
          font: {
            size: 12,
          },
        },
      },
      y: {
        ticks: {
          color: theme === "dark" ? "#FFF" : "#333",
          font: {
            size: 12,
          },
        },
      },
    },
  };

  const totalHabitsCompleted = habits.filter((habit) => habit.checked).length;

  return (
    <div
      className={`max-w-5xl mx-auto rounded-3xl shadow-2xl p-6 md:p-10 transition-all ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      }`}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center text-[#14B8A6] mb-8 md:mb-10">
        Your Habit Dashboard
      </h2>

      {/* Loading and Error Handling */}
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <div className="flex flex-col md:flex-row gap-8 md:gap-10">
          {/* Progress Chart */}
          <div className="w-full md:w-2/3">
            <h3 className="text-2xl font-semibold mb-4 text-center">
              Habit Streak Progress
            </h3>
            <div
              className="h-60 md:h-96 p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-800 rounded-2xl shadow-inner"
              aria-label="Habit Streak Progress Chart"
            >
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>

          {/* Habit Summary */}
          <div className="w-full md:w-1/3">
            <h3 className="text-2xl font-semibold mb-6 text-center">
              Habit Summary
            </h3>
            {habits.length === 0 ? (
              <p className="text-center text-lg font-semibold text-gray-500">
                No habits found. Please add a new habit.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {/* Total Habits */}
                <HabitSummaryCard
                  icon={<FaTasks />}
                  title="Total Habits"
                  value={habits.length}
                  iconColor="text-[#14B8A6]"
                  backgroundColor="bg-gray-100 dark:bg-gray-700"
                />

                {/* Completed Habits */}
                <HabitSummaryCard
                  icon={<FaCheckCircle />}
                  title="Total Habits Completed"
                  value={totalHabitsCompleted}
                  iconColor="text-green-500"
                  backgroundColor="bg-gray-100 dark:bg-gray-700"
                />

                {/* Total Streaks */}
                <HabitSummaryCard
                  icon={<FaFire />}
                  title="Total Streaks"
                  value={totalStreaks}
                  iconColor="text-orange-500"
                  backgroundColor="bg-gray-100 dark:bg-gray-700"
                />

                {/* Last Checked Habit */}
                <HabitSummaryCard
                  icon={<FaClock />}
                  title="Last Checked Habit"
                  value={lastCheckedHabit ? lastCheckedHabit.title : "None"}
                  iconColor="text-purple-500"
                  backgroundColor="bg-gray-100 dark:bg-gray-700"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HabitProgressBarChart;

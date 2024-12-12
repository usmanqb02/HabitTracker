import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useTheme } from "../../theme/ThemeContext";
import config from "../UrlConfig";

const HabitManagement = () => {
  const { theme } = useTheme();
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");
  const [editHabit, setEditHabit] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [duration, setDuration] = useState(1);

  const apiUrl = config.apiUrl;

  const api = useMemo(
    () =>
      axios.create({
        baseURL: config.apiBaseUrl,
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      }),
    []
  );

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const { data } = await api.get("/habits/");
        console.log("Fetched habits:", data);
        setHabits(data);
      } catch (error) {
        console.error("Error fetching habits:", error);
      }
    };

    fetchHabits();
  }, [api]);

  const updateHabit = async (id, updatedHabit) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to log in.");
      return;
    }

    try {
      const { data } = await api.patch(`/habits/${id}/`, updatedHabit);
      return data;
    } catch (error) {
      console.error("Error updating habit:", error);
    }
  };

  const addHabit = async () => {
    if (!newHabit.trim()) {
      alert("Please enter a habit title.");
      return;
    }

    if (selectedDays.length === 0) {
      alert("Please select at least one day for the habit.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Invalid Token");
      return;
    }

    const newHabitObj = {
      title: newHabit.trim(),
      body: newHabit.trim(),
      userId: 1,
      days: selectedDays,
      duration,
      streak: 0,
      lastChecked: null,
      checked: false,
    };

    try {
      const { data } = await api.post("/habits/", newHabitObj);
      setHabits((prevHabits) => [data, ...prevHabits]);
      resetHabitForm();
    } catch (error) {
      console.error("Error adding habit:", error);
      alert("Failed to add habit. Please try again.");
    }
  };

  const deleteHabit = async (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You need to log in to delete a habit.");
      return;
    }

    try {
      await axios.delete(`${apiUrl}${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setHabits((prevHabits) => prevHabits.filter((habit) => habit.id !== id));
    } catch (error) {
      console.error("Error deleting habit:", error);
    }
  };

  const startEditingHabit = (habit) => {
    setEditHabit(habit);
    setEditedText(habit.title);
    setSelectedDays(habit.days || []);
    setDuration(habit.duration || 1);
  };

  const saveEditedHabit = async () => {
    const updatedHabit = {
      ...editHabit,
      title: editedText.trim(),
      body: editedText.trim(),
      days: selectedDays,
      duration,
    };

    const data = await updateHabit(editHabit.id, updatedHabit);

    if (data) {
      setHabits((prevHabits) =>
        prevHabits.map((habit) => (habit.id === editHabit.id ? data : habit))
      );
      resetHabitForm();
    }
  };

  const toggleCheckStatus = async (id, e) => {
    e.stopPropagation();
    const habit = habits.find((h) => h.id === id);
    const currentTime = new Date().getTime();

    if (habit.lastChecked && currentTime - habit.lastChecked < 86400000) {
      return;
    }

    const updatedHabit = {
      ...habit,
      lastChecked: currentTime,
      streak: habit.lastChecked ? habit.streak + 1 : 1,
      checked: !habit.checked,
    };

    const data = await updateHabit(id, updatedHabit);

    if (data) {
      setHabits((prevHabits) =>
        prevHabits.map((h) => (h.id === id ? data : h))
      );
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") addHabit();
  };

  const handleDaySelection = (day) => {
    setSelectedDays((prevDays) =>
      prevDays.includes(day)
        ? prevDays.filter((d) => d !== day)
        : [...prevDays, day]
    );
  };

  const resetHabitForm = () => {
    setNewHabit("");
    setSelectedDays([]);
    setDuration(1);
    setEditedText("");
    setEditHabit(null);
  };

  const days = [
    { id: "monday", label: "Monday" },
    { id: "tuesday", label: "Tuesday" },
    { id: "wednesday", label: "Wednesday" },
    { id: "thursday", label: "Thursday" },
    { id: "friday", label: "Friday" },
    { id: "saturday", label: "Saturday" },
    { id: "sunday", label: "Sunday" },
  ];

  return (
    <div
      className={`flex flex-col h-full py-12 px-4 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50"
      }`}
    >
      <div
        className={`max-w-5xl mx-auto rounded-2xl shadow-xl p-8 ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2 className="text-4xl font-semibold text-center text-[#14B8A6] mb-8">
          Your Habits
        </h2>

        {/* Add Habit Section */}
        <div className="flex flex-col space-y-6 mb-6">
          <input
            type="text"
            className={`p-4 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-[#14B8A6] transition-all duration-300 ease-in-out shadow-md ${
              theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-white text-black"
            }`}
            placeholder="Enter new habit"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <div className="w-full flex flex-wrap justify-center gap-2 sm:gap-4">
            {days.map((day) => (
              <button
                key={day.id}
                onClick={() => handleDaySelection(day.label)}
                className={`px-4 py-2 rounded-lg shadow-md w-full sm:w-auto ${
                  selectedDays.includes(day.label)
                    ? "bg-[#14B8A6] text-white"
                    : "bg-gray-200 text-black"
                } transition-all duration-300 hover:bg-[#22D3EE]`}
              >
                {day.label}
              </button>
            ))}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">
              Duration (Number of Days)
            </h3>
            <input
              type="number"
              min="1"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className={`p-4 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-[#14B8A6] transition-all duration-300 ease-in-out shadow-md ${
                theme === "dark"
                  ? "bg-gray-700 text-white"
                  : "bg-white text-black"
              }`}
            />
          </div>

          <button
            onClick={addHabit}
            className="px-6 py-3 text-lg text-white bg-gradient-to-r from-[#14B8A6] to-[#22D3EE] rounded-lg shadow-xl hover:bg-teal-600 transform transition duration-300 hover:scale-105"
          >
            Add Habit
          </button>
        </div>

        {/* Habit List */}
        <div className="space-y-6 flex-grow">
          {habits.length === 0 ? (
            <p className="text-center text-lg font-semibold text-gray-500">
              No habits found. Please add a new habit.
            </p>
          ) : (
            habits.map((habit) => (
              <div
                key={habit.id}
                className={`flex items-center justify-between p-6 rounded-lg shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 ${
                  habit.checked
                    ? "bg-green-100"
                    : theme === "dark"
                    ? "bg-gray-700"
                    : "bg-white"
                } border border-gray-700 hover:shadow-2xl cursor-pointer`}
              >
                {editHabit && editHabit.id === habit.id ? (
                  <div className="flex space-x-4 w-full">
                    <input
                      type="text"
                      className="flex-1 p-4 border-2 text-black border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-[#14B8A6]"
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                    />
                    <button
                      onClick={saveEditedHabit}
                      className="px-6 py-3 text-lg text-white bg-gradient-to-r from-[#14B8A6] to-[#22D3EE] rounded-lg shadow-xl hover:bg-teal-600"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <>
                    <span
                      className={`text-lg font-semibold ${
                        habit.checked ? "text-green-500 line-through" : ""
                      }`}
                    >
                      {habit.title}
                    </span>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={(e) => toggleCheckStatus(habit.id, e)}
                        className={`px-4 py-2 rounded-lg text-white shadow-md transition-all duration-300 ${
                          habit.checked
                            ? "bg-green-500 hover:bg-green-400"
                            : "bg-gray-400 hover:bg-gray-500"
                        }`}
                      >
                        {habit.checked ? "Uncheck" : "Check"}
                      </button>
                      <button
                        onClick={() => startEditingHabit(habit)}
                        className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-400"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteHabit(habit.id)}
                        className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-400"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HabitManagement;

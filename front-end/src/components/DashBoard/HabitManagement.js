import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '../../theme/ThemeContext';

const HabitManagement = () => {
  const { theme } = useTheme();
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState('');
  const [editHabit, setEditHabit] = useState(null);
  const [editedText, setEditedText] = useState('');
  const [selectedHabitId, setSelectedHabitId] = useState(null);
  const [selectedDays, setSelectedDays] = useState([]);
  const [duration, setDuration] = useState(0);

  const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  useEffect(() => {
    axios.get(apiUrl)
      .then(response => {
        setHabits(response.data.slice(0, 5));
      })
      .catch(error => {
        console.error('Error fetching habits:', error);
      });
  }, []);

  const addHabit = () => {
    if (!newHabit.trim()) return;

    const newHabitObj = {
      title: newHabit.trim(),
      body: newHabit.trim(),
      userId: 1,
      days: selectedDays,
      duration: duration,
      streak: 0,  // Initialize streak
      lastChecked: null,  // Initialize last checked time
      checked: false, // Initialize checked status
    };

    axios.post(apiUrl, newHabitObj)
      .then(response => {
        setHabits([response.data, ...habits]);
        setNewHabit('');
        setSelectedDays([]);
        setDuration(1);
      })
      .catch(error => {
        console.error('Error adding habit:', error);
      });
  };

  const deleteHabit = (id) => {
    axios.delete(`${apiUrl}/${id}`)
      .then(() => {
        setHabits(habits.filter(habit => habit.id !== id));
        setSelectedHabitId(null);
      })
      .catch(error => {
        console.error('Error deleting habit:', error);
      });
  };

  const startEditingHabit = (habit) => {
    setEditHabit(habit);
    setEditedText(habit.title);
    setSelectedHabitId(habit.id);
    setSelectedDays(habit.days || []);
    setDuration(habit.duration || 1);
  };

  const saveEditedHabit = () => {
    const updatedHabit = { 
      ...editHabit, 
      title: editedText.trim(), 
      body: editedText.trim(), 
      days: selectedDays, 
      duration: duration 
    };

    axios.patch(`${apiUrl}/${editHabit.id}`, updatedHabit)
      .then(response => {
        setHabits(habits.map(habit =>
          habit.id === editHabit.id ? response.data : habit
        ));
        setEditHabit(null);
        setEditedText('');
        setSelectedHabitId(null);
        setSelectedDays([]);
        setDuration(1);
      })
      .catch(error => {
        console.error('Error updating habit:', error);
      });
  };

  const toggleCheckStatus = (id, e) => {
    e.stopPropagation();  // Prevent triggering handleHabitClick
    const habit = habits.find(h => h.id === id);
    const currentTime = new Date().getTime();

    // If last checked was within 24 hours, update streak
    if (habit.lastChecked && currentTime - habit.lastChecked < 86) {
      // If the habit was checked within the last 24 hours, do nothing
      return;
    }

    // Reset streak if it's been more than 24 hours
    const updatedHabit = {
      ...habit,
      lastChecked: currentTime,
      streak: habit.lastChecked ? habit.streak + 1 : 1,
      checked: !habit.checked, // Toggle checked status
    };

    axios.patch(`${apiUrl}/${habit.id}`, updatedHabit)
      .then(response => {
        setHabits(habits.map(h => h.id === id ? response.data : h));
      })
      .catch(error => {
        console.error('Error toggling habit status:', error);
      });
  };

  const handleHabitClick = (id) => {
    setSelectedHabitId(prevId => (prevId === id ? null : id));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addHabit();
    }
  };

  const handleDaySelection = (day) => {
    setSelectedDays(prevDays => 
      prevDays.includes(day) ? prevDays.filter(d => d !== day) : [...prevDays, day]
    );
  };

  return (
    <div className={`min-h-screen py-12 px-4 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      <div className={`max-w-5xl mx-auto rounded-2xl shadow-xl p-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-4xl font-semibold text-center text-[#14B8A6] mb-8">Your Habits</h2>

        {/* Add Habit Section */}
        <div className="flex space-x-4 mb-6">
          <input
            type="text"
            className={`flex-1 p-4 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-[#14B8A6] transition-all duration-300 ease-in-out shadow-md ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
            placeholder="Enter new habit"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button
            onClick={addHabit}
            className="px-6 py-3 text-lg text-white bg-gradient-to-r from-[#14B8A6] to-[#22D3EE] rounded-lg shadow-xl hover:bg-teal-600 transform transition duration-300 hover:scale-105"
          >
            Add Habit
          </button>
        </div>

        {/* Days Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Select Days</h3>
          <div className="flex flex-wrap space-x-4">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
              <button
                key={day}
                onClick={() => handleDaySelection(day)}
                className={`px-4 py-2 rounded-lg shadow-md ${selectedDays.includes(day) ? 'bg-[#14B8A6] text-white' : 'bg-gray-200 text-black'} transition-all duration-300 hover:bg-[#22D3EE]`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Duration Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Duration (Number of Days)</h3>
          <input
            type="number"
            min="1"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="p-4 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-[#14B8A6] transition-all duration-300 ease-in-out shadow-md"
          />
        </div>

        {/* Habit List */}
        <div className="space-y-6">
          {habits.map((habit) => (
            <div
              key={habit.id}
              className={`flex items-center justify-between p-6 rounded-lg shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 ${habit.checked ? 'bg-green-100' : (theme === 'dark' ? 'bg-gray-700' : 'bg-white')} border border-gray-700 hover:shadow-2xl cursor-pointer`}
              onClick={() => handleHabitClick(habit.id)}
            >
              {editHabit && editHabit.id === habit.id ? (
                <div className="flex space-x-4 w-full">
                  <input
                    type="text"
                    className="flex-1 p-4 border-2 text-black border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-[#14B8A6] transition-all duration-300"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                  />
                  <button
                    onClick={saveEditedHabit}
                    className="px-6 py-3 text-lg text-white bg-gradient-to-r from-[#14B8A6] to-[#22D3EE] rounded-lg shadow-xl hover:bg-teal-600 transition-all duration-300"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditHabit(null)}
                    className="px-6 py-3 text-lg text-white bg-gray-400 rounded-lg shadow-xl hover:bg-gray-500 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <div className={`flex-1 text-lg ${habit.checked ? 'text-gray-500' : (theme === 'dark' ? 'text-white' : 'text-black')}`}>
                    <span>{habit.title}</span>
                    {habit.checked && (
                      <span className="ml-2 text-green-500 text-sm font-semibold">✔ Completed</span>
                    )}
                    <div className="mt-2 text-sm">
                      <strong>Days:</strong> {habit.days?.join(', ')}
                    </div>
                    <div className="text-sm">
                      <strong>Duration:</strong> {habit.duration} days
                    </div>
                    <div className="text-sm">
                      <strong>Streak:</strong> {habit.streak || 0} day(s)
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={(e) => toggleCheckStatus(habit.id, e)} // Pass event to prevent habit click
                      className="px-4 py-2 text-white bg-gradient-to-r from-[#14B8A6] to-[#22D3EE] rounded-lg shadow-md hover:bg-teal-600 transition-all duration-300"
                    >
                      {habit.lastChecked && new Date().getTime() - habit.lastChecked < 86400000 ? "❌ Uncheck" : "✅ Check"}
                    </button>

                    {selectedHabitId === habit.id && (
                      <>
                        {!habit.checked && (
                          <button
                            onClick={() => startEditingHabit(habit)}
                            className="px-4 py-2 text-white bg-yellow-500 rounded-lg shadow-md hover:bg-yellow-600 transition-all duration-300"
                          >
                            Edit
                          </button>
                        )}
                        <button
                          onClick={() => deleteHabit(habit.id)}
                          className="px-4 py-2 text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 transition-all duration-300"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HabitManagement;

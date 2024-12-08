import React, { useState } from 'react';
import { useTheme } from '../../theme/ThemeContext'; // Import the useTheme hook

const Tracking = () => {
  const { theme } = useTheme(); // Get the current theme from context
  const [completedHabits, setCompletedHabits] = useState([]);

  const handleToggleCompletion = (habitId) => {
    if (completedHabits.includes(habitId)) {
      setCompletedHabits(completedHabits.filter(id => id !== habitId));
    } else {
      setCompletedHabits([...completedHabits, habitId]);
    }
  };

  return (
    <div className={`p-6 shadow-md ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'}`}>
      <h2 className="text-xl font-semibold mb-4">Track Your Habits</h2>
      <div className="space-y-4">
        {/* List of habits to track */}
        {[1, 2, 3].map((habitId) => (
          <div
            key={habitId}
            className={`flex justify-between items-center p-4 rounded-lg transition duration-300 ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
            } ${completedHabits.includes(habitId) ? 'bg-green-500' : ''}`}
          >
            <span className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              Habit {habitId}
            </span>
            <button
              onClick={() => handleToggleCompletion(habitId)}
              className={`px-4 py-2 rounded-lg transition duration-300 ${
                completedHabits.includes(habitId)
                  ? 'bg-green-500 text-white'
                  : (theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300')
              }`}
            >
              {completedHabits.includes(habitId) ? 'Completed' : 'Mark Complete'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tracking;

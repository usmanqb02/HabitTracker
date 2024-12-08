import React, { useState } from 'react';
import { useTheme } from '../../theme/ThemeContext'; // Import the useTheme hook

const Goals = () => {
  const { theme } = useTheme(); // Get the current theme from context
  const [goals, setGoals] = useState([
    { id: 1, goal: 'Complete 30-day workout streak', progress: 15 },
    { id: 2, goal: 'Read 10 books this year', progress: 5 },
  ]);
  const [newGoal, setNewGoal] = useState('');

  const handleAddGoal = () => {
    if (newGoal.trim()) {
      setGoals([...goals, { id: goals.length + 1, goal: newGoal, progress: 0 }]);
      setNewGoal('');
    }
  };

  return (
    <div className={`p-6 shadow-md ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'}`}>
      <h2 className="text-xl font-semibold mb-4">Set and Track Goals</h2>
      <div className="mb-4">
        <input
          type="text"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          className={`p-2 border ${theme === 'dark' ? 'border-gray-600 text-white' : 'border-gray-300 text-black'} rounded`}
          placeholder="Add a new goal"
        />
        <button
          onClick={handleAddGoal}
          className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Goal
        </button>
      </div>
      <ul>
        {goals.map((goal) => (
          <li
            key={goal.id}
            className={`flex justify-between items-center mb-2 p-4 rounded-lg transition duration-300 ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
            }`}
          >
            <span className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>{goal.goal}</span>
            <span className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              {goal.progress} / 30
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Goals;

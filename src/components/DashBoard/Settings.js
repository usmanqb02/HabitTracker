import React from "react";
import { useTheme } from "../../theme/ThemeContext"; // Import the hook to access the context

const Settings = () => {
  const { theme, toggleTheme, notifications, toggleNotifications } = useTheme();

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 text-black dark:text-white p-6 shadow-md">
      <h2 className="text-xl font-semibold mb-4">Settings</h2>

      <div className="mb-4">
        <label className="block text-sm mb-2">Enable Notifications</label>
        <input
          type="checkbox"
          checked={notifications}
          onChange={toggleNotifications}
          className="mr-2"
        />
        <span>{notifications ? "Enabled" : "Disabled"}</span>
      </div>

      <div>
        <label className="block text-sm mb-2">Select Theme</label>
        <select
          value={theme}
          onChange={(e) => toggleTheme()} // Toggling theme
          className="p-2 border text-black border-gray-300 rounded"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
    </div>
  );
};

export default Settings;

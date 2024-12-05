// src/hooks/useAuth.js
import { useAuth } from '../context/AuthContext';  // Correct import

const useAuthHook = () => {
  const { token, saveToken, removeToken } = useAuth(); // Use the context

  return {
    token,
    setToken: saveToken,
    logout: removeToken,
  };
};

export default useAuthHook;

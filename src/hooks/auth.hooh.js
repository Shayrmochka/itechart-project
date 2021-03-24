import { useState, useCallback, useEffect } from "react";

const storageName = "userData";

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);

  const login = useCallback((jwtToken, id, data) => {
    setToken(jwtToken);
    setUserId(id);
    setUserData(data);

    localStorage.setItem(
      storageName,
      JSON.stringify({ userId: id, token: jwtToken, userData: data })
    );
  }, []);
  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));
    console.log("IMPORTANT", userData);
    if (data && data.token) {
      login(data.token, data.userId, data.userData);
    }

    setReady(true);
  }, [login]);

  return { login, logout, token, userId, ready, userData };
};

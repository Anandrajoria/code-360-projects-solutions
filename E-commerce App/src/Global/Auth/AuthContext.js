import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isAuth");
    setIsAuth(loggedIn === "true");
    setLoading(false);

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (!users.length) {
      const seedUsers = [
        {
          name: "Coding Ninja",
          email: "codingninjas@codingninjas.com",
          password: "codingninjas",
        },
        { name: "Test User", email: "test@test.com", password: "password" },
        { name: "QA User", email: "qa@test.com", password: "123456" },
        { name: "Demo User", email: "demo@test.com", password: "demo123" },
      ];
      localStorage.setItem("users", JSON.stringify(seedUsers));
    }
  }, []);

  const login = () => {
    return new Promise((resolve) => {
      localStorage.setItem("isAuth", "true");
      setIsAuth(true);

      setTimeout(resolve, 20); // ensure state is updated
    });
  };

  const logout = () => {
    localStorage.removeItem("isAuth");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("cart");
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

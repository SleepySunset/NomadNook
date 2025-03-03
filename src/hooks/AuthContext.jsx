import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(false);

  const login = async (formData) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://nomadnook-nomadnook.up.railway.app/api/auth/login",
        formData
      );

      if (response.data) {
        setUser({
          email: response.data.email,
          role: response.data.rol,
          token: response.token,
          message: response.mensaje
        });
        localStorage.setItem("user", JSON.stringify(response.data)); // Guarda en localStorage
      }
    } catch (error) {
      console.error("Error en la autenticación:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

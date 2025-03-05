import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (formData) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://nomadnook-nomadnook.up.railway.app/api/auth/login",
        formData
      );

      if (response.data) {
        const newUser = {
          email: response.data.email,
          name: response.data.nombre,
          lastName: response.data.apellido,
          role: response.data.rol,
          token: response.data.token,
          message: response.data.mensaje,
        };

        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
      }
    } catch (error) {
      console.error("Error en la autenticación:", error);
      throw new Error(error.response?.data?.message || "Error desconocido en el login");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

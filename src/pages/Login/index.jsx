import { useState } from "react";
import styles from "./Login.module.css";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";

const Login = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState("");

  const validateForm = () => {
    let newErrors = {};

    if (!formData.email) {
      newErrors.email = "El correo es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "El correo no tiene un formato válido.";
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria.";
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError(""); // Reiniciar mensaje de error
  
    if (!validateForm()) return; // Validar formulario antes de enviar
  
    try {
      await login(formData);
      navigate("/"); // Solo si el login es exitoso
    } catch (error) {
      console.error("Error de autenticación:", error);
      
      // Verifica si el error tiene respuesta del servidor
      const errorMessage =
        error.response?.data?.message || "Credenciales inválidas.";
      
      setLoginError(errorMessage);
    }
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.formulario} onSubmit={handleSubmit}>
        {loginError && <p className={styles.errorText}>{loginError}</p>}

        <div className={styles.inputContainer}>
          <label className={styles.label}>Correo Electrónico</label>
          <div className={styles.inputBox}>
            <input
              type="text"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                setErrors({ ...errors, email: "" });
                setLoginError("");
              }}
              placeholder="correo@gmail.com"
              className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
            />
            <FaUser className={styles.icon} />
          </div>
          {errors.email && <p className={styles.errorText}>{errors.email}</p>}
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label}>Contraseña</label>
          <div className={styles.inputBox}>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                setErrors({ ...errors, password: "" });
                setLoginError("");
              }}
              placeholder="**************"
              className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
            />
            <FaLock className={styles.icon} />
          </div>
          {errors.password && <p className={styles.errorText}>{errors.password}</p>}
        </div>

        <div className={styles.loginOptions}>
          <label className={styles.rememberMe}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className={styles.checkbox}
            />
            Recordarme
          </label>
          <a href="#" className={styles.forgotPassword}>¿Olvidaste tu contraseña?</a>
        </div>

        <button 
          type="submit" 
          className={styles.button}
          disabled={loading}
        >
          {loading ? "Cargando..." : "Iniciar sesión"}
        </button>
      </form>

      <div className={styles.wrapperSecundario}>
        <div className={styles.registerLink}>
          <p>
            ¿No tienes cuenta?{" "}
            <Link to="/register" className={styles.register}>
              Crear cuenta
            </Link>
          </p>
          <p>O inicie sesión con:</p>
          <div className={styles.loginMethodsContainer}>
            <ul className={styles.loginMethods}>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <img src="/google.png" alt="Google Logo" className={styles.loginIcon} />
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <img src="/facebook.png" alt="Facebook Logo" className={styles.loginIcon} />
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <img src="/github.png" alt="GitHub Logo" className={styles.loginIcon} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

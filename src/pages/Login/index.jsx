import { useState } from "react";
import styles from "./Login.module.css";
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Index = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);

  const validateEmail = (value) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!validateEmail(formData.email)) {
      newErrors.email = "Correo inválido (ej: usuario@dominio.com)";
      setFormData({ ...formData, email: "" });
    }

    if (!formData.password.trim()) {
      newErrors.password = "La contraseña es obligatoria.";
      setFormData({ ...formData, password: "" });
    } else if (formData.password.length < 8) {
      newErrors.password = "Debe tener al menos 8 caracteres.";
      setFormData({ ...formData, password: "" });
    } else if (!/[A-Za-z]/.test(formData.password) || !/\d/.test(formData.password)) {
      newErrors.password = "Debe contener al menos una letra y un número.";
      setFormData({ ...formData, password: "" });
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert(`Bienvenido ${formData.email}`);
    }
  };

  
  return (
    <div className={styles.wrapper}>
      <form className={styles.formulario} onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Correo Electrónico</label>
          <div className={styles.inputBox}>
            <input
              type="text"
              value={errors.email ? "" : formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                setErrors({ ...errors, email: "" });
              }}
              placeholder={errors.email || "correo@gmail.com"}
              className={`${styles.input} ${errors.email ? styles.inputError : ""}`} 
              required
            />
            <FaUser className={styles.icon} />
          </div>
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Contraseña</label>
          <div className={styles.inputBox}>
            <input
              type="password"
              value={errors.password ? "" : formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                setErrors({ ...errors, password: "" });
              }}
              placeholder={errors.password || "**************"}
              className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
              required
            />
            <FaLock className={styles.icon} />
          </div>
        </div>
        <div className={styles.loginOptions}>
          <label className={styles.rememberMe}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            Recordarme
          </label>
          <a href="#" className={styles.forgotPassword}>¿Olvidaste tu contraseña?</a>
        </div>
        <button type="submit" className={styles.button}>
          Iniciar sesión
        </button>
      </form>
      <div className={styles.wrapperSecundario}>
        <div className={styles.registerLink}>
          <p>
            ¿No tienes cuenta?{" "}
            <Link to="/Register" className={styles.register}>
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
}

export default Index;

import { useState } from "react";
import styles from "./Login.module.css";
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (value) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;

    if (!validateEmail(email)) {
      setEmailError("Correo inválido (ej: usuario@dominio.com)");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password.trim()) {
      setPasswordError("La contraseña es obligatoria.");
      valid = false;
    } else if (password.length < 8) {
      setPasswordError("La contraseña debe tener al menos 8 caracteres.");
      valid = false;
    } else if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
      setPasswordError("Debe contener al menos una letra y un número.");
      valid = false;
    } else {
      setPasswordError("");
    }    

    if (valid) {
      alert(`Bienvenido ${email}`);
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
            <FaUser className={styles.icon} />
          </div>
          {emailError && <p className={styles.error}>{emailError}</p>}
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label}>Contraseña</label>
          <div className={styles.inputBox}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
            />
            <FaLock className={styles.icon} />
          </div>
          {passwordError && <p className={styles.error}>{passwordError}</p>}
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
        </div>
      </div>

    </div>
  );
}

export default Index;

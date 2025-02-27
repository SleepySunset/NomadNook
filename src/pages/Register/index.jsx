import { useState } from "react";
import styles from "./Register.module.css";

const Index = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio.";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.nombre)) {
      newErrors.nombre = "El nombre solo puede contener letras.";
    }

    if (!formData.apellido.trim()) {
      newErrors.apellido = "El apellido es obligatorio.";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.apellido)) {
      newErrors.apellido = "El apellido solo puede contener letras.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "El correo electrónico no es válido.";
    }

    if (!formData.password.trim()) {
      newErrors.password = "La contraseña es obligatoria.";
    } else if (formData.password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres.";
    } else if (!/[A-Za-z]/.test(formData.password) || !/\d/.test(formData.password)) {
      newErrors.password = "Debe contener al menos una letra y un número.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert(`Bienvenido ${formData.nombre}`);
    }
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.formulario} onSubmit={handleSubmit}>
        {/* Nombre */}
        <div className={styles.inputContainer}>
          <label className={styles.label}>Nombre</label>
          <div className={styles.inputBox}>
            <input
              type="text"
              name="nombre"
              className={styles.input}
              value={formData.nombre}
              onChange={handleChange}
            />
          </div>
          {errors.nombre && <p className={styles.error}>{errors.nombre}</p>}
        </div>

        {/* Apellido */}
        <div className={styles.inputContainer}>
          <label className={styles.label}>Apellido</label>
          <div className={styles.inputBox}>
            <input
              type="text"
              name="apellido"
              className={styles.input}
              value={formData.apellido}
              onChange={handleChange}
            />
          </div>
          {errors.apellido && <p className={styles.error}>{errors.apellido}</p>}
        </div>

        {/* Correo Electrónico */}
        <div className={styles.inputContainer}>
          <label className={styles.label}>Correo Electrónico</label>
          <div className={styles.inputBox}>
            <input
              type="text"
              name="email"
              className={styles.input}
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>

        {/* Contraseña */}
        <div className={styles.inputContainer}>
          <label className={styles.label}>Contraseña</label>
          <div className={styles.inputBox}>
            <input
              type="password"
              name="password"
              className={styles.input}
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          {errors.password && <p className={styles.error}>{errors.password}</p>}
        </div>

        <button type="submit" className={styles.button}>
          Crear Cuenta
        </button>
      </form>

      {/* Métodos de Inicio de Sesión */}
      <div className={styles.wrapperSecundario}>
        <div className={styles.registerLink}>
          <p>O inicie sesión con {" "}</p>
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

export default Index;

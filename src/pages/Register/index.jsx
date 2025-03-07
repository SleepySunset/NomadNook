import { useState } from "react";
import styles from "./Register.module.css";
import { Link } from 'react-router-dom';
import axios from "axios";

const Register = () => {
  const END_POINT = "https://nomadnook-nomadnook.up.railway.app/api/auth/register"
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

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

    if (Object.keys(newErrors).length > 0) {
      setFormData((prevData) => {
        const updatedData = { ...prevData };
        Object.keys(newErrors).forEach((field) => {
          updatedData[field] = "";
        });
        return updatedData;
      });
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (validateForm()) {
      try{
        const response = await axios.post(END_POINT,
          {nombre: formData.nombre,
          apellido: formData.apellido,
          email: formData.email,
          password: formData.password
          }
        )
        console.log(response)
      }catch(error){
        console.log(error)
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.formulario} onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Nombre</label>
          <div className={styles.inputBox}>
            <input
              type="text"
              name="nombre"
              className={`${styles.input} ${errors.nombre ? styles.inputError : ""}`}
              value={formData.nombre}
              onChange={handleChange}
              placeholder={errors.nombre || "Ingresa tu Nombre"}
              required
            />
          </div>
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Apellido</label>
          <div className={styles.inputBox}>
            <input
              type="text"
              name="apellido"
              className={`${styles.input} ${errors.apellido ? styles.inputError : ""}`}
              value={formData.apellido}
              onChange={handleChange}
              placeholder={errors.apellido || "Ingresa tu Apellido"}
              required
            />
          </div>
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Correo Electrónico</label>
          <div className={styles.inputBox}>
            <input
              type="text"
              name="email"
              className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
              value={formData.email}
              onChange={handleChange}
              placeholder={errors.email || "Ingresa tu Correo Electrónico"}
              required
            />
          </div>
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Contraseña</label>
          <div className={styles.inputBox}>
            <input
              type="password"
              name="password"
              className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
              value={formData.password}
              onChange={handleChange}
              placeholder={errors.password || "Ingresa tu Contraseña"}
              required
            />
          </div>
        </div>

        <button type="submit" className={styles.button}>
          Crear Cuenta
        </button>
        <div className={styles.loginLink}>
          <p>
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className={styles.login}>
              Iniciar Sesión
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;

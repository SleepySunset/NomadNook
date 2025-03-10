import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import { Link } from 'react-router-dom';
import axios from "axios";
import Swal from "sweetalert2";
import { ENDPOINTS } from "../../config/config";

const Register = () => {
  const END_POINT = ENDPOINTS.REGISTER;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
    setServerMessage("");
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio.";
    } else if (formData.nombre.trim().length < 3) {
      newErrors.nombre = "El nombre debe tener al menos 3 caracteres.";
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

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Debes repetir la contraseña.";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Las contraseñas no coinciden.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(END_POINT, formData);
        console.log(response);
        Swal.fire({
          title: "Usuario creado con éxito!",
          text: "Redirigiéndote a la página de inicio...",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        setTimeout(() => navigate("/"), 2000);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Ese mail ya se encuentra en uso. Prueba con otro.",
            confirmButtonColor:"#606c38",
            footer: '<a href="#">¿Olvidaste tu contraseña?</a>',
          });
        }
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.formulario} onSubmit={handleSubmit}>
        {["nombre", "apellido", "email", "password", "confirmPassword"].map((field) => (
          <div key={field} className={styles.inputContainer}>
            <label className={styles.label}>
              {field === "password" ? "Contraseña" : field === "confirmPassword" ? "Repetir Contraseña" : field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <div className={styles.inputBox}>
              <input
                type={field === "password" || field === "confirmPassword" ? "password" : "text"}
                name={field}
                className={`${styles.input} ${errors[field] ? styles.inputError : ""}`}
                value={formData[field]}
                onChange={handleChange}
                placeholder={field === "password" ? "Ingresa tu Contraseña" : field === "confirmPassword" ? "Repite tu contraseña" : `Ingresa tu ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                required
              />
            </div>
            {errors[field] && <p className={styles.errorMessage}>{errors[field]}</p>}
          </div>
        ))}

        {serverMessage && <p className={styles.serverMessage}>{serverMessage}</p>}

        <button type="submit" className={styles.button}>
          Crear Cuenta
        </button>
        <div className={styles.loginLink}>
          <p>
            ¿Ya tienes una cuenta?{' '}
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
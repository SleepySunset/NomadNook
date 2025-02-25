import styles from "./Login.module.css";
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className={styles.wrapper}>
      <form action="" className={styles.formulario}>

        <h1 className={styles.title}>Iniciar Sesión</h1>

        <div className={styles.inputBox}>
          <input type="text" placeholder="Correo electrónico" required className={styles.input} />
          <FaUser className={styles.icon} />
        </div>

        <div className={styles.inputBox}>
          <input type="password" placeholder="Contraseña" required className={styles.input} />
          <FaLock className={styles.icon} />
        </div>

        <div className={styles.rememberForgot}>
          <label className={styles.remember}>
            <input type="checkbox" />Recordarme
          </label>
          <a href="#" className={styles.forgotPassword}>Olvidé contraseña</a>
        </div>

        <button type="submit" className={styles.button}>Iniciar sesión</button>

        <div className={styles.registerLink}>
          <p>
            ¿No tienes cuenta?{" "}
            <Link to="/Register" className={styles.register}>
              Crear cuenta
            </Link>
          </p>
        </div>

      </form>
    </div>
  );
}

export default Index;

import { Link } from "react-router-dom";
import styles from "../Header/Header.module.css";

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
        <img src="/white_full_logo.png" alt="White-logo" className={styles.whitelogo} />
         <h3>Viajar es vivir, hospedarte es sentir</h3>
        </ul>
      </nav>
      <div className={styles.authLinksHeader}>
        <Link to="/Register">Crear Cuenta</Link>
        <Link to="/Login">Iniciar Sesión</Link>
      </div>
    </header>
  );
}

export default Header;
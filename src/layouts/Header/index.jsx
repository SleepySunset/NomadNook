import { Link, useLocation } from "react-router-dom";
import styles from "../Header/Header.module.css";
import PersonIcon from "@mui/icons-material/Person";

const Header = ({ user }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/Login" || location.pathname === "/Register";
  return (
    <header
      className={`${styles.header} ${
        user === "admin" ? styles.headerAdmin : styles.headerUser
      }`}
    >
      <div className={styles.logoContainer}>
        <Link to="/" className={styles.logoLink}>
          <img
            src="/white_full_logo.png"
            alt="White-logo"
            className={styles.whitelogo}
          />
          <h3 className={styles.slogan}>
            Viajar es vivir, hospedarte es sentir
          </h3>
        </Link>
      </div>
      {!isAuthPage && (
      <nav className={styles.authLinksHeader}>
        {user == "admin" ? (
          <span className={styles.userIcon}>
            <PersonIcon fontSize="large" sx={{ color: "#FFF" }} />
          </span>
        ) : (
          <>
            <Link to="/Register" className={styles.authButton}>
              Crear Cuenta
            </Link>
            <Link to="/Login" className={styles.authButton}>
              Iniciar Sesión
            </Link>
          </>
        )}
      </nav>
         )}
    </header>
  );
};

export default Header;

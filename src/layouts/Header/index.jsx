import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../Header/Header.module.css";
import PersonIcon from "@mui/icons-material/Person";
import { Menu, X } from "lucide-react";

const Header = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
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
          {user === "admin" ? (
            <span className={styles.userIcon}>
              <PersonIcon fontSize="large" sx={{ color: "#FFF" }} />
            </span>
          ) : (
            <>
              <div className="hidden md:flex gap-4">
                <Link to="/Register" className={styles.authButton}>
                  Crear Cuenta
                </Link>
                <Link to="/Login" className={styles.authButton}>
                  Iniciar Sesión
                </Link>
              </div>
              <button
                className={styles.buttonMobile}
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </>
          )}
        </nav>
      )}

      <div className={`${styles.mobileMenu} ${isOpen ? styles.active : ""}`}>
        <button className={styles.closeButton} onClick={() => setIsOpen(false)}>
          <X size={24} />
        </button>
        <ul>
          <li>
            <Link to="/Register" className={styles.authButton} onClick={() => setIsOpen(false)}>
              Crear Cuenta
            </Link>
          </li>
          <li>
            <Link to="/Login" className={styles.authButton} onClick={() => setIsOpen(false)}>
              Iniciar Sesión
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;

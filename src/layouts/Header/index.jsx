import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../Header/Header.module.css";
import { useAuth } from "../../hooks/AuthContext";
import "react-initials-avatar/lib/ReactInitialsAvatar.css";
import ProfileMenu from "../../components/ProfileMenu";
import { Menu, X } from "lucide-react";

const Header = ({userType}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <header
      className={`${styles.header} ${
        userType === "ADMIN"
          ? styles.headerAdmin
          : styles.headerUser
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
          {user ? (
            <ProfileMenu/>
          ) : (
            <>
              <Link to="/register" className={styles.authButton}>
                <span className={styles.textBtn}>Crear Cuenta</span>
              </Link>
              <Link to="/login" className={styles.authButton}>
                <span className={styles.textBtn}>Iniciar Sesión</span>
              </Link>
              <button
              className={styles.buttonMobile}
              onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X size={24} /> : <Menu size={24}/>}
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

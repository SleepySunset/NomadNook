import { Link } from "react-router-dom";
import styles from "./AdminNav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";


library.add(fas, far, fab);

const AdminNav = ({ activeOpt }) => {
  return (
    <nav className={styles.navAdmin}>
      <ul className={styles.navMenu}>
        <Link to="/administracion">
          <li
            className={`${styles.navOpt} ${
              activeOpt === "home" ? styles.active : null
            }`}
          >
            <FontAwesomeIcon 
              icon={["fas", "arrow-left"]} 
              size="lg"
              style={{ 
                color: activeOpt === "home" ? "#bc6c25" : "#565656",
                fontSize: "1.5rem"
              }}
            />
            <span
              className={
                activeOpt === "home" ? styles.activeText : styles.navText
              }
            >
              Inicio
            </span>
          </li>
        </Link>
        <Link to="/administracion/cabinmanagement">
          <li
            className={`${styles.navOpt} ${
              activeOpt === "cabin" ? styles.active : null
            }`}
          >
            <FontAwesomeIcon 
              icon={["fas", "house"]} 
              size="lg"
              style={{ 
                color: activeOpt === "cabin" ? "#bc6c25" : "#565656",
                fontSize: "1.5rem"
              }}
            />
            <span
              className={
                activeOpt === "cabin" ? styles.activeText : styles.navText
              }
            >
              Gestión de cabañas
            </span>
          </li>
        </Link>
        <Link to="/administracion/usermanagement">
          <li
            className={`${styles.navOpt} ${
              activeOpt === "user" ? styles.active : null
            }`}
          >
            <FontAwesomeIcon 
              icon={["fas", "users"]} 
              size="lg"
              style={{ 
                color: activeOpt === "user" ? "#bc6c25" : "#565656",
                fontSize: "1.5rem"
              }}
            />
            <span
              className={
                activeOpt === "user" ? styles.activeText : styles.navText
              }
            >
              Gestión de usuarios
            </span>
          </li>
        </Link>
        <Link to="/administracion/featuresmanagement">
          <li
            className={`${styles.navOpt} ${
              activeOpt === "features" ? styles.active : null
            }`}
          >
            <FontAwesomeIcon 
              icon={["fas", "list-check"]} 
              size="lg"
              style={{ 
                color: activeOpt === "features" ? "#bc6c25" : "#565656",
                fontSize: "1.5rem"
              }}
            />
            <span
              className={
                activeOpt === "features" ? styles.activeText : styles.navText
              }
            >
              Gestión de características
            </span>
          </li>
        </Link>
        <Link to="/administracion/categoriesmanagement">
          <li
            className={`${styles.navOpt} ${
              activeOpt === "categories" ? styles.active : null
            }`}
          >
            <FontAwesomeIcon 
              icon={["fas", "list"]} 
              size="lg"
              style={{ 
                color: activeOpt === "categories" ? "#bc6c25" : "#565656",
                fontSize: "1.5rem"
              }}
            />
            <span
              className={
                activeOpt === "categories" ? styles.activeText : styles.navText
              }
            >
              Gestión de categorias
            </span>
          </li>
        </Link>
        {/* <li className={styles.navOpt}>
          <DateRangeIcon sx={{ color: "#565656" }} fontSize="small" />
          <span className={styles.navText}>Gestión de reservas</span>
        </li>

        <li className={styles.navOpt}>
          <QueryStatsIcon sx={{ color: "#565656" }} fontSize="small" />
          <span className={styles.navText}>Estadísticas y reportes</span>
        </li>
        <li className={styles.navOpt}>
          <SettingsIcon sx={{ color: "#565656" }} fontSize="small" />
          <span className={styles.navText}>Configuración del sitio</span>
        </li> */}
      </ul>
    </nav>
  );
};

export default AdminNav;

import CabinIcon from "@mui/icons-material/Cabin";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import SettingsIcon from "@mui/icons-material/Settings";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import styles from "./AdminNav.module.css";
import { Link } from "react-router-dom";

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
            <KeyboardBackspaceIcon
              sx={{ color: activeOpt === "home" ? "#bc6c25" : "#565656" }}
              fontSize="small"
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
            <CabinIcon
              sx={{ color: activeOpt === "cabin" ? "#bc6c25" : "#565656" }}
              fontSize="small"
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
        <li className={styles.navOpt}>
          <DateRangeIcon sx={{ color: "#565656" }} fontSize="small" />
          <span className={styles.navText}>Gestión de reservas</span>
        </li>
        <li className={styles.navOpt}>
          <AccountBalanceIcon sx={{ color: "#565656" }} fontSize="small" />
          <span className={styles.navText}>Gestión de pagos</span>
        </li>
        <li className={styles.navOpt}>
          <QueryStatsIcon sx={{ color: "#565656" }} fontSize="small" />
          <span className={styles.navText}>Estadísticas y reportes</span>
        </li>
        <li className={styles.navOpt}>
          <SettingsIcon sx={{ color: "#565656" }} fontSize="small" />
          <span className={styles.navText}>Configuración del sitio</span>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNav;

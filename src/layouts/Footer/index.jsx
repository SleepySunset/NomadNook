import { useLocation } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {

  const location = useLocation();
  const hideFooterPages = ["/login", "/register"];
  const isHidden = hideFooterPages.some((path) => location.pathname.startsWith(path));

  if (isHidden) {
    return null;
  }
  return (
    <footer className={styles.footer}>
      <div className={styles.logoContainer}>
        <img
          src="/white_full_logo.png"
          alt="White-logo"
          className={styles.whitelogo}
        />
        <p className={styles.text}>
          © {new Date().getFullYear()} Nomad Nook. Todos los derechos
          reservados.
        </p>
      </div>

      <div className={styles.socialContainer}>
        <ul className={styles.socialList}>
          <li>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img
                src="/instagram.png"
                alt="Instagram Logo"
                className={styles.socialIcon}
              />
            </a>
          </li>
          <li>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img
                src="/facebook.png"
                alt="Facebook Logo"
                className={styles.socialIcon}
              />
            </a>
          </li>
          <li>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img
                src="/whatsapp.png"
                alt="WhatsApp Logo"
                className={styles.socialIcon}
              />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;

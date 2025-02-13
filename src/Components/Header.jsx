import { Link } from "react-router-dom";
import "../Styles/header.css";

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <img src="/images/white_full_logo.png" alt="White-logo" className="whitelogo" />
         <h3>Viajar es vivir, hospedarte es sentir</h3>
        </ul>
      </nav>
      <div className="authLinks">
        <Link to="/CrearCuenta">Crear Cuenta</Link>
        <Link to="/IniciarSesion">Iniciar Sesión</Link>
      </div>
    </header>
  );
}

export default Header;
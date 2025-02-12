import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header>
        <Link to="/"><img src="" alt="Nomad Nook logo"></img></Link>
        <div>
            <button>Iniciar sesión</button>
            <button>Crear cuenta</button>
        </div>
    </header>
  )
}

export default Header

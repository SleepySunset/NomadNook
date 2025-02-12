import { Link } from "react-router-dom"

const AdminPanel = () => {
  return (
    <main>
        <h1>Bienvenido admin</h1>
        <ul>
            <li><Link to="/admin/cabinlist">Ver todas las cabañas</Link></li>

            {/* Componente dinamico que permite agregar cabaña nueva */}
            <li>Agregar cabaña</li>
            {/* Componente dinamico que permite buscar cabaña para eliminar */}
            <li>Eliminar cabaña</li>
        </ul>
      
    </main>
  )
}

export default AdminPanel

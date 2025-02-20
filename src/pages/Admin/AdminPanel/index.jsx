import { Link } from "react-router-dom"
import AddCabin from "@/components/AddCabin"
import { useState } from "react";

const AdminPanel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main>
        <h1>Bienvenido admin</h1>
        <ul>
            <li><Link to="/admin/cabinlist">Ver todas las cabañas</Link></li>

            {/* Componente dinamico que permite agregar cabaña nueva */}
            <li><button onClick={openModal}>Agregar cabaña</button></li>
            {/* Componente dinamico que permite buscar cabaña para eliminar */}
            <li>Eliminar cabaña</li>
        </ul>
        {isModalOpen && <AddCabin onClose={closeModal}/>}
      
    </main>
  )
}

export default AdminPanel

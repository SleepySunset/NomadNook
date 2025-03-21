import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./CategoriesTable.module.css";
import { ENDPOINTS } from "@/config/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { useAuth } from "@/hooks/AuthContext";
import Swal from "sweetalert2";
import UpdateFeature from "@/components/UpdateFeature";

library.add(fas, far, fab);

const getIconComponent = (iconName) => {
  try {
    const icon = library.definitions.fas[iconName] || 
                 library.definitions.far[iconName] || 
                 library.definitions.fab[iconName];
    
    if (icon) {
      return ["fas", iconName];
    }
    
    return ["fas", "question-circle"];
  } catch (error) {
    console.error("Error al verificar el icono:", error);
    return ["fas", "question-circle"];
  }
};

const CategoriesTable = () => {
  const [categories, setCategories] = useState([]);
  const { user } = useAuth();
  const [editingCategory, setEditingCategory] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(ENDPOINTS.GET_ALL_CATEGORIES);
      setCategories(response.data);
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
    }
  };

  const handleDelete = async (categoryId, categoryName) => {
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: `¿Deseas eliminar la categoría "${categoryName}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#bc6c25',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      });

      if (result.isConfirmed) {
        await axios.delete(`${ENDPOINTS.DELETE_CATEGORY}/${categoryId}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });

        await fetchCategories();

        Swal.fire({
          title: '¡Eliminada!',
          text: 'La característica ha sido eliminada correctamente.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      }
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo eliminar la categoría. Por favor, inténtalo de nuevo.',
        icon: 'error',
        confirmButtonColor: '#bc6c25'
      });
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
  };

  const handleCloseEdit = () => {
    setEditingCategory(null);
    fetchCategories(); 
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Icono</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td className={styles.iconCell}>
                <FontAwesomeIcon 
                  icon={getIconComponent(category.icono)}
                  size="lg" 
                  className={styles.icon} 
                />
              </td>
              <td>{category.nombre}</td>
              <td>
                <span 
                  className={styles.editBtn}
                  onClick={() => handleEdit(category)}
                >
                  <FontAwesomeIcon icon="fa-solid fa-pen" style={{ color: "#bc6c25", fontSize: "larger"}} />
                </span>
                <span 
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(category.id, category.nombre)}
                >
                  <FontAwesomeIcon icon="fa-solid fa-trash" style={{ color: "#bc6c25", fontSize: "larger" }} />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingCategory && (
        <UpdateFeature
          feature={editingCategory}
          onClose={handleCloseEdit}
        />
      )}
    </>
  );
};

export default CategoriesTable;

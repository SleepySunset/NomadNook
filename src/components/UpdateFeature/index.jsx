import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { useAuth } from "../../hooks/AuthContext";
import { Navigate } from "react-router-dom";
import styles from "./AddFeature.module.css";
import { ENDPOINTS } from "../../config/config";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fas, far, fab);

const getAvailableIcons = () => {
  const icons = [];
  
  Object.keys(library.definitions.fas || {}).forEach(iconName => {
    icons.push({
      name: iconName,
      prefix: "fas"
    });
  });

  Object.keys(library.definitions.far || {}).forEach(iconName => {
    icons.push({
      name: iconName,
      prefix: "far"
    });
  });
  
  Object.keys(library.definitions.fab || {}).forEach(iconName => {
    icons.push({
      name: iconName,
      prefix: "fab"
    });
  });
  
  return icons;
};

const UpdateFeature = ({ onClose, feature }) => {
  const [nombre, setNombre] = useState("");
  const [iconoSeleccionado, setIconoSeleccionado] = useState("");
  const [feedback, setFeedback] = useState({ tipo: "", mensaje: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [mostrarGaleria, setMostrarGaleria] = useState(false);
  const [busquedaIcono, setBusquedaIcono] = useState("");
  const [existingFeatures, setExistingFeatures] = useState([]);
  
  const { user, loading } = useAuth();

  useEffect(() => {
    if (feature) {
      setNombre(feature.nombre);
      setIconoSeleccionado(feature.icono);
    }
  }, [feature]);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await axios.get(ENDPOINTS.GET_ALL_FEATURES);
        setExistingFeatures(response.data);
      } catch (error) {
        console.error("Error al obtener las características:", error);
      }
    };

    if (user?.token) {
      fetchFeatures();
    }
  }, [user]);

  const iconosFiltrados = useMemo(() => {
    const todosLosIconos = getAvailableIcons();
    if (!busquedaIcono) {
      return todosLosIconos.slice(0, 50);
    }

    return todosLosIconos.filter(icono => 
      icono.name.toLowerCase().includes(busquedaIcono.toLowerCase())
    );
  }, [busquedaIcono]);

  useEffect(() => {
    if (!loading && !user?.token) {
      console.log("Usuario no autenticado");
    }
  }, [user, loading]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!user?.token) {
    return <Navigate to="/login" replace />;
  }

  let decoded;
  try {
    decoded = jwtDecode(user.token);
    if (decoded.role !== "ADMIN") {
      console.log("Acceso denegado. Rol actual:", decoded.role);
      return <Navigate to="/not-authorized" replace />;
    }
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return <Navigate to="/login" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFeedback({ tipo: "", mensaje: "" });

    if (!nombre.trim()) {
      setFeedback({ 
        tipo: "error", 
        mensaje: "El nombre es obligatorio" 
      });
      setIsLoading(false);
      return;
    }

    if (!iconoSeleccionado) {
      setFeedback({ 
        tipo: "error", 
        mensaje: "Debes seleccionar un icono" 
      });
      setIsLoading(false);
      return;
    }

    const nombreExiste = existingFeatures.some(
      f => f.nombre.toLowerCase() === nombre.toLowerCase() && f.id !== feature.id
    );

    if (nombreExiste) {
      setFeedback({ 
        tipo: "error", 
        mensaje: "Ya existe una característica con este nombre" 
      });
      setIsLoading(false);
      return;
    }

    try {
      if (!user?.token) {
        throw new Error("No hay token de autenticación");
      }

      const datos = {
        nombre: nombre,
        icono: iconoSeleccionado
      };

      await axios({
        method: "put",
        url: `${ENDPOINTS.UPDATE_FEATURE}/${feature.id}`,
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        },
        data: datos
      });

      Swal.fire({
        title: "¡Característica actualizada!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      onClose();

    } catch (error) {
      console.error("Error completo:", error);
      setFeedback({ 
        tipo: "error", 
        mensaje: error.response?.data?.mensaje || "Error al actualizar la característica" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const seleccionarIcono = (icono) => {
    setIconoSeleccionado(icono.name);
    setMostrarGaleria(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.modalContent}>
        <span className={styles.closeButton} onClick={onClose}>
          &times;
        </span>
        <h2 className={styles.title}>
          Editar característica
        </h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          {feedback.mensaje && (
            <div className={`${styles.feedback} ${styles[feedback.tipo]}`}>
              {feedback.mensaje}
            </div>
          )}
          
          <label className={styles.label}>Nombre de la característica</label>
          <input
            required
            className={styles.input}
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: WiFi, Piscina, etc."
          />

          <label className={styles.label}>Icono</label>
          <div className={styles.iconSelector}>
            {iconoSeleccionado ? (
              <div className={styles.selectedIcon}>
                <FontAwesomeIcon 
                  icon={["fas", iconoSeleccionado]} 
                  size="lg"
                  className={styles.iconPreview}
                />
                <button 
                  type="button" 
                  onClick={() => setIconoSeleccionado("")}
                  className={styles.removeIcon}
                >
                  Cambiar icono
                </button>
              </div>
            ) : (
              <button 
                type="button"
                onClick={() => setMostrarGaleria(true)}
                className={styles.selectIconButton}
              >
                Seleccionar icono
              </button>
            )}
          </div>

          {mostrarGaleria && (
            <div className={styles.iconGallery}>
              <div className={styles.galleryHeader}>
                <h3>Selecciona un icono</h3>
                <input
                  type="text"
                  placeholder="Buscar icono..."
                  value={busquedaIcono}
                  onChange={(e) => setBusquedaIcono(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
              <div className={styles.iconGrid}>
                {iconosFiltrados.map((icono) => (
                  <button
                    key={`${icono.prefix}-${icono.name}`}
                    type="button"
                    className={styles.iconButton}
                    onClick={() => seleccionarIcono(icono)}
                  >
                    <FontAwesomeIcon 
                      icon={[icono.prefix, icono.name]} 
                      size="lg"
                      className={styles.iconPreview}
                    />
                    <span className={styles.iconName}>{icono.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <button className={styles.submitBtn} type="submit" disabled={isLoading}>
            {isLoading ? "Guardando..." : "Actualizar característica"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateFeature;

import { useState, useEffect } from "react";
import { useAuth } from "../../../hooks/AuthContext";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import styles from "./CabinManagement.module.css";
import AdminNav from "../../../components/AdminNav";
import Searchbar from "../../../components/Searchbar";
import AddCabin from "@/components/AddCabin";
import CabinTable from "../../../components/CabinTable";

const CabinManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, loading } = useAuth();
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!user?.token) {
    console.log("No hay usuario autenticado:", user);
    return <Navigate to="/login" replace />;
  }else{
    console.log(user)
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

  return (
    <>
      <main className={styles.main}>
        <AdminNav activeOpt="cabin" />
        <div className={styles.container}>
          <div className={styles.upperContainer}>
            <Searchbar />
            <button className={styles.addCabinBtn} onClick={openModal}>
              Agregar cabaña
            </button>
            {isModalOpen && <AddCabin onClose={closeModal} />}
          </div>
          <CabinTable />
        </div>
      </main>
      <div className={styles.mobileWarning}>
        <p className={styles.warning}>
          El panel de administración no está disponible en dispositivos móviles
        </p>
      </div>
    </>
  );
};

export default CabinManagement;

import { useState, useEffect } from "react";

import styles from "./CabinManagement.module.css";
import AdminNav from "../../../components/AdminNav";
import Searchbar from "../../../components/Searchbar";
import AddCabin from "@/components/AddCabin";
import AdminTable from "../../../components/AdminTable";

const CabinManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
          <AdminTable />
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

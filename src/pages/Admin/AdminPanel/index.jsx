import styles from "./AdminPanel.module.css";
import AdminNav from "../../../components/AdminNav";

const AdminPanel = () => {
  return (
    <>
      <main className={styles.main}>
        <AdminNav activeOpt="home" />
        <div className={styles.container}>
          <h1>Bienvenido admin</h1>
          <p>Este es tu panel de administración</p>
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

export default AdminPanel;

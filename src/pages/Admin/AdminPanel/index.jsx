import styles from "./AdminPanel.module.css";
import AdminNav from "@/components/AdminNav";

const AdminPanel = () => {
  return (
    <>
      <main className={styles.main}>
        <AdminNav activeOpt="home" />
        <div className={styles.container}>
          <h1 className={styles.title}>Bienvenido admin</h1>
          <p className={styles.text}>Este es tu panel de administración. Aquí podrás gestionar de manera
            eficiente las cabañas registradas, las reservas realizadas y los pagos. En el menú lateral encontrarás
            las opciones correspondientes.
          </p>
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

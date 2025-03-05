import styles from "./AdminPanel.module.css";
import AdminNav from "@/components/AdminNav";
import { useAuth } from "../../../hooks/AuthContext";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AdminPanel = () => {
  const { user, loading } = useAuth();

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

    if (decoded.role !== "ROLE_ADMIN") {
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
        <AdminNav activeOpt="home" />
        <div className={styles.container}>
          <h1 className={styles.title}>Bienvenido admin</h1>
          <p className={styles.text}>
            Este es tu panel de administración. Aquí podrás gestionar de manera
            eficiente las cabañas registradas, las reservas realizadas y los pagos.
            En el menú lateral encontrarás las opciones correspondientes.
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

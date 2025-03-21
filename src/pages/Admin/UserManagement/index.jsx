import AdminNav from "../../../components/AdminNav";
import styles from "./UserManagement.module.css"
import UserTable from "../../../components/UserTable";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../../hooks/AuthContext";
import { Navigate } from "react-router-dom"

const UserManagement = () => {
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
            <AdminNav activeOpt="user" />
            <div className={styles.container}>
              <div className={styles.upperContainer}>
              </div>
              <UserTable/>
            </div>
          </main>
          <div className={styles.mobileWarning}>
            <p className={styles.warning}>
              El panel de administración no está disponible en dispositivos móviles
            </p>
          </div>
        </>
      );
}

export default UserManagement

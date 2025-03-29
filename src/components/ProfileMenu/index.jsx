import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";
import styles from "./ProfileMenu.module.css";
import { useState } from "react";
import Avatar from "react-initials-avatar";
import Swal from "sweetalert2";
import { Settings, LogOut, FolderHeart } from "lucide-react";

const ProfileMenu = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    Swal.fire({
      title: "Has cerrado sesión con éxito",
      text: "Nos vemos pronto. ¡Las mejores cabañas te esperan para tu próxima escapada!",
      icon: "success",
      timer: 3000,
      showConfirmButton: false,
    });
    navigate("/");
  };

  if (!user) {
    return null;
  }

  return (
    <div className={styles.profileWrapper}>
      {!isProfileMenuOpen && (
        <span className={styles.userIcon} onClick={handleAvatarClick}>
          <Avatar name={`${user.name} ${user.lastName}`} />
        </span>
      )}

{isProfileMenuOpen && (
        <div className={styles.profileContainer}>
          <div className={styles.profileHeader}>
            <Avatar name={`${user.name} ${user.lastName}`} className={styles.avatar} />
            <div className={styles.profileDetails}>
            </div>
            <div className={styles.userDetails}>
              <p className={styles.userName}>{user.name} {user.lastName}</p>
              <span className={styles.email}>{user.email}</span>
            
            </div>
          </div>
          
        <div className={styles.profileOptions}>
          {user.role === "ADMIN" && (
              <Link to="/administracion" className={styles.menuOption}>
              <Settings className={styles.optionIcon} size={20} />
              <span className={styles.optionText}>Ver panel de administración</span>
            </Link>
          )}

            <Link to="/favorite" className={styles.favorite}>
              <FolderHeart className={styles.favorite} size={20} />
              <span className={styles.optionText}>Mis favoritos</span>
            </Link>

          <div className={styles.logout} onClick={handleLogout}>
            <LogOut className={styles.optionIcon} size={20} />
            Cerrar sesión
          </div>
        </div>

          <span className={styles.close} onClick={handleAvatarClick}>
            &times;
          </span>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;

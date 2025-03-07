import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";
import styles from "./ProfileMenu.module.css";
import { useState } from "react";
import Avatar from "react-initials-avatar";

const ProfileMenu = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) {
    return null;
  }

  return (
    <div className={styles.profileWrapper}>
      <span className={styles.userIcon} onClick={handleAvatarClick}>
        <Avatar name={`${user.name} ${user.lastName}`} />
      </span>

      {isProfileMenuOpen && (
        <div className={styles.profileContainer}>
          <span className={styles.close} onClick={handleAvatarClick}>
            {" "}
            &times;
          </span>
          <span>{user.email}</span>
          <Avatar name={`${user.name} ${user.lastName}`} />
          <p>
            ¡Hola, {user.name} {user.lastName}!
          </p>
          {user.role == "ADMIN" && (
            <Link to="/administracion">
              <span className={styles.adminLink}>Ver panel de administración</span>
            </Link>
          )}
          <span className={styles.logout} onClick={handleLogout}>
            Cerrar sesión
          </span>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;

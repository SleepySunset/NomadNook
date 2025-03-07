import AdminNav from "../../../components/AdminNav";
import styles from "./UserManagement.module.css"
import Searchbar from "../../../components/Searchbar";
import UserTable from "../../../components/UserTable";

const UserManagement = () => {
    return (
        <>
          <main className={styles.main}>
            <AdminNav activeOpt="user" />
            <div className={styles.container}>
              <div className={styles.upperContainer}>
                <Searchbar />
                {/* <button className={styles.addCabinBtn} onClick={openModal}>
                  Agregar cabaña
                </button> */}
                {/* {isModalOpen && <AddCabin onClose={closeModal} />} */}
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

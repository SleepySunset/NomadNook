import Footer from "../Footer";
import Header from "../Header";
import { Outlet } from "react-router-dom";
import styles from "./LayoutAdmin.module.css";

const LayoutAdmin = () => {
  return (
    <div className={styles.layout}>
      <Header user={"admin"} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default LayoutAdmin;

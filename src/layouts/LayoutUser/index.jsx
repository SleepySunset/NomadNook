import Footer from "../Footer";
import Header from "../Header";
import { Outlet } from "react-router-dom";
import styles from './Layout.module.css'

const Layout = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;

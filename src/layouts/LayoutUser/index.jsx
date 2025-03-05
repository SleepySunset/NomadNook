import Footer from "../Footer";
import Header from "../Header";
import { Outlet, useLocation } from "react-router-dom";
import styles from './Layout.module.css';

const Layout = () => {
  const location = useLocation();
  const hideFooterPages = ["/login", "/register"];
  const isHidden = hideFooterPages.some((path) => location.pathname.startsWith(path));

  return (
    <div className={styles.layout}>
      <Header />
      <Outlet />
      {!isHidden && <Footer />}
    </div>
  );
};

export default Layout;

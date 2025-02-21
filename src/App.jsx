import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LayoutUser from "./layouts/LayoutUser";
import AdminPanel from "./pages/Admin/AdminPanel";
import CabinDetail from "./pages/CabinDetail";
import NotFound from "./pages/NotFound";
import CabinManagement from "./pages/Admin/CabinManagement";
import LayoutAdmin from "./layouts/LayoutAdmin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LayoutUser />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cabin/:id" element={<CabinDetail />} />
      </Route>
      <Route path="/" element={<LayoutAdmin />}>
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/cabinmanagement" element={<CabinManagement />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

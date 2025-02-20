import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Layout from "./layouts/Layout"
import AdminPanel from "./pages/Admin/AdminPanel"
import AdminCabinList from "./pages/Admin/CabinList"
import CabinDetail from "./pages/CabinDetail"
import NotFound from "./pages/NotFound"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/cabin/:id" element={<CabinDetail/>}/>
      </Route>
      <Route path="*" element={<NotFound/>}/>



      {/* Contexto administrador */}
      <Route path="/admin" element={<AdminPanel/>}/>
      <Route path="/admin/cabinlist" element={<AdminCabinList/>}/>
    </Routes>
  )
}

export default App


import React, { useState } from "react";
import styles from "./Home.module.css";
import response from "../../utils/response";
import Card from "../../components/Card";
import Categories from "../../components/Categories";
import Searchbar from "../../components/Searchbar";
import Pagination from "../../components/Pagination"; 

const Home = () => {
  
  const [paginaActual, setPaginaActual] = useState(1);
  const cabinasPorPagina = 10; 

  const cabinas = response ? [...response].sort(() => Math.random() - 0.5) : [];
  const totalCabinas = cabinas.length;
  const totalPaginas = Math.ceil(totalCabinas / cabinasPorPagina);

  const inicio = (paginaActual - 1) * cabinasPorPagina;
  const fin = inicio + cabinasPorPagina;
  const cabinasPagina = cabinas.slice(inicio, fin);

  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };

  return (
    <main className={styles.home}>
      <Categories />
      <Searchbar />

      <div className={styles.cabinGallery}>
        {cabinasPagina.map((cabin) => (
          <Card
            key={cabin.id}
            id={cabin.id}
            title={cabin.titulo}
            description={cabin.descripcion}
            images={cabin.imagenes}
            pricePerNight={cabin.precioPorNoche}
          />
        ))}
      </div>

      <Pagination
        paginaActual={paginaActual}
        totalPaginas={totalPaginas}
        cambiarPagina={cambiarPagina}
      />
    </main>
  );
};

export default Home;

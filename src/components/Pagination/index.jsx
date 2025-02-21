import React from "react";
import styles from "./Pagination.module.css"; 

const Pagination = ({ paginaActual, totalPaginas, cambiarPagina }) => {
  return (
    <div className={styles.paginacion}>
      <button
        onClick={() => cambiarPagina(1)}
        disabled={paginaActual === 1}
      >
        Inicio
      </button>
      <button
        onClick={() => cambiarPagina(paginaActual - 1)}
        disabled={paginaActual === 1}
      >
        Anterior
      </button>

      <div className={styles.contador}>
        {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((pagina) => (
          <button
            key={pagina}
            onClick={() => cambiarPagina(pagina)}
            className={pagina === paginaActual ? styles.paginaActiva : ""}
          >
            {pagina}
          </button>
        ))}
      </div>

      <button
        onClick={() => cambiarPagina(paginaActual + 1)}
        disabled={paginaActual === totalPaginas}
      >
        Siguiente
      </button>
      <button
        onClick={() => cambiarPagina(totalPaginas)}
        disabled={paginaActual === totalPaginas}
      >
        Última
      </button>
    </div>
  );
};

export default Pagination;
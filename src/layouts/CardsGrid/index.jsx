import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import styles from "./CardsGrid.module.css";
import Card from "@/components/Card";

const CardsGrid = ({cabins, allCabins, onToggleFavorite}) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [pageCabins, setPageCabins] = useState([]);
  const productsPerPage = 10;

  useEffect(() => {
    setCurrentPage(0);
  }, [cabins]);
  
  const handlePageChange = (data) => {
    setCurrentPage(data.selected);
  };

  const getCabinsForCurrentPage = () => {
    const startIndex = currentPage * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const res = cabins.slice(startIndex, endIndex);
    return res;
  };

  useEffect(()=>{
    setPageCabins(getCabinsForCurrentPage());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  return (
    <div className={styles.container}>
      {allCabins.length > cabins.length && (
        <h3 className={styles.counter}>
          {cabins.length} de {allCabins.length} alojamientos
        </h3>
      )}
        <div className={styles.cardsContainer}>
          {(pageCabins.length > 0)? (
            getCabinsForCurrentPage().map((cabin) => (
            <Card
                key={cabin.id}
                id={cabin.id}
                title={cabin.titulo}
                ubicacion={cabin.ubicacion}
                images={cabin.imagenes}
                pricePerNight={cabin.precioPorNoche}
                isFavorite={cabin.isFavorite}
                onToggleFavorite={() => onToggleFavorite(cabin)}
            />))
          ) : (
            Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className={styles.cardSkeleton}>
                <div className={styles.img} style={{animationDelay: `${i * 50}ms`}}></div>
                <div className={styles.title} style={{animationDelay: `${i * 40}ms`}}></div>
                <div className={styles.price} style={{animationDelay: `${i * 50}ms`}}></div>
              </div>
            ))
          )}  
        </div>
        <ReactPaginate
        previousLabel={'Back'}
        nextLabel={'Next'}
        pageCount={Math.ceil(cabins.length / productsPerPage)}
        onPageChange={handlePageChange}
        containerClassName={styles.pagination} 
        activeClassName={styles.activePage} 
        pageClassName={styles.pageItem}         
        previousClassName={styles.previousButton}
        nextClassName={styles.nextButton}         
        disabledClassName={styles.disabledButton}
      />
    </div>
  );
};

export default CardsGrid;

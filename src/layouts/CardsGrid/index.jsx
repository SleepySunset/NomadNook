import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import styles from "./CardsGrid.module.css";
import Card from "@/components/Card";

const CardsGrid = ({cabins, selectedCategories}) => {
        const [currentPage, setCurrentPage] = useState(0)
        const [filteredCabins, setFilteredCabins] = useState([]);
        const [pageCabins, setPageCabins] = useState([]);
        const productsPerPage = 10;

        useEffect(() => {
          if (selectedCategories.length > 0) {
            const filtered = cabins.filter(cabin => 
              cabin.categorias.some(category => selectedCategories.includes(category.id))
            );
            setFilteredCabins(filtered);
            setCurrentPage(0);
          } else {
            setFilteredCabins(cabins);
          }
        }, [selectedCategories, cabins]);
        
        const handlePageChange = (data) => {
          setCurrentPage(data.selected);
        };
      
        const getCabinsForCurrentPage = () => {
          const startIndex = currentPage * productsPerPage;
          const endIndex = startIndex + productsPerPage;
      
          return filteredCabins.slice(startIndex, endIndex);
        };
        useEffect(()=>{
          setPageCabins(getCabinsForCurrentPage());
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [currentPage, filteredCabins])

  return (
    <div className={styles.container}>
      {selectedCategories.length > 0 && (
        <h3 className={styles.counter}>
          {filteredCabins.length} de {cabins.length} alojamientos
        </h3>
      )}
        <div className={styles.cardsContainer}>
          {(pageCabins.length > 0)? (
            pageCabins.map((cabin) => (
            <Card
                key={cabin.id}
                id={cabin.id}
                title={cabin.titulo}
                description={cabin.descripcion}
                images={cabin.imagenes}
                pricePerNight={cabin.precioPorNoche}
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
        pageCount={Math.ceil(filteredCabins.length / productsPerPage)}
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

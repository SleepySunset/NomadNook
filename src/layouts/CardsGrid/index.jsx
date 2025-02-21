import { useState } from "react";
import ReactPaginate from "react-paginate";
import styles from "./CardsGrid.module.css";
import Card from "@/components/Card";

const CardsGrid = ({cabins}) => {

        const [currentPage, setCurrentPage] = useState(0)
        const productsPerPage = 10;
        
        const handlePageChange = (data) => {
          setCurrentPage(data.selected);
        };
      
        const getCabinsForCurrentPage = () => {
          const startIndex = currentPage * productsPerPage;
          const endIndex = startIndex + productsPerPage;
      
          return cabins.slice(startIndex, endIndex);
        };
  return (
    <div className={styles.container}>
        <div className={styles.cardsContainer}>
            {getCabinsForCurrentPage().map((cabin) => (
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

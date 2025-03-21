import styles from "./Home.module.css";
import Categories from "@/components/Categories";
import Searchbar from "@/components/Searchbar";
import CardsGrid from "@/layouts/CardsGrid";
import axios from "axios";
import { useState, useEffect } from "react";
import { ENDPOINTS } from '../../config/config';

const Home = () => {
  const [allCabins, setAllCabins] = useState([]);
  const [displayedCabins, setDisplayedCabins] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [dateRange, setDateRange] = useState({ checkIn: null, checkOut: null });
  const [byDate, setByDate] = useState(false)

  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener todas las cabañas
  useEffect(() => {
    const fetchCabins = async () => {
      try {
        setIsLoading(true);
        const response = await axios(ENDPOINTS.GET_ALL_CABINS);
        const cabinsData = response.data.sort(() => Math.random() - 0.5);
        setAllCabins(cabinsData);
        setDisplayedCabins(cabinsData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error al obtener las cabañas:", error);
        setError("Error al cargar las cabañas. Por favor, intenta nuevamente más tarde.");
        setIsLoading(false);
      }
    };

    const fetchCabinsByDate = async () => {
      try {
        setIsLoading(true);
        const response = await axios(ENDPOINTS.GET_CABINS_BY_DATE_RANGE(dateRange.checkIn, dateRange.checkOut));
        const cabinsData = response.data.sort(() => Math.random() - 0.5);
        setAllCabins(cabinsData);
        setDisplayedCabins(cabinsData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error al obtener las cabañas:", error);
        setError("Error al cargar las cabañas. Por favor, intenta nuevamente más tarde.");
        setIsLoading(false);
      }
    };
    
    byDate?fetchCabinsByDate():fetchCabins();
  }, [byDate, dateRange]);

  // Extraer categorías únicas
  useEffect(() => {
    if (!allCabins || allCabins.length === 0) return;
    
    const categoriesMap = new Map();
    allCabins.forEach(cabin => {
      if (cabin.categorias && Array.isArray(cabin.categorias)) {
        cabin.categorias.forEach(category => {
          if (category && category.id) {
            categoriesMap.set(category.id, category);
          }
        });
      }
    });
    setCategories(Array.from(categoriesMap.values()));
  }, [allCabins]);

  // Aplicar filtros cuando cambien los criterios
  useEffect(() => {
    let results = [...allCabins];
// Filtrar por categorías seleccionadas
if (selectedCategories && selectedCategories.length > 0) {
  results = results.filter(cabin => 
    cabin.categorias && Array.isArray(cabin.categorias) &&
    cabin.categorias.some(category => 
      selectedCategories.includes(category.id)
    )
  );
  setDisplayedCabins(results);
}else{
  setDisplayedCabins(results)
}
  }, [allCabins,selectedCategories, ]);




  const handleSearchTermChange = (term) => {
    setSearchTerm(term);
  };
  const handleSubmit = (e)=>{
    e.preventDefault()
    try {
      let results = [...allCabins];
      // Filtrar por disponibilidad de fechas
      if(dateRange.checkIn && dateRange.checkOut){
        setByDate(true)
      }else{
        setByDate(false)
      }

      // Filtrar por término de búsqueda
      if (searchTerm && searchTerm.trim() !== "") {
        const term = searchTerm.toLowerCase();
        results = results.filter(cabin => 
          (cabin.titulo && cabin.titulo.toLowerCase().includes(term)) ||
          (cabin.descripcion && cabin.descripcion.toLowerCase().includes(term)) ||
          (cabin.ubicacion && cabin.ubicacion.toLowerCase().includes(term))
        );
      }

      

      console.log("fechas")
      console.log(dateRange)


      console.log("results")
      console.log(results)
      setDisplayedCabins(results);
    } catch (err) {
      console.error("Error al filtrar cabañas:", err);
      // Si hay un error en el filtrado, mostramos todas las cabañas
      setDisplayedCabins(allCabins);
    }
  }

  const handleDateRangeChange = (startDate, endDate) => {
    setDateRange({ startDate, endDate });
  };

  return (
    <main className={styles.home}>
      <Categories 
        categories={categories} 
        selectedCategories={selectedCategories} 
        setSelectedCategories={setSelectedCategories} 
      />
      <Searchbar 
        setDates={setDateRange}
        selectedDates={dateRange}
        onSearchTermChange={handleSearchTermChange}
        handleSubmit={handleSubmit}
      />
      {isLoading ? (
        <div className={styles.loadingContainer || ""}>
          <p>Cargando cabañas...</p>
        </div>
      ) : error ? (
        <div className={styles.errorContainer || ""}>
          <p>{error}</p>
        </div>
      ) : displayedCabins.length > 0 ? (
        <CardsGrid 
          cabins={displayedCabins}
          allCabins={allCabins}
        />
      ) : (
        <div className={styles.noResultsContainer || ""}>
          <p>No se encontraron cabañas que coincidan con tu búsqueda.</p>
        </div>
      )}
    </main>
  );
};

export default Home;
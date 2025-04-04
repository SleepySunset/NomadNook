import styles from "./Home.module.css";
import Categories from "@/components/Categories";
import Searchbar from "@/components/Searchbar";
import CardsGrid from "@/layouts/CardsGrid";
import axios from "axios";
import { useState, useEffect } from "react";
import { ENDPOINTS } from '../../config/config';
import WhatsAppFloatButton from "../../components/WhatsApp";
import { useApiFavorites } from "@/hooks/useApiFavorites";

const Home = () => {
  const [allCabins, setAllCabins] = useState([]);
  const [displayedCabins, setDisplayedCabins] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [dateRange, setDateRange] = useState({ checkIn: null, checkOut: null });
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { favorites, toggleFavorite } = useApiFavorites();

  // Obtener todas las cabañas
  useEffect(() => {
    const fetchCabins = async () => {
      try {
        setIsLoading(true);
        const response = await axios(ENDPOINTS.GET_ALL_CABINS);
        const cabinsData = response.data.sort(() => Math.random() - 0.5).map(cabin => ({
          ...cabin,
          isFavorite: favorites.some(fav => fav.id === cabin.id)
        }));
        setAllCabins(cabinsData);
        setDisplayedCabins(cabinsData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error al obtener las cabañas:", error);
        setError("Error al cargar las cabañas. Por favor, intenta nuevamente más tarde.");
        setIsLoading(false);
      }
    };

    fetchCabins();
  }, [favorites]); // Add favorites as dependency

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
    applyFilters();
  }, [allCabins, selectedCategories, dateRange, searchTerm]);

  const handleSearchTermChange = (term) => {
    setSearchTerm(term);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    applyFilters();
  };

  const applyFilters = async () => {
    try {
      setIsLoading(true);
      let results = [...allCabins];

      // Filtrar por categorías seleccionadas
      if (selectedCategories && selectedCategories.length > 0) {
        results = results.filter(cabin => 
          cabin.categorias && Array.isArray(cabin.categorias) &&
          cabin.categorias.some(category => 
            selectedCategories.includes(category.id)
          )
        );
      }

      // Filtrar por disponibilidad de fechas
      if (dateRange.checkIn && dateRange.checkOut) {
        const response = await axios(ENDPOINTS.GET_CABINS_BY_DATE_RANGE(dateRange.checkIn, dateRange.checkOut));
        const availableCabins = response.data;
        results = results.filter(cabin => availableCabins.some(availableCabin => availableCabin.id === cabin.id));
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

      setDisplayedCabins(results);
      setIsLoading(false);
    } catch (err) {
      console.error("Error al filtrar cabañas:", err);
      setDisplayedCabins(allCabins);
      setIsLoading(false);
    }
  };

  

  // // Modify the fetchCabins function inside the first useEffect
  // useEffect(() => {
  //   const fetchCabins = async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await axios(ENDPOINTS.GET_ALL_CABINS);
  //       const cabinsData = response.data.sort(() => Math.random() - 0.5).map(cabin => ({
  //         ...cabin,
  //         isFavorite: favorites.some(fav => fav.id === cabin.id)
  //       }));
  //       setAllCabins(cabinsData);
  //       setDisplayedCabins(cabinsData);
  //       setIsLoading(false);
  //     } catch (error) {
  //       console.error("Error al obtener las cabañas:", error);
  //       setError("Error al cargar las cabañas. Por favor, intenta nuevamente más tarde.");
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchCabins();
  // }, [favorites]); // Add favorites as dependency

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

      <WhatsAppFloatButton />
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
          onToggleFavorite={toggleFavorite}
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
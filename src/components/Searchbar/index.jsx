import SearchIcon from '@mui/icons-material/Search';
import Calendar from "../Calendar/Calendar";
import { useState, useEffect, useRef } from "react";
import styles from "./Searchbar.module.css";

const Searchbar = ({ onSearchTermChange, handleSubmit, setDates }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Opciones fijas de sugerencias
  const fixedSuggestions = ["Departamento", "Cabaña", "Lujo", "Casa", "Mar del plata"];
  

  const suggestionsRef = useRef(null);
  const searchInputRef = useRef(null);
  const searchbarContainerRef = useRef(null);

  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  const formatDate = (date) => {
    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return null;
  };
  useEffect(()=>{
    const formattedCheckIn = formatDate(checkIn);
    const formattedCheckOut = formatDate(checkOut);

    if (formattedCheckIn && formattedCheckOut) {
      console.log('Fecha de Check-in:', formattedCheckIn);
      console.log('Fecha de Check-out:', formattedCheckOut);
      // Aquí puedes retornar o utilizar las fechas formateadas como necesites
      setDates({ checkIn: formattedCheckIn, checkOut: formattedCheckOut });
    } else {
      console.log('Por favor, selecciona ambas fechas.');
      setDates({ checkIn: null, checkOut: null });
    }
  },[checkIn, checkOut, setDates])
  


  

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Verificar si el clic fue dentro del contenedor principal del searchbar
      const isClickInsideSearchbar = searchbarContainerRef.current?.contains(event.target);
      
      // Manejar clic fuera del calendario
      
      // Manejar clic fuera de las sugerencias
      if (
        !suggestionsRef.current?.contains(event.target) &&
        !searchInputRef.current?.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
      
      // Si el clic es fuera del searchbar completamente, cerrar todo
      if (!isClickInsideSearchbar) {
        setShowSuggestions(false);

      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  

  

  
  // Función para filtrar sugerencias basadas en el término de búsqueda
  const filterSuggestions = (term) => {
    if (!term || term.length < 1) {
      // Si no hay término, mostrar todas las sugerencias fijas
      return fixedSuggestions;
    }
    
    const lowerTerm = term.toLowerCase();
    
    // Filtrar las sugerencias fijas que coincidan con el término
    return fixedSuggestions.filter(suggestion => 
      suggestion.toLowerCase().includes(lowerTerm)
    );
  };
  
  // Manejar cambios en el término de búsqueda
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    // Filtrar las sugerencias basadas en el término de búsqueda
    const filteredSuggestions = filterSuggestions(term);
    setSuggestions(filteredSuggestions);
    
    // Solo mostrar sugerencias si hay coincidencias
    setShowSuggestions(filteredSuggestions.length > 0);
    
    // Si se abre sugerencias, cerrar calendario
    
    // Notificar al componente padre sobre el cambio en el término de búsqueda
    if (onSearchTermChange) {
      onSearchTermChange(term);
    }
  };
  
  // Manejar la selección de una sugerencia
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    
    // Notificar al componente padre sobre la selección
    if (onSearchTermChange) {
      onSearchTermChange(suggestion);
    }
  };
  
  // Mostrar sugerencias al hacer clic en el campo de búsqueda
  const handleInputFocus = () => {
    const filteredSuggestions = filterSuggestions(searchTerm);
    if (filteredSuggestions.length > 0) {
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    }
  };
  
  return (
<div className={styles.searchbarContainer} ref={searchbarContainerRef}>
  <form 
    className={styles.form} 
    role="search" 
    aria-label="Buscar"
    onSubmit={handleSubmit}
  >
    {/* Campo de búsqueda */}
    <div className={styles.inputWrapper}>
      <SearchIcon style={{ color: "#bc6c25", marginRight: "8px" }} />
      <input
        className={styles.input}
        type="search"
        id="search"
        name="q"
        placeholder="Buscar"
        value={searchTerm}
        onChange={handleSearchChange}
        onFocus={handleInputFocus}
        autoComplete="off"
        ref={searchInputRef}
      />

      {/* Sugerencias fijas */}
      {showSuggestions && (
        <ul className={styles.suggestionsList} ref={suggestionsRef}>
          {suggestions.map((suggestion, index) => (
            <li 
              key={index} 
              className={styles.suggestionItem}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>

    {/* Selector de fechas */}
    <div className={styles.inputWrapper}>
      <Calendar 
        setCheckIn={setCheckIn} 
        checkIn={checkIn} 
        checkOut={checkOut} 
        setCheckOut={setCheckOut} 
      />
    </div>

    {/* Botón de búsqueda */}
    <button type="submit" className={styles.icon}>
      Buscar
    </button>
  </form>
</div>
  );
};

export default Searchbar;
import { useState, useEffect } from "react";
import styles from "./Favorite.module.css";
import Card from "../../components/Card/index";
import { useApiFavorites } from "../../hooks/useApiFavorites";

const Favorite = () => {
  const { favorites, toggleFavorite, isAuthenticated } = useApiFavorites();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
    console.log(favorites); // Agrega este console.log para verificar si se está llamando correctamente la funció
  }, [favorites]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Mis Favoritos</h2>
      {!isAuthenticated ? (
        <p>Debes iniciar sesión para ver tus favoritos.</p>
      ) : isLoading ? (
        <p>Cargando favoritos...</p>
      ) : favorites.length === 0 ? (
        <p>No tienes favoritos aún.</p>
      ) : (
        <div className={styles.cardList}>
          {favorites.map((cabin) => (
            <Card
            key={cabin.id}
            id={cabin.id}
            title={cabin.titulo}
            ubicacion={cabin.ubicacion}
            images={cabin.imagenes}
            pricePerNight={cabin.precioPorNoche}
            isFavorite={true}
            onToggleFavorite={() => toggleFavorite(cabin)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorite;

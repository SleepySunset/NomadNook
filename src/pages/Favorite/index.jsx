import { useState, useEffect } from "react";
import styles from "./Favorite.module.css";
import Card from "../../components/Card/index";

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);


  const removeFromFavorites = (id) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Mis Favoritos</h2>
      {favorites.length === 0 ? (
        <p>No tienes favoritos aún.</p>
      ) : (
        <div className={styles.cardList}>
          {favorites.map((cabin) => (
            <Card
              key={cabin.id}
              {...cabin}
              removeFromFavorites={removeFromFavorites}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorite;

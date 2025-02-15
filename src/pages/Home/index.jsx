import React from "react";
import styles from "./Home.module.css";

const categories = [
  { name: "Playa", icon: "/playas.png" },
  { name: "Montaña", icon: "/montana.png" },
  { name: "Nevadas", icon: "/nevadas.png" },
  { name: "Selva", icon: "/selva.png" },
  { name: "Bosques", icon: "/bosques.png" },
  { name: "Campo", icon: "/campo.png" },
];

const Home = () => {
  return (
    <main className={styles.home}>
      <h1 className={styles.title}>Descubrí tu próximo destino</h1>

      <div className={styles.categoriesContainer}>
        <div className={styles.categories}>
          {categories.map((category, index) => (
            <button key={index} className={styles.categoryButton}>
              <img src={category.icon} alt={category.name} className={styles.categoryIcon} />
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.imageGallery}>
        <img src="/cabanasCampos.jpeg" alt="Lugar 1" className={styles.image} />
        <img src="/cabanasNevadas.jpeg" alt="Lugar 2" className={styles.image} />
        <img src="/cabanasPlaya.jpeg" alt="Lugar 3" className={styles.image} />
        <img src="/cabanasBosque.jpeg" alt="Lugar 4" className={styles.image} />
        <img src="/cabanasMontanas.jpeg" alt="Lugar 5" className={styles.image} />
        <img src="/cabanasSelva.jpeg" alt="Lugar 6" className={styles.image} />
      </div>
    </main>
  );
};

export default Home;

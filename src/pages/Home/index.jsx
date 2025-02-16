import styles from "./Home.module.css";
import response from "../../utils/response";
import Card from "../../components/Card";
import Categories from "../../components/Categories"
import Searchbar from "../../components/Searchbar";

const Home = () => {
  const randomCabins = response
  ? [...response].sort(() => Math.random() - 0.5).slice(0, 10)
  : [];

  return (
    <main className={styles.home}>
      
      <Categories/>
      <Searchbar/>
      
      <div className={styles.cabinGallery}>
        {randomCabins.map((cabin) => (
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
      
    </main>
  );
};

export default Home;

import styles from "./Home.module.css";
import response from "../../utils/response";
import Categories from "@/components/Categories"
import Searchbar from "@/components/Searchbar";
import CardsGrid from "@/layouts/CardsGrid";

const Home = () => {
  const cabins = response
  ? [...response].sort(() => Math.random() - 0.5)
  : [];


  return (
    <main className={styles.home}>
      
      <Categories/>
      <Searchbar/>
      <CardsGrid cabins={cabins}/>
      
    </main>
  );
};

export default Home;

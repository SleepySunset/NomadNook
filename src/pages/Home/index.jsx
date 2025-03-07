import styles from "./Home.module.css";
import Categories from "@/components/Categories"
import Searchbar from "@/components/Searchbar";
import CardsGrid from "@/layouts/CardsGrid";
import axios from "axios";
import { useState, useEffect } from "react";
import { ENDPOINTS } from '../../config/config';

const Home = () => {
  const [cabins, setCabins] = useState([])
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchCabins = async () => {
      try {
        const response = await axios(ENDPOINTS.GET_ALL_CABINS);
        setCabins(response.data.sort(() => Math.random() - 0.5));
      } catch (error) {
        console.error("Error al obtener las cabañas:", error);
      }
    };

    fetchCabins();
  }, []);

  useEffect(() => {
    const categoriesMap = new Map();
    
    cabins.forEach(cabin => {
      cabin.categorias.forEach(category => {
        categoriesMap.set(category.id, category);
      });
    });

    setCategories(Array.from(categoriesMap.values()));
  }, [cabins]);

  return (
    <main className={styles.home}>
      <Categories categories={categories} selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
      <Searchbar />
      <CardsGrid cabins={cabins} selectedCategories={selectedCategories} />
    </main>
  );
};

export default Home;

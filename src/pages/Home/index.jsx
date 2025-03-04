import styles from "./Home.module.css";
import Categories from "@/components/Categories"
import Searchbar from "@/components/Searchbar";
import CardsGrid from "@/layouts/CardsGrid";
import axios from "axios";
import { useState, useEffect } from "react";

const Home = () => {
  const [data, setData] = useState([])
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const END_POINT = "https://nomadnook-nomadnook.up.railway.app/api/alojamientos/listarTodos";

  useEffect(() => {
    axios(END_POINT).then((res) => {
      setData(res.data);
    });
  }, []);
  const addCategories = () => data.map( (cabin) => {
    if (cabin.tipo && !categories.includes(cabin.tipo)) {
      setCategories([...categories,  cabin.tipo]);
    }
    return ;
  });
  addCategories();
  const cabins = data
  ? [...data].sort(() => Math.random() - 0.5)
  : [];


  return (
    <main className={styles.home}>
      
      <Categories categories={categories} selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}/>
      <Searchbar/>
      <CardsGrid cabins={cabins} selectedCategories={selectedCategories}/>
      
    </main>
  );
};

export default Home;

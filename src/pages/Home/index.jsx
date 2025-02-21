import styles from "./Home.module.css";
import Categories from "@/components/Categories"
import Searchbar from "@/components/Searchbar";
import CardsGrid from "@/layouts/CardsGrid";
import axios from "axios";
import { useState, useEffect } from "react";

const Home = () => {
  const [data, setData] = useState([])
  const END_POINT = "https://nomadnook-nomadnook.up.railway.app/api/alojamientos/listarTodos";

  useEffect(() => {
    axios(END_POINT).then((res) => {
      setData(res.data);
      console.log(res.data);
    });
  }, []);
  const cabins = data
  ? [...data].sort(() => Math.random() - 0.5)
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

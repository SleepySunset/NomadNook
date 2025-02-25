import styles from "./Searchbar.module.css"
import SearchIcon from '@mui/icons-material/Search';

const Searchbar = () => {
  return (
    <form className={styles.form} role="search" aria-label="Buscar en el sitio">
        <label  className={styles.label} htmlFor="search"></label>
        <input className={styles.input} type="search" id="search" name="q" placeholder="¿Qué estás buscando?" ></input>
        <button type="submit" className={styles.icon}><SearchIcon/></button>
    </form>
  )
}

export default Searchbar

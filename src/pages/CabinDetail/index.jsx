import styles from "./CabinDetail.module.css";
import response from "../../utils/response.js"
const CabinDetail = () => {
  return (
    <main
   className= {styles.detallesCabina}>
    <div className={styles.contenedortitulo}> 
    <div>
     <h1 className={styles.titulo}>cabaña 1
    </h1>
      </div> 
      <div>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
      </div>
    </div>
    
      
      <div className={
        styles.detalles
      }> 
        <div>
        <img className={styles.imgproducto} src="https://i.pinimg.com/736x/1e/cd/62/1ecd6278162634cd0ce118b7d898a7aa.jpg"
       alt="" />
        </div>
        <div><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi quidem molestias maxime vitae, eum sint excepturi culpa consectetur suscipit quos earum veniam eaque molestiae, fugit eius reprehenderit accusamus nemo quibusdam.</p></div>
      </div>
     
      
       
    </main>
  )
}

export default CabinDetail

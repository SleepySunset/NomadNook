import styles from "./Categories.module.css"

const Categories = () => {

    const categories = [
      { name: "Playa", icon: "/playas.png" },
      { name: "Montaña", icon: "/montana.png" },
      { name: "Nevada", icon: "/nevadas.png" },
      { name: "Selva", icon: "/selva.png" },
      { name: "Bosques", icon: "/bosques.png" },
      { name: "Campo", icon: "/campo.png" },
    ];
  return (
    <div className={styles.categoriesContainer}>
        <div className={styles.categories}>
          {categories.map((category, index) => (
            <button key={index} className={styles.categoryButton}>
              <img
                src={category.icon}
                alt={category.name}
                className={styles.categoryIcon}
              />
              {category.name}
            </button>
          ))}
        </div>
      </div>
  )
}

export default Categories

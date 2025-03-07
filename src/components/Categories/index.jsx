import styles from "./Categories.module.css"

const Categories = ({categories, selectedCategories, setSelectedCategories}) => {
    const toggleSelected = (category) => {
      if (selectedCategories.includes(category.id)) {
        setSelectedCategories(selectedCategories.filter((selectedCategory) => selectedCategory !== category.id));
      } else {
        setSelectedCategories([...selectedCategories, category.id]);
      }
    }
  return (
    <div className={styles.categoriesContainer}>
        <div className={styles.categories}>
          {categories.map((category, index) => (
            <button key={index} style={{animationDelay:  `${index * 70}ms`}} className={`${styles.categoryButton} ${selectedCategories.includes(category.id) && styles.selected}`} onClick={() => toggleSelected(category)}>
              {category.nombre}
            </button>
          ))}
          {selectedCategories.length > 0 && (
            <button className={styles.clearButton} onClick={() => setSelectedCategories([])}>x</button>
          )}
        </div>
      </div>
  )
}

export default Categories

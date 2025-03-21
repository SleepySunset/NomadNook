import { useState } from "react";
import styles from "./ImageUploader.module.css";

const MAX_FILES = 5;
const MAX_SIZE = 180 * 1024;

const ImageUploader = ({ onImagesSelected }) => {
  const [previews, setPreviews] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [error, setError] = useState("");

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);

    
    if (selectedFiles.length + files.length > MAX_FILES) {
      setError(`Solo puedes subir hasta ${MAX_FILES} imágenes.`);
      return;
    }

    const validFiles = files.filter((file) => file.size <= MAX_SIZE);
    if (validFiles.length !== files.length) {
      setError(`Cada imagen debe pesar máximo 180 KB.`);
      return;
    }

    const newPreviews = validFiles.map((file) => URL.createObjectURL(file));
    
    setSelectedFiles((prevFiles) => {
      const updatedFiles = [...prevFiles, ...validFiles];
      onImagesSelected(updatedFiles);
      return updatedFiles;
    });
    setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);


    onImagesSelected([...selectedFiles, ...validFiles]);
  };

  return (
    <>
      <input type="file" accept="image/*" multiple onChange={handleImageChange} />
      
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.imagePreviewerContainer}>
        {previews.map((src, index) => (
          <img key={index} src={src} alt={`Preview ${index}`} style={{ width: "100px", height: "100px", objectFit: "cover" }} />
        ))}
      </div>
    </>
  );
};

export default ImageUploader;

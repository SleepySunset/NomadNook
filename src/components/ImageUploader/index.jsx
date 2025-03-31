import { useState, useRef, useEffect } from "react";
import styles from "./ImageUploader.module.css";

const MAX_FILES = 5;
const MAX_SIZE = 180 * 1024;

const ImageUploader = ({ onImagesSelected }) => {
  const [previews, setPreviews] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

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

    event.target.value = "";
  };

  const handleDeletePreview = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
    setSelectedFiles(updatedFiles);
    onImagesSelected(updatedFiles);


    if (updatedFiles.length === 0 && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 5000);

      return () => clearTimeout(timer); 
    }
  }, [error]);

  return (
    <>
      <input
        type="file"
        accept="image/*"
        multiple
        ref={fileInputRef}
        onChange={handleImageChange}
        className={styles.hiddenInput}
      />

      <button
      type="button"
        className={styles.uploadButton}
        onClick={() => fileInputRef.current.click()}
      >
        {selectedFiles.length > 0
          ? `${selectedFiles.length} archivo(s) seleccionado(s)`
          : "Seleccionar imágenes"}
      </button>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.imageContainer}>
        {previews.map((src, index) => (
          <div key={index} className={styles.imageInputContainer}>
            <img
              src={src}
              alt={`Preview ${index}`}
              className={styles.imageSize}
            />
            <span
              className={styles.close}
              onClick={() => handleDeletePreview(index)}
            >
              &times;
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default ImageUploader;

'use client'
import { createContext, useState, useEffect, useContext } from 'react';

// Creación del contexto
export const ImageContext = createContext();

// Proveedor de contexto
export const ImageProvider = ({ children }) => {
  const [images, setImages] = useState([]);

  // Cargar las imágenes almacenadas en localStorage
  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem('images'));
    if (storedImages) {
      setImages(storedImages);
    }
  }, []);

  // Función para agregar una nueva imagen
  const addImage = (image) => {
    const updatedImages = [...images, image];
    setImages(updatedImages);
    localStorage.setItem('images', JSON.stringify(updatedImages));
  };

  return (
    <ImageContext.Provider value={{ images, addImage }}>
      {children}
    </ImageContext.Provider>
  );
};

// Hook personalizado para acceder al contexto
export const useImageContext = () => useContext(ImageContext);

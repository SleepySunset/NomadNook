import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "./AuthContext";

export function useFavorite({ id, title, ubicacion, images, pricePerNight, removeFromFavorites }) {
  const [favorite, setFavorite] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAuthenticated = !!user?.token;

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isFav = storedFavorites.some((fav) => fav.id === id);
    setFavorite(isFav);
  }, [id]);

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      Swal.fire({
        title: "¡Atención!",
        icon: "info",
        iconColor: "var(--color1)",
        html: `Para agregar a favoritos, primero debes identificarte.`,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: "Identificarme",
        confirmButtonColor: "var(--color4)",
        cancelButtonText: "Omitir",
        cancelButtonColor: "#444",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      return;
    }

    let updatedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorite) {
      updatedFavorites = updatedFavorites.filter((fav) => fav.id !== id);
      removeFromFavorites && removeFromFavorites(id);
    } else {
      updatedFavorites.push({ id, title, ubicacion, images, pricePerNight });
    }
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
    
        Toast.fire({
            icon: favorite ? "error" : "success",
            title: favorite
              ? "Favorito eliminado"
              : "Favorito añadido con éxito",
          });

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorite(!favorite);
  };

  return { favorite, toggleFavorite };
}
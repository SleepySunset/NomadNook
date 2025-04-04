import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";
import { ENDPOINTS } from "../config/config";
import Swal from "sweetalert2";

export function useApiFavorites() {
  const [favorites, setFavorites] = useState([]);
  const { user } = useAuth();
  const isAuthenticated = !!user?.token;

  const fetchFavorites = async () => {
    if (!isAuthenticated) return;
    try {
      const response = await axios.get((ENDPOINTS.GET_ALL_FAVORITES+"/"+user?.id), {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setFavorites(response.data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const toggleFavorite = async (cabin) => {
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
      });
      return false;
    }

    try {
      const isFavorite = favorites.some(fav => fav.id === cabin.id);
      const endpoint = isFavorite ? ENDPOINTS.REMOVE_FAVORITE : ENDPOINTS.ADD_FAVORITE;
      const method = isFavorite? "delete" : "post";
      await axios({
        method: method,
        url: endpoint,
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        data: {
          alojamiento_id: cabin.id,
          usuario_id:user?.id,
        },
      });

      await fetchFavorites();

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      
      Toast.fire({
        icon: isFavorite ? "error" : "success",
        title: isFavorite ? "Favorito eliminado" : "Favorito añadido con éxito",
      });

      return !isFavorite;
    } catch (error) {
      console.error("Error toggling favorite:", error);
      return false;
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchFavorites();
    }
  }, [isAuthenticated]);

  return { favorites, toggleFavorite, isAuthenticated };
}
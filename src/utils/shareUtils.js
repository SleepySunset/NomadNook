import Swal from "sweetalert2";

export const shareOnSocial = (e, platform, title, url) => {
  e.preventDefault();
  e.stopPropagation();

  const message = `Descubrí este rincón increíble para una escapada perfecta. Su nombre es ${title}. ¿Más información?: ${url}`;

  switch (platform) {
    case "whatsapp":
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`, "_blank");
      break;
    case "copy":
      alert("Instagram no admite compartir directamente links. Copiá y compartí el enlace manualmente: " + url);
      break;
    case "x":
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`, "_blank");
      break;
    case "facebook":
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        "_blank"
      );
      break;
    default:
      alert("Red social no válida.");
  }
};

export const copyToClipboard = (e, url) => {
  e.preventDefault();
  e.stopPropagation();

  navigator.clipboard.writeText(url).then(() => {
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
      icon: "success",
      title: "Enlace copiado al portapapeles",
    });
  }).catch((err) => console.error("Error al copiar:", err));
};

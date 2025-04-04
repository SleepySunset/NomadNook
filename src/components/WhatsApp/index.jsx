import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import Swal from "sweetalert2";
import styles from "./WhatsApp.module.css";

const WhatsAppFloatButton = ({ defaultMessage = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(defaultMessage);
  const [isNearBottom, setIsNearBottom] = useState(false);

  const phoneNumber = import.meta.env.VITE_WHATSAPP_PHONE_NUMBER;

  const handleSend = () => {
    if (!message.trim()) return;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");

    Swal.fire({
      icon: "success",
      title: "Mensaje enviado",
      text: "¡Gracias por contactarnos! Tu mensaje será respondido a la brevedad.",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#bc6c25",
    });

    setMessage(defaultMessage);
    setIsOpen(false);
  };
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      // Detecta cuando estamos a 100px del final
      const isNear = (documentHeight - (scrollTop + windowHeight)) <= 100;
      setIsNearBottom(isNear);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
    {isOpen && 
      <div className={styles.whatsapp} onClick={()=>setIsOpen(false)}>
      </div>
    }
      
      <div className={`${styles.container} ${isNearBottom ? styles.containerAtBottom : ''}`}>
        {isOpen && (
          <div className={styles.widget}>
            <div className={styles.header}>
              <FaWhatsapp className={styles.icon} size={24} />
              <div>
                <strong>Nomad Nook</strong>
                <p className={styles.subtext}>Envíanos tu consulta</p>
              </div>
            </div>
            <textarea
              className={styles.textarea}
              placeholder="Escribí tu mensaje..."
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleSend} className={styles.sendButton}>
              Enviar por WhatsApp
            </button>
          </div>
        )}
      
        <button onClick={() => setIsOpen(!isOpen)} className={styles.floatButton}>
          <FaWhatsapp size={28} />
        </button>
      </div>
      </>
  );
};

export default WhatsAppFloatButton;

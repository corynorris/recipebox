import { useState } from "react";
import type { ReactNode } from "react";

interface CardProps {
  image: string;
  title: string;
  children: ReactNode;
}

const styles = {
  card: {
    position: "relative" as const,
    display: "inline-block",
    boxShadow:
      "0 4px 16px rgba(44, 24, 16, 0.1), 0 1px 4px rgba(44, 24, 16, 0.06)",
    transition: "all 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
    maxHeight: "400px",
    overflow: "hidden",
    borderRadius: "12px",
    background: "white",
    border: "1px solid #E8DCC8",
    cursor: "pointer",
  },
  cardHover: {
    transform: "translateY(-6px)",
    boxShadow:
      "0 16px 40px rgba(44, 24, 16, 0.15), 0 4px 12px rgba(44, 24, 16, 0.08)",
    borderColor: "#C8D6B9",
  },
  accent: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    height: "3px",
    background: "linear-gradient(90deg, #C73E1D 0%, #E8B83A 50%, #5B7B45 100%)",
    opacity: 0,
    transition: "opacity 0.35s ease",
    zIndex: 2,
    borderRadius: "12px 12px 0 0",
    pointerEvents: "none" as const,
  },
  accentHover: {
    opacity: 1,
  },
  img: {
    width: "100%",
    display: "block",
    transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
  },
  imgHover: {
    transform: "scale(1.05)",
  },
  imgOverlay: {
    position: "absolute" as const,
    inset: 0,
    background:
      "linear-gradient(to bottom, transparent 40%, rgba(44, 24, 16, 0.06) 100%)",
    pointerEvents: "none" as const,
    transition: "opacity 0.35s ease",
    opacity: 0,
  },
  imgOverlayHover: {
    opacity: 1,
  },
  details: {
    padding: "1rem",
    background: "white",
  },
  divider: {
    height: "1px",
    margin: "0 0 12px 0",
    background: "linear-gradient(90deg, transparent, #E8DCC8, transparent)",
  },
  header: {
    position: "relative" as const,
    overflow: "hidden",
  },
  title: {
    position: "absolute" as const,
    bottom: "0",
    margin: "0 0 0.6rem 0",
    padding: "0.6rem 0.8rem",
    background: "rgba(255, 248, 240, 0.88)",
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)",
    color: "#2C1810",
    fontFamily: "Lora, Georgia, serif",
    fontSize: "1rem",
    fontWeight: 600,
    borderTopRightRadius: "8px",
    transition: "padding-left 0.3s ease",
  },
  titleHover: {
    paddingLeft: "1.1rem",
  },
};

const Card = ({ image, title, children }: CardProps) => {
  const [hovered, setHovered] = useState(false);

  const cardStyle = {
    ...styles.card,
    ...(hovered ? styles.cardHover : {}),
  };
  const accentStyle = {
    ...styles.accent,
    ...(hovered ? styles.accentHover : {}),
  };
  const imgStyle = {
    ...styles.img,
    ...(hovered ? styles.imgHover : {}),
  };
  const overlayStyle = {
    ...styles.imgOverlay,
    ...(hovered ? styles.imgOverlayHover : {}),
  };
  const titleStyle = {
    ...styles.title,
    ...(hovered ? styles.titleHover : {}),
  };

  return (
    <article
      style={cardStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={accentStyle} />
      <header style={styles.header}>
        <img
          src={import.meta.env.BASE_URL + image}
          style={imgStyle}
          alt={title}
        />
        <div style={overlayStyle} />
        <h3 style={titleStyle}>{title}</h3>
      </header>
      <section style={styles.details}>
        <div style={styles.divider} />
        {children}
      </section>
    </article>
  );
};

export default Card;

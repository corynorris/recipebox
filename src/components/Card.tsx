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
    boxShadow: "0 4px 16px rgba(44, 24, 16, 0.1), 0 1px 4px rgba(44, 24, 16, 0.06)",
    transition: "all 0.3s ease",
    maxHeight: "400px",
    overflow: "hidden",
    borderRadius: "12px",
    background: "white",
    border: "1px solid #E8DCC8",
  },
  img: {
    width: "100%",
    display: "block",
  },
  details: {
    padding: "1rem",
    background: "white",
  },
  header: {
    position: "relative" as const,
  },
  title: {
    position: "absolute" as const,
    bottom: "0",
    margin: "0 0 0.6rem 0",
    padding: "0.6rem 0.8rem",
    background: "rgba(255, 248, 240, 0.88)",
    color: "#2C1810",
    fontFamily: "Lora, Georgia, serif",
    fontSize: "1rem",
    fontWeight: 600,
    borderTopRightRadius: "8px",
  },
};

const Card = ({ image, title, children }: CardProps) => {
  return (
    <article style={styles.card}>
      <header style={styles.header}>
        <img
          src={import.meta.env.BASE_URL + image}
          style={styles.img}
          alt={title}
        />
        <h3 style={styles.title}>{title}</h3>
      </header>
      <section style={styles.details}>{children}</section>
    </article>
  );
};

export default Card;

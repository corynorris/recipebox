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
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    transition: "0.3s",
    maxHeight: "400px",
    overflow: "hidden",
  },
  img: {
    width: "100%",
  },
  details: {
    padding: "1rem",
  },
  header: {
    position: "relative" as const,
  },
  title: {
    position: "absolute" as const,
    bottom: "0",
    margin: "0 0 0.6rem 0",
    padding: "0.6rem",
    background: "rgba(255,255,255, 0.8)",
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

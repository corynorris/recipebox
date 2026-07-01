import PropTypes from "prop-types";
import React from "react";

const styles = {
  card: {
    position: "relative",
    display: "inline-block",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    transition: "0.3s",
    maxHeight: "400px",
    overflow: "hidden"
  },
  img: {
    width: "100%"
  },
  details: {
    padding: "1rem"
  },
  header: {
    position: "relative"
  },
  title: {
    position: "absolute",
    bottom: "0",
    margin: "0 0 0.6rem 0",
    padding: "0.6rem",
    background: "rgba(255,255,255, 0.8)"
  }
};

const Card = (props) => {
  return (
    <article style={styles.card}>
      <header style={styles.header}>
        <img
          src={import.meta.env.BASE_URL + props.image}
          style={styles.img}
          alt={props.title}
        />
        <h3 style={styles.title}>{props.title}</h3>
      </header>
      <section style={styles.details}>{props.children}</section>
    </article>
  );
};

Card.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string
};

export default Card;

import React from "react";
import PropTypes from "prop-types";

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

class Card extends React.Component {
  render() {
    return (
      <article style={styles.card}>
        <header style={styles.header}>
          <img
            src={this.props.image}
            style={styles.img}
            alt={this.props.title}
          />
          <h3 style={styles.title}>{this.props.title}</h3>
        </header>
        <section style={styles.details}>{this.props.children}</section>
      </article>
    );
  }
}

Card.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string
};

export default Card;

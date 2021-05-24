import React from "react";
import styles from "./ProductSummaryCard.module.css";
import classnames from "classnames";

export default function ProductSummaryCard(props) {
  return (
    <section
      className={classnames(
        styles.root,
        props.className,
        props.highlightable && styles.highlightable
      )}
    >
      <img
        className={styles.thumbnail}
        src={props.thumbnailImage}
        alt={"An image of " + props.name}
      />
      <h3 className={styles.title}>{props.name}</h3>
      <div className={styles.shortDesc}>{props.shortDescription}</div>
      <div className={styles.price}>{props.price}</div>
    </section>
  );
}

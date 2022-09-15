// Import React
import React from "react";

// Next components
import Image from "next/image";

// Styles
import styles from "../../styles/List.module.css";
import ToggleButton from "react-bootstrap/ToggleButton";

// Element returns what should be displayed for each element of the list
export default function Element({ element = element }) {
  return (
    <div className={styles.element}>
      <Image
        src={element.imgSrc}
        alt={element.imgAlt}
        height={84}
        width={120}
      />

      <div className={styles.txt}>
        <h1>{element.name}</h1>
        <p>{element.muscleGroups.join(", ")}</p>
      </div>

      <div className={styles.star}>
        <input
          type="image"
          src="/images/starFilled.png"
          height={40}
          width={40}
          alt="star"
        ></input>
      </div>
    </div>
  );
}

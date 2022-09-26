// Import React
import React, { useState } from "react";

// Next components
import Image from "next/image";

// Styles
import styles from "../../styles/List.module.css";

const star = "/images/star.png";
const starFilled = "/images/starFilled.png";

// Element returns what should be displayed for each element of the list
export default function Element({ element }) {
  // State of the image that is displayed as the favorite button
  const [imgPath, setImgPath] = useState(star);

  // Event handler if the favorite button is clicked on
  const toggleStar = (e) => {
    e.preventDefault();
    imgPath == star ? setImgPath(starFilled) : setImgPath(star);
  };

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
        <form>
          <input
            type="image"
            src={imgPath}
            height={38}
            width={38}
            alt="star"
            onClick={toggleStar}
          ></input>
        </form>
      </div>
    </div>
  );
}

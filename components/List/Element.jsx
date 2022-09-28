// Import React
import React, { useState } from 'react';

// Next components
import Image from 'next/image';

// Styles
import styles from '../../styles/List.module.css';

// Element returns what should be displayed for each element of the list
export default function Element({ element, onClick }) {
  // Images to use for the star
  const star = '/images/star.png';
  const starFilled = '/images/starFilled.png';

  // State of the image that is displayed as the favourite button
  const [imgPath, setImgPath] = useState(star);

  // Event handler if the favourite button is clicked on
  const toggleStar = (e) => {
    e.preventDefault();
    imgPath == star ? setImgPath(starFilled) : setImgPath(star);
  };

  return (
    <div className={styles.element} onClick={onClick}>
      <Image
        src={element.imgSrc}
        alt={element.imgAlt}
        height={84}
        width={120}
      />

      <div className={styles.txt}>
        <h1>{element.name}</h1>
        <p>{element.muscleGroups.join(', ')}</p>
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

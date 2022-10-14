// React
import React, { useState } from 'react';

// Next components
import Image from 'next/image';

// Styles
import styles from '../../styles/List.module.css';

const star = '/images/star.png';
const starFilled = '/images/starFilled.png';

export default function ElementTest({ element, type }) {
  // State of the image that is displayed as the favourite button
  const [imgPath, setImgPath] = useState(star);

  // Event handler if the favourite button is clicked on
  const toggleStar = (e) => {
    e.preventDefault();
    if (imgPath === star) {
      setImgPath(starFilled);
    } else {
      setImgPath(star);
    }
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
          />
        </form>
      </div>
    </div>
  );
}

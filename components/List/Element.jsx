// React
import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// Next components
import Image from 'next/image';

// Firebase
import { collection, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase-config';

// Custom components
import EditButton from '../EditButton/EditButton';
import SignInView from '../Profile/SignInView';

// Styles
import styles from '../../styles/Element.module.css';

// Authentication
import { useAuth } from '../../context/authUserContext';

// Get reference to users collection
const usersCollectionRef = collection(db, 'users');

function ElementEditButton({ element, onDelete, type }) {
  if (type === 'exercises') {
    return (
      <EditButton
        type="exercise"
        id={element.id}
        name={element.name}
        onDelete={onDelete}
      />
    );
  }

  if (type === 'workouts') {
    return (
      <EditButton
        type="workout"
        id={element.id}
        name={element.name}
        onDelete={onDelete}
      />
    );
  }

  if (type.includes('user')) {
    return (
      <EditButton
        type="user"
        id={element.id}
        name={element.name}
        onDelete={onDelete}
      />
    );
  }
  return null;
}

export default function Element({
  element,
  type,
  onDelete,
  testAuth,
  canEdit,
}) {
  /* Paths of the images of the favourite button */
  const star = '/images/star.png';
  const starFilled = '/images/starFilled.png';

  /* State of the image that is displayed as the favourite button */
  const [imgPath, setImgPath] = useState(star);

  /* Authenticate users for favourites */
  const { authUser } = useAuth();
  const [currUser, setCurrUser] = useState(null);
  useEffect(() => {
    if (testAuth !== undefined) {
      setCurrUser(testAuth);
    } else {
      setCurrUser(authUser);
    }
  }, [authUser, testAuth]);

  const [allowEditing, setAllowEditing] = useState(false);
  useEffect(() => {
    if (currUser) {
      if (currUser.role === 0 && canEdit) {
        setAllowEditing(true);
      }
    }
  }, [canEdit, currUser]);

  useEffect(() => {
    /* Set the state of the favourite button based on the user's favourites */
    const setFavouriteButton = () => {
      if (currUser) {
        if (type === 'workouts') {
          if (currUser.favouriteWorkouts.includes(element.id)) {
            setImgPath(starFilled);
          } else {
            setImgPath(star);
          }
        }

        if (type === 'exercises') {
          if (currUser.favouriteExercises.includes(element.id)) {
            setImgPath(starFilled);
          } else {
            setImgPath(star);
          }
        }
      } else {
        setImgPath(star);
      }
    };
    setFavouriteButton();
  }, [currUser, element.id, type]);

  const updateFavWorkouts = async (newFavs) => {
    currUser.favouriteWorkouts = newFavs;
    const docRef = doc(usersCollectionRef, currUser.uid);
    await updateDoc(docRef, {
      favouriteWorkouts: newFavs,
    });
  };

  const updateFavExercises = async (newFavs) => {
    currUser.favouriteExercises = newFavs;
    const docRef = doc(usersCollectionRef, currUser.uid);
    await updateDoc(docRef, {
      favouriteExercises: newFavs,
    });
  };

  const removeFavWorkout = (elem) => {
    const newFavs = currUser.favouriteWorkouts.filter((val) => val !== elem);
    updateFavWorkouts(newFavs);
  };

  const addToFavWorkouts = async (elem) => {
    currUser.favouriteWorkouts.push(elem);
    updateFavWorkouts(currUser.favouriteWorkouts);
  };

  const removeFavExercise = async (elem) => {
    const newFavs = currUser.favouriteExercises.filter((val) => val !== elem);
    updateFavExercises(newFavs);
  };

  const addToFavExercises = async (elem) => {
    currUser.favouriteExercises.push(elem);
    updateFavExercises(currUser.favouriteExercises);
  };

  // State to keep track of whether to show sign in view
  const [show, setShow] = useState(false);

  // Event handler when the favourite button is clicked on
  const toggleStar = (e) => {
    e.preventDefault();
    if (currUser) {
      if (type === 'workouts') {
        if (currUser.favouriteWorkouts.includes(element.id)) {
          removeFavWorkout(element.id);
          setImgPath(star);
        } else {
          addToFavWorkouts(element.id);
          setImgPath(starFilled);
        }
      }
      if (type === 'exercises') {
        if (currUser.favouriteExercises.includes(element.id)) {
          removeFavExercise(element.id);
          setImgPath(star);
        } else {
          addToFavExercises(element.id);
          setImgPath(starFilled);
        }
      }
    } else {
      // If not logged in, show sign up sidebar
      setShow('true');
    }
  };

  const makeMuscles = () => {
    let str = '';
    for (let i = 0; i < element.muscleGroups.length; i += 1) {
      str += `${element.muscleGroups[i]}, `;
    }
    return str.slice(0, str.length - 2);
  };

  return (
    <>
      <Row className={styles.element}>
        <Col xs={3}>
          <div className={styles.thumbimg}>
            <Image
              src={element.imgSrc}
              alt={element.imgAlt}
              width="100%"
              height="100%"
              objectFit="cover"
              objectPosition="top"
            />
          </div>
        </Col>

        <Col xs={7}>
          <div className={styles.txt}>
            <h1>{element.name}</h1>
            <p>{makeMuscles()}</p>
          </div>
        </Col>

        {allowEditing ? (
          <Col xs={2} className={styles.buttonsedit}>
            <div className={styles.star}>
              <form>
                <input
                  title="favourite"
                  type="image"
                  src={imgPath}
                  alt="star"
                  width={40}
                  height={40}
                  onClick={toggleStar}
                />
              </form>
              <ElementEditButton
                element={element}
                onDelete={onDelete}
                type={type}
              />
            </div>
          </Col>
        ) : (
          <Col xs={2} className={styles.buttons}>
            <div className={styles.star}>
              <form>
                <input
                  title="favourite"
                  type="image"
                  src={imgPath}
                  alt="star"
                  width={40}
                  height={40}
                  onClick={toggleStar}
                />
              </form>
            </div>
          </Col>
        )}
      </Row>
      <SignInView show={show} setShow={setShow} />
    </>
  );
}

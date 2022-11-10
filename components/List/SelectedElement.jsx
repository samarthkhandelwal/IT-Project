// React
import React, { useState, useEffect } from 'react';

// Next components
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

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

/**
 * A special component to display the selected element different to the others
 * @param {*} element The exercise or a workout to display
 * @param {*} type The type of element, i.e. exercise or workout
 * @param {*} onDelete A function that handles how the exercise or workout is deleted from the database
 * @param {*} onClick A function that handles when the element is clicked
 */
export default function Element({ element, type, onDelete, onClick }) {
  /* Paths of the images of the favourite button */
  const star = '/images/star.png';
  const starFilled = '/images/starFilled.png';

  /* State of the image that is displayed as the favourite button */
  const [imgPath, setImgPath] = useState(star);

  /* Authenticate users for favourites */
  const { authUser } = useAuth();

  const [allowEditing, setAllowEditing] = useState(false);
  useEffect(() => {
    if (authUser) {
      if (authUser.role === 0) {
        setAllowEditing(true);
      }
    }
  }, [authUser]);

  useEffect(() => {
    /* Set the state of the favourite button based on the user's favourites */
    const setFavouriteButton = () => {
      if (authUser) {
        if (type === 'workouts') {
          if (authUser.favouriteWorkouts.includes(element.id)) {
            setImgPath(starFilled);
          } else {
            setImgPath(star);
          }
        }

        if (type === 'exercises') {
          if (authUser.favouriteExercises.includes(element.id)) {
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
  }, [authUser, element.id, type]);

  const updateFavWorkouts = async (newFavs) => {
    authUser.favouriteWorkouts = newFavs;
    const docRef = doc(usersCollectionRef, authUser.uid);
    await updateDoc(docRef, {
      favouriteWorkouts: newFavs,
    });
  };

  const updateFavExercises = async (newFavs) => {
    authUser.favouriteExercises = newFavs;
    const docRef = doc(usersCollectionRef, authUser.uid);
    await updateDoc(docRef, {
      favouriteExercises: newFavs,
    });
  };

  const removeFavWorkout = (elem) => {
    const newFavs = authUser.favouriteWorkouts.filter((val) => val !== elem);
    updateFavWorkouts(newFavs);
  };

  const addToFavWorkouts = async (elem) => {
    authUser.favouriteWorkouts.push(elem);
    updateFavWorkouts(authUser.favouriteWorkouts);
  };

  const removeFavExercise = async (elem) => {
    const newFavs = authUser.favouriteExercises.filter((val) => val !== elem);
    updateFavExercises(newFavs);
  };

  const addToFavExercises = async (elem) => {
    authUser.favouriteExercises.push(elem);
    updateFavExercises(authUser.favouriteExercises);
  };

  // State to keep track of whether to show sign in view
  const [show, setShow] = useState(false);

  // Event handler when the favourite button is clicked on
  const toggleStar = (e) => {
    e.preventDefault();
    if (authUser) {
      if (type === 'workouts') {
        if (authUser.favouriteWorkouts.includes(element.id)) {
          removeFavWorkout(element.id);
          setImgPath(star);
        } else {
          addToFavWorkouts(element.id);
          setImgPath(starFilled);
        }
      }
      if (type === 'exercises') {
        if (authUser.favouriteExercises.includes(element.id)) {
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
        <Col xs={10} onClick={onClick}>
          <div className={styles.stxt}>
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

// React
import React, { useEffect, useState } from 'react';

// Next components
import { useRouter } from 'next/router';

// Bootstrap components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// Firebase
import {
  updateDoc,
  doc,
  query,
  getDocs,
  limit,
  collection,
  where,
} from 'firebase/firestore';
import { db } from '../../../firebase-config';

// Custom components
import CustomAlert from '../../../components/EditButton/CustomAlert';
import TopNavbar from '../../../components/Navbar/Navbar';

// Styles
import styles from '../../../styles/EditButton.module.css';

import { useAuth } from '../../../context/authUserContext';

// A form used for both creating and editing exercises
function AdminForm() {
  const router = useRouter();

  const { authUser } = useAuth();

  /* Handles state for the exercise */
  const [account, setAccount] = useState(null);

  const [email, setEmail] = useState(null);

  const [loaded, setLoaded] = useState(false);

  /* Handles state for the alert */
  const [isAlertActive, setAlertActive] = useState({});
  const handleAlertOpen = ({ heading, body, variant }) => {
    setAlertActive({ heading, body, variant });
  };
  const handleAlertClose = () => {
    setAlertActive({});
  };

  useEffect(() => {
    if (!authUser || authUser.role !== 0) {
      router.push('/exercises');
    }
    const getUser = async () => {
      if (email !== null) {
        const q = query(
          collection(db, 'users'),
          where('email', '==', email),
          limit(1)
        );
        const data = await getDocs(q);
        data.forEach((e) => {
          setAccount(e.id);
        });
        setLoaded(true);
      }
    };

    getUser();
  }, [email, authUser, router]);

  useEffect(() => {
    if (loaded) {
      if (account !== null) {
        updateDoc(doc(db, 'users', account), { role: 0 })
          .then(() => {
            handleAlertOpen({
              heading: 'Success!',
              body: `Admin was added successfully. Redirecting...`,
              variant: 'success',
            });
            setTimeout(() => {
              router.push('/exercises');
            }, 3000);
          })
          .catch(() => {
            handleAlertOpen({
              heading: 'Error',
              body: 'Failed to create Admin. Try again later...',
              variant: 'danger',
            });
          });
      } else {
        handleAlertOpen({
          heading: 'Error',
          body: 'Account does not exist.',
          variant: 'danger',
        });
      }
    }
  }, [loaded, account, router]);

  /* Handles the submission of forms. */
  const handleSubmit = async (event) => {
    /* Prevent automatic submission and refreshing of the page. */
    event.preventDefault();

    setEmail(event.target.accountEmail.value);
  };

  const displayAlert = ({ heading, body, variant }) => {
    if (heading && body && variant) {
      return (
        <CustomAlert
          heading={heading}
          body={body}
          variant={variant}
          onClose={handleAlertClose}
        />
      );
    }
    return null;
  };

  return (
    <div className={styles.form}>
      <h2>Add Admin</h2>

      <Form onSubmit={handleSubmit} action="/api/exercise" method="post">
        <Form.Group>
          <Form.Label>Account email</Form.Label>
          <Form.Control
            id="accountEmail"
            type="text"
            placeholder="username@email.com"
          />
        </Form.Group>

        <Button variant="primary" type="submit" className={styles.btncenter}>
          Add Admin
        </Button>
      </Form>

      {displayAlert(isAlertActive)}
    </div>
  );
}

export default function AddAdminPage() {
  return (
    <>
      <TopNavbar />
      {/* TODO: Preview of changes on side. */}
      <div className={styles.main}>
        <AdminForm />
      </div>
    </>
  );
}

// React
import React from 'react';

// Bootstrap components
import Toast from 'react-bootstrap/Toast';

// Styles
import styles from '../../styles/Crud.module.css';

export default function DeleteToast({ title, body, error, onClose }) {
  if (error !== undefined) {
    return (
      <div className={styles.toasterror}>
        <Toast onClose={onClose}>
          <Toast.Header>
            <strong className="me-auto">{title}</strong>
          </Toast.Header>
          <Toast.Body>{error}</Toast.Body>
        </Toast>
      </div>
    );
  }

  return (
    <div className={styles.toast}>
      <Toast onClose={onClose}>
        <Toast.Header>
          <strong className="me-auto">{title}</strong>
        </Toast.Header>
        <Toast.Body>{body}</Toast.Body>
      </Toast>
    </div>
  );
}

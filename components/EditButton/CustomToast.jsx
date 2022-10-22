// React
import React from 'react';

// Bootstrap components
import Toast from 'react-bootstrap/Toast';

// Styles
import styles from '../../styles/EditButton.module.css';

export default function CustomToast({ title, body, error, onClose }) {
  return (
    <div className={styles.toast}>
      <Toast onClose={onClose}>
        <Toast.Header>
          <strong className="me-auto">{title}</strong>
        </Toast.Header>
        <Toast.Body>{error !== undefined ? error : body}</Toast.Body>
      </Toast>
    </div>
  );
}

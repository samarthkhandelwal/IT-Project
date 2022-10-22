// React
import React from 'react';

// Bootstrap components
import Alert from 'react-bootstrap/Alert';

export default function CustomAlert({ heading, body, variant, onClose }) {
  return (
    <Alert variant={variant} onClose={onClose} dismissible>
      <Alert.Heading>{heading}</Alert.Heading>
      <p>{body}</p>
    </Alert>
  );
}

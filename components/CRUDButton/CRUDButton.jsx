// React
import React from 'react';

// Bootstrap components
import Button from 'react-bootstrap/Button';

export default function CRUDButton({ text, onClick }) {
  return (
    <Button variant="primary" onClick={onClick}>
      {text}
    </Button>
  );
}

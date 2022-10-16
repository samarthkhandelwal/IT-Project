import React from 'react';

function verifyURL(link) {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = link.match(regExp);
  return match && match[7].length === 11 ? match[7] : false;
}

export default function YouTube({ link }) {
  if (link) {
    return (
      <iframe
        width="100%"
        height="60%"
        src={`https://www.youtube.com/embed/${verifyURL(link)}`}
        title="Exercise video"
      />
    );
  }
}

function verifyURL(link) {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = link.match(regExp);
  return (match&&match[7].length==11)? match[7] : false;
}

function YouTube({link}) {
  var id = verifyURL(link)

  return (
    <>
      <iframe 
      width="100%"
      height="60%"
      src={"https://www.youtube.com/embed/" + id} 
      ></iframe>
    </>
  );
}

export default YouTube;

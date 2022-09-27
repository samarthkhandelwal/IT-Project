export default function YouTube({ link }) {
  function verifyURL(link) {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = link.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  }

  return (
    <>
      <iframe
        width="100%"
        height="60%"
        src={
          link != null ? 'https://www.youtube.com/embed/' + verifyURL(link) : ''
        }
      ></iframe>
    </>
  );
}

// Styles
import styles from '../../styles/Video.module.css';

export default function Video({ link }) {
  function verifyURL(link) {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = link.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  }

  return (
    <div className={styles.video}>
      <iframe
        width="100%"
        height="300px"
        src={
          link != null ? 'https://www.youtube.com/embed/' + verifyURL(link) : ''
        }
      ></iframe>
    </div>
  );
}

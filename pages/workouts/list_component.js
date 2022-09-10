import Link from "next/link";
import styles from "../../styles/Workouts.module.css";

export default function List_Component(props) {
  return (
    <div className={styles.container}>
      <h1>suh dude</h1>
      {console.log(props.list)}
      <div className="list-group">
        {props.list.map((element) => (
          <div
            className="d-flex w-100 justify-content-between"
            key={element.name}
          >
            {element.name}
          </div>
        ))}
      </div>
    </div>
  );
}

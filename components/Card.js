import styles from "../styles/Card.module.css";

export default function Card({href, title, text}) {
    return (
        <a href={href} className={styles.card}>
            <h2>{title} &rarr;</h2>
            <p>{text}</p>
        </a>
    );
}

import styles from "../styles/Card.module.css";
import Link from "next/link";

export default function Card({href, title, text}) {
    return (
        <Link href={href}>
            <a className={styles.card}>
                <h2>{title} &rarr;</h2>
                <p>{text}</p>
            </a>
        </Link>
    );
}

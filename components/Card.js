import styles from "../styles/Card.module.css";
import Link from "next/link";

export default function Card({href, title, text, width}) {
    return (
        <Link href={href}>
            <a className={styles.card} style={{maxWidth: width}}>
                <h2>{title} &rarr;</h2>
                <p>{text}</p>
            </a>
        </Link>
    );
}

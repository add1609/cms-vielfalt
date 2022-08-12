import styles from "../styles/Footer.module.css";
import Link from "next/link";

export default function Footer() {
    return (
        <div className={styles.footer}>
            <span>&copy;{" "}
                <Link href="/"><a>CMS-Vielfalt AG</a></Link>
            </span>
            {" "}
            <span>Powered by{" "}
                <Link href="/"><a>Vercel</a></Link>
            </span>
        </div>
    );
}

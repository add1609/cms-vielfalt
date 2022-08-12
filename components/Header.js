import styles from "../styles/Header.module.css";
import Link from "next/link";

export default function Header() {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div className={styles.logo}>
                    <Link href="/">
                        <a>Vielfalt AG | <span style={{color: "var(--accent)"}}>CMS</span></a>
                    </Link>
                </div>
            </nav>
        </header>
    );
}

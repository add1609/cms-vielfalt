import styles from "../styles/Header.module.css";
import Link from "next/link";
import {useAuth} from "../contexts/AuthContext";

export default function Header() {
    const {currentUser, logout} = useAuth();

    async function handleLogout() {
        await logout();
    }

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div className={styles.logo}>
                    <Link href="/">
                        <a>Vielfalt AG | <span style={{color: "var(--accent)"}}>CMS</span></a>
                    </Link>
                </div>
                {!currentUser &&
                    <Link href="/login">
                        <a className={styles.link} aria-current="page">
                            Log in
                        </a>
                    </Link>
                }
                {currentUser &&
                    <Link href="/dashboard">
                        <a className={styles.link} aria-current="page">
                            Signed in as: {" "}
                            <span style={{color: "var(--accent)"}}>
                                {currentUser.email}
                            </span>
                        </a>
                    </Link>
                }
                {currentUser &&
                    <Link href="/">
                        <a className={styles.link} aria-current="page"
                           onClick={handleLogout}>
                            Log out
                        </a>
                    </Link>
                }
            </nav>
        </header>
    );
}

import styles from "../styles/Home.module.css";
import {useAuth} from "../contexts/AuthContext";

export default function Dashboard() {
    const {currentUser} = useAuth();

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    {currentUser && <>
                        Hallo {" "}<a href="#">
                        {currentUser.displayName.charAt(0).toUpperCase() + currentUser.displayName.slice(1)}!
                    </a>
                    </>}
                </h1>
            </main>
        </div>
    );
}

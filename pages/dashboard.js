import styles from "../styles/Home.module.css";

export default function Dashboard() {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome to the <a href="#">Dashboard!</a>
                </h1>
            </main>
        </div>
    );
}

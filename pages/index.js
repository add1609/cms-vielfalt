import styles from "../styles/Home.module.css";
import LoginForm from "../components/LoginForm";

export default function Home() {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <LoginForm/>
            </main>
        </div>
    );
}

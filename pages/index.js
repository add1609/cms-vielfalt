import styles from "../styles/Home.module.css";

export default function Home() {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome to the <a href="https://nextjs.org">CMS!</a>
                </h1>
                <p className={styles.description}>
                    <code className={styles.code}>Content Management System</code>
                </p>
                <div className={styles.grid}>
                    <a href="#" className={styles.card}>
                        <h2>Documentation &rarr;</h2>
                        <p>Find in-depth information about Next.js features and API.</p>
                    </a>
                    <a href="#" className={styles.card}>
                        <h2>Learn &rarr;</h2>
                        <p>Learn about Next.js in an interactive course with quizzes!</p>
                    </a>
                    <a href="#" className={styles.card}>
                        <h2>Examples &rarr;</h2>
                        <p>Discover and deploy boilerplate example Next.js projects.</p>
                    </a>
                    <a href="#" className={styles.card}>
                        <h2>Deploy &rarr;</h2>
                        <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
                    </a>
                </div>
            </main>
        </div>
    );
}

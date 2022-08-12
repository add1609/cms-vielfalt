import styles from "../styles/Home.module.css";
import Card from "../components/Card";

export default function Home() {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome to the <a href="#">CMS!</a>
                </h1>
                <div className={styles.grid}>
                    <Card href={"#"} title={"Documentation"}
                          text={"Find in-depth information about Next.js features and API."}/>
                    <Card href={"#"} title={"Learn"}
                          text={"Learn about Next.js in an interactive course with quizzes!"}/>
                    <Card href={"#"} title={"Examples"}
                          text={"Discover and deploy boilerplate example Next.js projects."}/>
                    <Card href={"#"} title={"Deploy"}
                          text={"Instantly deploy your Next.js site to a public URL with Vercel."}/>
                </div>
            </main>
        </div>
    );
}

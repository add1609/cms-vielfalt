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
                    <Card width={"360px"} href={"/login"} title={"Login"}
                          text={"Instantly deploy your Next.js site to a public URL with Vercel."}/>
                    <Card width={"360px"} href={"/dashboard"} title={"Dashboard"}
                          text={"Instantly deploy your Next.js site to a public URL with Vercel."}/>
                </div>
            </main>
        </div>
    );
}

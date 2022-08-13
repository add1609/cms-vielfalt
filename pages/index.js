import styles from "../styles/Home.module.css";
import Card from "../components/Card";
import {useAuth} from "../contexts/AuthContext";
import Link from "next/link";

export default function Home() {
    const {currentUser} = useAuth();

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome to the {" "}
                    <Link href={currentUser ? "/dashboard" : "/login"}>
                        <a>CMS!</a>
                    </Link>
                </h1>
                <div className={styles.grid}>
                    {currentUser &&
                        <Card width={"360px"} href={"/dashboard"} title={"Dashboard"}
                              text={"Visit the dashboard from where you can write new posts."}/>
                    }
                    {!currentUser &&
                        <Card width={"360px"} href={"/login"} title={"Login"}
                              text={"Login to your account in order to access the dashboard."}/>
                    }
                </div>
            </main>
        </div>
    );
}

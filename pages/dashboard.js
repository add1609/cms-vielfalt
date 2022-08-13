import styles from "../styles/Form.module.css";
import {useAuth} from "../contexts/AuthContext";
import Alert from "../components/Alert";
import {useEffect, useState} from "react";

export default function Dashboard() {
    const {currentUser} = useAuth();
    const [alert, setAlert] = useState({msg: "", variant: "default"});
    const [loading, setLoading] = useState(false);

    const saveToCache = (id, val) => {
        if (val === "") {
            localStorage.removeItem(id);
        } else {
            localStorage.setItem(id, val);
        }
    };

    const getFromCache = (id) => {
        if (!localStorage.getItem(id)) {
            return "";
        } else {
            return localStorage.getItem(id);
        }
    };

    useEffect(() => {
        document.getElementById("article_path").value = getFromCache("article_path");
        document.getElementById("article_txt").value = getFromCache("article_txt");
    }, []);

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
                <div className={styles.form} style={{maxWidth: "900px"}}>
                    <div className={styles.formHeader}>New Post</div>
                    <div className={styles.formBody}>
                        {alert.msg && <Alert msg={alert.msg} variant={alert.variant}/>}
                        <form onSubmit={e => e.preventDefault()}>
                            <div>
                                <label className={styles.formLabel}>Path</label>
                                <input className={styles.formControl} id="article_path"
                                       placeholder="Path" required="" type="text"
                                       onChange={(e) => saveToCache("article_path", e.target.value)}/>
                            </div>
                            <div>
                                <label className={styles.formLabel}>Article</label>
                                <textarea className={styles.formTextarea} id="article_txt"
                                          placeholder="Article" required="" rows={10}
                                          onChange={(e) => saveToCache("article_txt", e.target.value)}/>
                            </div>
                            <button className={styles.formButton} disabled={loading} type="submit">Refresh</button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}

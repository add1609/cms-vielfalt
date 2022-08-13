import styles from "../styles/Form.module.css";
import {useRouter} from "next/router";
import {useState} from "react";
import {useAuth} from "../contexts/AuthContext";
import Alert from "../components/Alert";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState({msg: "", variant: "default"});
    const [loading, setLoading] = useState(false);
    const {login} = useAuth();

    async function handleLogin(e) {
        e.preventDefault();
        try {
            setLoading(true);
            setAlert({msg: "", variant: "default"});
            await login(email, password);
            setAlert({msg: "Successful login!", variant: "success"});
            setTimeout(() => router.push("/"), 500);
        } catch {
            setAlert({msg: "Failed to login!", variant: "danger"});
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <div className={styles.form}>
                    <div className={styles.formHeader}>Log in</div>
                    <div className={styles.formBody}>
                        {alert.msg && <Alert msg={alert.msg} variant={alert.variant}/>}
                        <form onSubmit={handleLogin}>
                            <div>
                                <label className={styles.formLabel}>Email</label>
                                <input className={styles.formControl} placeholder="Email" required=""
                                       type="text" onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div>
                                <label className={styles.formLabel}>Password</label>
                                <input className={styles.formControl} placeholder="Password" required=""
                                       type="password" onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <button className={styles.formButton} disabled={loading} type="submit">Log in</button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}

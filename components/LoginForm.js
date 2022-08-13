import styles from "../styles/LoginForm.module.css";
import Alert from "./Alert";
import {useState} from "react";
import {useAuth} from "../contexts/AuthContext";
import {router} from "next/client";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [variant, setVariant] = useState("");
    const [loading, setLoading] = useState(false);
    const {login} = useAuth();

    async function handleLogin(e) {
        e.preventDefault();
        try {
            setLoading(true);
            setMsg("");
            await login(email, password);
            setMsg("Successful login!");
            setVariant("success");
            setTimeout(() => router.push("/"), 500);
        } catch {
            setMsg("Failed to login");
            setVariant("danger");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.form}>
            <div className={styles.formHeader}>Log in</div>
            <div className={styles.formBody}>
                {msg && <Alert msg={msg} variant={variant}/>}
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
                    <button className={styles.formButton} disabled={loading} type="submit">Log In</button>
                </form>
            </div>
        </div>
    );
}

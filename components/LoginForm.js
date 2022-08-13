import styles from "../styles/LoginForm.module.css";
import Alert from "./Alert";
import {useState} from "react";

export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [variant, setVariant] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
    };

    return (
        <div className={styles.form}>
            <div className={styles.formHeader}>Log in</div>
            <div className={styles.formBody}>
                {msg && <Alert msg={msg} variant={variant}/>}
                <form onSubmit={handleLogin}>
                    <div>
                        <label className={styles.formLabel}>Username</label>
                        <input className={styles.formControl} placeholder="Username" required=""
                               type="text" onChange={(e) => setUsername(e.target.value)}/>
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

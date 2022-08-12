import styles from "../styles/LoginForm.module.css";
import Alert from "./Alert";
import axios from "axios";
import {useState} from "react";

export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [variant, setVariant] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const user = await axios.post("/api/auth/login", {username, password});
            setMsg("Success!");
            setVariant("success");
            console.log(user);
        } catch {
            setMsg("Failed to Login!");
            setVariant("danger");
        } finally {
            setLoading(false);
        }
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

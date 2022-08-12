import styles from "../styles/LoginForm.module.css";

export default function LoginForm() {
    return (
        <div className={styles.form}>
            <div className={styles.formHeader}>Log in</div>
            <div className={styles.formBody}>
                <form>
                    <div id="inputEmail">
                        <label className={styles.formLabel}>Email</label>
                        <input className={styles.formControl} placeholder="Email Address" required=""
                               type="email"/>
                    </div>
                    <div id="inputPassword">
                        <label className={styles.formLabel}>Password</label>
                        <input className={styles.formControl} placeholder="Password" required=""
                               type="password"/>
                    </div>
                    <button className={styles.formButton} type="submit">Log In</button>
                </form>
            </div>
        </div>
    );
}

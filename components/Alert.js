import styles from "../styles/Header.module.css"

export default function Alert({variant, children}) {
    return (
        <div className={[
            "alert",
            ["alert", variant].join("-"),
        ].join(" ")}>
            {children}
        </div>
    );
}

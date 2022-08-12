export default function Alert({msg, variant}) {
    return (
        <div className={[
            "alert",
            ["alert", variant].join("-"),
        ].join(" ")}>
            {msg}
        </div>
    );
}

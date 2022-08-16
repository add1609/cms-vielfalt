import styles from "../styles/Form.module.css";
import {useAuth} from "../contexts/AuthContext";
import Alert from "../components/Alert";
import {useEffect, useState} from "react";
import Link from "next/link";

export default function Dashboard() {
    const {currentUser} = useAuth();
    const [alert, setAlert] = useState({msg: "", variant: "default"});
    const [previewURL, setPreviewURL] = useState("");
    const [loading, setLoading] = useState(false);
    const [wsInstance, setWsInstance] = useState(null);

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

    function connectToWs() {
        //const ws = new WebSocket("wss://localhost:9100/socket");
        const ws = new WebSocket("wss://46.101.214.27/socket");
        ws.addEventListener("open", () => {
            setAlert({msg: "Connected to socket!", variant: "success"});
            setWsInstance(ws);
        })
        ws.addEventListener("error", () => {
            setAlert({msg: "Failed to connect to socket!", variant: "danger"});
            setWsInstance(null);
        })
        ws.addEventListener("close", (evt) => {
            switch (evt.code) {
                case 1000:
                    setAlert({msg: "Connection closed by client!", variant: "warning"});
                    break;
                case 1006:
                    setAlert({msg: "Connection closed by server!", variant: "danger"});
                    break;
            }
            setWsInstance(null);
        })
        ws.addEventListener("message", (evt) => {
            setPreviewURL(evt.data);
        })
    }

    function handleSubmit() {
        if (wsInstance !== null) {
            try {
                setLoading(true);
                setAlert({msg: "", variant: "default"});
                const msg = {
                    "article_path": document.getElementById("article_path").value,
                    "article_content": document.getElementById("article_content").value,
                };
                wsInstance.send(JSON.stringify(msg));
                setAlert({msg: "Sent to socket!", variant: "success"});
            } catch {
                setAlert({msg: "Failed to send to socket!", variant: "danger"});
            } finally {
                setLoading(false);
            }
        }
    }

    function handleConnect() {
        if (window["WebSocket"] && wsInstance === null) {
            connectToWs()
        }
    }

    function handleClose() {
        if (wsInstance !== null) {
            wsInstance.close(1000);
        }
    }

    useEffect(() => {
        document.getElementById("article_path").value = getFromCache("article_path");
        document.getElementById("article_content").value = getFromCache("article_content");
    }, []);

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    {currentUser && <>
                        Hallo {" "}
                        <Link href="">
                            <a>{currentUser.displayName.charAt(0).toUpperCase()
                                + currentUser.displayName.slice(1)}!</a>
                        </Link>
                    </>}
                </h1>
                <div className={styles.form} style={{maxWidth: "900px"}}>
                    <div className={styles.formHeader}>New Post</div>
                    <div className={styles.formBody}>
                        {alert.msg &&
                            <Alert variant={alert.variant}>{alert.msg}</Alert>
                        }
                        <form onSubmit={e => e.preventDefault()}>
                            <div>
                                <label className={styles.formLabel}>Path</label>
                                <input className={styles.formControl} id="article_path"
                                       placeholder="Path" required="" type="text"
                                       onChange={(e) => saveToCache("article_path", e.target.value)}/>
                            </div>
                            <div>
                                <label className={styles.formLabel}>Article</label>
                                <textarea className={styles.formTextarea} id="article_content"
                                          placeholder="Article" required="" rows={10}
                                          onChange={(e) => saveToCache("article_content", e.target.value)}/>
                            </div>
                            {wsInstance !== null && <>
                                {previewURL && <>
                                        <label className={styles.formLabel}>Preview URL:</label>
                                        <Alert variant="primary">
                                            <a href={previewURL} target="_blank" rel="noreferrer">{previewURL}</a>
                                        </Alert>
                                </>}
                            </>}
                            {wsInstance !== null &&
                                <button className={styles.formButton} disabled={loading}
                                        onClick={handleSubmit}>Send</button>
                            }
                            {wsInstance !== null &&
                                <button className={styles.formButton} disabled={loading}
                                        onClick={handleClose}>Close connection</button>
                            }
                            {wsInstance === null && <>
                                {currentUser &&
                                    <button className={styles.formButton} disabled={loading}
                                            onClick={handleConnect}>Connect to socket</button>
                                }
                            </>}
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}

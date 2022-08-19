import styles from "../styles/Form.module.css";
import {useAuth} from "../contexts/AuthContext";
import {useWS} from "../contexts/WsContext";
import {getFromCache, saveToCache} from "../service/cacheLocal";
import Alert from "../components/Alert";

import {useEffect, useState} from "react";
import Link from "next/link";

export default function Dashboard() {
    const {currentUser} = useAuth();
    const {wsInstance, connectToWs, sendToWs} = useWS();
    const [alert, setAlert] = useState({msg: "", variant: "default"});
    const [loading, setLoading] = useState(false);
    const [previewURL, setPreviewURL] = useState("");

    const handleConnect = () => {
        if (window["WebSocket"] && wsInstance === null) {
            connectToWs(
                () => {setAlert({msg: "Connected to socket!", variant: "success"});},
                () => {setAlert({msg: "ERROR!", variant: "danger"});},
                {
                    1000: () => {setAlert({msg: "1000", variant: "danger"});},
                    1006: () => {setAlert({msg: "1006", variant: "warning"});},
                },
            );
        }
    };

    const handleClose = () => {
        if (wsInstance !== null) {
            wsInstance.close(1000);
        }
    };

    function handleSend() {
        if (wsInstance !== null) {
            setLoading(true);
            setAlert({msg: "", variant: "default"});
            sendToWs({"action": "reqPreviewUrl", "payload": {}},
                (res) => {
                    setPreviewURL(res["payload"]["previewUrl"]);
                    setAlert({msg: "Sent to socket!", variant: "success"});
                },
                () => {setAlert({msg: "Failed to send to socket!", variant: "danger"});},
            );
            setLoading(false);
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
                                        onClick={handleSend}>Send</button>
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

import React, {useContext, useState} from "react";

const WsContext = React.createContext(undefined);

export function useWS() {
    return useContext(WsContext);
}

export function WsProvider({children}) {
    const [wsInstance, setWsInstance] = useState(null);

    function connectToWs(onOpen, onError, onClose) {
        const ws = new WebSocket(process.env.NEXT_PUBLIC_WEB_SOCKET_URL);
        ws.addEventListener("open", () => {
            setWsInstance(ws);
            onOpen();
        });
        ws.addEventListener("error", () => {
            setWsInstance(null);
            onError();
        });
        ws.addEventListener("close", (evt) => {
            switch (evt.code) {
                // See https://www.rfc-editor.org/rfc/rfc6455.html#section-7.4.1
                case 1000:
                    // CLOSE_NORMAL_CLOSURE
                    if (typeof onClose["1000"] === "function") {
                        onClose["1000"]();
                    }
                    break;
                case 1001:
                    // CLOSE_GOING_AWAY
                    if (typeof onClose["1001"] === "function") {
                        onClose["1001"]();
                    }
                    break;
                case 1002:
                    // CLOSE_PROTOCOL_ERROR
                    if (typeof onClose["1002"] === "function") {
                        onClose["1002"]();
                    }
                    break;
                case 1003:
                    // CLOSE_UNSUPPORTED_DATA
                    if (typeof onClose["1003"] === "function") {
                        onClose["1003"]();
                    }
                    break;
                case 1005:
                    // CLOSE_NO_STATUS_RECEIVED
                    if (typeof onClose["1005"] === "function") {
                        onClose["1005"]();
                    }
                    break;
                case 1006:
                    // CLOSE_ABNORMAL_CLOSURE
                    if (typeof onClose["1006"] === "function") {
                        onClose["1006"]();
                    }
                    break;
                case 1007:
                    // CLOSE_INVALID_FRAME_PAYLOAD_DATA
                    if (typeof onClose["1007"] === "function") {
                        onClose["1007"]();
                    }
                    break;
                case 1008:
                    // CLOSE_POLICY_VIOLATION
                    if (typeof onClose["1008"] === "function") {
                        onClose["1008"]();
                    }
                    break;
                case 1009:
                    // CLOSE_MESSAGE_TOO_BIG
                    if (typeof onClose["1009"] === "function") {
                        onClose["1009"]();
                    }
                    break;
                case 1010:
                    // CLOSE_MANDATORY_EXTENSION
                    if (typeof onClose["1010"] === "function") {
                        onClose["1010"]();
                    }
                    break;
                case 1011:
                    // CLOSE_INTERNAL_SERVER_ERROR
                    if (typeof onClose["1011"] === "function") {
                        onClose["1011"]();
                    }
                    break;
                case 1012:
                    // CLOSE_SERVICE_RESTART
                    if (typeof onClose["1012"] === "function") {
                        onClose["1012"]();
                    }
                    break;
                case 1013:
                    // CLOSE_TRY_AGAIN_LATER
                    if (typeof onClose["1013"] === "function") {
                        onClose["1013"]();
                    }
                    break;
                case 1015:
                    // CLOSE_TLS_HANDSHAKE
                    if (typeof onClose["1015"] === "function") {
                        onClose["1015"]();
                    }
                    break;
            }
            setWsInstance(null);
        });
    }

    function sendToWs(msg, onSuccess, onError) {
        try {
            wsInstance.send(JSON.stringify(msg));
            wsInstance.addEventListener("message", (evt) => {
                onSuccess(JSON.parse(evt.data));
            });
        } catch {
            onError();
        }
    }

    const wsValue = {
        wsInstance,
        connectToWs,
        sendToWs,
    };

    return (
        <WsContext.Provider value={wsValue}>
            {children}
        </WsContext.Provider>
    );
}

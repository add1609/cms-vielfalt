import React, {useContext, useState} from "react";

const WsContext = React.createContext(undefined);

export function useWS() {
    return useContext(WsContext);
}

export function WsProvider({children}) {
    const [wsInstance, setWsInstance] = useState(null);

    function connectToWs(onOpen, onError, onClose, onMsg) {
        const ws = new WebSocket(process.env.NEXT_PUBLIC_WEB_SOCKET_URL);
        ws.addEventListener("open", () => {
            setWsInstance(ws);
            onOpen()
        })
        ws.addEventListener("error", () => {
            setWsInstance(null);
            onError()
        })
        ws.addEventListener("close", (evt) => {
            switch (evt.code) {
                // See https://www.rfc-editor.org/rfc/rfc6455.html#section-7.4.1
                case 1000:
                    // CLOSE_NORMAL_CLOSURE
                    if (onClose["1000"] !== null) {
                        onClose["1000"]()
                        console.log(wsInstance)
                    }
                    break;
                case 1001:
                    // CLOSE_GOING_AWAY
                    if (onClose["1001"] !== null) {
                        onClose["1001"]()
                    }
                    break;
                case 1002:
                    // CLOSE_PROTOCOL_ERROR
                    if (onClose["1002"] !== null) {
                        onClose["1002"]()
                    }
                    break;
                case 1003:
                    // CLOSE_UNSUPPORTED_DATA
                    if (onClose["1003"] !== null) {
                        onClose["1003"]()
                    }
                    break;
                case 1005:
                    // CLOSE_NO_STATUS_RECEIVED
                    if (onClose["1005"] !== null) {
                        onClose["1005"]()
                    }
                    break;
                case 1006:
                    // CLOSE_ABNORMAL_CLOSURE
                    if (onClose["1006"] !== null) {
                        onClose["1006"]()
                    }
                    break;
                case 1007:
                    // CLOSE_INVALID_FRAME_PAYLOAD_DATA
                    if (onClose["1007"] !== null) {
                        onClose["1007"]()
                    }
                    break;
                case 1008:
                    // CLOSE_POLICY_VIOLATION
                    if (onClose["1008"] !== null) {
                        onClose["1008"]()
                    }
                    break;
                case 1009:
                    // CLOSE_MESSAGE_TOO_BIG
                    if (onClose["1009"] !== null) {
                        onClose["1009"]()
                    }
                    break;
                case 1010:
                    // CLOSE_MANDATORY_EXTENSION
                    if (onClose["1010"] !== null) {
                        onClose["1010"]()
                    }
                    break;
                case 1011:
                    // CLOSE_INTERNAL_SERVER_ERROR
                    if (onClose["1011"] !== null) {
                        onClose["1011"]()
                    }
                    break;
                case 1012:
                    // CLOSE_SERVICE_RESTART
                    if (onClose["1012"] !== null) {
                        onClose["1012"]()
                    }
                    break;
                case 1013:
                    // CLOSE_TRY_AGAIN_LATER
                    if (onClose["1013"] !== null) {
                        onClose["1013"]()
                    }
                    break;
                case 1015:
                    // CLOSE_TLS_HANDSHAKE
                    if (onClose["1015"] !== null) {
                        onClose["1015"]()
                    }
                    break;
            }
            setWsInstance(null);
        })
        ws.addEventListener("message", (evt) => {
            onMsg(evt.data);
        })
    }

    const wsValue = {
        wsInstance,
        connectToWs
    };

    return (
        <WsContext.Provider value={wsValue}>
            {children}
        </WsContext.Provider>
    );
}



import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ConfigProvider, AdaptivityProvider } from "@vkontakte/vkui";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <React.StrictMode>
        <ConfigProvider>
            <AdaptivityProvider>
                <App />
            </AdaptivityProvider>
        </ConfigProvider>
    </React.StrictMode>
);

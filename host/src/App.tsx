import React, { useState, useEffect } from "react";
import { useRemoteBootstrap } from "./hooks/useRemoteBootstrap";

const EPUTS_MODULE_CONTAINER_ID = "eputs-module-container";

const App = () => {
    useRemoteBootstrap(
        "http://localhost:3002/remoteEntry.js",
        "dtpMapRemote",
        "bootstrap",
        EPUTS_MODULE_CONTAINER_ID,
    );

    return (
        <div style={{ padding: "20px" }}>
            <h1>Host Application (React 19)</h1>
            <div id={EPUTS_MODULE_CONTAINER_ID}></div>
        </div>
    );
};

export default App;

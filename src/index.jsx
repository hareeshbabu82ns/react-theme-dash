import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "App";
import M3App from "M3App";
import "index.css";
import "react-toastify/dist/ReactToastify.css";
import store from "state/index";
import { ToastContainer } from "react-toastify";
// import { worker } from "./mocks/browser";

function prepare() {
  // if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/browser");
  return worker.start();
  // }
  // return Promise.resolve();
}

prepare().then(() =>
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <ReduxProvider store={store}>
        <GoogleOAuthProvider clientId="481898432716-im304rnmqv2128h01lt3tujcke23uve0.apps.googleusercontent.com">
          <App />
          {/* <M3App /> */}
        </GoogleOAuthProvider>
        <ToastContainer style={{ width: "500px" }} />
      </ReduxProvider>
    </React.StrictMode>
  )
);

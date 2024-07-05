import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline } from "@mui/material";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import "./index.css";
import theme from "./theme.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <CssVarsProvider theme={theme}>
      <CssBaseline>
        <App />
      </CssBaseline>
    </CssVarsProvider>
    {/* </React.StrictMode> */}
  </Provider>
);

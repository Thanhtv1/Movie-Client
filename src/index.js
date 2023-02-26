import React from "react";
import ReactDOM from "react-dom/client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./index.css";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";
import BackToTop from "./component/Button/BackToTop";
import { SkeletonTheme } from "react-loading-skeleton";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SkeletonTheme baseColor="#dde6ee">
    <Provider store={store}>
      <App />
      <BackToTop />
    </Provider>
  </SkeletonTheme>
);

// reportWebVitals();

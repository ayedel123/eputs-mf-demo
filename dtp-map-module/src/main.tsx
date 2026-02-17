import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import ErrorPage from "./pages/error/ErrorPage";
import Root from "./root";
import { refreshToken } from "./services/baseApi";


const containerSelector = "eputs-module-container";
const moduleId = "dtp-map";

let interval: NodeJS.Timeout;
const TOKEN_REFRESH_INTERVAL_MS = 10 * 60 * 1000;

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  domElementGetter: () => document.getElementById(containerSelector),
  errorBoundary(err, info, props) {
    return <ErrorPage err={err} info={info} {...props} />;
  },
});

export const bootstrap = [async () => await Promise.resolve(), lifecycles.bootstrap];

export const mount = [
  async () => {
    window.dispatchEvent(
      new CustomEvent("current-module-id-changed", {
        detail: {
          storage: moduleId,
        },
      })
    );
  },
  async () => (interval = setInterval(refreshToken, TOKEN_REFRESH_INTERVAL_MS)),
  lifecycles.mount,
];

export const unmount = [
  async () => {
    window.dispatchEvent(
      new CustomEvent("current-module-id-changed", {
        detail: {
          storage: null,
        },
      })
    );
  },
  async () => clearInterval(interval),
  lifecycles.unmount,
];

import express from "express";
import fs from "fs";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "../src/App.tsx";
import { Provider } from 'react-redux';
import { store } from '../src/state/store';

const PORT = 3000;
const app = express();

app.use("^/$", (req, res, next) => {
  fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Could not render the app server-side");
    }
    const ssr = ReactDOMServer.renderToString(
    <Provider store={store}>
      <App />
    </Provider>);
    const preloadedState = store.getState();
    return res.send(
      data.replace(
        "<div id=\"root\"></div>",
        `<div id="root">${ssr}</div>`
      )
    );
  });
});

app.use(express.static(path.resolve(__dirname, "../build")));

app.listen(PORT, () => {
    console.log(`App launched on ${PORT}`);
})
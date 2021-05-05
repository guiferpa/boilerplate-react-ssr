import path from 'path';
import express, { Application, Request, Response } from 'express';
import HttpStatusCodes from 'http-status-codes';
import serialize from 'serialize-javascript';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { Provider } from 'react-redux';

import { configureStore } from '../shared/store';

import AppContainer from '../shared/containers/app';

const initialState = {
  message: "Hello World"
}

const app: Application = express();

app.use("/public", express.static(path.resolve(__dirname, "./public")));

app.get("*", async (req: Request, res: Response) => {
  const sheet = new ServerStyleSheet();
  const store = configureStore(() => initialState);

  try {
    const rendered: string = ReactDOMServer.renderToString(
      sheet.collectStyles(
        <Provider store={store}>
          <AppContainer />
        </Provider>
      )
    );

    const html = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>My Little TODO List</title>
          ${sheet.getStyleTags()}
          <script src="/public/bundle.js" defer></script>
          <script>
            window.__INITIAL_STATE__ = ${serialize(store.getState())};
          </script>
        </head>
        <body>
          <div data-app="root">${rendered}</div>
        </body>
      </html>
    `

    res.contentType('text/html').status(HttpStatusCodes.OK).send(html);
  } catch(err) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
  } finally {
    sheet.seal();
  }
});

const port: number = 8090;

app.listen(port, () => {
  console.log(`SSR running at port: ${port}`);
});


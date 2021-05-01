import path from 'path';
import express, { Application, Request, Response } from 'express';
import HttpStatusCodes from 'http-status-codes';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';

import App from '../client/components/app';

const initialState = {
  message: "Hello from server side"
}

const app: Application = express();

app.use("/public", express.static(path.resolve(__dirname, "./public")));

app.get("*", async (req: Request, res: Response) => {
  const sheet = new ServerStyleSheet();
  try {
    const message: string = "Hello from client side";

    const rendered: string = ReactDOMServer.renderToString(
      sheet.collectStyles(
        <App message={message} />
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
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          </script>
        </head>
        <body>
          <div data-js="bundle">${rendered}</div>
        </body>
      </html>
    `

    res.status(HttpStatusCodes.OK).send(html);
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


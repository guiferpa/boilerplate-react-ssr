import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import express, { Application, Request, Response } from 'express';
import HttpStatusCodes from 'http-status-codes';

import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from '../client/components/app';

const app: Application = express();

app.use("^/$", async (req: Request, res: Response) => {
  const readFile = promisify(fs.readFile);
  try {
    const filepath: string = path.resolve(__dirname, './public/index.html');
    const data = await readFile(filepath, { encoding: 'utf-8' });
    const rendered = data.replace(
      '<div data-js="bundle"></div>',
      `<div data-js="bundle">${ReactDOMServer.renderToString(<App />)}</div>`
    ).replace('<title></title>', '<title>From SSR</title>');
    res.status(HttpStatusCodes.OK).send(rendered);
  } catch(err) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
  }
});

app.use(express.static(path.resolve(__dirname, "./public")));

const port: number = 8090;

app.listen(port, () => {
  console.log(`SSR running at port: ${port}`);
});

'use strict';

import http from 'http';
import querystring from 'querystring';
import express from 'express';
import { getAll, getItem, deleteItem } from './data.js';
import ejs from 'ejs';

const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.redirect('/home');
});

app.get('/home', async (req, res) => {
  const items = await getAll();
  res.render('home', { items:JSON.stringify(items)});
});

app.get('/detail', async (req, res) => {
  const id = req.query.id;
  const item = await getItem(id);

  if (item) {
    res.render('detail', { item: item });
  } else {
    res.status(404).send('Not Found');
  }
});

app.get('/maybucks', async (req, res) => {
  const items = await getAll();
  res.send(items);
});

app.get('/maybucks/:id', async (req, res) => {
  const id = req.params.id;
  const item = await getItem(id);
  res.send(item);
});

app.post('/delete', async (req, res) => {
  const id = req.body.id;

  if (!id) {
    return res.status(400).send('🚫Error!');
  }

  const deleted = await deleteItem(id);

  if (deleted) {
    res.send('👍Deleted successfully');
  } else {
    res.status(500).send('😭Failed to delete');
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

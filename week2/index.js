'use strict'

import express from 'express';
import { getAll, getItem, deleteItem, addItem, updateItem } from './data.js';

const app = express();

import ejs from 'ejs';

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

import cors from 'cors';
app.use('/api', cors());

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  const items = await getAll();
  res.render('home', { items: JSON.stringify(items) });
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

app.post('/maybucks', async (req, res) => {
  const { id, name, price } = req.body;

  if (!id || !name || !price) {
    return res.status(400).send('🚫Error! Invalid data');
  }

  const added = await addItem(id, name, price);

  if (added) {
    res.send('👍Item added successfully');
  } else {
    res.status(500).send('😭Failed to add item');
  }
});

app.post('/maybucks/:id', async (req, res) => {
  const { id, name, price } = req.body;

  if (!id || !name || !price) {
    return res.status(400).send('🚫Error! Invalid data');
  }

  const updated = await updateItem(id, name, price);

  if (updated) {
    console.log(updated);
    res.send('👍Item added/updated successfully');
  } else {
    res.status(500).send('😭Failed to add/update item');
  }
});

app.use((req, res) => {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not found');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

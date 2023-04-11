const express = require('express');
const app = express();
const data = require('./data');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.redirect('/home');
});

app.get('/home', (req, res) => {
  const items = data.getAll();
  res.render('home', { data: items });
});

app.get('/detail', (req, res) => {
  const id = req.query.id;
  const item = data.getItem(id);
  
  if (item) {
    res.render('detail', { item: item });
  } else {
    res.status(404).send('Not Found');
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

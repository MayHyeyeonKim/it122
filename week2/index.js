const express = require('express');
const app = express();
const data = require('./data');

app.set('view engine', 'ejs');


app.use(express.json()); // JSON 형식의 요청 바디를 파싱
app.use(express.urlencoded({ extended: false })); // URL-encoded 형식의 요청 바디를 파싱
app.use(express.static('public')); // 정적 파일을 서비스하기 위한 폴더 지정

app.get('/', (req, res) => {
  // res.send('Hello! This is week2 page');
  res.redirect('/home');
});
app.get('/home', (req, res) => {
  res.render('home', { data: data });
});
app.get('/detail', (req, res) => {
  const id = req.query.id;
  const item = data.find(item => item.id == id);
  
  if (item) {
    const productId = req.query.id;
    const product = data.filter(product => product.id == productId)[0];
    res.render('detail', { item: item, product: product });
  } else {
    res.status(404).send('Not Found');
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
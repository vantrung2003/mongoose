const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const product = require('./Models/Product');
const path = require('path');
const { log } = require('console');

const app = express();
const port = 8000;

// Set up view engine
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Connect to MongoDB
const uri = ('mongodb+srv://trungtvph19997:7ci2IDSUJXh6cAO6@cluster0.9xatla3.mongodb.net/Quan_ly_san_pham');
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));

// Set up middleware to parse request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up routes
app.get('/', async (req, res, next) => {
  await product.find({})
    .then((products) => {
      res.render(path.join(__dirname, 'views/home.hbs'), { products });
    })
    .catch(next);
});

app.get('/themmoi', (req, res) => {
  res.render(path.join(__dirname, 'views/themmoi.hbs'));
});

app.post('/add-product', (req, res) => {
  const { name, price, figure } = req.body;
  product.create({ name, price, figure }).then(() => {
    res.redirect('/');
  }).catch((err) => {
    console.log('Add product failed:', err);
  });
});

app.get('/sua-san-pham/:_id', (req, res) => {
  product.findById(req.params._id).exec()
    .then((product) => {
      res.render(path.join(__dirname + '/views/sua.hbs'), {
        product: product.toJSON(),
      });
    })
    .catch((err) => {
      console.log('Error:', err);
    });
});

//update
app.post('/fix-product', (req, res, next) => {
  product.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true })
    .then((updatedProduct) => {
      res.redirect('/');
    })
    .catch((err) => {
      console.log('====================================');
      console.log('Không xoá được. Không biết làm sao???');
      console.log('====================================');
    });
});




app.get('/delete/:id', (req, res) => {
  const productId = req.params.id;
  product.findOneAndDelete({_id: productId})
    .then(() => {
      console.log('Product deleted');
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error deleting product');
    });
});

// Start server
app.listen(port, () => {
  console.log(`Server đang chạy ở cổng:${port}`);
});
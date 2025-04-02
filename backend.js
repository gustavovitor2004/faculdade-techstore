const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.json());

// Conexão com o MongoDB
mongoose.connect('mongodb://localhost:27017/techstore', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.log("Erro ao conectar ao MongoDB", err));

// Modelo de Produto
const Product = mongoose.model('Product', new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  stock: Number
}));

// CRUD de Produtos
app.post('/products', async (req, res) => {
  const { name, description, price, stock } = req.body;
  const newProduct = new Product({ name, description, price, stock });
  await newProduct.save();
  res.status(201).json(newProduct);
});

app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock } = req.body;
  const updatedProduct = await Product.findByIdAndUpdate(id, { name, description, price, stock }, { new: true });
  res.json(updatedProduct);
});

app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.status(204).send();
});

// Iniciar o servidor
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});

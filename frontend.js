import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', stock: '' });

  useEffect(() => {
    axios.get('http://localhost:3000/products')
      .then(response => setProducts(response.data));
  }, []);

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/products', newProduct)
      .then(response => {
        setProducts([...products, response.data]);
        setNewProduct({ name: '', description: '', price: '', stock: '' });
      });
  };

  return (
    <div>
      <h1>TechStore - Gerenciamento de Produtos</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={newProduct.name} onChange={handleChange} placeholder="Nome do Produto" required />
        <input type="text" name="description" value={newProduct.description} onChange={handleChange} placeholder="Descrição" required />
        <input type="number" name="price" value={newProduct.price} onChange={handleChange} placeholder="Preço" required />
        <input type="number" name="stock" value={newProduct.stock} onChange={handleChange} placeholder="Quantidade em Estoque" required />
        <button type="submit">Adicionar Produto</button>
      </form>
      
      <ul>
        {products.map(product => (
          <li key={product._id}>
            {product.name} - {product.price} - {product.stock}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

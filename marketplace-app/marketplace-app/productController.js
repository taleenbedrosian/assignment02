const Product = require('./productModel');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching products' });
  }
};

const getProductById = async (req, res) => {
    const productId = req.params.id;
    try {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching product' });
    }
  };
  const createProduct = async (req, res) => {
    try {
      const newProduct = new Product(req.body);
      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating a product' });
    }
  };
  const updateProductById = async (req, res) => {
    const productId = req.params.id;
    try {
      const product = await Product.findByIdAndUpdate(productId, req.body, { new: true });
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating product' });
    }
  };
  const deleteProductById = async (req, res) => {
    const productId = req.params.id;
    try {
      const product = await Product.findByIdAndRemove(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting product' });
    }
  };
  const deleteAllProducts = async (req, res) => {
    try {
      await Product.deleteMany({}); 
      res.json({ message: 'All products deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting all products' });
    }
  };
  const searchProductsByName = async (req, res) => {
    const keyword = req.params.keyword;
    try {
      const products = await Product.find({ name: { $regex: keyword, $options: 'i' } });
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error searching for products' });
    }
  };
  
module.exports = {
  getAllProducts, getProductById, createProduct, updateProductById, deleteProductById, deleteAllProducts, searchProductsByName
  
};

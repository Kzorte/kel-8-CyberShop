// Import dependencies
import express, { json } from 'express';
import { connect, model, Schema } from 'mongoose';
import { hash, compare } from 'bcrypt';
import cors from 'cors';

// Inisialisasi app Express
const app = express();

// Middleware
app.use(json()); // untuk parsing application/json
app.use(cors()); // Mengaktifkan semua CORS request

// Koneksi ke MongoDB
connect('mongodb+srv://cybershop:cybershop@cluster0.2i9vhga.mongodb.net/e-commerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Model Produk
const Product = model('Product', new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  old_price: { type: Number, required: true },
  new_price: { type: Number }
}));

// Endpoint untuk menambahkan produk
app.post('/addproduct', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).send({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    res.status(500).send({ message: "Error adding product", error });
  }
});

// Endpoint untuk mendapatkan semua produk
app.get('/allproducts', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ message: "Error fetching products", error });
  }
});


// Endpoint untuk mengupdate produk
app.put('/editproduct/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedProduct) {
      res.status(200).send({ message: "Product updated successfully", product: updatedProduct });
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error updating product", error });
  }
});


// Endpoint untuk menghapus produk
app.delete('/removeproduct/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (deletedProduct) {
      res.status(200).send({ message: "Product removed successfully" });
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error removing product", error });
  }
});


// Membuat model user
const User = model('User', new Schema({
  username: String,
  email: String,
  password: String,
}));

// Endpoint untuk signup
app.post('/signup', async (req, res) => {
  try {
    const hashedPassword = await hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error creating user", error });
  }
});

// Endpoint untuk login
app.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user && await compare(req.body.password, user.password)) {
    res.send({ message: "Login successful" });
  } else {
    res.status(400).send({ message: "Login failed" });
  }
});

// Menjalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

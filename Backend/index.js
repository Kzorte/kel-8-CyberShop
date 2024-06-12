const port = 3000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

app.use(express.json());
app.use(cors());

// Database Connection With MongoDB
mongoose.connect("mongodb+srv://cybershop:cybershop@cluster0.2i9vhga.mongodb.net/CyberShopDB", {

}).then(() => {
  console.log("Connected to MongoDB");
}).catch(error => {
  console.error("Error connecting to MongoDB:", error);
});

// CORS Configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3001'] // Contoh jika Admin Panel dan CyberShop berjalan di port yang berbeda
}));

/// Image Storage Engine 
const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (_req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
});

const upload = multer({ storage: storage });

// Creating Upload Endpoint For images
app.use('/images', express.static('upload/images'));

app.post('/upload', upload.single('image'), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`
  });
});



// Schema for Creating Products
const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  }
});

const Product = mongoose.model("Product", productSchema);

app.post('/addproduct', async (req, res) => {
  const { name, image, category, price, stock, description } = req.body;
  console.log("Received product data:", req.body); // Log untuk melihat data yang diterima

  if (!name || !image || !category || isNaN(parseFloat(price)) || isNaN(parseInt(stock))) {
    return res.status(400).json({ success: false, error: "All fields including a valid price and stock as numbers are required." });
  }

  try {
    let lastProduct = await Product.findOne().sort({ id: -1 }); // Ambil produk dengan ID terakhir
    let id = lastProduct ? lastProduct.id + 1 : 1; // Jika ada produk, tambahkan 1, jika tidak, mulai dari 1

    const product = new Product({
      id,
      name,
      image,
      category,
      price: Number(price),
      stock: Number(stock),
      description
    });

    await product.save();
    res.json({
      success: true,
      message: "Product added successfully",
      productDetails: product
    });
  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).json({ success: false, error: error.message || "Failed to save product" });
  }
});


// Endpoint untuk mendapatkan produk berdasarkan ID
app.get('/products/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findOne({ id: productId });
    if (!product) {
      return res.status(404).json({ success: false, error: "Product not found" });
    }
    res.json({ success: true, product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ success: false, error: "Failed to fetch product" });
  }
});




// Define the Schema for Categories
const categorySchema = new mongoose.Schema({
  name: String
});

// Create a Model
const Category = mongoose.model('Category', categorySchema);

// Sample Categories
const initialCategories = [
  { name: "SmartPhone" },
  { name: "SmartWatch" },
  { name: "SmartTV" },
  { name: "NoteBook" },
  { name: "Komputer" },
  { name: "Aksesoris" }
];

// Function to seed categories
async function seedCategories() {
  const existingCount = await Category.countDocuments();
  if (existingCount === 0) {
    await Category.insertMany(initialCategories);
    console.log('Categories seeded');
  }
}

// Call the seed function
seedCategories();

// Endpoint to get categories
app.get('/categories', async (_req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories.map(cat => ({ id: cat._id.toString(), name: cat.name })));
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ success: false, error: "Failed to fetch categories" });
  }
});


// Endpoint untuk edit produk
app.put("/editproduct/:id", async (req, res) => {
  const productId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ success: false, error: "Invalid product ID" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId, // Automatically converts string to ObjectId
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, error: "Product not found" });
    }

    res.json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ success: false, error: "Failed to update product" });
  }
});

//Creating API For deleting Products
app.post('/removeproduct', async (req, res) => {
  try {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed");
    res.json({
      success: true,
      name: req.body.name
    });
  } catch (error) {
    console.error("Error removing product:", error);
    res.status(500).json({ success: false, error: "Failed to remove product" });
  }
});

// Create API For getting All Product

app.get('/allproducts', async (_req, res) => {
  try {
    const products = await Product.find({ available: true }).sort({ date: -1 });
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, error: "Failed to fetch products" });
  }
});


// Schema creating for User Model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

const User = mongoose.model('User', userSchema);

// Creating Endpoint for registering the user
app.post('/signup', async (req, res) => {
  console.log("Received data:", req.body); // Tambahkan log ini
  try {
    let check = await User.findOne({ email: req.body.email });
    if (check) {
      return res.status(400).json({ success: false, errors: "User with the same email already exists" });
    }

    // Hash password before saving to database
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      name: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      cartData: {},
    });

    await user.save();
    const data = { user: { id: user.id } };
    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Creating endpoint for user login
app.post('/login', async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ success: false, error: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, error: "Invalid credentials" });
    }

    const data = {
      user: {
        id: user.id,
        name: user.name 
      },
      role: user.role // Include user role in the token data
    };

    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token, user: data.user }); // Sertakan user dalam respons
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Define the Schema for Orders
const orderSchema = new mongoose.Schema({
  userId: String,
  items: Array,
  total: Number,
  expedition: String,
  status: { type: String, default: 'Menunggu Konfirmasi' }, // Default status
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

// Endpoint untuk menyimpan order
app.post('/api/orders', async (req, res) => {
  const { userId, items, total, expedition } = req.body;

  try {
    const order = new Order({ userId, items, total, expedition });
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint untuk mendapatkan semua order
app.get('/api/orders', async (_req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Endpoint untuk mengkonfirmasi order
app.put('/api/orders/:orderId/status', async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    await order.save();

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(port, (error) => {
  if (!error) {
    console.log("Server Running on Port " + port);
  } else {
    console.log("Error : " + error);
  }
});

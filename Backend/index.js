const port = 3000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { error } = require("console");
const bcrypt = require('bcrypt');

app.use(express.json());
app.use(cors());

// Database Connection With MongoDB
// mongoose.connect("mongodb+srv://username:password@cluster0.2i9vhga.mongodb.net/e-commerce", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log("MongoDB connected successfully");
// }).catch((err) => {
//     console.error("MongoDB connection error:", err);
// });

// Database Connection With MongoDB
mongoose.connect("mongodb+srv://cybershop:cybershop@cluster0.2i9vhga.mongodb.net/e-commerce");

// Image Storage Engine 
const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({ storage: storage });

// Creating Upload Endpoint For images
app.use(`/images`, express.static(`upload/images`));

app.post('/upload', upload.single('product'), (req, res) => {
    res.json({
      success: 1,
      image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

// Schema for Creating Products
const Product = mongoose.model("Product", {
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
    // new_price: {
    //     type: Number,
    //     required: true,
    // },
    old_price: {
        type: Number,
        required: true,
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

app.post('/addproduct', async (req, res) => {
    try {
        let Products = await Product.find({});
        let id;
        if (Products.length > 0) {
            let last_product_array = Products.slice(-1);
            let last_product = last_product_array[0];
            id = last_product.id + 1;
        } else {
            id = 1;
        }
        const product = new Product({
            id: id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            // new_price: req.body.new_price,
            old_price: req.body.old_price,
        });
        console.log(product);
        await product.save();
        console.log("Saved");
        res.json({
            success: true,
            name: req.body.name,
        });
    } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).json({ success: false, error: "Failed to save product" });
    }
});

// Edit Product
app.put("/editproduct/:id", async (req, res) => {
  try {
    const productId = req.params.id; // Ambil ID produk dari URL

    if (mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ success: false, error: "Invalid product ID" });
    }

    const { name, image, category, old_price } = req.body; 

    
    const updatedProduct = await Product.findOneAndUpdate(
      { id: productId }, 
      { name, image, category, old_price }, 
      { new: true }
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    res.status(200).json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ success: false, error: "Failed to update product" });
  }
});






//Creating API For deleting Products
app.post(`/removeproduct`,async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name
    })
})


// Create API For getting All Product
app.get('/allproducts', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ success: false, error: "Failed to fetch products" });
    }
});

// Schema creating for User Model

const Users = mongoose.model('Users', {
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

// Creating Endpoint for registering the user
app.post('/signup', async (req, res) => {
    console.log("Received data:", req.body); // Tambahkan log ini
    try {
        let check = await Users.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ success: false, errors: "User with the same email already exists" });
        }

        // Hash password before saving to database
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new Users({
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
        let user = await Users.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ success: false, error: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, error: "Invalid credentials" });
        }

        const data = {
            user: {
                id: user.id
            },
            role: user.role // Include user role in the token data
        };

        const token = jwt.sign(data, 'secret_ecom');
        res.json({ success: true, token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.listen(port, (error)=>{
    if (!error) {
        console.log("Server Running on Port " + port);
    } else {
        console.log("Error : " + error);
    }
});

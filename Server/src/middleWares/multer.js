const multer = require("multer");

// Configure Multer to specify where to store uploaded files and how to name them
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define the directory where you want to store uploaded files
    cb(null, "uploads/"); // You may need to create a 'uploads' directory in your project
  },
  filename: function (req, file, cb) {
    // Define how the uploaded files should be named
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});

// Create a Multer instance with the specified storage configuration
const upload = multer({ storage: storage });

module.exports = { upload };

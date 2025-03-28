const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");

const app = express();
const PORT = 3000;

// MongoDB Connection
const uri = "mongodb://localhost:27017"; // Ensure MongoDB is running locally
const client = new MongoClient(uri);
const dbName = "BLOG";
const collectionName = "post";

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");
    return client.db(dbName).collection(collectionName);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1); // Stop server on error
  }
}

// **Insert a New Blog Post API**
app.post("/insert-blog", async (req, res) => {
  const collection = await connectDB();
  const { title, date, image, description } = req.body;
  
  if (!title || !date || !image || !description) {
    return res.status(400).json({ error: "❌ Missing required fields" });
  }

  try {
    const result = await collection.insertOne({
      title,
      date,
      image,
      description,
    });
    res.json({ message: "✅ Blog post inserted successfully!", blogId: result.insertedId });
  } catch (error) {
    console.error("❌ Error inserting blog post:", error.message);
    res.status(500).json({ error: "❌ Error inserting blog post", details: error.message });
  }
});

// **Get All Blog Posts API**
app.get("/get-blogs", async (req, res) => {
  const collection = await connectDB();
  try {
    const blogs = await collection.find().toArray();
    res.json(blogs);
  } catch (error) {
    console.error("❌ Error fetching blog posts:", error.message);
    res.status(500).json({ error: "❌ Error fetching blog posts", details: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
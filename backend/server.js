const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// MONGO_URI=mongodb://localhost:27017/tododb;

const app = express();
app.use(cors({
  origin:process.env.CORS_ORIGIN
}));
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/todosdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error(err));

// Schema + Model
const TodoSchema = new mongoose.Schema({
  text: String
});
const Todo = mongoose.model("Todo", TodoSchema);

// Routes
app.get("/api/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post("/api/todos", async (req, res) => {
  const todo = new Todo({ text: req.body.text });
  await todo.save();
  res.json(todo);
});

app.delete("/api/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// Start server
app.listen(5000, () => console.log("🚀 Backend running on port 5000"));

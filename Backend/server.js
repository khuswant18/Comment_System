import express from "express";
import dotenv from "dotenv"
import commentRoutes from './routes/comment.route.js'
import cors from "cors"

// const allowedOrigins = [
//   "http://localhost:5173", "http://localhost:5174",
//   "https://comment-system-self.vercel.app/", 
// ];  
 

const app = express(); 
app.use(express.json())
app.use(cors());
// app.use(
//   cors({
//     origin: allowedOrigins,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// ); 
dotenv.config() 

app.get("/", (req, res) => { 
  res.send("Hello World");
});

app.use('/api', commentRoutes);

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log("Server started at port", PORT);
});
    
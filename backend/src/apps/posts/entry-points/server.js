import "dotenv/config";
import postRoutes from "./api/index.js";
import express from "express";
import expressFileUpload from "express-fileupload";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(expressFileUpload());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
  })
);

app.use(postRoutes)

app.listen(5000, () => {
    console.log("Server is listening on port 5000");
    console.log(process.env)
  });
  
export default app;
  

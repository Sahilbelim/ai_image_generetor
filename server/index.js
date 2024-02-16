import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import postRoutes from "./routes/postRoutes.js";
import delleRoutes from "./routes/delleRoutes.js";
import conn from "./db/conn.js";
const app = express();

app.use(cors());

app.use(express.json({ limit: "50mb" }));

app.use("/api/post", postRoutes);
app.use("/api/delle", delleRoutes);
app.get("/", async (req, res) => {
  res.send("hello from server !");
});

const startServer = async () => {
  try {
    conn(process.env.MONGO_URL);
    app.listen(8000, () =>
      console.log("Server start on Port http://localhost:8000 ")
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();

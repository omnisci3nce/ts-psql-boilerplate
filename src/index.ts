import express, { Request, Response } from "express";
import { Pool } from "pg";
import Repo from "./repo";

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  database: "postgres",
  password: "docker",
  port: Number(process.env.DB_PORT || "5432")
});

const connectToDB = async () => {
  try {
    await pool.connect();
  } catch (err) {
    console.error(err);
  }
};
connectToDB();

const app = express();

app.get("/test", (req: Request, res: Response) => {
  res.send("hi");
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
import express from "express";
import cors from 'cors'
import carsRoutes from "./routes/cars.js";
import { initialize } from "./data/database.js";


const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/cars", carsRoutes);

try {
  await initialize();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} catch (err) {
  console.log(err.message);
}

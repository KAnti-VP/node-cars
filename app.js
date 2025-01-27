import express from "express";
import cors from "cors";
import carsRoutes from "./routes/cars.js";
import booksRoutes from "./routes/books.js";
import phonesRoutes from "./routes/phones.js";
import swaggerUi from "swagger-ui-express";
import path from "path";
import __dirname from "./util/rootdir.js";
import {
  carsSwaggerDocument,
  booksSwaggerDocument,
  phonesSwaggerDocument,
} from "./util/swaggerfiles.js";

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use(
  "/cars-docs",
  swaggerUi.serveFiles(carsSwaggerDocument),
  swaggerUi.setup(carsSwaggerDocument)
);
app.use(
  "/books-docs",
  swaggerUi.serveFiles(booksSwaggerDocument),
  swaggerUi.setup(booksSwaggerDocument)
);
app.use(
	"/phones-docs",
	swaggerUi.serveFiles(phonesSwaggerDocument),
	swaggerUi.setup(phonesSwaggerDocument)
  );

app.use("/api/cars", carsRoutes);
app.use("/api/books", booksRoutes);
app.use("/api/phones", phonesRoutes);

app.listen(PORT, () => {
  console.log(`Server runs on port ${PORT}`);
});

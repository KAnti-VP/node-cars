import express from "express";
import { dbAll, dbGet, dbRun } from "../data/database.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    console.log('Get all')
    const rows = await dbAll("SELECT * FROM cars");
    console.log('Rows: ' + rows)
    res.status(200).json(rows);
  } catch (err) {
    console.log(`Error: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  const { brand, model, color, year } = req.body;
  if (!brand && !model && !color && !year) {
    return res.status(400).json({ message: "Missing data" });
  }
  try {
    const car = await dbRun(
      "INSERT INTO cars (brand, model, color, year) VALUES (?, ?, ?, ?)",
      [brand, model, color, year]
    );
    res.status(201).json({ message: "Created successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const car = await dbGet("SELECT * FROM cars WHERE id = ?", [req.params.id]);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.status(200).json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  const { brand, model, color, year } = req.body;
  if (!brand && !model && !color && !year) {
    return res.status(400).json({ message: "Missing data" });
  }
  try {
    const car = await dbGet("SELECT * FROM cars WHERE id = ?", [req.params.id]);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    await dbRun(
      "UPDATE cars SET brand= ?, model= ?, color= ?, year= ? WHERE id = ? ",
      [brand, model, color, year, car.id]
    );
    res.status(200).json({ message: "Update successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const car = await dbGet("SELECT * FROM cars WHERE id = ?", [req.params.id]);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    await dbRun("DELETE FROM cars WHERE id = ? ", [req.params.id]);
    res.status(200).json({ message: "Delete successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

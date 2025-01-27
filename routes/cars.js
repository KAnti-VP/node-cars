import express from "express";
import * as carsControls from "../controls/carsControls.js";

const router = express.Router();

router.get("/", carsControls.getAllCars);

router.get("/:id", carsControls.getCarById);

router.post("/", carsControls.createCar);

router.put("/:id", carsControls.updateCar);

router.delete("/:id", carsControls.deleteCar);

export default router;

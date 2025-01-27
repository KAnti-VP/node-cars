import Car from "../models/car.js";

export const getAllCars = async (req, res) => {
  try {
    const cars = await Car.findAll();
    res.status(200).json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getCarById = async (req, res) => {
  try {
    const car = await Car.findByPk(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.status(200).json(car);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const createCar = async (req, res) => {
  try {
    const { model, brand, year } = req.body;
    if (!model || !brand || !year) {
      return res.status(400).json({ message: "Missing data" });
    }
    const car = await Car.findOne({ where: { model, brand, year } });
    if (car) {
      return res.status(409).json({ message: "Car already exists" });
    }
    const newCar = await Car.create({ model, brand, year });
    if (!newCar) {
      return res.status(500).json({ message: "Database error" });
    }
    res.status(201).json(newCar.toJSON());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCar = async (req, res) => {
  try {
    const { model, brand, year } = req.body;
    if (!model || !brand || !year) {
      return res.status(400).json({ message: "Missing data" });
    }
    const car = await Car.findByPk(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    const updatedCar = await Car.update(
      { model, brand, year },
      { where: { id: req.params.id } }
    );
    if (!updatedCar) {
      return res.status(500).json({ message: "Database error" });
    }
    res.status(200).json({ message: "Update successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCar = async (req, res) => {
  try {
    const car = await Car.findByPk(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    const result = await car.destroy();
    if (!result) {
      return res.status(500).json({ message: "Database error" });
    }
    res.status(200).json({ message: "Delete successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import DataTypes from "sequelize";
import sequelize from "../util/database.js";

const Car = sequelize.define("car", {
	model: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	brand: {
		type: DataTypes.STRING,
		allownULL: false,
	},
	year: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 2024,
		validate: {
			min: 1900,
			max: 2025,
		},
	},
}, 
{
  timestamps: false
});

try {
  await Car.sync({force: true});
  await Car.bulkCreate([
  {model: 'A1', brand: 'Audi', year: 2020},
  {model: 'Golf 4', brand: 'Volkswagen', year: 2021},
  {model: 'SuperB', brand: 'Skoda', year: 2022},
  {model: 'Model 3', brand: 'Tesla', year: 2023},
  ]);
} catch (error) {
  console.log(error)
}

export default Car;

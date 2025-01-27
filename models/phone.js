import { DataTypes } from "sequelize";
import sequelize from "../util/database.js";

const Phone = sequelize.define(
  "phones",
  {
    brand: DataTypes.STRING,
    model: DataTypes.STRING,
    nfc: DataTypes.BOOLEAN,
    camera: DataTypes.INTEGER,
  },
  {
    timestamps: false,
  }
);

try {
  await Phone.sync({ force: true });
  await Phone.bulkCreate([
    { brand: "Apple", model: "Iphone 16 Pro", nfc: true, camera: 50 },
    { brand: "Samsung", model: "Galaxy S25", nfc: true, camera: 50 },
    { brand: "Huawei", model: "P25", nfc: true, camera: 48 },
    { brand: "One Plus", model: "Nord 4", nfc: true, camera: 50 },
    { brand: "Pixel", model: "Pixel 9 Pro XL", nfc: true, camera: 50 },
  ]);
} catch (error) {
  console.log(error);
}

export default Phone

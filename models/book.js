import DataTypes from "sequelize";
import sequelize from "../util/database.js";

const Book = sequelize.define(
	"book",
	{
		title: DataTypes.STRING,
		author: DataTypes.STRING,
		year: DataTypes.INTEGER,
	},
	{
		timestamps: false,
	}
);

try {
	await Book.sync({ force: true });
	await Book.bulkCreate([
		{ title: "The Hobbit", author: "J. R. R. Tolkien", year: 1937 },
		{ title: "The Lord of the Rings", author: "J. R. R. Tolkien",	year: 1954 },
		{	title: "The Lord of the Rings",	author: "J. R. R. Tolkien",	year: 1954 },
		{ title: "Philosopher's Stone", author: "J. K. Rowling", year: 1997 },
		{ title: "Chamber of Secrets", author: "J. K. Rowling", year: 1998 },
		{ title: "Prisoner of Azkaban", author: "J. K. Rowling", year: 1999 },
		{ title: "Goblet of Fire", author: "J. K. Rowling", year: 2000 },
		{ title: "Order of the Phoenix", author: "J. K. Rowling", year: 2003 },
		{ title: "Half-Blood Prince", author: "J. K. Rowling", year: 2005 },
		{ title: "Deathly Hallows", author: "J. K. Rowling", year: 2007 },
	]);
} catch (error) {
	console.log(error);
}

export default Book;

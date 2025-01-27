import Book from "../models/book.js";

export const getAllBooks = async (req, res) => {
	try {
		const books = await Book.findAll();
		res.status(200).json(books);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getBookById = async (req, res) => {
	try {
		const book = await Book.findByPk(req.params.id);
		if (!book) {
			return res.status(404).json({ message: "Book not found" });
		}
		res.status(200).json(book);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const createBook = async (req, res) => {
	try {
		const { title, author, year } = req.body;
		if (!title || !author || !year) {
			return res.status(400).json({ message: "Missing data" });
		}
		const book = await Book.findOne({ where: { title, author, year } });
		if (book) {
			return res.status(409).json({ message: "Book alredy exists" });
		}
		const result = await Book.create({ title, author, year });
		if (!result) {
			return res.status(500).json({ message: "Datavbase error" });
		}
		res.status(201).json(result.toJSON());
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const updateBook = async (req, res) => {
	try {
		const { title, author, year } = req.body;
		if (!title || !author || !year) {
			return res.status(400).json({ message: "Missing data" });
		}
		const book = await Book.findByPk(req.params.id);
		if (!book) {
			return res.status(404).json({ message: "Book not found" });
		}
		const result = await book.update({ title, author, year });
		if (!result) {
			return res.status(500).json({ message: "Database error" });
		}
		res.status(200).json(result.toJSON());
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const deleteBook = async (req, res) => {
	try {
		const book = await Book.findByPk(req.params.id);
		if (!book) {
			return res.status(404).json({ message: "Book not found" });
		}
		const result = await book.destroy();
		if (!result) {
			return res.status(500).json({ message: "Database error" });
		}
		res.status(200).json({ message: "Delete successful" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

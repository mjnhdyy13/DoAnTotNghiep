const BookService = require("../services/BookService");

const createBook = async (req, res) => {
  try {
    const { name, image, description, total_view } = req.body;
    if (!name || !image || !description || !total_view) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    }
    const response = await BookService.createBook(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(404).json({
      message: e,
    });
  }
};

const updateBook = async (req, res) => {
  try {
    const BookId = req.params.id;
    const data = req.body;
    if (!BookId) {
      return res.status(200).json({
        status: "ERR",
        message: "The BookId is required",
      });
    }
    const response = await BookService.updateBook(BookId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getDetailsBook = async (req, res) => {
  try {
    const bookId = req.params.id;

    if (!bookId) {
      return res.status(200).json({
        status: "ERR",
        message: "The bookId is required",
      });
    }
    const response = await BookService.getDetailsBook(bookId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    if (!bookId) {
      return res.status(200).json({
        status: "ERR",
        message: "The bookId is required",
      });
    }
    const response = await BookService.deleteBook(bookId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteMany = async (req, res) => {
  try {
    const ids = req.body.ids;
    if (!ids) {
      return res.status(200).json({
        status: "ERR",
        message: "The ids is required",
      });
    }
    const response = await BookService.deleteManyBook(ids);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllBook = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query;
    const response = await BookService.getAllBook(
      Number(limit) || null,
      Number(page) || 0,
      sort,
      filter
    );
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllType = async (req, res) => {
  try {
    const response = await BookService.getAllType();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createBook,
  updateBook,
  getDetailsBook,
  deleteBook,
  getAllBook,
  deleteMany,
  getAllType,
};

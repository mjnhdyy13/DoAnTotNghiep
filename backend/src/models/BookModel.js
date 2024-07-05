const mongoose = require("mongoose");

// Tạo schema cho tác giả
const AuthorSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

// Tạo schema cho thể loại
const BookCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

// Tạo schema cho chương truyện
const ChapterSchema = new mongoose.Schema({
  ID_Book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  name: { type: String },
  link: { type: String },
  content: { type: String },
  time: { type: Number },
});

// Tạo schema cho truyện
const BookSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String },
    description: { type: String },
    total_view: { type: Number },
    author: AuthorSchema, // Tham chiếu đến schema của TacGia
    book_category: BookCategorySchema, // Tham chiếu đến schema của TheLoai
    chapter: [ChapterSchema], // Mảng các chương truyện
    // Id_TrangThai: { type: mongoose.Schema.Types.ObjectId, ref: 'TrangThai' } // Thêm reference cho TrangThai nếu cần
  },
  {
    timestamps: true,
  }
);

// Tạo model từ schema
const Book = mongoose.model("Book", BookSchema);

module.exports = Book;

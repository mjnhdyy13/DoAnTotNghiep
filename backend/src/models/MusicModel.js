const mongoose = require("mongoose");

// Tạo schema cho tác giả
const SingerSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

// Tạo schema cho thể loại
const MusicCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

// Tạo schema cho truyện
const MusicSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    link: { type: String },
    singer: SingerSchema, // Tham chiếu đến schema của TacGia
    music_category: MusicCategorySchema, // Tham chiếu đến schema của TheLoai
    time: { type: Number }, // Mảng các chương truyện
    // Id_TrangThai: { type: mongoose.Schema.Types.ObjectId, ref: 'TrangThai' } // Thêm reference cho TrangThai nếu cần
  },
  {
    timestamps: true,
  }
);

// Tạo model từ schema
const Music = mongoose.model("Music", MusicSchema);

module.exports = Music;

const Music = require("../models/MusicModel");

const createMusic = (newMusic) => {
  return new Promise(async (resolve, reject) => {
    const { name, link, singer, music_category } = newMusic;
    try {
      const checkMusic = await Music.findOne({
        name: name,
      });
      if (checkMusic !== null) {
        resolve({
          status: "ERR",
          message: "The name of Music is already",
        });
      }
      console.log(singer);
      const newMusic = await Music.create({
        name,
        link,
        singer,
        music_category,
      });
      console.log(newMusic);
      if (newMusic) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: newMusic,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateMusic = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkMusic = await Music.findOne({
        _id: id,
      });
      if (checkMusic === null) {
        resolve({
          status: "ERR",
          message: "The Music is not defined",
        });
      }

      const updatedMusic = await Music.findByIdAndUpdate(id, data, {
        new: true,
      });
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updatedMusic,
      });
    } catch (e) {
      console.log("lỗi");
      reject(e);
    }
  });
};

const deleteMusic = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkMusic = await Music.findOne({
        _id: id,
      });
      if (checkMusic === null) {
        resolve({
          status: "ERR",
          message: "The Music is not defined",
        });
      }

      await Music.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "Delete Music success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteManyMusic = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Music.deleteMany({ _id: ids });
      resolve({
        status: "OK",
        message: "Delete Music success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailsMusic = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const music = await Music.findOne({
        _id: id,
      });

      if (music === null) {
        resolve({
          status: "ERR",
          message: "The Music is not defined",
        });
      }

      resolve({
        status: "OK",
        message: "SUCESS",
        data: music,
      });
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

const getAllMusic = (limit, page, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalMusic = await Music.count();
      let allMusic = [];
      if (filter) {
        const label = filter[0];
        const allObjectFilter = await Music.find({
          [label]: { $regex: filter[1] },
        })
          .limit(limit)
          .skip(page * limit)
          .sort({ createdAt: -1, updatedAt: -1 });
        resolve({
          status: "OK",
          message: "Success",
          data: allObjectFilter,
          total: totalMusic,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalMusic / limit),
        });
      }
      if (sort) {
        const objectSort = {};
        objectSort[sort[1]] = sort[0];
        const allMusicSort = await Music.find()
          .limit(limit)
          .skip(page * limit)
          .sort(objectSort)
          .sort({ createdAt: -1, updatedAt: -1 });
        resolve({
          status: "OK",
          message: "Success",
          data: allMusicSort,
          total: totalMusic,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalMusic / limit),
        });
      }
      if (!limit) {
        allMusic = await Music.find().sort({ createdAt: -1, updatedAt: -1 });
      } else {
        allMusic = await Music.find()
          .limit(limit)
          .skip(page * limit)
          .sort({ createdAt: -1, updatedAt: -1 });
      }
      resolve({
        status: "OK",
        message: "Success",
        data: allMusic,
        total: totalMusic,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalMusic / limit),
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllType = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allType = await Music.distinct("type");
      resolve({
        status: "OK",
        message: "Success",
        data: allType,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createMusic,
  updateMusic,
  getDetailsMusic,
  deleteMusic,
  getAllMusic,
  deleteManyMusic,
  getAllType,
};

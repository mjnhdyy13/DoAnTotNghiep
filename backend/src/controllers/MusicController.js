const MusicService = require("../services/MusicService");

const createMusic = async (req, res) => {
  try {
    const { name, link } = req.body;
    if (!name || !link) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    }
    const response = await MusicService.createMusic(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(404).json({
      message: e,
    });
  }
};

const updateMusic = async (req, res) => {
  try {
    const MusicId = req.params.id;
    const data = req.body;
    if (!MusicId) {
      return res.status(200).json({
        status: "ERR",
        message: "The MusicId is required",
      });
    }
    const response = await MusicService.updateMusic(MusicId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getDetailsMusic = async (req, res) => {
  try {
    console.log("in cotroller");
    const MusicId = req.params.id;

    if (!MusicId) {
      return res.status(200).json({
        status: "ERR",
        message: "The MusicId is required",
      });
    }
    const response = await MusicService.getDetailsMusic(MusicId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteMusic = async (req, res) => {
  try {
    const MusicId = req.params.id;
    if (!MusicId) {
      return res.status(200).json({
        status: "ERR",
        message: "The MusicId is required",
      });
    }
    const response = await MusicService.deleteMusic(MusicId);
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
    const response = await MusicService.deleteManyMusic(ids);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllMusic = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query;
    const response = await MusicService.getAllMusic(
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
    const response = await MusicService.getAllType();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createMusic,
  updateMusic,
  getDetailsMusic,
  deleteMusic,
  getAllMusic,
  deleteMany,
  getAllType,
};

const BookRouter = require("./BookRouter");
const MusicRouter = require("./MusicRouter");

const routes = (app) => {
  app.use("/api/book", BookRouter);
  app.use("/api/music", MusicRouter);
};

module.exports = routes;

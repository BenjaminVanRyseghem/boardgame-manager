const { Router } = require("express");
const routes = new Router();

const games = require("./api/games");
const categories = require("./api/categories");
const mechanics = require("./api/mechanics");
const publishers = require("./api/publishers");
const search = require("./api/search");
const users = require("./api/users");

routes.route("/").get((req, res) => {
	res.json({ message: "Welcome to mini42-backend API!" });
});

routes.use("/game", games);
routes.use("/publisher", publishers);
routes.use("/category", categories);
routes.use("/mechanic", mechanics);
routes.use("/search", search);
routes.use("/user", users);

module.exports = routes;

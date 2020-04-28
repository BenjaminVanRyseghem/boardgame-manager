/* eslint-disable filenames/match-exported */
const request = require("request");
const xml2json = require("xml2json");
const { Router } = require("express");
const router = new Router();

let convertXmlToJson = (xml) => {
	let raw = JSON.parse(xml2json.toJson(xml));
	if (raw.items.total === "0" || !raw.items.item) {
		return [];
	}

	if (raw.items.total === "1") {
		raw.items.item = [raw.items.item];
	}

	return raw.items.item.map((data) => {
		let thing = {
			type: data.type,
			name: data.name.value,
			id: data.id,
			source: "boardgamegeek",
			page: `https://www.boardgamegeek.com/${data.type}/${data.id}`
		};

		if (data.yearpublished) {
			thing.yearpublished = data.yearpublished.value;
		}

		return thing;
	});
};

router.route("/bgg")
	.get((req, res) => {
		let uri = `https://www.boardgamegeek.com/xmlapi2/search?query=${req.query.name}&type=${req.query.type}`;
		if (req.query.exact === "true") {
			uri += "&exact=1";
		}
		request.get(uri, (err, { statusCode }, body) => {
			if (!err && statusCode === 200) {
				res.setHeader("Content-Type", "application/json");
				res.send(convertXmlToJson(body));
			} else {
				res.status(500);
				res.setHeader("Content-Type", "application/json");
				res.send(JSON.stringify({
					error: err,
					code: 500
				}));
			}
		});
	});

module.exports = router;

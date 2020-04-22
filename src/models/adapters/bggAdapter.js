const xml2json = require("xml2json");

/**
 * TODO: Write jsdoc
 * @class
 */
module.exports = class BggAdapter {
	static import(xml) {
		let data = xml2json.toJson(xml, { object: true });
		if (!data || !data.items || !data.items.item) {
			return null;
		}

		let { item } = data.items;

		let result = {
			foreignID: item.id,
			name: item.name.value,
			description: item.description,
			minPlayers: item.minplayers.value,
			maxPlayers: item.maxplayers.value,
			minPlaytime: item.minplaytime.value,
			maxPlaytime: item.maxplaytime.value,
			minAge: item.minage.value,
			picture: item.image,
			yearPublished: item.yearpublished.value,
			categories: [],
			publishers: [],
			mechanics: []
		};

		item.link.forEach((link) => {
			if (link.type === "boardgamecategory") {
				result.categories.push({
					foreignID: link.id,
					value: link.value
				});
			}

			if (link.type === "boardgamemechanic") {
				result.mechanics.push({
					foreignID: link.id,
					value: link.value
				});
			}

			if (link.type === "boardgamepublisher") {
				result.publishers.push({
					foreignID: link.id,
					value: link.value
				});
			}
		});

		return result;
	}
};
